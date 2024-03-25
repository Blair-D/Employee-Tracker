//Requires you to install mysql
const mysql = require("mysql");
const inquirer = require("inquirer");
//defines the database connection variable with login info
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "C0d1ng!",
  database: "employees_db",
});
//If there is an error then it will catch error and throw it
dbConn.connect(function (err) {
  if (err) throw err;
});

module.exports = dbConn;
