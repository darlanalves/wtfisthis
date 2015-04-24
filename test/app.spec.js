'use strict';

var expect = require('expect.js');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var request = require('./request.mock.js');
var app = proxyquire('../lib/app', {
	request: request
});

describe('app(req, res): the app is a middleware that handles a request and creates the response as JSON', function() {
	beforeEach(request.reset);

	describe('should parse the url parameter and request it', function() {
		var URL = 'http://www.google.com';

		var req = {
			url: '?url=' + encodeURIComponent(URL)
		};

		var res = {
			setHeader: sinon.spy(),
			end: sinon.spy()
		};

		app(req, res);

		expect(request.response.statusCode).to.be(200);
		expect(request.spy.calledWith(URL)).to.be(true);
	});
});
