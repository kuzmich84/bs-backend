'use strict';

/**
 *  custom-school controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school.school', ({strapi}) => ({
  async mySchools(ctx) {
    const {id} = ctx.state.user
    console.log(id)
    const schools = await strapi.db.query('api::school.school').findMany({
      where: {
        "users_permissions_user": id,
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(schools, ctx);
    return this.transformResponse(sanitizedEntity);


  }
}));
