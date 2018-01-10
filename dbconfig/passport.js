// var LocalStrategy = require('passport-local').Strategy,
//   User = require('../models/user'),
//   functions = require('../utils');

// module.exports = (passport) => {

//   // passport.serializeUser((user, done) => {
//   //   done(null, user.id)
//   // })

//   // passport.deserializeUser((user, done) => {
//   //   User.findById(id, (err, user) => {
//   //     done(err, user);
//   //   })
//   // })

//   //Named Strategies, Passport Local

//   // passport.use('local-signup', new LocalStrategy({
//   //     usernameField: 'email',
//   //     passwordField: 'password',
//   //     passReqToCallback: true
//   //   },
//   //   (req, email, password, done) => {

//   //     process.nextTick(() => {

//   //       User.findOne({
//   //         'local.email': email
//   //       }, (err, user) => {

//   //         if (err) return done(err);
//   //         if (user) {
//   //           return done(null, false, console.log("That email is already taken"))
//   //         } else {
//   //           var newUser = new User();
//   //           newUser.local.email = email;
//   //           newUser.local.password = functions.hasher(password);
//   //           newUser.save((err) => {
//   //             if (err) throw err;
//   //             return done(null, newUser);
//   //           })
//   //         }
//   //       })
//   //     })

//   //   }));



// }

