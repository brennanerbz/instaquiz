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
  herokuApi: 'https://quizlytext.herokuapp.com',
  apiHost: '127.0.0.1',
  apiPort: '5000',
  app: {
    title: 'Instaquiz',
    description: 'Instantly turn any Wikipedia page into quiz questions.',
    head: {
      titleTemplate: 'Instaquiz',
      meta: [
        {name: 'description', content: 'Instantly turn any Wikipedia page into quiz questions.'},
        {charset: 'utf-8'},
        {property: 'og:title', content: 'Instaquiz'},
        {property: 'og:description', content: 'Instantly turn any Wikipedia page into quiz questions.'}
      ]
    }
  },
}, environment);

