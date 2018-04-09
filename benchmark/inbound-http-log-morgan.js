const morgan = require('morgan')('tiny'); 
require('../index')({expressMiddleware: morgan});

const server = require('./server');
const port = 3003;

server(port);
