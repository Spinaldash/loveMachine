/* jshint expr:true */

'use strict';

require('babel/register');

var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var User = require('../../server/models/user');
var token;

describe('Users Controller', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      User.findOne({facebookId: 123}, function(err, user){
        token = user.token();
        done();
      });
    });
  });
  describe('get /users', function() {
    it('should return compatible list of users', function(done) {
      var options = {
        method: 'get',
        url: '/users',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.result.users[0].username).to.equal('Miss');
        done();
      });
    });
  });
  describe('delete photo', function() {
    it('should delete a photo', function(done) {
      var options = {
        method: 'delete',
        url: '/users/000000000000000000000001/photo',
        payload: {
          photoName:'test.jpg'
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        User.findById('000000000000000000000001', function(err, user) {
          expect(response.statusCode).to.equal(200);
          expect(user.photos.length).to.not.be.ok;
          done();
        });
      });
    });
  });
});
