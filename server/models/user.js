/* jshint camelcase:false */

'use strict';

let mongoose = require('mongoose');
let qs = require('querystring');
let Request = require('request');
let moment = require('moment');
let jwt = require('jwt-simple');
let path = require('path');
let AWS = require('aws-sdk');
let crypto = require('crypto');
let concat = require('concat-stream');
let User;

let userSchema = mongoose.Schema({
  facebookId: {type: String, required: true},
  username: String,
  realname: String,
  email: String,
  phone: String,
  bio: String,
  location: String,
  interests: [String],
  age: Number,
  height: String,
  gender: String,
  lookingFor: String,
  photos: [String],
  createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.create = function(profile, cb) {
  User.findOne({facebookId: profile.facebookId}, (err, user) => {
    if(user) { return cb(err, user); }
    let u = new User(profile);
    u.save(cb);
  });
};

userSchema.methods.token = function() {
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(3, 'days').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

userSchema.statics.facebook = function(payload, cb) {
  let accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  let graphApiUrl = 'https://graph.facebook.com/me';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.FB_SECRET
  };
  Request.get({url: accessTokenUrl, qs: params, json: true}, (err, response, accessToken) => {
    accessToken = qs.parse(accessToken);
    Request.get({url: graphApiUrl, qs:accessToken, json:true}, (err, response, profile) => {
      let photoUrl = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      cb({facebookId:profile.id, realname:profile.name, photos:[photoUrl]});
    });
  });
};

userSchema.methods.upload = function(file, name, cb){
  let s3 = new AWS.S3();
  crypto.pseudoRandomBytes(8, (ex, buf) => {
    let hex = buf.toString('hex');
    let loc = this._id + '/' + hex + path.extname(name);
    let url = 'https://s3-us-west-1.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;
    this.photos.push(url);
    file.pipe(concat((buf) => {
      let params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: buf, ACL: 'public-read'};
      s3.putObject(params, () => {
        this.save(cb);
      });
    }));
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
