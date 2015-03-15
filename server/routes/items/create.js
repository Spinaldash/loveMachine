'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply){
    var item = new Item(request.payload);
    item.save(function() {
      reply();
    });
  }
};
