import { Plugin } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2ServerResponse } from "http2";
import * as https from "https";

type HttpServer = Server | Http2Server | Http2SecureServer | https.Server;
type HttpRequest = IncomingMessage | Http2ServerRequest;
type HttpResponse = ServerResponse | Http2ServerResponse;

declare module 'fastify' {
    interface FastifyInstance<
        HttpServer,
        HttpRequest,
        HttpResponse
        > {
        blipp: () => void;
    }   
}
declare function fastifyBlipp(): Plugin<HttpServer, HttpRequest, HttpResponse, any>;
declare namespace fastifyBlipp {}
export = fastifyBlipp;
