'use strict';

let Incident = require('../../models/incident');
let User = require('../../models/user');

module.exports = {
  handler: function(request, reply) {
    User.findById(request.params.userId, function(err, receiver) {
      if(err || !receiver) {
        reply().code(400);
      }else{
        let incident = new Incident({
          type: 'wink',
          sender: request.auth.credentials._id,
          receiver: receiver._id
        });
        incident.save(function(){
          reply({incident:incident});
        });
      }
    });
  }
};
