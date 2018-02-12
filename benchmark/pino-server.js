const server = require('./server');

const pinoHttp = require('pino-http');

const logger = pinoHttp();

const port = 3002;

server(port, logger);
