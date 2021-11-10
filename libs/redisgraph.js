import RedisGraphJS from "redisgraph.js";
const RedisGraph = RedisGraphJS.Graph;

let graph = new RedisGraph("Boilerplate");

export const graphDelete = async () => {
    const res = await graph.deleteGraph();
    return {result: res._statistics._raw};
};

export const createOrganization = async (name) => {
    const query = `
        MERGE (o:Organization{name:'${name}'})
        RETURN o
    `;
    const res = await graph.query(query);
    return res._results[0]._values[0];
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
    const query = `
        MERGE (p:Person{name:'${name}', age:${age}})
        RETURN p
    `;
    const res =  await graph.query(query);
    return res._results[0]._values[0];
};

export const getAllPersons = async () => {
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
    const organization = await graph.query(`
        MATCH (o:Organization)
        WHERE (o.name = '${organizationName}')
        RETURN o
    `);
    if (!organization.hasNext()) return `The organization ${organizationName} doesn't exists`;
    const person = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${personName}')
        RETURN p
    `);
    if (!person.hasNext()) return `The person ${personName} doesn't exists`;
    const query = `
        MATCH (o:Organization),(p:Person)
        WHERE (o.name = '${organizationName}') AND (p.name = '${personName}')
        MERGE (p)-[r:WorksFor]->(o)
        RETURN p,r,o
    `;
    const res = await graph.query(query);
    return res._results[0]._values;
};

export const ownOrganization = async (personName, organizationName) => {
    const person = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${personName}')
        RETURN p
    `);
    if (!person.hasNext()) return `The person ${personName} doesn't exists`;
    const organization = await graph.query(`
        MATCH (o:Organization)
        WHERE (o.name = '${organizationName}')
        RETURN o
    `);
    if (!organization.hasNext()) return `The organization ${organizationName} doesn't exists`;
    const query = `
        MATCH (p:Person),(o:Organization)
        WHERE (p.name = '${personName}') AND (o.name = '${organizationName}')
        MERGE (p)-[r:Owns]->(o)
        RETURN p,r,o
    `;
    const res = await graph.query(query);
    return res._results[0]._values;
};

export const personKnows = async (person1name, person2name, since) => {
    const person1 = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${person1name}')
        RETURN p
    `);
    if (!person1.hasNext()) return `The person ${person1name} doesn't exists`;
    const person2 = await graph.query(`
        MATCH (p:Person)
        WHERE (p.name = '${person2name}')
        RETURN p
    `);
    if (!person2.hasNext()) return `The person ${person2name} doesn't exists`;
    const query = `
        MATCH (p1:Person),(p2:Person)
        WHERE (p1.name = '${person1name}') AND (p2.name = '${person2name}')
        MERGE (p1)-[r:Knows{since: '${since}'}]->(p2)
        RETURN p1,r,p2
    `;
    const res = await graph.query(query);
    return res._results[0]._values;
};

export const stressTest = async () => {
    const query = `
        MATCH (p1:Person)-[r:Knows]->(p2:Person)
        WHERE (p2.name = '0')
        RETURN p1
    `;
    console.time();
    const res = await graph.query(query);
    console.timeEnd();
    const values = [];
    const results = res._results;
    results.forEach(el => {
        values.push(el._values);
    });
    const statistics = res._statistics;
    return {values, statistics};
};