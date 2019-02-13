const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');
const protect = require('../middlewares/protectedView')

// BCrypt to encrypt passwords
const bcryptSalt = 10;

// GET signup page

router.get('/signup', protect.loggedIn, (req, res, next) => {
  const errorMessage = undefined;
  res.render('auth/signup', {
    errorMessage
  });
});

// POST signup/create new user

router.post('/signup', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
 
  if (username === '' || password === '') {
    req.flash('error', 'dude, empty fields but why?');
    res.redirect('/signup');
  } else {
    return User.findOne({
        username
      })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          const newUser = new User( {
            username,
            password: hashPass
          })
          return newUser.save()
            .then((data) => {
              console.log(data)
              req.session.currentUser = data;
              req.flash('success', 'you are in sailor');
              res.redirect('/bottles');
            })
            .catch((error) => {
              next(error);
            });
        } else {
          req.flash('error', 'please try a different user name');
          res.redirect('/signup');
        }
      })
      .catch((error) => {
        next(error);
      });
  }
 });

// GET login page

router.get('/login', protect.loggedIn, (req, res, next) => {
  const errorMessage = undefined;
  res.render('auth/login', {
    errorMessage
  });
});

// POST insert login data from user

router.post('/login', (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  // Control the user inserts values
  if (username === '' || password === '') {
    req.flash('error', 'empty fields, you can do better than that');
    res.redirect('/login');
    return;
  }

  User.findOne({
      username
    })
    .then((user) => {
      if (!user) {
        req.flash('error', 'incorrect user name, you can do better than that');
        res.redirect('/login');
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        req.flash('success', 'you are in sailor');
        res.redirect('/bottles');
      } else {
        req.flash('error', 'incorrect username or password');
        res.redirect('/login');
      }
    })
    .catch(next);
});

// GET instructions

router.get('/instructions', (req, res, next) => {
  res.render('./instructions');
})

// GET logout from session

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    // cannot access session here
    res.redirect('/login');
  });
});

module.exports = router;