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
var Incident = require('../../server/models/incident');
var moment = require('moment');
var token;

describe('Incidents', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      User.findOne({facebookId: 123}, function(err, user){
        token = user.token();
        done();
      });
    });
  });
  describe('post /users/{userId}/wink', function() {
    it('should create a wink incident', function(done) {
      var options = {
        method: 'post',
        url: '/users/000000000000000000000002/wink',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        Incident.find({type:'wink'}, function(err, incidents) {
          expect(response.statusCode).to.equal(200);
          expect(moment(incidents[0].createdAt).unix()).to.be.within(moment().unix()-1,moment().unix()+1);
          expect(incidents[0].sender.toString()).to.equal('000000000000000000000001');
          expect(incidents[0].receiver.toString()).to.equal('000000000000000000000002');
          expect(incidents[0].type).to.equal('wink');
          done();
        });
      });
    });
    it('should NOT create a wink incident - bad user in params', function(done) {
      var options = {
        method: 'post',
        url: '/users/000000000000000000012345/wink',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it('should NOT create a wink incident - bad token', function(done) {
      var options = {
        method: 'post',
        url: '/users/000000000000000000000002/wink',
        headers: {
          Authorization: 'Beerer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });
  describe('get /incidents', function() {
    it('should return the incidents that involve the user', function(done) {
      var options = {
        method: 'get',
        url: '/incidents',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.result.incidents.length).to.equal(1);
        expect(response.result.incidents[0]._id.toString()).to.equal('a00000000000000000000001');
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT return incidents - bad token', function(done) {
      var options = {
        method: 'get',
        url: '/incidents',
        headers: {
          Authorization: 'Bearer ' + token + '!'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });
});
