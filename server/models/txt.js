'use strict';

let twilio = require('twilio')(process.env.TWILIO_PUBLIC, process.env.TWILIO_SECRET);
let User = require('./user');

let adminPhone = process.env.TWILIO_PHONE;

let textBody = function(senderUsername, body) {
  return `LHCTEXT from ${senderUsername}: ${body}`;
};

module.exports = {
  send: function(senderId, receiverId, body, cb){
    User.findById(senderId, function(err, sender) {
      User.findById(receiverId, function(err, receiver) {
        twilio.messages.create({
          to: receiver.phone,
          from: adminPhone,
          body: textBody(sender.username, body)
        },cb);
      });
    });
  }
};
