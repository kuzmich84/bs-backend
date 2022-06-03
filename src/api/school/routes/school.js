'use strict'

/**
 * school router.
 */

const {createCoreRouter} = require('@strapi/strapi').factories

module.exports = createCoreRouter('api::school.school', {
  config: {
    delete: {
      policies: ['api::school.is-owner']
    },
    update: {
      policies: ['api::school.is-owner']
    }
  }
})
