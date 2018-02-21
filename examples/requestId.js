require('fast-http-log')({
    getRequestId: (request) => {
        return request.headers['X-Request-Id'] || 1
    }
});