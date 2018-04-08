// I copied this fn from the http-pino source project
// In order to be fair in the benchmark comparison
// Becasue by default:
//// the inbound-http-log module will just execute a dull function:
//// () => null
//// and does not log a request id
function reqIdGenFactory (func) {
    if (typeof func === 'function') return func
    var maxInt = 2147483647
    var nextReqId = 0
    return function genReqId (req) {
      return req.id || (nextReqId = (nextReqId + 1) & maxInt)
    }
}

require('../index')({
    getRequestId: reqIdGenFactory()
});

const server = require('./server');
const port = 3001;

server(port);
