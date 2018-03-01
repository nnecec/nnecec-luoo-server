export default {
  mongo: {
    name: 'luoo',
    host: '127.0.0.1',
    port: 27017,
    username: 'cc',
    password: '12345',
    url: function () {
      return ['mongodb://', this.host, ':', this.port, '/', this.name].join('');
    }
  },
  mongoOptions: {
    promiseLibrary: require('bluebird')
  }
}