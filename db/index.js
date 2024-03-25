//This requires the dbConc file
const dbConn = require("./dbConc");

class empManager {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getDepartments() {
    return this.dbConn
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  addDepartments(department) {
    return this.dbConn
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  viewPosition() {
    return this.dbConn
      .promise()
      .query(
        "SELECT position.id, position.title, department.name AS department, position.salary FROM position LEFT JOIN department on position.department_id = department.id;"
        );
  }

  addPosition(position) {
    return this.dbConn.promise().query("INSERT INTO position SET ?", position);
  }

  getEmployees() {
    return this.dbConn
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, position.title, department.name AS department, position.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN position on employee.position_id = position.id LEFT JOIN department on position.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
  
  updateEmployee(employee) {
    return this.dbConn.promise().query("INSERT INTO employee SET ?", employee);
  } 
 
  addEmployee(employee) {
    return this.dbConn
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  
}

module.exports = new empManager(dbConn);
