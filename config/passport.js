
const bcrypt = require('bcryptjs');
const { Employee } = require('../models');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
        console.log("username",username)
      // Match user
      Employee.findOne({where: { email: username }})
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Employee.findByPk(id).then((user) => {
      done(null, user);
    });
  });
  
};