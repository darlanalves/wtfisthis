var sinon = require('sinon');

function request(url, callback) {
	request.spy.apply(request.spy, arguments);
	callback(request.data.error, request.data.response, request.data.body);
}

request.setResponse = function(value) {
	request.data.response = value;
};

request.setBody = function(value) {
	request.data.body = value;
};

request.setError = function(value) {
	request.data.error = value;
};

request.reset = function() {
	request.spy = sinon.spy();
	request.data = {};
};

request.reset();

module.exports = request;
