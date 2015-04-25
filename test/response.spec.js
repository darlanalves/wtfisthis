var expect = require('expect.js');
var Response = require('../lib/response');
var responseMock = require('./response.mock');

describe('Response', function() {
	describe('#create(error, response)', function() {
		it('should return an object for successful requests', function() {
			var response = responseMock.createResponse();
			var body = 'foo bar';

			response._body = body;

			response.setHeader('content-type', 'text/css; charset=ISO-8859-1');
			response.setHeader('content-length', 128);
			response.statusCode = 200;

			var result = Response.create(null, response);

			expect(result.error).to.be(false);
			expect(result.code).to.be(200);

			expect(result.is.css).to.be(true);

			expect(result.content.type).to.be('text/css');
			expect(result.content.length).to.be(128);
		});

		it('should return an object for failed requests', function() {
			var response = responseMock.createResponse();
			var body = '404 Not Found';

			response._body = body;
			response.setHeader('content-type', 'image/jpeg');
			response.statusCode = 404;
			response.isError = true;

			var result = Response.create(null, response);

			expect(result.error).to.be(body);
			expect(result.code).to.be(404);

			expect(result.is.image).to.be(false);

			expect(result.content.type).to.be('');
			expect(result.content.length).to.be(0);
		});

		it('should return an object for errors', function() {
			var response = responseMock.createResponse();
			var body = 'Request failed';

			response._body = body;

			response.setHeader('content-type', 'image/jpeg');
			response.statusCode = 404;
			response.isError = true;

			var result = Response.create(null, response);

			expect(result.error).to.be(body);
			expect(result.code).to.be(404);

			expect(result.is.image).to.be(false);

			expect(result.content.type).to.be('');
			expect(result.content.length).to.be(0);
		});
	});

	describe('#createUrlObject(url)', function() {
		it('should create an object with info about the url', function() {
			var url = 'https://www.example.com:80/search?q=123#hash';
			var result = Response.createUrlObject(url);

			expect(result.href).to.be(url);
			expect(result.isSsl).to.be(true);
			expect(result.protocol).to.be('https');
			expect(result.host).to.be('www.example.com:80');
			expect(result.hostName).to.be('www.example.com');
			expect(result.port).to.be(80);
			expect(result.hash).to.be('#hash');
			expect(result.search).to.be('?q=123');
			expect(result.query).to.be('q=123');
			expect(result.queryParams.q).to.be('123');
			expect(result.path).to.be('/search?q=123');
			expect(result.pathName).to.be('/search');
		});
	});
});
