const express = require('express');
const Bottle = require('../models/bottle');
// const User = require('../models/user');
const protect = require('../middlewares/protectedView')

const router = express.Router();

router.get( '/', protect.notLoggedIn, (req, res, next) => {
  res.render('bottles/bottles')
});

router.get('/new', protect.notLoggedIn, (req, res, next) => {
  res.render('bottles/new')
});

router.post('/' , protect.notLoggedIn, (req, res, next) => {
  const { content } = req.body;
  const { username: { sender } } = req.session.currentUser;  
  const senderId = req.session.currentUser._id;
  console.log('el new thread actual es', res.locals.currentThread)
  const thread = res.locals.currentThread + 1;

  Bottle.create( {senderId, sender, content, thread})
    .then( ()=> {
      res.redirect('/bottles');
    })
    .catch(next);
})

router.get('/answer', protect.notLoggedIn, (req, res, next) => {
  const thread = res.locals.currentThread;
  const randomThread = Math.floor(Math.random() * thread)+1;
  Bottle.find({thread:randomThread}).sort({date: -1})
    .then((bottles) => {
      res.render('bottles/answer', { bottles });
    })
    .catch(next)
});


router.post('/answer', protect.notLoggedIn, (req, res, next) => {
  const {currentThread} = req.body;
  const { content } = req.body;
  const { username: { sender } } = req.session.currentUser;  
  const senderId = req.session.currentUser._id;
  console.log('el answer thread actual es', res.locals.currentThread)
  const thread = currentThread;

  Bottle.create( {senderId, sender, content, thread})
    .then( ()=> {
      res.redirect('/bottles');
    })
    .catch(next);
})


module.exports = router;