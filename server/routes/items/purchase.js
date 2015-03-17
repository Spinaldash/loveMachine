'use strict';

var Item = require('../../models/item');
var Gift = require('../../models/gift');
var mailgun = require('../../models/mailgun');

module.exports = {
  handler: function(request, reply){
    console.log(request.payload.token);
    Item.findById(request.params.itemId, (err, item) => {
      item.purchase(request.payload.token, function(err, charge) {
        if(err) {
          console.log(err);
          reply().code(400);
        }else{
          let gift = new Gift();
          gift.name = item.name;
          gift.photo = item.photo;
          gift.sender = request.payload.senderId;
          gift.receiver = request.payload.receiverId;
          gift.save(function(){
            mailgun.receipt(request.payload.senderId, charge, function(err, msg){
            if(err){console.log('Error', err);}
            reply(gift);
            });
          });
        }
      });
    });
  }
};
