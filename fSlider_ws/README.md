fSlider_ws V0.1.7
===
a Framework of super light weight implement WebSocket Protocol, used in project fSlider

##### features

+ easy to use
+ super light weight
+ high performance
+ full event driven
+ suit for newbies' learnning. such as creating a chat room...
+ no third part modules dependience

##### repo states

now in v0.1.7, implement websocket server  
TODO: ws as a client, implement the security mechanism descripted in RFC 6455

##### Usage

create a websocket server:

```js

  var fs = require('fs');
  var http = require('http');
  var WServer = require('fSlider_ws').Server;

  var httpd = http.createServer(function(req, res) {
    res.end('test');
  });

  var ws = new WServer(httpd).listen(function () {
    console.log('wsf: server start');
  });

  ws.on('connected', function(socket) { 
    // no timeout limit
    //socket.setTimeout(0);
    
    // manual set the timeout to 10s
    socket.setTimeout(10 * 1000);
    
    // send binary data
    // listen on app-level event "data" from client
    socket.recive(function(data) {
      // every time when connected, send a random picture ^_^
      data = fs.readFileSync("" + parseInt(Math.random() * 5));
      socket.send(data);
    });

    // listen on app-level custom event from client
    socket.on('geek', function (data) {
      console.log(data);
      // emit app-level custom event to client
      socket.emit('geekcomming', data + ' Aizen');
    });
    util.log('client id: ' + socket.id + ' online'); 
  });

  httpd.listen(3000);
```

as client:

```html

  <body>
    <img id="ws"></img>
    <script src="fSlider_ws/frontend/event.js/event.js"></script>
    <script src="fSlider_ws/frontend/wsf.js"></script>
    <script>
      /* reference usage */
      wsf.connect('ws://localhost:3000', function (socket) {
        // in default setting, 'reconnect' is enabled
        // invoke `socket.autoreconnect = false` to disabled
        console.log('connected');
        // set "normal-reconnect" no-delay
        // in "error-reconnect", once expire is set to 0, 
        // it'll automatic revalued to 6000
        socket.expire = 0;
        var bin = new Blob(['hihihi']);
        socket.send(bin);

        socket.on('error', function (data) {
          socket.close();
        });
        socket.on('close', function (info) {
          console.log('bye', info);
        })
        socket.recive(function (data) {
          bloburl = URL.createObjectURL(data);
          document.querySelector('#ws').src = bloburl;
        });
        socket.on('geekcomming', function (data) {
          console.log(data);
          socket.close();
        });
        socket.emit('geek', 'Ran');
    </script>
  </body>
```

Server Options:

```js

    var options = {
      namespace: '/news',     // default to '/'
      max: 100                // default to 60
    };

    new WServer(httpServer, options);
```

Other usages:

```js

    wsf.connect();
    
    server.bind();

    server.unbind();

    server.broadcast();

    server.emit();

    server.on();

    server.removeListener();
    
    client.emit();

    client.setTimeout();
    
    client.sysEmit();
    
    client.emitCtrl();
    
    client.send();
    
    client.recive();

    client.destroy();

    client.close();
```

##### Server System Level Events
these events' name are important and shouldn't be overwrited or conflict in application

```js
    
    'listen' 
        @httpServer: new http.Server()
    'uptolimit' 
        @limit: new wsf.Server().MAX
    'disconnected' 
        @client: new Client()
    'closing' 
        @data: new Buffer()
    'drained' 
        @bufferSize: socket.bufferSize
    'timeout'
        (none)
    'exception' 
        @err: new Error()
    'connected' 
        @client: new Client()
```