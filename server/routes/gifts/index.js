'use strict';

let Gift = require('../../models/gift');

module.exports = {
  handler: function(request, reply){
    Gift.find({dateGiven: null}).populate('sender receiver').exec((err, gifts)=>{
      if(err){reply().code(400);}
      reply({gifts:gifts});
    });
  }
};