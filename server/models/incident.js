'use strict';

let mongoose = require('mongoose');

let incidentSchema = mongoose.Schema({
   type: {type: String, required: true},
   sender: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
   receiver: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
   createdAt: {type: Date, default: Date.now, required: true}
});

let Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident;
