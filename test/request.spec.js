var expect = require('expect.js');
var RequestMock = require('./request.mock');
var ResponseMock = require('./response.mock');
var proxyquire = require('proxyquire');

var Request = proxyquire('../lib/request', {
	request: RequestMock
});

describe('Request', function() {
	describe('#fetch(url, options, callback)', function() {
		afterEach(RequestMock.reset);

		it('should fetch a given URL', function() {
			var url = 'http://www.example.com/';
			var error, response;

			var callback = function(e, r) {
				error = e;
				response = r;
			};

			RequestMock.pushResponse({
				error: null,
				response: ResponseMock.createResponse(),
				body: 'body'
			});

			Request.fetch(url, {}, callback);

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

			var redirection = ResponseMock.createResponse();

			redirection.statusCode = 200;
			redirection.request = {
				href: finalUrl
			};

			RequestMock.pushResponse({
				error: null,
				response: redirection,
				body: 'body'
			});

			Request.fetch(initialUrl, {}, callback);

			expect(error).to.be(null);
			expect(response).not.to.be(undefined);
			expect(response._body).to.be('body');
		});
	});
});
