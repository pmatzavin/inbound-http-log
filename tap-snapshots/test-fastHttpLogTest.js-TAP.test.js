/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/fastHttpLogTest.js TAP log the request and the response > output 1`] = `
{ req: 
   { method: 'GET',
     url: '/',
     headers: { host: '127.0.0.1:3000', connection: 'close' } },
  res: 
   { status: 200,
     header: 'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\nDate: today\\r\\nConnection: close\\r\\nContent-Length: 12\\r\\n\\r\\n' },
  responseTime: 0,
  tag: 'served' }
`

exports[`test/fastHttpLogTest.js TAP use the "error" level when status equals to 5xx > output 1`] = `
{ req: 
   { method: 'GET',
     url: '/',
     headers: { host: '127.0.0.1:3000', connection: 'close' } },
  res: 
   { status: 500,
     header: 'HTTP/1.1 500 Internal Server Error\\r\\nContent-Type: text/plain\\r\\nDate: today\\r\\nConnection: close\\r\\nContent-Length: 12\\r\\n\\r\\n' },
  responseTime: 0,
  tag: 'served' }
`

exports[`test/fastHttpLogTest.js TAP log the "headers" that were specified in the passed options > output 1`] = `
{ req: { method: 'GET', url: '/', headers: { connection: 'close' } },
  res: 
   { status: 200,
     header: 'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\nDate: today\\r\\nConnection: close\\r\\nContent-Length: 12\\r\\n\\r\\n' },
  responseTime: 0,
  tag: 'served' }
`
