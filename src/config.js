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
  herokuApi: 'https://nightlytext.herokuapp.com',
  apiHost: '127.0.0.1',
  apiPort: '5000',
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

