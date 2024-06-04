const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { execFile } = require('child_process');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const csvDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    csvData: { type: String, required: true }
});

const CsvData = mongoose.model('CsvData', csvDataSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/upload-files', upload.fields([{ name: 'zipFile' }, { name: 'pdfFile' }]), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const zipFilePath = req.files.zipFile[0].path;
    const pdfFilePath = req.files.pdfFile[0].path;

    execFile('node', ['api_call.js', zipFilePath, pdfFilePath], async (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing api_call.js:', error);
            return res.status(500).json({ message: 'Error processing files.' });
        }

        if (!stdout) {
            return res.status(400).json({ message: 'CSV data is empty.' });
        }

        try {
            const csvData = new CsvData({ userId, csvData: stdout });
            await csvData.save();
            res.json({ csvData: stdout });
        } catch (err) {
            console.error('Error saving CSV data:', err);
            res.status(500).json({ message: 'Error saving CSV data.' });
        }
    });
});

app.get('/csv-files', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const csvFiles = await CsvData.find({ userId }).select('csvData createdAt');
        res.json(csvFiles);
    } catch (err) {
        console.error('Error fetching CSV files:', err);
        res.status(500).json({ message: 'Error fetching CSV files.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
