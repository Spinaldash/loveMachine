'use strict';

let mongoose = require('mongoose');

let giftSchema = mongoose.Schema({
  name: String,
  photo: String,
  sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
  receiver: {type: mongoose.Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now, required: true}
});

let Gift = mongoose.model('Gift', giftSchema);
module.exports = Gift;
