module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/schools/me',
      handler: 'custom-school.mySchools',
    }
  ]
}
