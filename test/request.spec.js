var expect = require('expect.js');
var requestMock = require('./request.mock');
var responseMock = require('./response.mock');
var proxyquire = require('proxyquire');

var Request = proxyquire('../lib/request', {
	request: requestMock
});

describe('Request', function() {
	describe('#fetch(url, callback)', function() {
		it('should fetch a given URL', function() {
			var url = 'http://www.example.com/';
			var error, response;

			var callback = function(e, r) {
				error = e;
				response = r;
			};

			requestMock.pushResponse({
				error: null,
				response: responseMock.createResponse(),
				body: 'body'
			});

			Request.fetch(url, callback);

			expect(error).to.be(null);
			expect(response).not.to.be(undefined);
			expect(response._body).to.be('body');
		});

		it('should follow redirections', function() {
			var initialUrl = 'http://www.example.com/';
			var finalUrl = 'https://www.example.com/';

			var error, response;

			var callback = function(e, r) {
				error = e;
				response = r;
			};

			var redirection = responseMock.createResponse();

			redirection.statusCode = 200;
			redirection.request = {
				href: finalUrl
			};

			requestMock.pushResponse({
				error: null,
				response: redirection,
				body: 'body'
			});

			Request.fetch(initialUrl, callback);

			expect(error).to.be(null);
			expect(response).not.to.be(undefined);
			expect(response._body).to.be('body');
		});
	});
});
