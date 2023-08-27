// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify (fs.writeFile)
const path = require('path')
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the project title:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the project description:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information:',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['MIT', 'Apache', 'GNU GPL', 'ISC'],
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];


// this function creates a readme based on users input
function generateReadmeContent(answers) {
    return `
  # ${answers.title}
  
  ## Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  This project is covered under the ${answers.license} license.
  
  ## Contributing
  ${answers.contribution}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  For additional questions, you can reach me at:
  GitHub: [${answers.githubUsername}](https://github.com/${answers.githubUsername})
  Email: ${answers.email}
      `;
}

// Heres a function that writes the README file
function writeToFile(fileName, data) {
    writeFile(path.join(__dirname,'/Example/', fileName), data).then( () =>console.log ("Success")).catch(err => console.log ("fail"))
}

// Created a function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateReadmeContent(answers);
        writeToFile('README.md', readmeContent);
    });
}

// call to initialize app
init();