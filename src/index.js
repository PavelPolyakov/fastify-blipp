const fp = require("fastify-plugin");
const chalk = require("chalk");

module.exports = fp(function(fastify, opts, next) {
  fastify.decorate("blipp", () => {
    let routes = "";
    for (let route of fastify) {
      for (let url in route) {
        Object.keys(route[url]).forEach(method => {
          routes += `${chalk.green(method.toUpperCase())}\t${url.replace(
            /(?:\:[\w]+|\[\:\w+\])/g,
            chalk.gray("$&")
          )}\n`;
        });
      }
    }

    if (routes.length > 0) {
      console.log(`🏷️  Routes:`);
      console.log(routes);
    }
  });

  next();
});
