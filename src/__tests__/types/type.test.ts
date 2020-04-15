import fastify from 'fastify';
import fastifyBlipp from '../../../index';

const app = fastify();

app.register(fastifyBlipp, {blippLog: console.log});
