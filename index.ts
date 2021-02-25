import 'dotenv/config';
import Server from './src/server/Server';
import { logger } from './src/common/Logger';

const server = new Server();

server
    .start()
    .catch((err) => {
        logger.error(err);
    });
