'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply){
    Item.find({}, (err, items) => {
      reply({items:items}).code(err ? 400 : 200);
    });
  }
};
