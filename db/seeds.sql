INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Lead Software Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 195000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, null),
    ('Jane', 'Doe', 1, null),
    ('Jack', 'London', 2, null),
    ('Robert', 'Bruce', 3, 3),
    ('Peter', 'Greenaway', 4, null),
    ('Derek', 'Jarman', 5, 5),
    ('Paolo', 'Pasolini', 6, null),
    ('Sandy', 'Powell', 7, 7);
