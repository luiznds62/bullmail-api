import "dotenv/config";
import { Server } from "./server/server";
import { logger } from "./common/logger";

const server = new Server();

server
  .start()
  .then((application: Server) => {
    application.initRoutes();
  })
  .catch((err) => {
    logger.error(err);
  });