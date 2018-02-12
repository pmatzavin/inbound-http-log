# FastHttpLog

Log the HTTP requests that are coming to your server and the corresponding responses.

## Features

- It is fast (The fastest Node.js HTTP logger as far as I know) ([Benchmark](#benchmark)).
- The default log format is JSON ([Default Format](#default-format)).
- Simple to use. It Can be used with zero configuration ([Examples](#examples)).
- You can define your own log formats ([Custom Format](#custom-format)).
- You can define a request's header to be used as an id for the request/response transaction ([Trace Id](#trace-id)).
- It has no other dependencies. So it can be used with any `Node.js` framework (`Express`, `Koa`, and others).

<a name="examples"></a>
## Examples

The examples can be found in the [examples](https://github.com/pmatzavin/fast-http-log/tree/master/examples) folder.

The simplest example can be seen in [examples/hello.js](https://github.com/pmatzavin/fast-http-log/blob/master/examples/hello.js)

<a name="default-format"></a>
## Default Format

### Request

This will be logged in one line with no newline characters:

```json
{
  "date": "2018-01-14T13:41:39.993Z",
  "method": "GET",
  "url": "/api/v1/resource?key=val",
  "headers": {
    "host": "localhost:3001",
    "user-agent": "curl/7.43.0",
    "accept": "*/*"
  },
  "from": "::1:63409",
  "tag": "inbound_request"
}
```

### Response

This will be logged in one line with no newline characters:

```json
{
  "date": "2018-01-14T13:41:40.000Z",
  "statusCode": 200,
  "header": "HTTP/1.1 200 OK\r\nDate: Sun, 14 Jan 2018 13:41:39 GMT\r\nConnection: keep-alive\r\nContent-Length: 11\r\n\r\n",
  "tag": "outbound_response",
  "responseTime": 7,
  "method": "GET",
  "url": "/api/v1/resource?key=val"
}
```

<a name="custom-format"></a>
## Custom Format

See [examples/customTheme.js](https://github.com/pmatzavin/fast-http-log/blob/master/examples/customTheme.js)

<a name="trace-id"></a>
## Trace ID

See [examples/traceHeader.js](https://github.com/pmatzavin/fast-http-log/blob/master/examples/traceHeader.js)

<a name="benchmark"></a>
## Benchmark

The benchmark measures the average `throughput` (requests/second),
for two Node.js servers that serve the 'hello world' String.

One of the servers uses the `FastHttpLog`(not yet published) module for logging request/responses.

The other server uses the [http-pino](https://github.com/pinojs/pino-http) module.

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

![alt text](https://raw.githubusercontent.com/pmatzavin/fast-http-log/master/benchmark/reports/report-plot.png)

To run a step of the benchmark and get the results in the terminal:

```
cd benchmark

npm i

node fast-http-log.js

bash ./bench.sh 3001

node pino-server.js

bash ./bench.sh 3002
```
