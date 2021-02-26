import 'dotenv/config';
import Server from './src/server/Server';
import { logger } from './src/common/Logger';

const server = new Server();

server
    .start()
    .then((server: Server) => {
        server.initRoutes();
    })
    .catch((err) => {
        logger.error(err);
    });
