const fp = require("fastify-plugin");
const chalk = require("chalk");

module.exports = fp(function(fastify, opts, next) {
  const routes = [];

  fastify.addHook("onRoute", routeOptions => {
    routes.push(routeOptions);
  });

  fastify.decorate("blipp", () => {
    if (routes.length === 0) {
      return;
    }

    // sort the routes alphabetically ASC by urls, then by method ASC
    routes.sort(
      (a, b) => (a.url !== b.url ? a.url > b.url : a.method > b.method)
    );

    let output = "";
    for (let route of routes) {
      output += `${chalk.green(
        !Array.isArray(route.method) ? route.method.toUpperCase() : JSON.stringify(route.method.map(s => s.toUpperCase()))
      )}\t${route.url.replace(/(?:\:[\w]+|\[\:\w+\])/g, chalk.gray("$&"))}\n`;
    }

    if (routes.length > 0) {
      console.log(`🏷️  Routes:`);
      console.log(output);
    }
  });

  next();
});
