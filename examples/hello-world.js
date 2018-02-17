const http = require('http');

require('../index')(/*an "options" can be passed here*/);

const server = http.createServer((req, res) => {
    res.end('hello world');
});

const host = '127.0.0.1';
const port = 3000;

server.listen(port, host, () => {
    console.log(JSON.stringify({
        listening: true,
        host,
        port
    }));
});