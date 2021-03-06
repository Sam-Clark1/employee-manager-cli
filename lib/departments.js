const db = require('../db/connection');
const inquirer = require('inquirer');

const getAllDepartments = () => {
    const sql = 'SELECT * from departments;'
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

const addDepartment = async () => {
    await inquirer.prompt([
        {
            type: 'text',
            name: 'depName',
            message: 'Please enter new department name.',
            validate: depInput => {
                if (depInput){
                    return true;
                } else {
                    console.log('Please enter a department name.');
                    return false;
                }
            }
        }
    ])
    .then(({depName}) => {
    const sql = 'INSERT INTO departments (name) VALUES (?);'
    return new Promise((res, rej) => {
        db.query(sql, depName, (err, rows) => {
            if (err) {
                console.log('Error occured')
                rej(err)
            }
            res(rows)
        });
    });
    });
};

const addInitialDepartment = async () => {
    await inquirer.prompt([
        {
            type: 'text',
            name: 'depName',
            message: 'Please enter new department name for first employee that will be added.',
            validate: depInput => {
                if (depInput){
                    return true;
                } else {
                    console.log('Please enter a department name.');
                    return false;
                }
            }
        }
    ])
    .then(({depName}) => {
    const sql = 'INSERT INTO departments (name) VALUES (?);'
    return new Promise((res, rej) => {
        db.query(sql, depName, (err, rows) => {
            if (err) {
                console.log('Error occured')
                rej(err)
            }
            res(rows)
        });
    });
    });
};

module.exports = {getAllDepartments, addDepartment, addInitialDepartment}