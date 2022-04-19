const inquirer = require('inquirer');
const cTable = require('console.table');
const { getAllDepartments, addDepartment } = require('./lib/departments');
const { getAllRoles, addRole } = require('./lib/roles');
const { getAllEmployees, addEmployee } = require('./lib/employees');

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
        } else if (action === 'Add a Department') {
            addDepartment().then(() => {
                console.log('Department added.')
                actionSelection();
            });
        } else if (action === 'View All Roles') {
            getAllRoles().then(res => {
                console.table(res);
                actionSelection();
            });
        } else if (action === 'Add a Role') {
            addRole().then(() => {
                console.log('Role added.')
                actionSelection();
            });
        } else if (action === 'View All Employees') {
            getAllEmployees().then(res => {
                console.table(res);
                actionSelection();
            });
        } else if (action === 'Add an Employee') {
            addEmployee().then(() => {
                console.log('Employee added.')
                actionSelection();
            });
        } else if (action === 'Update an Employee') {
        } else {
            console.log('Goodbye!')
            process.exit()
        }
    });
};

actionSelection();