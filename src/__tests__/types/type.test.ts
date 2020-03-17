import fastify = require('fastify');
import fastifyBlipp = require('../../../index');

const app = fastify();

app.register(fastifyBlipp);
