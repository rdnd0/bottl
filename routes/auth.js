const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

// BCrypt to encrypt passwords
const bcryptSalt = 10;

// GET signup page

router.get('/signup', (req, res, next) => {
  const errorMessage = undefined;
  res.render('auth/signup', { errorMessage });
});

// POST signup/create new user

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('auth/signup', { errorMessage: 'empty fields' });
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          User.create({ username, password: hashPass })
            .then(() => {
              res.redirect('/');
            })
            .catch((error) => {
              next(error);
            });
        } else {
          res.render('auth/signup', { errorMessage: 'incorrect' });
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

// GET login page

router.get('/login', (req, res, next) => {
  const errorMessage = undefined;
  res.render('auth/login', { errorMessage });
});

// POST insert login data from user

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  // Control the user inserts values
  if (username === '' || password === '') {
    res.render('auth/signup', {
      errorMessage: 'Indicate a username and a password to sign up',
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: 'The username doesn\'t exist',
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/bottles');
      } else {
        res.render('auth/login', {
          errorMessage: 'Incorrect password',
        });
      }
    })
    .catch(next);
});

// GET logout from session

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    // cannot access session here
    res.redirect('/login');
  });
});

module.exports = router;
