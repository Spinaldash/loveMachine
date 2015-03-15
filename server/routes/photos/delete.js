'use strict';

let User = require('../../models/user');
var _ = require('lodash');

module.exports = {
  handler: function(request, reply) {
    User.findById(request.params.userId, function(err, user) {
      if(_.indexOf(user.photos, request.payload.photoName) === -1) {
        reply().code(400);
      }else{
        _.pull(user.photos, request.payload.photoName);
        User.findByIdAndUpdate(request.params.userId, user, function(err) {
          reply().code(err ? 400 : 200);
        });
      }
    });
  }
};

//     User.findById(request.params.userId, function(err, user) {
//       if(_.indexOf(user.photos, request.payload.photoName) === -1) {
//         reply().code(400);
//       }else{
//         user.photos = _.pull(user.photos, request.payload.photoName);
//         user.save(function(err){
//           console.log('err', err);
//           console.log('user:', user);

//           // User.findById(request.params.userId, function(err, user2) {
//             // console.log('user2:', user2);
//             reply();
//           });
//         // });
//       }
//     });
//   }
// };

