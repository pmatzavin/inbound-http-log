require('fatHttpLog')({
    getRequestId: (request) => {
        return request.headers['X-Request-Id'] || 1
    }
});