const http = require('http');

const server = (port, logger) => {

    const handle = logger ?
        (req, res) => {
            logger(req, res);
            res.end('hello world');
        } :
        (req, res) => {
            res.end('hello world');
        };

    const server = http.createServer(handle);

    server.listen(port);

    console.log(`listening at: ${port}`)
};

module.exports = server;
