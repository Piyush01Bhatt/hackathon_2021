/* eslint-disable no-process-env */
process.env.LOG_LEVEL = '';
const fastify = require('../index');

describe('create server', () => {
  it('should create server', async () => {
    const server = fastify.create();
    await server.ready();
    expect(fastify).toBeDefined();
    await server.close();
  });
});
