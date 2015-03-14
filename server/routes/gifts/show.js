'use strict';

let Gift = require('../../models/gift');

module.exports = {
  handler: function(request, reply){
    Gift.findById(request.params.giftId, (err, gift)=>{
      if(err || !gift) {
        reply().code(400);
      }else{
        reply({gift:gift});
      }
    });
  }
};