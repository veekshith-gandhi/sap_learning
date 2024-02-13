const Sequelize = require('sequelize'); 
const passport = require('passport'); 
require("dotenv").config()

const connectionString = process.env.ELEPHANTSQL_URL;

//creating new instance of Sequelize object
const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    protocol: 'postgres',
    //This is telling the PG driver to always try to establish a secure SSL connection with the PostgreSQL server.
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    logging: false   
});


module.exports = sequelize