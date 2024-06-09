const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const url = 'https://6aee-2409-40c0-1036-3791-507b-5f4b-a235-cc4e.ngrok-free.app/grade';
const zipFilePath = process.argv[2];
const pdfFilePath = process.argv[3];

const form = new FormData();
form.append('zip_path', fs.createReadStream(zipFilePath));
form.append('correct_answer_pdf', fs.createReadStream(pdfFilePath));

axios.post(url, form, {
    headers: form.getHeaders(),
})
.then(response => {
    console.log(response.data); 
})
.catch(error => {
    console.error(`Error: ${error.response.status}`);
    console.error(error.response.data);
});
