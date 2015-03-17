'use strict';

let mailgun = require('../../models/mailgun');
let Incident = require('../../models/incident');

module.exports = {
  handler: function(request, reply) {
    mailgun.send(request.auth.credentials._id, request.payload.receiverId, request.payload.body, (err) => {
      if(err) {
        reply(err).code(400);
      }else{
        let incident = new Incident({
          type: 'email',
          sender: request.payload.senderId,
          receiver: request.payload.receiverId
        });
        incident.save(function() {
          reply();
        });
      }
    });
  }
};
