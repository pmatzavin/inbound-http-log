const write = msg => process.stdout.write(msg + '\n');

module.exports = {
    info: write,
    error: write
};
