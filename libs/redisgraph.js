import RedisGraphJS from "redisgraph.js";
const RedisGraph = RedisGraphJS.Graph;

let graph = new RedisGraph("GraphName");

export const graphDelete = async () => {
    graph.deleteGraph();
    return "graph deleted";
};

export const createOrganization = async (name) => {
    const query = `MERGE (:Organization{name:'${name}'})`;
    await graph.query(query);
    const res = await graph.query(`
        MATCH (o:Organization)
        WHERE (o.name = '${name}')
        RETURN o
    `);
    if (res.hasNext()) {
        const record = res.next().get("o");
        return record;
    } else {
        return "failure";
    }
};

export const getAllOrganizations = async () => {
    const res = await graph.query(`
        MATCH (o:Organization)
        RETURN o
    `);
    const organizations = [];
    while (res.hasNext()) {
        organizations.push(res.next().get("o"));
    }
    return organizations;
};

export const getOrganizationByName = async (name) => {
    const res = await graph.query(`
        MATCH (o:Organization)
        WHERE (o.name = '${name}')
        RETURN o
    `);
    if (res.hasNext()) {
        const record = res.next().get("o");
        return record;
    }
};

export const createPerson = async (name, age) => {
    const query = `MERGE (:Person{name:'${name}', age:${age}})`;
    await graph.query(query);
    const res = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${name}' AND p.age = ${age})
        RETURN p
    `);
    if (res.hasNext()) {
        const record = res.next().get("p");
        return record;
    } else {
        return "failure";
    }
};

export const getAllPersons = async (name, age) => {
    const res = await graph.query(`
        MATCH (p:Person)
        RETURN p
    `);
    const persons = [];
    while (res.hasNext()) {
        persons.push(res.next().get("p"));
    }
    return persons;
};

export const getPersonByName = async (name) => {
    const res = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${name}')
        RETURN p
    `);
    const persons = [];
    while (res.hasNext()) {
        persons.push(res.next().get("p"));
    }
    return persons;
};

export const hirePerson = async (organizationName, personName) => {
    const query = `
        MATCH (o:Organization),(p:Person)
        WHERE (o.name = '${organizationName}') AND (p.name = '${personName}')
        MERGE (p)-[r:WorksFor]->(o)
        RETURN o,p,r
    `;
    await graph.query(query);
    return "ok";
};

export const ownOrganization = async (personName, organizationName) => {
    const query = `
        MATCH (p:Person),(o:Organization)
        WHERE (p.name = '${personName}') AND (o.name = '${organizationName}')
        MERGE (p)-[r:Owns]->(o)
        RETURN o,p,r
    `;
    await graph.query(query);
    return "ok";
};

export const personKnows = async (person1, person2, since) => {
    const query = `
        MATCH (p1:Person),(p2:Person)
        WHERE (p1.name = '${person1}') AND (p2.name = '${person2}')
        MERGE (p1)-[r:Knows{since: '${since}'}]->(p2)
        RETURN p1,p2,r
    `;
    await graph.query(query);
    return "ok";
};