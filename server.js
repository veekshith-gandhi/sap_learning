const express  = require('express');
const sequelize = require('./db');
const employeeRouter = require("./routes/employee.route")
const departmentRouter = require("./routes/department.route")
require("dotenv").config();

const Port =  process.env.PORT || 8000
const app = express()

//Parse incoming request with json payload
app.use(express.json())

app.use("/employees",employeeRouter)
app.use("/departments",departmentRouter)

//Establishes a connection to a database using Sequelize
//sequelize.authenticate() is used to verify that the connection to the database is working correctly
//by acquiring a connection from the pool and running a simple query (SELECT 1+1) to verify the connection.

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
app.listen(Port,()=>{
    console.log(`Listeing to PORT ${Port}`)
})









/* Passport Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
            return done(null, user)
          } else {
            return done(null, false, {message: 'Password is incorrect'})
          }
        });
      })
      .catch(err => done(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
*/