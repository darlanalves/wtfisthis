function request(url, callback) {
	var response = request.responses.shift();
	callback(response.error, response.response, response.body);
}

request.responses = [];

request.pushResponse = function(response) {
	request.responses.push(response);
};

module.exports = request;
