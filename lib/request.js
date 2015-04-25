var request = require('request');

var Request = {};

Request.fetch = function(URL, callback) {
	request(URL, function(error, response, body) {
		if (response) {
			response._body = body;
			response._href = response.request ? response.request.href : '';
		}

		callback(error, response);
	});
};

module.exports = Request;
