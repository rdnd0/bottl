const express = require('express');
const Product = require('../models/bottle');
const Review = require('../models/user');

const router = express.Router();

router.get( '/', (req, res, next) => {
  res.render('bottles/bottles')
});

router.get('/new', (req, res, next) => {
  res.render('bottles/new')
});

router.get('/answer', (req, res, next) => {
  res.render('bottles/answer')
});

module.exports = router;