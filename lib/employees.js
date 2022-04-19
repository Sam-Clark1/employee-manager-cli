const inquirer = require('inquirer');
const db = require('../db/connection');
const { getAllDepartments } = require('./departments');
const { getAllRoles } = require('./roles');

const getAllEmployees = () => {
    const sql = 
    `SELECT employees.id, employees.first_name, employees.last_name,
    roles.title AS role_title, 
    roles.salary, 
    departments.name AS department_name,
    CONCAT(manager.first_name,' ', manager.last_name) AS manager 
    FROM employees
       LEFT JOIN roles ON employees.role_id = roles.id
       LEFT JOIN departments ON departments.id = roles.department_id
       LEFT JOIN employees manager ON employees.manager_id = manager.id;`

    return new Promise((res, rej) => {
        db.query(sql, (err, rows) => {
            if (err) {
                rej(err);
            } 

            if (rows.length === 0) {
                res({Result:'No Employees in Database'})
            } else {
                res(rows)
            }
        });
    });
};

const addEmployee = async () => {
    await inquirer.prompt([
        {
            type:'text',
            name: 'first_name',
            message: "Please enter employee's first name.",
            validate: firstNameInput => {
                if (firstNameInput){
                    return true;
                } else {
                    console.log("Please enter employee's first name.");
                    return false;
                }
            }
        },
        {
            type:'text',
            name: 'last_name',
            message: "Please enter employee's last name.",
            validate: lastNameInput => {
                if (lastNameInput){
                    return true;
                } else {
                    console.log("Please enter employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Please select the role for this employee.',
            choices: await getAllRoles().then(res => 
                res.map(roles => {
                return `${roles.id}. ${roles.title}`
                    }
                )
            )
        },
        {
            type: 'confirm',
            name: 'managerConfirm',
            message: 'Does this employee have a manager?'
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Please select the manager for this employee.',
            choices: await getAllEmployees().then(res => 
                res.map(employee => {
                return `${employee.id}. ${employee.first_name} ${employee.last_name}`
                    }
                )
            ),
            when: ({ managerConfirm }) => managerConfirm
        }
    ])
    .then(data => {
        const { first_name, last_name, roleId, managerId } = data;
        const role_id = roleId.split('.')[0];
        let manager_id; 
        if (managerId) {
            manager_id = managerId.split('.')[0];
        } else {
            manager_id = null;
        }

        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);'

        return new Promise((res, rej) => {
            db.query(sql, [first_name, last_name, role_id, manager_id], (err, rows) => {
                if (err) {
                    console.log('Error occured')
                    rej(err)
                }
                res(rows)
            });
        });
    });
};

const editEmployee = async () => {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please select an employee you would like to edit.',
            choices: await getAllEmployees().then(res => 
                res.map(employee => {
                return `${employee.id}. ${employee.first_name} ${employee.last_name}`
                    }
                )
            )
        },
        {
            type:'text',
            name: 'first_name',
            message: "Please enter employee's first name.",
            validate: firstNameInput => {
                if (firstNameInput){
                    return true;
                } else {
                    console.log("Please enter employee's first name.");
                    return false;
                }
            }
        },
        {
            type:'text',
            name: 'last_name',
            message: "Please enter employee's last name.",
            validate: lastNameInput => {
                if (lastNameInput){
                    return true;
                } else {
                    console.log("Please enter employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Please select the role for this employee.',
            choices: await getAllRoles().then(res => 
                res.map(roles => {
                return `${roles.id}. ${roles.title}`
                    }
                )
            )
        },
        {
            type: 'confirm',
            name: 'managerConfirm',
            message: 'Does this employee have a manager?'
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Please select the manager for this employee.',
            choices: await getAllEmployees().then(res => 
                res.map(employee => {
                return `${employee.id}. ${employee.first_name} ${employee.last_name}`
                    }
                )
            ), 
            when: ({ managerConfirm }) => managerConfirm,
        }
    ])
    .then(data => {
        const { employeeId, first_name, last_name, roleId, managerId } = data;
        const employee_id = employeeId.split('.')[0];
        const role_id = roleId.split('.')[0];
        let manager_id; 
        if (managerId) {
            manager_id = managerId.split('.')[0];
        } else {
            manager_id = null;
        }
        
        const sql = 'UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?;'

        return new Promise((res, rej) => {
            db.query(sql, [first_name, last_name, role_id, manager_id, employee_id], (err, rows) => {
                if (err) {
                    console.log('Error occured')
                    rej(err)
                }
                res(rows)
            });
        });
    });
};

module.exports = { getAllEmployees, addEmployee, editEmployee }