'use strict';

let Gift = require('../../models/gift');

module.exports = {
  handler: function(request, reply){
    Gift.find({receiver: request.params.userId}, (err, gifts)=>{
      if(err || gifts.length === 0){
        reply().code(400);
      }else{
        reply({gifts:gifts});
      }
    });
  }
};
