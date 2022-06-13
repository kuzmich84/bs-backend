const _ = require('lodash')
const {getService} = require("@strapi/plugin-users-permissions/server/utils")
const {sanitize} = require("@strapi/utils")

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user')
  return sanitize.contentAPI.output(user, schema)
}


module.exports = (plugin) => {

  /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.updateLoggedInUser = async (ctx) => {
    const user = ctx.state.user
    const idUser = ctx.state.user.id
    if (!idUser) {
      return ctx.notFound
    }
    await strapi.entityService.update('plugin::users-permissions.user', idUser, {
      data: ctx.request.body.data
    })

    ctx.body = await sanitizeOutput(user, ctx)
    ctx.response.status = 200

  }

  plugin.controllers.user.me = async (ctx) => {
    let user = ctx.state.user
    const role = ctx.state.user.role.name

    if (!user) {
      return ctx.unauthorized()
    }

    user = {...user, role}

    ctx.body = await sanitizeOutput(user, ctx)
  }

  plugin.controllers.user.destroy = async (ctx) => {
    const {id} = ctx.params
    const idUser = ctx.state.user.id

    if (Number(id) === Number(idUser)) {
      const data = await getService('user').remove({id})
      const sanitizedUser = await sanitizeOutput(data, ctx)
      ctx.send(sanitizedUser)
      return true
    }

    return ctx.unauthorized()
  }

  /*******************************  CUSTOM ROUTES  ********************************/
  plugin.routes["content-api"].routes.push(
    {
      method: "POST",
      path: "/user/updateLoggedInUser",
      handler: "user.updateLoggedInUser",
      config: {
        prefix: "",
        policies: []
      }
    }
  )

  return plugin
}
// const _ = require('lodash');

// module.exports = (plugin) => {
//   const getController = name => {
//     return strapi.plugins['users-permissions'].controller(name);
//   };
//
//   // Create the new controller
//   plugin.controllers.user.updateMe = async (ctx) => {
//     const user = ctx.state.user;
//
//     // User has to be logged in to update themselves
//     if (!user) {
//       return ctx.unauthorized();
//     }
//
//     // Pick only specific fields for security
//     const newData = _.pick(ctx.request.body, ['email', 'username', 'password', 'confirmPassword']);
//
//     // Make sure there is no duplicate user with the same username
//     if (newData.username) {
//       const userWithSameUsername = await strapi
//         .query('plugin::users-permissions.user')
//         .findOne({ where: { username: newData.username } });
//
//       if (userWithSameUsername && userWithSameUsername.id != user.id) {
//         return ctx.badRequest('Username already taken');
//       }
//     }
//
//     // Make sure there is no duplicate user with the same email
//     if (newData.email) {
//       const userWithSameEmail = await strapi
//         .query('plugin::users-permissions.user')
//         .findOne({ where: { email: newData.email.toLowerCase() } });
//
//       if (userWithSameEmail && userWithSameEmail.id != user.id) {
//         return ctx.badRequest('Email already taken');
//       }
//       newData.email = newData.email.toLowerCase();
//     }
//
//     // Check if user is changing password and make sure passwords match
//     if (newData.password) {
//       if (!newData.confirmPassword) {
//         return ctx.badRequest('Missing password confirmation');
//       } else if (newData.password !== newData.confirmPassword) {
//         return ctx.badRequest('Passwords don\'t match')
//       }
//       delete newData.confirmPassword
//     }
//
//     // Reconstruct context so we can pass to the controller
//     ctx.request.body = newData
//     ctx.params = { id: user.id }
//
//     // Update the user and return the sanitized data
//     return await getController('user').update(ctx)
//   };
//
//   // Add the custom route
//   plugin.routes['content-api'].routes.unshift({
//     method: 'PUT',
//     path: '/users/me',
//     handler: 'user.updateMe',
//     config: {
//       prefix: ''
//     }
//   });
//
//   return plugin;
// };
