const os = require('os')
const getCurrentTime = () => new Date().getTime();

const pid = process.pid;
const hostname = os.hostname();

const parseReqDefault = (req, {headers} = {}) => {
    const reqHeaders = req.headers;
    return {
        method: req.method,
        url: req.url,
        headers: !headers ?
            reqHeaders :
            headers.reduce((acc, header) => {
                acc[header] = reqHeaders[header];
                return acc;
            },{}),
        from: req.connection.remoteAddress
    };
};

const parseResDefault = res => {
    return {
        status: res.statusCode,
        header: res._header,
    };
};

module.exports = ({
    parseReq = parseReqDefault,
    parseRes = parseResDefault,
    stringify,
    logger,
    headers,
    getRequestId
}) => {
    return (req, res) => {
        const startedAt = getCurrentTime();
        const reqHeaders = req.headers;
        req.on('end', () => {
            const endedAt = getCurrentTime();
            const status = res.statusCode;
            const parsedReq = parseReq(req, {headers});
            const parsedRes = parseRes(res);
            const parsedReqRes = {
                req: parsedReq,
                res: parsedRes,
                pid,
                hostname,
                id: getRequestId(req),
                responseTime: endedAt - startedAt,
                tag: 'served'
            };
            const msg = stringify(parsedReqRes);
            const level = status >= 500 ? 'error' : 'info';
            logger[level](msg);
        });
    };
};
