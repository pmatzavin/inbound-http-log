# FastHttpLog

Log the inbound HTTP traffic of yout server (requests/responses).

## Features

- Log each served request/response.
- The default log format is JSON ([Default Format](#default-format)).
- Supports custom message formats ([Custom Format](#custom-format)).
- No logger is required.
- It can be used with any logger of your choice (`winston`, `pino`, `log4js` or others) ([Loggers](#loggers))
- Supports request IDs ([Request Id](#request-id)).
- Supports request header white-listing ([Log Headers](#log-headers))
- It can be used with any `Node.js` framework (`Express`, `Koa`, or others).

- It has no other dependencies. 
- It is simple to use, by just adding one line to your code([How To Use](#how-to-use)).

<a name="how-to-use"></a>
## How To Use

Install:

`npm i --save inbound-http-log`

Use it in your server:

`require('inbound-http-log')()`

<a name="examples"></a>
## Examples

The examples can be found in the [examples](https://github.com/pmatzavin/inbound-http-log/tree/master/examples) folder.

<a name="default-format"></a>
## Default Format

```json
{
  "req": {
    "time": 1519231699701,
    "method": "GET",
    "url": "/",
    "headers": {
      "host": "localhost:3001",
      "connection": "keep-alive"
    },
    "from": "::ffff:127.0.0.1"
  },
  "res": {
    "time": 1519231699706,
    "status": 200,
    "header": "HTTP/1.1 200 OK\r\nDate: Wed, 21 Feb 2018 16:48:19 GMT\r\nConnection: keep-alive\r\nContent-Length: 11\r\n\r\n"
  },
  "pid": 42394,
  "hostname": "MacBook-Pro.local",
  "id": 465143,
  "responseTime": 5,
  "tag": "served"
}
```

<a name="custom-format"></a>
## Custom Format

```js
// example
require('inbound-http-log')({
    stringify: (obj) => { 
        return `${obj.req.method} ${obj.req.url} ${obj.res.status} ${obj.responseTime}ms`
    }
});
```

If the [default parsed request/response]((#default-format)) does not suit your needs, 
then you can specify your own parsers:

```js
require('inbound-http-log')({
    parseReq: request => { 
        // parse the given request and return the parsed object
    },
    parseRes: response => {
      // parse the given response and return the parsed object
    }
});
```

<a name="loggers"></a>
## Loggers

By default no other logger is required.

It Supports integration with any other logger by passing your logger instance in the `options` argument:

```js
require('inbound-http-log')({
  logger: // put your logger instance here
});
```

<a name="request-id"></a>
## Request ID

```js
// example
require('inbound-http-log')({
    getRequestId: (request) => {
        return request.headers['X-Request-Id'] || 1
    }
});
```

<a name="log-headers"></a>
## Log Headers

By default all the request's headers will be logged.

If this is not the desired behavior,
 then you can specify which request headers will be logged.

To do this, give an Array of headers in the `options` Object.

```js
// example
require('inbound-http-log')({
    headers: ['connection', 'Authorization'] 
});
```

<a name="benchmark"></a>
## Benchmark

The benchmark measures the average `throughput` (requests/second),
for two Node.js servers that serve the 'hello world' String.

- One of the servers uses the `FastHttpLog`.
- The other server uses the [http-pino](https://github.com/pinojs/pino-http).

The benchmark runs in five steps.

Each step is executed using [autocannon](https://www.npmjs.com/package/autocannon) with 100 connections and 10 pipelined requests.

The hardware used for the benchmark is the following:

```
➜  ~ /usr/sbin/system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Model Identifier: MacBookPro12,1
      Processor Name: Intel Core i5
      Processor Speed: 2,7 GHz
      Number of Processors: 1
      Memory: 16 GB
```

![alt text](https://raw.githubusercontent.com/pmatzavin/inbound-http-log/master/benchmark/reports/report-plot.png)

To run a step of the benchmark and get the results in the terminal:

```
cd benchmark

npm i

node inbound-http-log.js

bash ./bench.sh 3001

node pino-server.js

bash ./bench.sh 3002
```
