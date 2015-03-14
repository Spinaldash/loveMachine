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

describe('Gifts Controller', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      User.findOne({facebookId: 123}, function(err, user){
        token = user.token();
        done();
      });
    });
  });
  describe('get /gifts', function() {
    it('should return all gifts in the store', function(done) {
      var options = {
        method: 'get',
        url: '/gifts',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.result.gifts.length).to.equal(1);
        expect(response.result.gifts[0].name).to.equal('Roses');
        expect(response.result.gifts[0].sender).to.not.be.ok;
        done();
      });
    });
    it('should NOT return any gifts in the store - bad token', function(done) {
      var options = {
        method: 'get',
        url: '/gifts',
        headers: {
          Authorization: 'Beerer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        expect(response.result.error).to.equal('Unauthorized');
        done();
      });
    });
  });
  describe('get /gifts/{giftId}', function() {
    it('should return a single gift', function(done) {
      var options = {
        method: 'get',
        url: '/gifts/000000000000000000000d02',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.result.gift).to.be.ok;
        expect(response.result.gift.name).to.equal('Chocolates');
        done();
      });
    });
    it('should NOT return a gift - bad token', function(done) {
      var options = {
        method: 'get',
        url: '/gifts/000000000000000000000d02',
        headers: {
          Authorization: 'Bearer ' + token + '!'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        expect(response.result.error).to.equal('Unauthorized');
        done();
      });
    });
    it('should NOT return a gift - bad giftId', function(done) {
      var options = {
        method: 'get',
        url: '/gifts/0000000000000f0000000d02',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        expect(response.result).to.not.be.ok;
        done();
      });
    });
  });
  describe('get /users/{userId}/gifts', function() {
    it('should return the gifts that have been given to a user', function(done) {
      var options = {
        method: 'get',
        url: '/users/000000000000000000000002/gifts',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.result.gifts).to.be.ok;
        expect(response.result.gifts[0].name).to.equal('Chocolates');
        done();
      });
    });
    it('should NOT return gifts - bad userId', function(done) {
      var options = {
        method: 'get',
        url: '/users/00000000000d000000000002/gifts',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        expect(response.result).to.not.be.ok;
        done();
      });
    });
    it('should NOT return gifts - bad token', function(done) {
      var options = {
        method: 'get',
        url: '/users/000000000000000000000002/gifts',
        headers: {
          Authorization: 'Bearer ' + token + '!'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        expect(response.result.error).to.equal('Unauthorized');
        done();
      });
    });
  });
});

