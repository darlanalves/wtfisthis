var request = require('request');

var Request = {};

Request.fetch = function(URL, callback) {
	fetchUrl(URL);

	function fetchUrl(URL) {
		request(URL, function(error, response, body) {
			if (response && (response.statusCode >= 300 && response.statusCode < 400) && response.headers.location) {
				fetchUrl(response.headers.location);
				return;
			}

			if (response && body) {
				response._body = body;
			}

			callback(error, response);
		});
	}
};

module.exports = Request;
