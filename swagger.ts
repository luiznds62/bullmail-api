const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/assets/docs/swagger_output.json';
const endpointsFiles = ['./src/api/user/UserController.ts'];

swaggerAutogen(outputFile, endpointsFiles);
