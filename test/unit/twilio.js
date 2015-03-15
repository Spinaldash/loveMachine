// /* jshint expr:true */
//
// 'use strict';
//
// require('babel/register');
//
// var expect = require('chai').expect;
// var Lab = require('lab');
// var lab = exports.lab = Lab.script();
// var describe = lab.describe;
// var it = lab.it;
// var beforeEach = lab.beforeEach;
// require('../../server/index');
// var twilio = require ('../../server/models/txt');
//
// describe('Twilio', function() {
//   beforeEach(function(done) {
//     done();
//   });
//   describe('send text', function() {
//     var options = {adminPhone: '', receiver.phone: '' };
//     it('should send a text', function(done) {
//       twilio.send(options, function(err, user){
//         expect(err).to.not.be.ok;
//         done();
//       });
//     });
//   });
// };
