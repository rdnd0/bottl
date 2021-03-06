const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const Bottle = require('./models/bottle');

const notifications = require('./middlewares/notifications');

require('dotenv').config();

// Set up mongoose and Mongo connection

mongoose
  // .connect('mongodb://localhost/bottl', { useNewUrlParser: true })
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// Connect routers

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const bottlesRouter = require('./routes/bottles');

const app = express();

// Set up user session

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(flash());
app.use(notifications);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Set up current user middleware. Makes the currentUser available in every page
app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use((req, res, next) => {
  
  Bottle.find().sort({thread: -1}).limit(1)
    .then((message) => {
      if (message.length !== 0) { 
        res.locals.currentThread = message[0].thread;
      } else {
        res.locals.currentThread = 0;
        }
      next();
    })
    .catch((error) => {
      next(error);
    })
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express layouts setup
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set("layout extractScripts", true)
// Routes setup


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/bottles', bottlesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
