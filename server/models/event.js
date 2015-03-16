'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
  type: {type: String, required: true},
  sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
  receiver: {type: mongoose.Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Event', eventSchema);
