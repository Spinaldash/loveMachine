'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
    let params = {$and: [{$or: []}]};

    for(var pref in request.auth.credentials.lookingFor) {
      if(request.auth.credentials.lookingFor[pref]){
        params.$and[0].$or.push({gender:pref});
      }
    }
    
    let prefQuery = {};
    prefQuery['lookingFor.' + request.auth.credentials.gender] = true;
    params.$and.push(prefQuery);

    User.find(params, (err, users) => {
      if(err){reply().code(400);}
      reply({users:users});
    });
  }
};
