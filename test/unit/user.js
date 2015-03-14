/* jshint expr:true */

'use strict';

require('babel/register');

var User = require('../../server/models/user');
var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var jwt = require('jwt-simple');
var moment = require('moment');

describe('User Model', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });
  describe('#token', function() {
    it('should create a valid user token', function(done) {
      var steve = new User({email:'steve@aol.com', password:123});
      var token = steve.token();
      var decodedToken = jwt.decode(token, process.env.TOKEN_SECRET);
      expect(token.split('.')).to.have.length.of(3);
      expect(decodedToken.sub).to.equal(steve._id.toString());
      expect(decodedToken.iat).to.be.at.most(moment().unix());
      expect(decodedToken.exp).to.be.at.least(moment().unix());
      done();
    });
  });
  describe('.create', function() {
    it('should create a new user if the given profile does not exist', function(done) {
      var profileObject = {facebookId: 12345, username:'Barry Fooson'};
      User.create(profileObject, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user._id).to.be.ok;
        expect(moment(user.createdAt).unix()).to.be.within(moment().unix()-1,moment().unix()+1);
        expect(user.facebookId).to.equal('12345');
        expect(user.username).to.equal('Barry Fooson');
        done();
      });
    });
    it('should return the user object if it already exists', function(done) {
      var profileObject = {facebookId: 123, username:'existinguser'};
      User.create(profileObject, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user._id).to.be.ok;
        expect(user.username).to.equal('existinguser');
        expect(user.facebookId).to.equal('123');
        done();
      });
    });
  });
});
