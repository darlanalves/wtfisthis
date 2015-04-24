'use strict';

var request = require('request');

module.exports = function(req, res) {
	var result = '',
		url = parseUrl(req.url);

	if (!url) {
		return next();
	}

	request(url, function(error, response, body) {
		if (error || 200 < response.statusCode || response.statusCode >= 400) {
			return send(400, {
				error: true,
				message: error ? String(error) : response.statusCode + '\n' + body
			});
		}

		var urlData = require('url').parse(url);

		send(200, {
			URL: url,
			parsedURL: urlData,
			contentType: response.headers['content-type'],
			contentLength: response.headers['content-length'] || 0
		});
	});

	function send(code, result) {
		if (typeof result === 'object' && result) {
			result = JSON.stringify(result);
		}

		res.statusCode = code;
		res.setHeader('Content-Type', 'application/json');
		res.end(result);
		next();
	}

	function next() {
		res.emit('next');
	}
};

function parseUrl(url) {
	url = url.split('url=')[1];

	if (!url) return;

	if (url.indexOf('&') !== -1) {
		url = url.split('&')[0];
	}

	if (!url) return;

	return decodeURIComponent(url);
}
