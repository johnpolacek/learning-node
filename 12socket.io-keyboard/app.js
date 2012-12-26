var static = require('node-static'),
	http = require('http'),
	util = require('util'),
	url = require('url'),
	fs = require('fs');

var fileServer = new static.Server();

var server = http.createServer(function (req, res) {

	var pathname = url.parse(req.url).pathname;
	console.log('pathname: '+pathname);

	if (pathname === '/control') {
		// controls
		res.writeHead(200, { 'Content-type': 'text/html'});
		res.end(fs.readFileSync(__dirname + '/control.html'));
	
	} else {
		// controls
		res.writeHead(200, { 'Content-type': 'text/html'});
		res.end(fs.readFileSync(__dirname + '/index.html'));
	}


}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){

	socket.on('message', function(message){
		socket.broadcast.emit('message', message);
	});

	socket.on('disconnect', function(){
		console.log("Connection " + socket.id + " terminated.");
	});

});
 