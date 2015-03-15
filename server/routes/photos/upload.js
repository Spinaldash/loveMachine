'use strict';

let User = require('../../models/user');

module.exports = {
  payload:{
    maxBytes: 16777216, // 2^24 ; 16MB
    output:'stream',
    parse: true,
    timeout: 60000
  },
  handler: function(request, reply){
    User.findById(request.params.userId, function(err, user) {
      user.upload(request.payload.file, request.payload.file.hapi.filename, function(err){
        console.log('ERR:', err);
        reply().code(err ? 400 : 200);
      });
    });
  }
};
