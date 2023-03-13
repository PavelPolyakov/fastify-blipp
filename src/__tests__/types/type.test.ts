import {fastify} from 'fastify';
import fastifyBlipp from '../../../index.js';

const app = fastify();

app.register(fastifyBlipp, {blippLog: console.log});
