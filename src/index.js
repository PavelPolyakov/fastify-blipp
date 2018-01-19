const fp = require("fastify-plugin");
const chalk = require("chalk");

module.exports = fp(function(fastify, opts, next) {
  fastify.decorate("blipp", () => {
    let routes = "";
    for (let route of fastify) {
      for (let url in route) {
        Object.keys(route[url]).forEach(method => {
          routes += `${chalk.green(method.toUpperCase())}\t${url.replace(
            /(:.*?(\/|$))/g,
            chalk.gray("$1")
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
