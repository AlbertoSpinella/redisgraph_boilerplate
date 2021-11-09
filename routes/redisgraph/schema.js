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

const Organization = {
    type: "object",
    properties: {
        id: { type: "number" },
        label: { type: "string" },
        properties: {
            type: "object",
            properties: {
                name: { type: "string" }
            }
        }
    }
};

const Person = {
    type: "object",
    properties:  {
        id: { type: "number" },
        label: { type: "string" },
        properties: {
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "number" }
            }
        }
    }
};

const PRO = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "number" },
            label: { type: "string" },
            relation: { type: "string" },
            srcNode: { type: "number" },
            destNode: { type: "number" },
            properties: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    age: { type: "number" }
                }
            }
        }
    }
};

export const deleteGraphOpts = {
    schema: {
        tags: ["graph"],
        response: {
            200: {
                type: "object",
                properties: {
                    result: { type: "string" }
                }
            }
        }
    },
    handler: deleteGraph
};

export const organizationCreateOpts = {
    schema: {
        tags: ["organization"],
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" }
            },
            additionalProperties: false
        },
        response: {
            200: Organization
        }
    },
    handler: organizationCreate
};

export const organizationGetAllOpts = {
    schema: {
        tags: ["organization"],
        response: {
            200: {
                type: "array",
                items: Organization
            }
        }
    },
    handler: organizationGetAll
};

export const organizationGetByNameOpts = {
    schema: {
        tags: ["organization"],
        response: {
            200: Organization
        }
    },
    handler: organizationGetByName
};

export const personCreateOpts = {
    schema: {
        tags: ["person"],
        body: {
            type: "object",
            required: ["name", "age"],
            properties: {
                name: { type: "string" },
                age: { type: "number" }
            },
            additionalProperties: false
        },
        response: {
            200: Person
        }
    },
    handler: personCreate
};

export const personGetAllOpts = {
    schema: {
        tags: ["person"],
        response: {
            200: {
                type: "array",
                items: Person
            }
        }
    },
    handler: personGetAll
};

export const personGetByNameOpts = {
    schema: {
        tags: ["person"],
        response: {
            200: Person
        }
    },
    handler: personGetByName
};

export const hireOpts = {
    schema: {
        tags: ["relations"],
        body:  {
            type: "object",
            required: ["organizationName", "personName"],
            properties: {
                organizationName: { type: "string" },
                personName: { type: "string" }
            },
            additionalProperties: false
        },
        response: {
            200: PRO
        }
    },
    handler: hire
};

export const ownOpts = {
    schema: {
        tags: ["relations"],
        body:  {
            type: "object",
            required: ["organizationName", "personName"],
            properties: {
                organizationName: { type: "string" },
                personName: { type: "string" }
            },
            additionalProperties: false
        },
        response: {
            200: PRO
        }
    },
    handler: own
};

export const knowsOpts = {
    schema: {
        tags: ["relations"],
        body:  {
            type: "object",
            required: ["person1", "person2", "since"],
            properties: {
                person1: { type: "string" },
                person2: { type: "string" },
                since: { type: "string" }
            },
            additionalProperties: false
        },
        response: {
            200: PRO
        }
    },
    handler: knows
};