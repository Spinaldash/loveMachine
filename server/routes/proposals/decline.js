'use strict';

let Incident = require('../../models/incident');
let Proposal = require('../../models/proposal');

module.exports = {
  handler: function(request, reply){
    Proposal.findById(request.params.proposalId, function(err, proposal){
      if(err || !proposal) {
        reply().code(400);
      }else{
        proposal.decline(function(){
          let incident = new Incident({
            type: 'proposalDecline',
            sender: proposal.receiver,
            receiver: proposal.sender
          });
          incident.save(function() {
            reply();
          });
        });
      }
    });
  }
};
