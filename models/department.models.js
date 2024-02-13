module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define('Departments', {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
  },{
    timestamps: true,
  });

  return Department;
};