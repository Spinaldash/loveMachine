'use strict';

let mongoose = require('mongoose');

let proposalSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  sender: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  receiver: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  isPending: {type: Boolean, default: true, required: true},
  isAccepted: Boolean,
  createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Proposal', proposalSchema);
