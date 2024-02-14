const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Employee = require('./employee.models')(sequelize, Sequelize); 
const Department = require('./department.models')(sequelize, Sequelize); 

// create the association
//Employee belongs to single Department where as 1 Department can have multiple Employees
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Employee, { foreignKey: 'departmentId' });

module.exports = {
  Employee,
  Department,
  sequelize
};