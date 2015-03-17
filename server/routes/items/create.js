'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply){
    if(!request.auth.credentials.admin){
      reply().code(401);
    }else{
      var item = new Item(request.payload);
      item.save(function() {
        reply();
      });
    }
  }
};
