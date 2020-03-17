import * as fastify from 'fastify';
import * as fastifyBlipp from '../../../index';

const app = fastify();

app.register(fastifyBlipp);
