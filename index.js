
const db = require("./db");
const inquirer = require("inquirer");

//this allsows the user to make a selection in the command line for the action they would like to do
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select your choice from the list",
        name: "action",
        choices: [
          "View Departments",
          "Add a Department",
          "View Positions",
          "Add a Position",
          "View Employees",
          "Add an Employee",
          "Update an Employee",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      const { action } = response;
      switch (action) {
        case "View Departments":
          getDepartments();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "View Positions":
          viewPosition();
          break;

        case "Add a position":
          addPosition();
          break;

        case "View Employees":
          getEmployees();
          break;

        case "Add an employee":
          createEmployee();
          break;

        case "Update an Employee":
          updateEmployee();
          break;

        case "Quit":
          quit();
          break;

        default:
          console.log("Error: Invalid choice");
          break;
      }
    });
};

//this allows the user to retrieve departments that are already stored in the database
async function getDepartments() {
  try {
    const [rows] = await db.getDepartments();
    let depts = rows;
    console.table(depts);
    init();
  } catch (error) {
    console.error("Error retrieving Departments: " + error.message);
  }
}


async function viewPosition() {
  try {
    const [rows] = await db.viewPosition();
    let position = rows;
    console.table(position);
    init();
  } catch (error) {
    console.error("Error retrieving positions:" + error.message);
  }
}

//This allows the user to create (add) a department to the data base
async function addDepartment() {
  const response = await inquirer.prompt([
    {
      name: "name",
      message: "What is the department name?",
    },
  ]);
  const { name } = response;
  try {
    await db.addDepartments({ name: name }); 
    console.log(`Added ${name} to the database`);
    init();
  } catch (error) {
    console.error("Error adding department: " + error.message);
    init();
  }
}

//This allows the user to retrieve employees that are already saved in the database
async function getEmployees() {
  try {
    const [rows] = await db.getEmployees();
    let employee = rows;
    console.table(employee);
    init();
  } catch (error) {
    console.error("Error retrieving Employees: " + error.message);
  }
}

//this allows the user to create (add) a new position to the data base
function addPosition() {
  db.getDepartments().then(([rows]) => {
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "department_id",
          message: "Which department does the position belong to?",
          choices: departmentChoices,
        },
        {
          name: "title",
          message: "What is the name of the position?",
        },
        {
          name: "salary",
          message: "What is the salary of the position?",
        },
    
      ])
      .then((position) => {
        if (!position.department_id  || !position.title || !position.salary) {
          console.error("Error: Please enter allrewuired fields for position.");
          init();
          return;
        }
        db.addposition(position)
          .then(() => console.log(`Added ${position.title} to the database`))
          .then(() => init())
          .catch((error) => {
            console.error("Error adding position: " + error.message);
            init();
          });
      });
  });
}

//this allows the user to exit the application
function quit() {
  console.log("Leaving the application, goodbye.");
  process.exit();
}

module.exports = {
  addDepartment,
};

init();
