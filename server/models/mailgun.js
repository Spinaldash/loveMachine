/* jshint quotmark: false */

'use strict';
let mailingEnabled = true;

let Mailgun = require('mailgun').Mailgun;
let mg = new Mailgun(process.env.MG_KEY);

let User = require('./user');

let adminSender = 'noreply@lonelyhearts.club';
let emailSubject = function(senderUsername) {
  return `Lonely Hearts Mail - ${senderUsername} has sent you a message!`;
};

let emailBody = function(senderUsername, receiverUsername, body) {
  return `From: ${senderUsername}
  To: ${receiverUsername}

  ${body}`;
};

let receiptSubject = 'Lonely Hearts Mail - Receipt for gift purchase';

let receiptBody = function(senderUsername, charge) {
  let body = `Thank you, ${senderUsername}, for your purchase!
  Charge Amount: $${charge.amount * 100}
  Charge Id: ${charge.id}

  Love,
  The Love Machine`;
  return body;
};

module.exports = {
  send: function(senderId, receiverId, body, cb) {
    if (mailingEnabled) {
      User.findById(senderId, (err, sender) => {
        User.findById(receiverId, (err, receiver) => {
          if(err) {
            cb(err);
          }else{
            mg.sendText(adminSender, receiver.email, emailSubject(sender.username), emailBody(sender.username, receiver.username, body), cb);
          }
        });
      });
    }
  },
  receipt: function(senderId, charge, cb) {
    if (mailingEnabled) {
      User.findById(senderId, (err, sender) => {
        if(err) {
          cb(err);
        }else{
          mg.sendText(adminSender, sender.email, receiptSubject, receiptBody(sender.username, charge), cb);
        }
      });
    }
  }
};
