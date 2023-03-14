import {
  jest,
  expect,
  describe,
  beforeAll,
  beforeEach,
  it,
} from "@jest/globals";
import { fastify as fastifyInstance } from "fastify";
import blippPlugin from "../index.js";
global.console.log = jest.fn();

describe("blipp", () => {
  beforeAll(() => {
    //actions = Actions(server);
  });

  beforeEach(() => {
    const request = {};
    jest.clearAllMocks();
  });

  describe("/", () => {
    it("prints routes", async () => {
      const fastify = fastifyInstance();
      fastify.register(blippPlugin);

      fastify.register((fastify, {}, done) => {
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
        fastify.route({
          method: ["GET", "HEAD"],
          url: "/hello/complex-route",
          handler: async (req, reply) => ({
            greeting: "Hello from the complex route",
          }),
        });

        done();
      });

      fastify.register(
        (fastify, {}, done) => {
          fastify.get("/", { exposeHeadRoute: false }, async (req, reply) => ({
            greeting: `Hello, this route is served under a prefix`,
          }));

          done();
        },
        { prefix: "/prefix" }
      );

      await fastify.ready();

      fastify.blipp();

      expect(console.log.mock.calls[0][0]).toBe(`🏷️  Routes:`);
      expect(console.log.mock.calls[1][0]).toMatchSnapshot();
      return Promise.resolve({});
    });

    it("prints routes with custom log function", async () => {
      const fastify = fastifyInstance();
      const logSpy = jest.fn();

      fastify.register(blippPlugin, { blippLog: logSpy });

      fastify.register((fastify, {}, done) => {
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
        fastify.route({
          method: ["GET", "HEAD"],
          url: "/hello/complex-route",
          handler: async (req, reply) => ({
            greeting: "Hello from the complex route",
          }),
        });
        done();
      });

      fastify.register(
        (fastify, {}, done) => {
          fastify.get("/", { exposeHeadRoute: false }, async (req, reply) => ({
            greeting: `Hello, this route is served under a prefix`,
          }));

          done();
        },
        { prefix: "/prefix" }
      );

      await fastify.ready();

      fastify.blipp();

      expect(logSpy.mock.calls[0][0]).toBe(`🏷️  Routes:`);
      expect(logSpy.mock.calls[1][0]).toMatchSnapshot();
      return Promise.resolve({});
    });
  });
});
