'use strict';

let Proposal = require('../../models/proposal');
let Incident = require('../../models/incident');
let mailgun = require('../../models/mailgun');
let Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      description: Joi.string().required()
    }
  },
  handler: function(request, reply){
     let proposal = new Proposal({
       title: request.payload.title,
       description: request.payload.description,
       sender: request.auth.credentials._id,
       receiver: request.params.userId
     });
     let incident = new Incident({
       type: 'proposal',
       sender: request.payload.senderId,
       receiver: request.payload.receiverId
     });
     mailgun.proposal(proposal._id);
     incident.save(function() {
       proposal.save(function() {
         reply({proposal:proposal});
       });
     });
   }
};
