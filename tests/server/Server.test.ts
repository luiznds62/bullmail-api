import Server from '../../src/server/Server';

let server: Server;

describe('Server', () => {
  server = new Server();

  test('Create new Server', () => {
    expect(server).toBeDefined();
  });

  test('Should init listeners', () => {
    const instance = server.initListeners();

    expect(instance).toBeDefined();
  });

  test('Should init routes', () => {
    const instance = server.initRoutes();

    expect(instance).toBeDefined();
  });

  test('Should start server', () => {
    const instance = server.start();

    expect(instance).toBeDefined();
  });
});
