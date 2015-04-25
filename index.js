/* jshint node: true */
'use strict';

var app = require('./lib/app'),
	httpServer = require('http-server'),

	options = {
		before: [app],
		cors: true,
		showDir: 'false',
		autoIndex: 'false'
	},

	server = httpServer.createServer(options),
	port = parseInt(process.env.PORT, 10) || 5000,
	host = process.env.HOST || '0.0.0.0';

server.listen(port, host, function() {
	console.log('Running on %s:%d', host, port);
});
