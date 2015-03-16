'use strict';

let mongoose = require('mongoose');
let stripe = require('stripe')(process.env.STRIPE_KEY);
let User = require('./user');

let itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String, required: true},
  price: {type: Number, required: true},
  createdAt: {type: Date, default: Date.now, required: true}
});

itemSchema.methods.purchase = function(token, cb){
  stripe.charges.create({
    amount: Math.ceil(this.price * 100),
    currency: 'usd',
    source: token,
    description: this.name
  }, cb);
};

module.exports = mongoose.model('Item', itemSchema);
