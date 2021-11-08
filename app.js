import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import { redisgraphPlugin } from "./routes/redisgraph/plugin.js";

const app = Fastify({logger: false});

app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: { title: "redisgraph-api" },
        tags: [
            {name: "graph", description: "graph"},
            {name: "organization", description: "organization"},
            {name: "person", description: "person"},
            {name: "relations", description: "relations"}
        ]
    },
});

app.register(redisgraphPlugin, {
    prefix: "/redisgraph"
});

export default app;