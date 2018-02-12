module.exports = class {
    constructor() {
        this.isAlreadyApplied = false;
        this.httpCreateServerOriginal = undefined;
        this.httpsCreateServerOriginal = undefined;
    }

    createAlreadyAppliedError() {
        const message = 'FastHttpLog Proxy Already Applied';
        const code = 1;
        const error = new Error(message);
        error.code = code;
        return error;
    }

    init(httpCreateServerOriginal, httpsCreateServerOriginal) {
        if (this.isAlreadyApplied) {
            throw this.createAlreadyAppliedError();
        }
        this.isAlreadyApplied = true;
        this.httpCreateServerOriginal = httpCreateServerOriginal;
        this.httpsCreateServerOriginal = httpsCreateServerOriginal;
    }

    reset() {
        this.isAlreadyApplied = false;
        this.httpCreateServerOriginal = undefined;
        this.httpsCreateServerOriginal = undefined;
    }
};
