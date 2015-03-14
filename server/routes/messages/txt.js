'use strict';

let Txt = require('../../models/txt');

module.exports = {
  handler: function(request, reply){
    Txt.send(request.payload.senderId, request.payload.receiverId, request.payload.body, function(err, message){
      if(err){reply(message).code(400);}
      reply(message);
    });
  }
};
