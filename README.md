# GradeBot.AI: Automated Grading with NLP

GradeBot.AI is a web extension for Google Classroom that revolutionizes grading. It uses natural language processing (NLP) to automate the grading of essays, multiple-choice questions, online assignments, and examinations. 

## Features
- Actionable reports: Identify common student blunders and tailor an assignment to pay attention to the topic.
- Improved Answers: Answers with a perfect score can be improved using the keywords and provided to weak students.
- Generate targeted feedback: Offer students personalized suggestions for improvement.
- Chapter-wise breakdown: Insights into how the students performed on the chapter-wise keywords.

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/abckhush/GradeBot.ai.git
   cd GradeBot.ai
2. Install Dependencies
   ```bash
   npm install
   npm run build
3. Connect to Backend Server
   ```bash
   cd backend
   nodemon index.js

## Running the Chrome Extension
   - Go to <a href="chrome://extensions/">Chrome Extensions</a>.
   - Turn on the Developer Mode.
   - Choose Load Unpacked.
   - Choose the build folder inside the code.
   - Upload the zip file and the pdf file.
     For refernce, a zip file and a pdf file has been uploaded in the uploads folder in the backend.
     ```bash
     cd backend\uploads

## Additional Documentations
- <a href="https://github.com/JastegSingh19/Grading_Backend">Python Model for Backend</a>: Consists of utilization of YouData.ai Dataset.
- <a href="https://www.youtube.com/watch?v=2W1Iphbx6r0">Youtube Video</a>
- <a href="https://medium.com/@kalra.khushi12/gradebot-ai-humanaizehackathon-773a0799c50c">Medium Blog</a>
