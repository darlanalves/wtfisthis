/* jshint node: true */
'use strict';

var httpServer = require('http-server'),

	options = {
		before: [redirect],
		cors: true
	},

	server = httpServer.createServer(options),
	port = 6100,
	host = '0.0.0.0',
	domain = 'localhost:' + port;

server.listen(port, host, function() {
	console.log('Test server running on %s:%d', host, port);
});


function redirect(req, res) {
	if (req.url === '/foo') {
		res.statusCode = 302;
		res.setHeader('location', 'http://' + domain + '/bar');
		res.end();
		return;
	}

	if (req.url === '/bar') {
		res.end('OK bar');
		return;
	}

	res.emit('next');
}
