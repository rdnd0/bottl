const express = require('express');
const Bottle = require('../models/bottle');
const User = require('../models/user');

const router = express.Router();

router.get( '/', (req, res, next) => {
  res.render('bottles/bottles')
});

router.get('/new', (req, res, next) => {
  res.render('bottles/new')
});

router.post('/' , (req,res,next) => {
  const { message } = req.body;
  const username = req.session.currentUser.username;

  console.log(message);
  console.log(username);


})

router.get('/answer', (req, res, next) => {
  res.render('bottles/answer')
});

module.exports = router;