import { fastify } from "fastify";
import blippPlugin from "../../src/index.js";
const app = fastify();

app.register(blippPlugin);

app.get("/hello/:username", async (req, reply) => ({
  greeting: `Hello, ${req.params.username}`,
}));
app.get("/hello/:username/CAPS", async (req, reply) => ({
  greeting: `Hello, ${req.params.username.toUpperCase()}`,
}));
app.post("/hello", async (req, reply) => ({
  greeting: `Hello, ${req.body.username}`,
}));
app.get("/example/at/:hour(^\\d{2})h:minute(^\\d{2})m", async (req, reply) => ({
  hour: req.params.hour,
  minute: req.params.minute,
}));
app.route({
  method: ["GET", "HEAD"],
  url: "/hello/complex-route",
  handler: async (req, reply) => ({
    greeting: "Hello from the complex route",
  }),
});
app.register(
  (fastify, {}, done) => {
    fastify.get("/", async (req, reply) => ({
      greeting: `Hello, this route is served under prefix`,
    }));

    done();
  },
  { prefix: "/prefix" }
);

const start = async () => {
  try {
    await app.listen(3000);

    app.blipp();

    console.log(`server listening on ${app.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
