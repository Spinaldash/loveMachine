'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},

  {method: 'get', path: '/users', config: require('../routes/users/index')},
  {method: 'get', path: '/users/{userId}', config: require('../routes/users/profile')},
  {method: 'post', path: '/users/{userId}', config: require('../routes/users/update')},
  {method: 'get', path: '/users/{userId}/gifts', config: require('../routes/gifts/usergifts')},
  {method: 'post', path: '/users/{userId}/upload', config: require('../routes/photos/upload')},

  {method: 'get', path: '/items', config: require('../routes/items/index')},
  {method: 'post', path: '/items/new', config: require('../routes/items/create')},
  {method: 'post', path: '/items/{itemId}/purchase', config: require('../routes/items/purchase')},

  {method: 'get', path: '/gifts', config: require('../routes/gifts/index')},
  {method: 'get', path: '/gifts/{giftId}', config: require('../routes/gifts/show')},

  {method: 'post', path: '/messages/email', config: require('../routes/messages/email')},
  {method: 'post', path: '/messages/txt', config: require('../routes/messages/txt')}
];
