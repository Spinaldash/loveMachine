'use strict';

let mongoose = require('mongoose');

let giftSchema = mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String, required: true},
  cost: {type: Number, required: true},
  sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
  receiver: {type: mongoose.Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now, required: true},
  dateGiven: Date
});

let Gift = mongoose.model('Gift', giftSchema);
module.exports = Gift;
