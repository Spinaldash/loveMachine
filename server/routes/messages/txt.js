'use strict';

let Txt = require('../../models/txt');
let Incident = require('../../models/incident');

module.exports = {
  handler: function(request, reply){
    Txt.send(request.payload.senderId, request.payload.receiverId, request.payload.body, function(err, message){
      if(err) {
        reply(message).code(400);
      }else{
        let incident = new Incident({
          type: 'text',
          sender: request.payload.senderId,
          receiver: request.payload.receiverId
        });
        incident.save(function() {
          reply(message);
        });
      }
    });
  }
};
