const getCurrentTime = () => new Date().getTime();

module.exports = ({
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
            const parsedReqRes = {
                req: {
                    time: startedAt,
                    method: req.method,
                    url: req.url,
                    headers: !headers ?
                        reqHeaders :
                        headers.reduce((acc, header) => {
                            acc[header] = reqHeaders[header];
                            return acc;
                        },{}),
                    from: req.connection.remoteAddress,
                },
                res: {
                    time: endedAt,
                    status,
                    header: res._header,
                },
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
