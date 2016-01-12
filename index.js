const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');
const client = redis.createClient();


client.subscribe("community");

client.on('message', function(channel, message) {
    console.log(channel, message);
    io.sockets.emit('chat message', JSON.parse(message));
});

const path = require('path');
app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

//1st step add an io.on listener in index.js. Then go to public/application.js
// fourth step add an emitter on the io.on side to send a message. Then back to app.js for step 5.
// socket.emit will emit whatever you put into the arguments
// on the server(index.js), you say socket.emit. on the client, you say socket.send
io.on('connection', function(socket) {
  console.log('Someone has connected.');
  // 7th step - use socket.on
  socket.on('message', function(channel, message) {
  // step 11. then back to app.js for step 12
    io.sockets.emit('chat message', message);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
