import { fastify } from "fastify";
import blippPlugin from "../../src/index.js";
const app = fastify();

app.register(blippPlugin);

app.register((fastify, {}, done) => {
  fastify.get(
    "/hello/:username",
    { exposeHeadRoute: false },
    async (req, reply) => ({
      greeting: `Hello, ${req.params.username}`,
    })
  );
  fastify.get(
    "/hello/:username/CAPS",
    { exposeHeadRoute: false },
    async (req, reply) => ({
      greeting: `Hello, ${req.params.username.toUpperCase()}`,
    })
  );
  fastify.post("/hello", async (req, reply) => ({
    greeting: `Hello, ${req.body.username}`,
  }));
  fastify.get(
    "/example/at/:hour(^\\d{2})h:minute(^\\d{2})m",
    { exposeHeadRoute: false },
    async (req, reply) => ({
      hour: req.params.hour,
      minute: req.params.minute,
    })
  );
  fastify.route({
    method: ["GET", "HEAD"],
    url: "/hello/complex-route",
    handler: async (req, reply) => ({
      greeting: "Hello from the complex route",
    }),
  });
  done();
});
app.register(
  (fastify, {}, done) => {
    fastify.get("/", { exposeHeadRoute: false }, async (req, reply) => ({
      greeting: `Hello, this route is served under prefix`,
    }));

    done();
  },
  { prefix: "/prefix" }
);

const start = async () => {
  try {
    await app.listen({ port: 3000 });

    app.blipp();

    console.log(`server listening on ${app.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
