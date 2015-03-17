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
var Item = require('../../server/models/item');
var token;

describe('Gifts Controller', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });
  describe('post /items/new', function() {
    it('should add an item to the store - admin privilages', function(done) {
      User.findOne({facebookId: 123}, function(err, user){
        token = user.token();
        var options = {
          method: 'post',
          url: '/items/new',
          payload: {
            name: 'New Item',
            photo: 'photo.jpg',
            price: '500'
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        };
        server.inject(options, function(response) {
          Item.findOne({name: 'New Item'}, function(err, item) {
            expect(item).to.be.ok;
            expect(item.price).to.equal(500);
            expect(response.statusCode).to.equal(200);
            done();
          });
        });
      });
    });
    it('should NOT add an item to the store - no admin privilages', function(done) {
      User.findOne({facebookId: 321}, function(err, user){
        token = user.token();
        var options = {
          method: 'post',
          url: '/items/new',
          payload: {
            name: 'New Item',
            photo: 'photo.jpg',
            price: '500'
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.equal(401);
          done();
        });
      });
    });
  });
});
