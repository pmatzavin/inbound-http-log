require('fastHttpServer')({
    stringify: (obj) => { // See the comment at end of file to see the available data.
        return `${obj.req.method} ${obj.req.url} ${obj.res.status} ${obj.responseTime}ms`
    }
});
/*
 *  "example" obj passed to stringify:
 * 
 * {
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
 */