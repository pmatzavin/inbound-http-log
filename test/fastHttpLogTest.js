const http = require('http');
const test = require('tap').test;

const fastHttpLog = require('../index');

Date.prototype.getTime = () => 1518348878317;

const logger = {
    info: () => undefined,
    error: () => undefined
}

const hostname = '127.0.0.1';
const port = 3000;

const request = t => {
    return http.get(`http://${hostname}:${port}`, res => {
        t.end();
    });
};

const getListen = shouldReturnErr => (t, cb) => {
    const server = http.createServer((req, res) => {
        res.statusCode = shouldReturnErr ? 500 : 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Date', 'today');
        res.end('Hello World\n');
    });

    server.listen(port, hostname, err => {
        cb(err)
    });

    t.tearDown(function (cb) {
        server.close(cb)
    })
};

test('log the request and the response', function(t) {
    logger.info = msg => {
        t.matchSnapshot(msg, 'output');
    }

    fastHttpLog({logger});

    getListen()(t, () => {
        request(t);
    });
});

test('use the defaults for "logger", "headers" and "stringify" params', function(t) {
    fastHttpLog.reset();
    fastHttpLog();
    
    getListen()(t, () => {
        request(t);
    });
});

test('use the "error" level when status equals to 5xx', function(t) {
    fastHttpLog.reset();
    fastHttpLog({
        logger
    });
    
    logger.error = msg => {
        t.matchSnapshot(msg, 'output');
    }

    getListen(true)(t, () => {
        request(t);
    });
});

test('log the "headers" that were specified in the passed options', function(t) {
    fastHttpLog.reset();
    fastHttpLog({
        logger,
        headers: [
            'connection'
        ]
    });
    
    logger.info = msg => {
        t.matchSnapshot(msg, 'output');
    }

    getListen()(t, () => {
        request(t);
    });
});

test('throw Error if we try to appy the Proxy more than once', function(t) {
    fastHttpLog.reset();
    fastHttpLog();

    t.throws(() => {
        fastHttpLog();
    }, new Error('FastHttpLog Proxy Already Applied'));

    t.end();
});

test('throw error if we provide a "stringy" param that is not a function', function(t) {
    fastHttpLog.reset();

    t.throws(() => {
        fastHttpLog({stringify: {}});
    }, new Error('stringify must be a function'));

    t.end();
});

test('throw error if we provide a logger Object that has no "info" method', function(t) {
    fastHttpLog.reset();

    t.throws(() => {
        fastHttpLog({logger: {
            error: () => null
        }});
    }, new Error('logger.info must be a function'));

    t.end();
});

test('throw error if we provide a logger object that has no "error" method', function(t) {
    fastHttpLog.reset();

    t.throws(() => {
        fastHttpLog({logger: {
            info: () => null
        }});
    }, new Error('logger.error must be a function'));

    t.end();
});

test('throw error if we provide a headers value that is not an Array', function(t) {
    fastHttpLog.reset();

    t.throws(() => {
        fastHttpLog({headers: {}});
    }, new Error('headers must be an Array'));

    t.end();
});