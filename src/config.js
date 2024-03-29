require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  herokuApi: 'https://nightly-server.herokuapp.com/api/v1.0',
  apiHost: '127.0.0.1',
  apiPort: '5000/api/v1.0',
  app: {
    title: 'Nightly',
    description: 'Homework. Automated.',
    head: {
      titleTemplate: 'Nightly',
      meta: [
        {name: 'description', content: 'Homework. Automated.'},
        {charset: 'utf-8'},
        {property: 'og:title', content: 'Nightly'},
        {property: 'og:description', content: 'Homework. Automated.'}
      ]
    }
  },
}, environment);

