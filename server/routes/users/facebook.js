'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.facebook(request.payload, profile => {
      User.create(profile, (err, user) => {
        console.log('USER:', user);
        let token = user.token();
        console.log('TOKEN:', token);
        reply({token:token, user:user});
      });
    });
  }
};
