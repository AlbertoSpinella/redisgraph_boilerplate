import {
    deleteGraphOpts,
    organizationCreateOpts,
    organizationGetAllOpts,
    organizationGetByNameOpts,
    personCreateOpts,
    personGetAllOpts,
    personGetByNameOpts,
    hireOpts,
    ownOpts,
    knowsOpts,
    stressOpts
} from "./schema.js";

export const redisgraphPlugin = (fastify, options, done) => {
    try {
        fastify.delete("/graph", deleteGraphOpts);

        fastify.post("/organization", organizationCreateOpts);
        fastify.get("/organization/all", organizationGetAllOpts);
        fastify.get("/organization/:name", organizationGetByNameOpts);

        fastify.post("/person", personCreateOpts);
        fastify.get("/person/all", personGetAllOpts);
        fastify.get("/person/:name", personGetByNameOpts);

        fastify.post("/hire", hireOpts);
        fastify.post("/own", ownOpts);
        fastify.post("/knows", knowsOpts);

        fastify.get("/stress", stressOpts);

        done();
    } catch (err) {
        throw err;
    }
};