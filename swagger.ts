import 'dotenv/config';
import Environments from "./src/common/Environments";
const swaggerAutogen = require('swagger-autogen')();

const host = `localhost:${Environments.SERVER.PORT}`;

const doc = {
    info: {
        version: "1.0.0",
        title: "BullMail - API",
        description: "API for registering users and send e-mails via nodemailer with BullMQ."
    },
    host: host,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Users",
            "description": "Base domain of the application"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header", 
            name: "X-API-KEY",
            description: "No need for this yet"
        }
    },
    definitions: {
        User: {
            name: "Jhon Doe",
            email: "jhondoe@email.com",
            password: "123456"
        }
    }
}

const outputFile = './src/assets/docs/swagger_output.json';
const endpointsFiles = ['./src/api/user/UserController.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
