'use strict';

let mailgun = require('../../models/mailgun');

module.exports = {
  handler: function(request, reply) {
    mailgun.send(request.payload.senderId, request.payload.receiverId, request.payload.body, (err) => {
      if(err) {
        reply(err).code(400);
      }else{
        reply();
      }
    });
  }
};
