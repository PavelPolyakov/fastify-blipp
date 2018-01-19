const fastify = require("fastify")();

fastify.register(require("../../src/index"));

fastify.get("/hello/:username", async (req, reply) => ({
  greeting: `Hello, ${req.params.username}`
}));
fastify.post("/hello", async (req, reply) => ({
  greeting: `Hello, ${req.body.username}`
}));

const start = async () => {
  try {
    await fastify.listen(3000);

    fastify.blipp();

    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
