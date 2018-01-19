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

      await fastify.ready();

      fastify.blipp();

      expect(console.log.mock.calls[0][0]).toBe(`🏷️  Routes:`);
      expect(console.log.mock.calls[1][0]).toMatchSnapshot();
      done();
    });
  });
});
