'use strict';

let Proposal = require('../../models/proposal');

module.exports = {
  handler: function(request, reply) {
    let currentUser = request.auth.credentials._id;
    let params = {
      $and: [
        {$or: [
          {sender: currentUser},
          {receiver: currentUser}
        ]},
        {pending: true}
      ]
    };
    Proposal.find(params, function(err, proposals) {
      if(err || !proposals) {
        reply().code(400);
      }else{
        reply({proposals:proposals});
      }
    });
  }
};
