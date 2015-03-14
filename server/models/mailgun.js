/* jshint quotmark: false */

'use strict';
let mailingEnabled = true;

let Mailgun = require('mailgun').Mailgun;
let mg = new Mailgun(process.env.MG_KEY);

let User = require('./user');

let adminSender = 'noreply@lonelyhearts.club';
let emailSubject = (senderUsername) => {
  return `Lonely Hearts Mail - ${senderUsername} has sent you a message!`;
};

let emailBody = (senderUsername, receiverUsername, body) => {
  return `From: ${senderUsername}
  To: ${receiverUsername}

  ${body}`;
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
};
