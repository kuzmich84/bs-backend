'use strict'

/**
 *  school controller
 */
const {sanitizeEntity} = require("@strapi/utils")
const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::school.school', ({strapi}) => ({

  async  create(ctx, next){
    const id = ctx.state.user
    const entry =await strapi.entityService.create('api::school.school',{
      data: {
        ...ctx.request.body.data,
        owner: id,
      },
    })

    return {entry}
  }
}))
