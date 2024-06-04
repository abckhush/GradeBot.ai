const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const url = 'https://fb9f-2409-40c0-107a-9530-f14d-ac2-e26f-a39a.ngrok-free.app/grade';
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
