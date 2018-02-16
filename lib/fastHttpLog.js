const http = require('http');
const https = require('https');

const createLog = require('./createLog');
const validate = require('./validate');
const options = require('./options')();
const State = require('./state');

const state = new State();

module.exports = ({
    stringify = options.stringify,
    logger = options.logger,
    getRequestId = options.getRequestId,
    headers = options.headers
} = {}) => {
    validate({stringify, logger, headers});

    state.init(http.createServer, https.createServer);

    const log = createLog({
        stringify,
        logger,
        getRequestId,
        headers
    });

    const proxyHandlerRequestListener =  {
        apply: (
                requestListenerOriginal,
                thisArg,
                [request, response, ...rest]
        ) => {
            log(request, response);
            return requestListenerOriginal.apply(
                thisArg,
                [request, response, ...rest]
            );
        }
    };

    const proxyCreateServer = new Proxy(http.createServer, {
        apply: (
            createServerOriginal,
            thisArg,
            [requestListener, ...rest]
        ) => {
            requestListener = new Proxy(
                requestListener,
                proxyHandlerRequestListener
            );
            return createServerOriginal.apply(
                thisArg,
                [requestListener, ...rest]
            );
        }
    });

    http.createServer = proxyCreateServer;
    https.createServer = proxyCreateServer;
};

module.exports.reset = () => {
    const {
        httpCreateServerOriginal,
        httpsCreateServerOriginal
    } = state;

    if (httpCreateServerOriginal) {
        http.createServer = httpCreateServerOriginal;
    }
    
    if (httpsCreateServerOriginal) {
        https.createServer = httpsCreateServerOriginal;
    }
    
    state.reset();
};
