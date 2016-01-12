//2nd step. define io so index.js can use it. We already have an io constant set up in index.js
// if you were serving this from a web app, you could add the url of the api as an argument.
// ex: var socket = io('http:mycoolapp.com');
var socket = io();

// third step - define what you want to happen on the socket side when it is connected.
// 6th step - use socket.send on the client(application.js) side.
socket.on('connect', function() {

});

// step 10. then to index.js for step 11
socket.on('chat message', function(message) {
  $('.messages').append(`<div><h3>${message.username}</h3><p>${message.text}</p></div>`);
});

$('.submit-message').on('click', function(e) {
  e.preventDefault();

  var username = $('.new-message .username').val();
  var message = $('.new-message .message').val();

  socket.send('chat message', {
    username: username,
    text: message
  })
});

// step 5 - define your socket.on with arguments
//socket.on('message', function(message) {
  // step 8 - what happens when you get the message from the server. Then to step 9 - write html to index.html
  //$('.messages').append();
//});

// TO DEPLOY - after steps!!! - deploy - user a procFile that says: web: node index.js - then in console use heroku create, git push
// heroku master, heroku open
