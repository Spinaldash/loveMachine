'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.facebook(request.payload, profile => {
      User.create(profile, (err, user) => {
        let token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
