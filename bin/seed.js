const mongoose = require('mongoose');
const User = require('../models/user');

require('dotenv').config();

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const seed = [];

User.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));
