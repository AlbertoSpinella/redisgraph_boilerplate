import {
    graphDelete,
    createOrganization,
    getAllOrganizations,
    getOrganizationByName,
    createPerson,
    getAllPersons,
    getPersonByName,
    hirePerson,
    ownOrganization,
    personKnows
} from "../../libs/redisgraph.js";

export const deleteGraph = async (req, res) => {
    try {
        const result = await graphDelete();
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const organizationCreate = async (req, res) => {
    try {
        const result = await createOrganization(req.body?.name);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const organizationGetAll = async (req, res) => {
    try {
        const result = await getAllOrganizations();
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const organizationGetByName = async (req, res) => {
    try {
        const result = await getOrganizationByName(req.params?.name);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const personCreate = async (req, res) => {
    try {
        const { name, age } = req.body;
        const result = await createPerson(name, age);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const personGetAll = async (req, res) => {
    try {
        const result = await getAllPersons();
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const personGetByName = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await getPersonByName(name);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const hire = async (req, res) => {
    try {
        const { organizationName, personName } = req.body;
        const result = await hirePerson(organizationName, personName);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const own = async (req, res) => {
    try {
        const { organizationName, personName } = req.body;
        const result = await ownOrganization(personName, organizationName);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};

export const knows = async (req, res) => {
    try {
        const { person1, person2, since } = req.body;
        const result = await personKnows(person1, person2, since);
        return res.send(result);
    } catch (err) {
        throw err;
    }
};