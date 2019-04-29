const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  hkname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  img: {
    type: String
  },
  cost: {
    type: Number,
    min: 10,
    max: 200
  },
  count: {
    type: Number,
    min: 0,
    max: 20
  }
});

module.exports = mongoose.model("menu", menuSchema);
