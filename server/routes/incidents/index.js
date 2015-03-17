'use strict';

let Incident = require('../../models/incident');


module.exports = {
  handler: function(request, reply){
    let currentUser = request.auth.credentials._id;
    Incident.find({$or: [{sender: currentUser}, {receiver: currentUser}]}).populate('sender receiver').exec(function(err, incidents) {
      if(err || !incidents.length) {
        reply().code(400);
      }else{
        reply({incidents:incidents});
      }
    });
  }
};
