import Server from '../../src/server/Server';

let server: Server;

test('Create new Server', () => {
  server = new Server();

  expect(server).toBeDefined();
});