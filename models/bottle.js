const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const bottleSchema = new Schema({
  senderId: {
    type: ObjectId, 
    ref: 'User',
  },
  sender: String,
  content: String,
  thread: Number,
  date: {
    type: Date,
    default: Date.now
  },
  isFirstMessage : {
    type: Boolean,
    default: false,
  }
});

const Bottle = mongoose.model('Bottle', bottleSchema);

module.exports = Bottle;