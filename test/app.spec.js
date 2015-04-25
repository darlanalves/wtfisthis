'use strict';

var expect = require('expect.js');
var sinon = require('sinon');
var app = require('../lib/app');
// var request = require('./request.mock');
var response = require('./response.mock');
var proxyquire = require('proxyquire');

var RequestMock = {};
var ResponseMock = {};

var app = proxyquire('../lib/app', {
	'./request': RequestMock,
	'./response': ResponseMock
});

describe('app(req, res): the app is a middleware that handles a request and creates the response as JSON', function() {
	it('should parse the url parameter and fetch the details', function() {
		var URL = 'http://www.google.com/';

		RequestMock.fetch = function(url, callback) {
			RequestMock.args = {
				url: url,
				callback: callback
			};
		};

		ResponseMock.response = {
			code: 200
		};

		ResponseMock.create = function(error, response) {
			ResponseMock.createArgs = {
				error: error,
				response: response
			};

			return ResponseMock.response;
		};

		ResponseMock.createUrlObject = function() {
			return {};
		};

		var req = {
			url: '/api/' + encodeURIComponent(URL)
		};

		var res = response.createResponse();
		res.emit = sinon.spy();
		res.end = sinon.spy();

		app(req, res);

		expect(RequestMock.args.url).to.be(URL);

		var remoteResponse = {
			_href: URL
		};

		RequestMock.args.callback(null, remoteResponse);

		expect(ResponseMock.createArgs.error).to.be(null);
		expect(ResponseMock.createArgs.response).to.be(remoteResponse);

		expect(ResponseMock.response.redirected).to.be(false);

		expect(res.statusCode).to.be(ResponseMock.response.code);
		expect(res.headers['content-type']).to.be('application/json');
		expect(res.end.called).to.be(true);
		expect(res.emit.calledWith('next')).to.be(true);
	});
});
