const os = require('os');

const http = require('http');
const test = require('tap').test;

const inboundHttpLog = require('../index');

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

const assertMsg = (msg, t) => {
    const parsed = JSON.parse(msg);
    t.equal(typeof parsed.pid === 'number', true, 'should log "pid"');
    t.equal(typeof parsed.hostname === 'string', true, 'should log hostname');
    delete parsed.pid;
    delete parsed.hostname;
    t.matchSnapshot(parsed, 'output');
}

test('log the request and the response', function(t) {
    logger.info = msg => {
        assertMsg(msg, t);
    }

    inboundHttpLog({logger});

    getListen()(t, () => {
        request(t);
    });
});

test('use the defaults for "logger", "headers" and "stringify" params', t => {
    inboundHttpLog.reset();
    inboundHttpLog();
    
    getListen()(t, () => {
        request(t);
    });
});

test('use the "error" level when status equals to 5xx', t => {
    inboundHttpLog.reset();
    inboundHttpLog({
        logger
    });
    
    logger.error = msg => {
        assertMsg(msg, t);
    }

    getListen(true)(t, () => {
        request(t);
    });
});

test('log the "headers" that were specified in the passed options', t => {
    inboundHttpLog.reset();
    inboundHttpLog({
        logger,
        headers: [
            'connection'
        ]
    });
    
    logger.info = msg => {
        assertMsg(msg, t);
    }

    getListen()(t, () => {
        request(t);
    });
});

test('not throw if create server has no argument', t => {
    inboundHttpLog.reset();
    inboundHttpLog();

    const server = http.createServer();

    server.listen(port, hostname, () => {
        server.close(() => t.end());
    });
});

test('throw Error if we try to appy the Proxy more than once', t => {
    inboundHttpLog.reset();
    inboundHttpLog();

    t.throws(() => {
        inboundHttpLog();
    }, new Error('inboundHttpLog Proxy Already Applied'));

    t.end();
});

test('throw error if we provide a "stringy" param that is not a function', t => {
    inboundHttpLog.reset();

    t.throws(() => {
        inboundHttpLog({stringify: {}});
    }, new Error('stringify must be a function'));

    t.end();
});

test('throw error if we provide a logger Object that has no "info" method', t => {
    inboundHttpLog.reset();

    t.throws(() => {
        inboundHttpLog({logger: {
            error: () => null
        }});
    }, new Error('logger.info must be a function'));

    t.end();
});

test('throw error if we provide a logger object that has no "error" method', t => {
    inboundHttpLog.reset();

    t.throws(() => {
        inboundHttpLog({logger: {
            info: () => null
        }});
    }, new Error('logger.error must be a function'));

    t.end();
});

test('throw error if we provide a headers value that is not an Array', t => {
    inboundHttpLog.reset();

    t.throws(() => {
        inboundHttpLog({headers: {}});
    }, new Error('headers must be an Array'));

    t.end();
});