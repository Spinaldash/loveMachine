'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
    // let params = {
    //   gender:request.auth.credentials.lookingFor
    // };
    User.find({}, (err, users) => {
      if(err){reply().code(400);}
      reply({users:users});
    });
  }
};
