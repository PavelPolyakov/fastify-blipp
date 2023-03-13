import { FastifyPlugin } from "fastify";

interface BlippOptions {
    blippLog?: (message: string) => void;
}

declare module 'fastify' {
    interface FastifyInstance {
        blipp: () => void;
    }
}
declare const fastifyBlipp: FastifyPlugin<BlippOptions>;

export default fastifyBlipp;
