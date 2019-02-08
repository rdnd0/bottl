const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protectedView');

/* GET home page. */
router.get('/', protect.loggedIn, (req, res, next) => {
  res.render('index');
});

module.exports = router;
