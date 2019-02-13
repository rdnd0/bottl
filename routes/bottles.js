const express = require('express');
const Bottle = require('../models/bottle');
// const User = require('../models/user');
const protect = require('../middlewares/protectedView')

const router = express.Router();
require("dotenv").config();

router.get('/', protect.notLoggedIn, (req, res, next) => {
  res.render('bottles/bottles')
});

router.get('/new', protect.notLoggedIn, (req, res, next) => {
  res.render('bottles/new')
});

router.post('/', protect.notLoggedIn, (req, res, next) => {
  const {
    content
  } = req.body;
  const sender = req.session.currentUser.username;
  const senderId = req.session.currentUser._id;
  console.log('el user actual es', sender)
  const thread = res.locals.currentThread + 1;
  const isFirstMessage = true;

  if({content:""}){
    req.flash('error', 'please enter some text');
    res.redirect('/bottles/new');

  } else { 

  Bottle.create({
      senderId,
      sender,
      content,
      thread,
      isFirstMessage
    })
    .then(() => {
      req.flash('success', 'that bottle is now sailing away!');
      res.redirect('/bottles');
    })
    .catch(next);
  }
})

router.get('/answer', protect.notLoggedIn, (req, res, next) => {
  const thread = res.locals.currentThread;
  const randomThread = Math.floor(Math.random() * thread) + 1;
  Bottle.find({
      thread: randomThread
    }).sort({
      date: -1
    })
    .then((bottles) => {
      res.render('bottles/answer', {
        bottles
      });
    })
    .catch(next)
});


router.post('/answer', protect.notLoggedIn, (req, res, next) => {
  const {
    currentThread
  } = req.body;
  const {
    content
  } = req.body;
  const sender = req.session.currentUser.username;
  const senderId = req.session.currentUser._id;
  const thread = currentThread;

  if({content:""}){
    req.flash('error', 'please enter some text');
    res.redirect('/bottles/answer');

  } else { 

  Bottle.create({
      senderId,
      sender,
      content,
      thread
    })
    .then(() => {
      req.flash('success', 'you answered that bottle, right on!');
      res.redirect('/bottles');
    })
    .catch(next);

  }
})

router.get('/history', protect.notLoggedIn, (req, res, next) => {
  const senderId = req.session.currentUser._id;

  Bottle.find({
      isFirstMessage: true,
      senderId: senderId
    }).sort({
      date: -1
    })
    .then((bottles) => {
      res.render('bottles/history', {
        bottles
      });
    })
    .catch(next)
});

router.get('/history/:id', protect.notLoggedIn, (req, res, next) => {
      const {
        id
      } = req.params;
      console.log(id);
      Bottle.find({
          thread: id
        }).sort({
          date: -1
        })
        .then((bottles) => {
            res.render('bottles/detail' , { bottles });
            })
          .catch(next)
        });


  router.get('/map', protect.notLoggedIn, (req, res, next) => {
    console.log("asdasdasd");
      res.render("bottles/map" , {token: process.env.MAPBOX});

  })
    module.exports = router;