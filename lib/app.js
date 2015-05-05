'use strict';

var Request = require('./request');
var Response = require('./response');
var URLParser = require('./url-parser');

module.exports = function(req, res) {
	var urlData = URLParser.parse(req.url);

	if (!urlData) {
		return next();
	}

	Request.fetch(urlData.url, urlData.options, function(error, remoteResponse) {
		var result = Response.create(error, urlData.options, remoteResponse);

		result.redirected = false;

		if (remoteResponse && remoteResponse._href && remoteResponse._href !== urlData.url) {
			result.redirected = true;
			result.finalUrl = Response.createUrlObject(remoteResponse._href);
		}

		result.url = Response.createUrlObject(urlData.url);

		send(result.code, result);
	});

	function send(code, result) {
		if (typeof result === 'object' && result) {
			result = JSON.stringify(result, null, '  ');
		}

		res.statusCode = code;
		res.setHeader('content-type', 'application/json');
		res.end(result);

		next();
	}

	function next() {
		res.emit('next');
	}
};
