const getDefaults = () => {
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

const validate = ({stringify, logger, headers}) => {
    if (typeof stringify !== 'function') {
        throw new Error('stringify must be a function')
    }

    if (typeof logger.info !== 'function') {
        throw new Error('logger.info must be a function');
    }

    if (typeof logger.error !== 'function') {
        throw new Error('logger.error must be a function');
    }

    if (headers !== undefined && !Array.isArray(headers)) {
        throw new Error('headers must be an Array');
    }
};

module.exports = {
    getDefaults,
    validate
};
