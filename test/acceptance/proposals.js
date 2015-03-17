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
var Proposal = require('../../server/models/proposal');
var Incident = require('../../server/models/incident');
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
  describe('post /users/{userId}/propose', function() {
    it('should create a new proposal', function(done) {
      var options = {
        method: 'post',
        url: '/users/000000000000000000000002/propose',
        payload: {
          title: 'Monster Truck Rally',
          description: 'Big trucks go smash! Boom!'
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        Proposal.findOne({title: 'Monster Truck Rally'}, function(err, proposal) {
          Incident.find({}, function(err, incidents) {
            expect(response.statusCode).to.equal(200);
            expect(proposal.sender.toString()).to.equal('000000000000000000000001');
            expect(proposal.receiver.toString()).to.equal('000000000000000000000002');
            done();
          });
        });
      });
    });
    it('should  NOT create a new proposal, -bad Token', function(done) {
      var options = {
        method: 'post',
        url: '/users/00000000000000A000000002/propose',
        payload: {
          title: 'Monster Truck Rally',
          description: 'Big trucks go smash! Boom!'
        },
        headers: {
          Authorization: 'BeErer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });
  describe('post /proposals/{proposalId}/accept', function() {
    it('should accept a proposal', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b00000000000000000000001/accept',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        Proposal.findById('b00000000000000000000001', function(err, proposal) {
          expect(response.statusCode).to.equal(200);
          expect(proposal.isPending).to.not.be.ok;
          expect(proposal.isAccepted).to.be.ok;
          expect(proposal.sender.toString()).to.equal('000000000000000000000002');
          expect(proposal.receiver.toString()).to.equal('000000000000000000000001');
          done();
        });
      });
    });
    it('should  NOT accept a proposal, -bad Token', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b00000000000000000000001/accept',
        headers: {
          Authorization: 'BeErer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
    it('should  NOT accept a proposal, -bad URL', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b0000000000A000000000001/accept',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
  describe('post /proposals/{proposalId}/decline', function() {
    it('should decline a proposal', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b00000000000000000000001/decline',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        Proposal.findById('b00000000000000000000001', function(err, proposal) {
          expect(response.statusCode).to.equal(200);
          expect(proposal.isPending).to.not.be.ok;
          expect(proposal.isAccepted).to.not.be.ok;
          expect(proposal.sender.toString()).to.equal('000000000000000000000002');
          expect(proposal.receiver.toString()).to.equal('000000000000000000000001');
          done();
        });
      });
    });
    it('should  NOT decline a proposal, -bad Token', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b00000000000000000000001/decline',
        headers: {
          Authorization: 'BeErer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
    it('should  NOT decline a proposal, -bad URL', function(done) {
      var options = {
        method: 'post',
        url: '/proposals/b0000000000A000000000001/decline',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
  describe('get /proposals', function() {
    it('should list pending proposals', function(done) {
      var options = {
        method: 'get',
        url: '/proposals',
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      server.inject(options, function(response) {
          expect(response.statusCode).to.equal(200);
          expect(response.result.proposals.length).to.equal(1);
          done();
      });
    });
    it('should NOT list pending proposals, -bad Token', function(done) {
      var options = {
        method: 'get',
        url: '/proposals',
        headers: {
          Authorization: 'BeErer ' + token
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });
});
