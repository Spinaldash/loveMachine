'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply){
    console.log('CREDENTIALS', request.auth.credentials);
    if(!request.auth.credentials.admin){
      reply().code(401);
    }else{
      console.log('PAYLOAD', request.payload);
      var item = new Item(request.payload);
      item.save(function() {
        reply();
      });
    }
  }
};
