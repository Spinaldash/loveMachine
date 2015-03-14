// /* jshint expr:true */

// 'use strict';

// require('babel/register');

// var expect = require('chai').expect;
// var Lab = require('lab');
// var lab = exports.lab = Lab.script();
// var describe = lab.describe;
// var it = lab.it;
// var beforeEach = lab.beforeEach;
// var server = require('../../server/index');
// var cp = require('child_process');
// var dbname = process.env.MONGO_URL.split('/')[3];

// describe('Users Controller', function() {
//   beforeEach(function(done) {
//     cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
//       var options = {method:'post', url:'/login', payload:{email:'bob@aol.com', password:'123'}};
//       server.inject(options, function(response){
//         done();
//       });
//     });
//   });
// });
