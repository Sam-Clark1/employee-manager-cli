const inquirer = require('inquirer');
const cTable = require('console.table');
const { getAllDepartments, addDepartment } = require('./lib/departments')

const actionSelection = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add a Department',
                'View All Roles',
                'Add a Role',
                'View All Employees',
                'Add an Employee',
                'Update an Employee',
                'Finish'
            ]
        }
    ])
    .then(({action}) => {
        if (action === 'View All Departments') {
            getAllDepartments().then(res => {
                console.table(res);
                actionSelection();
            });
            return;
        } else if (action === 'Add a Department') {
            addDepartment().then(() => {
                console.log('Department added.')
                actionSelection();
            });
           return;
        } else if (action === 'View All Roles') {
            return;
        } else if (action === 'Add a Role') {
            return;
        } else if (action === 'View All Employees') {
            return;
        } else if (action === 'Add an Employee') {
            return;
        } else if (action === 'Update an Employee') {
            return;
        } else {
            console.log('Goodbye!')
            process.exit()
        }
    });
};

actionSelection();