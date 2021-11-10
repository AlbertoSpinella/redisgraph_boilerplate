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


test('POST /redisgraph/person', async () => {
    for  (let i=0; i<10000; i++)  {
        const body = {
            name: `${i}`,
            age: 23
        };
        expect(body).toMatchSchema(personCreateOpts.schema?.body);
        const response = await POST('/redisgraph/person', {body});
        const parsedBody = JSON.parse(response.body);
        expect(parsedBody).toMatchSchema(personCreateOpts.schema?.response[200]);
        expect(response.statusCode).toBe(200);
    }
});

test('POST /redisgraph/knows', async () => {
    for (let i=1; i<10000; i++) {
        const body = {
            person1: `${i}`,
            person2: "0",
            since: "april"
        };
        expect(body).toMatchSchema(knowsOpts.schema?.body);
        const response = await POST('/redisgraph/knows', {body});
        const parsedBody = JSON.parse(response.body);
        expect(parsedBody).toMatchSchema(knowsOpts.schema?.response[200]);
        expect(response.statusCode).toBe(200);
    }
});