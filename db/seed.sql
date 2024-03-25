-- Inserting data into the department table
INSERT INTO department (name)
VALUES ('Management'),
       ('Legal'),
       ('Accounting'),
       ('Human Resource'),
       ('Customer Service'),
       ('Engineering'),
       ('Sales');

-- Inserting data into the role table
INSERT INTO position (title, salary, department_id)
VALUES ('CEO', 108000, 1),
       ('Lawyer', 165000, 2),
       ('Book Keeper', 35000, 3),
       ('Senior Engineer', 65000, 6),
       ('Human Resources Assistant', 53000, 4),
       ('Customer Service Rep', 55000, 5),
       ('Junior Engineer', 55000, 6),
       ('Sales Associate', 47000, 7);   

-- Inserting data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kersha', 'Smith', 2, NULL),
       ('Jaqueline', 'Rodriguez', 3, NULL),
       ('Alejandro', 'Nunez', 4, NULL),
       ('Bianca', 'Jackson', 5, NULL),
       ('Devan', 'Digeronimo', 6, NULL),
       ('Bradley', 'Moore', 7, NULL),
       ('Jacob', 'Klein', 8, NULL),
       ('Blake', 'Dowling', 1, 1);