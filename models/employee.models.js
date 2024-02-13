module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('Employees', {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    departmentId: {type: Sequelize.INTEGER}
  },{
    timestamps: true,
});

  return Employee;
};