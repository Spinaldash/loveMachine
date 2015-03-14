'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
    User.findOneAndUpdate({_id: request.params.userId}, request.payload, (err, user) => {
      if(err){reply().code(400);}
      reply({user:user});
    });
  }
};
