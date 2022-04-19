const db = require('../db/connection');
const inquirer = require('inquirer');
const { getAllDepartments } = require('./departments')

const getAllRoles = () => {
    const sql = 'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;'
    return new Promise((res, rej) => {
        db.query(sql, (err, rows) => {
            if (err) {
                console.log('Error occured')
                rej(err)
            }
            res(rows)
        });
    });
};

const addRole = async () => {
    await inquirer.prompt([
        {
            type: 'text',
            name: 'title',
            message: 'Please enter new role title.',
            validate: roleTitleInput => {
                if (roleTitleInput){
                    return true;
                } else {
                    console.log('Please enter a role title.');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the roles salary.',
            validate: roleSalaryInput => {
                if (roleSalaryInput){
                    return true;
                } else {
                    console.log('Please enter a valid role salary.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'depId',
            message: 'Please select the department associated with this role.',
            choices: await getAllDepartments().then(res => 
                res.map(departments => {
                return `${departments.id}. ${departments.name}`;
                    }
                )
            )
        }
    ])
    .then(data => {
    const {title, salary, depId} = data;
    const department_id = depId.split('')[0];
    const sql = 'INSERT INTO roles (title, salary, department_id ) VALUES (?, ?, ?);'
    return new Promise((res, rej) => {
        db.query(sql, [title, salary, department_id], (err, rows) => {
            if (err) {
                console.log('Error occured')
                rej(err)
            }
            res(rows)
        });
    });
    });
};

module.exports = {getAllRoles, addRole}