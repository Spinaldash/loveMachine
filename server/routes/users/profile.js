'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
    User.findById(request.params.userId, (err, user) => {
      if(err){reply().code(400);}
      reply({user:user});
    });
  }
};
