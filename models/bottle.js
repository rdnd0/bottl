const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const bottleSchema = new Schema({
  sender: {
    type: ObjectId, 
    ref: 'User',
  },
  content: String,
  thread: Number,
  date: {type: Date,
  default: Date.now()},

});

const Bottle = mongoose.model('Bottle', bottleSchema);

module.exports = Bottle;