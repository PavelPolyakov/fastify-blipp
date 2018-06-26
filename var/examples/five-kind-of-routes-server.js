const fastify = require("fastify")();

fastify.register(require("../../src/index"));

fastify.get("/hello/:username", async (req, reply) => ({
  greeting: `Hello, ${req.params.username}`
}));
fastify.get("/hello/:username/CAPS", async (req, reply) => ({
  greeting: `Hello, ${req.params.username.toUpperCase()}`
}));
fastify.post("/hello", async (req, reply) => ({
  greeting: `Hello, ${req.body.username}`
}));
fastify.get(
  "/example/at/:hour(^\\d{2})h:minute(^\\d{2})m",
  async (req, reply) => ({
    hour: req.params.hour,
    minute: req.params.minute
  })
);
fastify.route({
  method: ["GET", "HEAD"],
  url: "/hello/complex-route",
  handler: async (req, reply) => ({
    greeting: "Hello from the complex route"
  })
});

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
