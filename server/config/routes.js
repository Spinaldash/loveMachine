'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},
  {method: 'get', path: '/users/{userId}', config: require('../routes/users/profile')},
  {method: 'post', path: '/users/{userId}', config: require('../routes/users/update')},

  {method: 'get', path: '/gifts', config: require('../routes/gifts/index')},
  {method: 'get', path: '/gifts/{giftId}', config: require('../routes/gifts/show')},
  {method: 'get', path: '/users/{userId}/gifts', config: require('../routes/gifts/usergifts')},
  
  {method: 'post', path: '/messages/email', config: require('../routes/messages/email')},
  {method: 'post', path: '/messages/txt', config: require('../routes/messages/txt')}
];
