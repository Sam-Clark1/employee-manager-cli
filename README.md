

  <img src="https://img.shields.io/badge/license-MIT-blue" alt="badge"></img>
  
# employee-manager-cli

## Description
This application uses inquirer.js and mysql to provide a command line interface for managing employees, employee roles, and departments. Can add new employees, roles, and departments to a mysql database and can retrieve all that data and view it in the command line using the console.table package.
## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation
Download files from GitHub repository and open in VS Code. Open the terminal and type "npm i" to download all the required npm packages. To initialize the mysql database, go into the terminal and type "mysql -u <'your user'> -p", then type in your password. Next run the following commands in this order: "source db/db.sql", "source db/schema.sql", "source db/seeds.js". It is recommended to seed the database before use but can be used without doing this. You can edit what is seeded in the db/seed.js file.

## Usage
Open the terminal and type "node index.js" to initialize the program. When initialized, you will be prompted to add an initial employee by first entering their department, role info, and then employee info. From there, you will be presented with a list of actions that you can choose from. Use all the actions you want and when youre done, hit the "finish" action to close the program. You can also watch a video on how to install and use this app <a href=https://drive.google.com/file/d/1jZvpM_zNVuIHLzB4vh6oMqu81UINMmSD/view >here</a>.

## Contributing
I am open to others contributing. You can do this through pull requests on the GitHub repository.

## Tests
Currently no developed ways to test this project.

## Questions
If you have questions, you can email me at samclark2399@gmail.com or you can checkout my repos
on my <a href=https://github.com/sam-clark1>GitHub</a>.


  ## License
  Licensed under the 
  <a href=https://github.com/microsoft/vscode/blob/main/LICENSE.txt>MIT</a>
   license.
  

