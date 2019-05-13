global.console.log = jest.fn();

describe("blipp", () => {
  beforeAll(() => {
    //actions = Actions(server);
  });

  beforeEach(() => {
    request = {};
    jest.clearAllMocks();
  });

  describe("/", () => {
    it("prints routes", async done => {
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
      fastify.route({
        method: ["GET", "HEAD"],
        url: "/hello/complex-route",
        handler: async (req, reply) => ({
          greeting: "Hello from the complex route"
        })
      });
      fastify.register((fastify, {}, done) => {
        fastify.get("/", async (req, reply) => ({
          greeting: `Hello, this route is served under a prefix`
        }));

        done();
      }, { prefix: '/prefix' });

      await fastify.ready();

      fastify.blipp();

      expect(console.log.mock.calls[0][0]).toBe(`🏷️  Routes:`);
      expect(console.log.mock.calls[1][0]).toMatchSnapshot();
      done();
    });
  });
});
