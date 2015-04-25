var Response = {};

Response.createResponse = function() {
	var response = {};

	response.headers = {};

	response.setHeader = function(name, value) {
		response.headers[name] = value;
	};

	response.statusCode = 0;

	return response;
};

module.exports = Response;
