import app from '../app.js';
import { fake } from '../libs/test/fakeHTTP.js';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

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
    knowsOpts
} from '../routes/redisgraph/schema.js';
import { knows } from '../routes/redisgraph/controller.js';

const { GET, POST, DELETE } = fake(app);

beforeAll(() => {});

afterAll( async () => {
    await app.close();
});

// test('DELETE /redisgraph/graph', async () => {
//     const response = await DELETE('/index', {});
//     const parsedBody = JSON.parse(response.body);
//     expect(parsedBody).toMatchSchema(deleteGraphOpts.schema?.response[200]);
//     expect(response.statusCode).toBe(200);
// });

test('POST /redisgraph/organization', async () => {
    const body = {
        name: "Google"
    };
    expect(body).toMatchSchema(organizationCreateOpts.schema?.body);
    const response = await POST('/redisgraph/organization', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(organizationCreateOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('GET /redisgraph/organization/all', async () => {
    const response = await GET('/redisgraph/organization/all', {});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(organizationGetAllOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('GET /redisgraph/organization/:name', async () => {
    const response = await GET('/redisgraph/organization/Google', {});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(organizationGetByNameOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /redisgraph/person', async () => {
    const body = {
        name: "Alberto Spinella",
        age: 23
    };
    expect(body).toMatchSchema(personCreateOpts.schema?.body);
    const response = await POST('/redisgraph/person', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(personCreateOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('GET /redisgraph/person/all', async () => {
    const response = await GET('/redisgraph/person/all', {});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(personGetAllOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('GET /redisgraph/person/:name', async () => {
    const response = await GET('/redisgraph/person/Alberto%20Spinella', {});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(personGetByNameOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /redisgraph/hire', async () => {
    const body = {
    organizationName: "Google",
    personName: "Alberto Spinella"
    };
    expect(body).toMatchSchema(hireOpts.schema?.body);
    const response = await POST('/redisgraph/hire', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(hireOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /redisgraph/person', async () => {
    const body = {
        name: "Mario Rossi",
        age: 29
    };
    expect(body).toMatchSchema(personCreateOpts.schema?.body);
    const response = await POST('/redisgraph/person', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(personCreateOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /redisgraph/own', async () => {
    const body = {
        organizationName: "Google",
        personName: "Mario Rossi"
    };
    expect(body).toMatchSchema(ownOpts.schema?.body);
    const response = await POST('/redisgraph/own', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(ownOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /redisgraph/knows', async () => {
    const body = {
        person1: "Alberto Spinella",
        person2: "Mario Rossi",
        since: "april"
    };
    expect(body).toMatchSchema(knowsOpts.schema?.body);
    const response = await POST('/redisgraph/knows', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(knowsOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});