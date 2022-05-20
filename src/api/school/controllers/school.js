'use strict';

/**
 *  school controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school.school', ({strapi})=> ({

  async create(ctx) {
    let entity;
    ctx.request.body.owner = ctx.state.user.id
    console.log()
    entity = await strapi.service('api::school:school').create(ctx.request.body)

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);

  }

}));
