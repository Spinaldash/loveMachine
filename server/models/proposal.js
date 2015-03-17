'use strict';

let mongoose = require('mongoose');

let proposalSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  sender: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  receiver: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  isPending: {type: Boolean, default: true, required: true},
  isAccepted: Boolean,
  createdAt: {type: Date, default: Date.now, required: true},
  proposedDate: Date
});

proposalSchema.methods.accept = function(cb) {
  this.isPending = false;
  this.isAccepted = true;
  this.save(cb);
};

proposalSchema.methods.decline = function(cb) {
  this.isPending = this.isAccepted = false;
  this.save(cb);
};

module.exports = mongoose.model('Proposal', proposalSchema);
