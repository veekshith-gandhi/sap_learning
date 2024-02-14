const bcrypt = require("bcryptjs")


module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('Employees', {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING,allowNull: false},
    password: {type: Sequelize.STRING,allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword); 
      }
    },
    departmentId: {type: Sequelize.INTEGER}
  },{
    timestamps: true,
});

  return Employee;
};