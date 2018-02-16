module.exports = () => {
    const write = msg => process.stdout.write(msg + '\n');

    return {
        logger: {
            info: write,
            error: write
        },
        stringify: JSON.stringify,
        getRequestId: () => undefined,
        headers: undefined
    };
};
