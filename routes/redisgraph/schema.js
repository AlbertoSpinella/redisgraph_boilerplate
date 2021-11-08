import {
    deleteGraph,
    organizationCreate,
    organizationGetAll,
    organizationGetByName,
    personCreate,
    personGetAll,
    personGetByName,
    hire,
    own,
    knows
} from "./controller.js";

export const deleteGraphOpts = {
    schema: {
        tags: ["graph"]
    },
    handler: deleteGraph
};

export const organizationCreateOpts = {
    schema: {
        tags: ["organization"]
    },
    handler: organizationCreate
};

export const organizationGetAllOpts = {
    schema: {
        tags: ["organization"]
    },
    handler: organizationGetAll
};

export const organizationGetByNameOpts = {
    schema: {
        tags: ["organization"]
    },
    handler: organizationGetByName
};

export const personCreateOpts = {
    schema: {
        tags: ["person"]
    },
    handler: personCreate
};

export const personGetAllOpts = {
    schema: {
        tags: ["person"]
    },
    handler: personGetAll
};

export const personGetByNameOpts = {
    schema: {
        tags: ["person"]
    },
    handler: personGetByName
};

export const hireOpts = {
    schema: {
        tags: ["relations"]
    },
    handler: hire
};

export const ownOpts = {
    schema: {
        tags: ["relations"]
    },
    handler: own
};

export const knowsOpts = {
    schema: {
        tags: ["relations"]
    },
    handler: knows
};