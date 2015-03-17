'use strict';

let Proposal = require('../../models/proposal');
let Incident = require('../../models/incident');
let mailgun = require('../../models/mailgun');
let Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      proposedDate: Joi.date().required()
    }
  },
  handler: function(request, reply){
     let proposal = new Proposal({
       title: request.payload.title,
       description: request.payload.description,
       sender: request.auth.credentials._id,
       receiver: request.params.userId,
       proposedDate: request.payload.proposedDate
     });
     let incident = new Incident({
       type: 'proposal',
       sender: request.auth.credentials._id,
       receiver: request.params.userId
     });
     incident.save(function() {
       proposal.save(function() {
         mailgun.proposal(proposal._id);
         reply({proposal:proposal});
       });
     });
   }
};
