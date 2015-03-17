'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply) {
    User.findById(request.auth.credentials._id, function(err, user) {
      user.primary = request.params.index;
      user.save(function() {
        reply();
      });
    });
  }
};
