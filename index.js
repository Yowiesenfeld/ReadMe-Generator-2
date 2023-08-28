
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs').promises;
const path = require('path');
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
        name: 'motivation',
        message: 'Enter motivation for creating your project:',
    },
    {
        type: 'input',
        name: 'learned',
        message: 'Enter what you have learned while creating this project:',
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
        name: 'features',
        message: 'List features:',
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
        type: 'input',
        name: 'issues',
        message: 'Enter report issue instructions:',
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
  -[Motivation](#motivation)
  -[Learned](#learned)  

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  -[Features](#features)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Issues](#issues)
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

async function writeToFile(fileName, data) {
    const filePath = path.join(__dirname, 'Example', fileName);
    try {
        await fs.writeFile(filePath, data);
        console.log('success!');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

async function copyImage(sourceImagePath, targetDirectory) {
    const sourceImageName = path.basename(sourceImagePath);
    const targetImagePath = path.join(targetDirectory, sourceImageName);
    try {
        await fs.copyFile(sourceImagePath, targetImagePath);
        console.log('Image copied successfully:', targetImagePath);
    } catch (error) {
        console.error('Error copying image:', error);
    }
}

async function init() {
    try {
        const answers = await inquirer.prompt(questions);
        const readmeContent = generateReadmeContent(answers);
        await writeToFile('README.md', readmeContent);

        if (answers.image) {
            await copyImage(answers.image, path.join(__dirname, 'Example'));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

init();