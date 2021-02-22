import 'dotenv/config';
import Server from './src/server/Server';
import { logger } from './src/common/Logger';

const server = new Server();

server
    .start()
    .then((application: Server) => {
        application.initRoutes();
    })
    .catch((err) => {
        logger.error(err);
    });
