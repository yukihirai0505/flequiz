const apiRoutes = require('./APIRoutes')

module.exports = {
  api: {
    root: 'http://localhost:9000',
    methods: apiRoutes
  }
}