const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const User = new Schema({
  unique_id: {
    type: String, required: true, index: { unique: true }
  },
  name: {
    type: String, required: true,
  },
  type: {
    type: String, required: true,
  },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true },
  state: { type: String, required: true, default: 'default' },
  url: { type: String, default: '' }
});

const user = mongoose.model("loginDetails", User);

module.exports = user;
