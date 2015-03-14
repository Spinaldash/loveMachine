'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')}
];
