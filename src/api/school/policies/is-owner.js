'use strict'

/**
 * `is-owner` policy.
 */

module.exports = async (policyContext, config, {strapi}) => {
  const {id} = policyContext.request.params
  const user = policyContext.state.user
  const school = await strapi.entityService.findOne("api::school.school", id, {
    populate: ['owner']
  })

  if (!school) {
    return {
      message: 'not found'
    }
  }

  if (school.owner.id === user.id) {
    return true
  }

  return false
}
