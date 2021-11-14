const fastify = require('fastify')();
const fastifyPlugin = require('fastify-plugin');
const api = require('../..');

describe('Dummy API', () => {
  const mockConfig = fastifyPlugin((Fastify, opts, next) => {
    Fastify.decorate('config', {
      NODE_ENV: 'production',
    });
    next();
  });

  beforeAll(async () => {
    fastify.register(mockConfig);
    fastify.register(api);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return status 200 with test message', async () => {
    const query = {
      method: 'GET',
      url: '/v1/test',
      accept: 'application/json',
    };

    const response = await fastify.inject(query);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toEqual({
      test: 'Welcome to hackathon 2021',
    });
  });
});
