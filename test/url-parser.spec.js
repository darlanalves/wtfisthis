var urlParser = require('../lib/url-parser');
var expect = require('expect.js');

describe('UrlParser', function() {
	describe('#parse(URL)', function() {
		it('should return an object with properties of a requested URL', function() {
			var url = '/api/' + encodeURIComponent('http://www.google.com/') + '?graph=true&format=json';
			var urlData = urlParser.parse(url);

			expect(urlData.url).to.be('http://www.google.com/');
			expect(urlData.options.graph).to.be(true);
			expect(urlData.options.format).to.be('json');
		});

		it('should return an object with properties of an URL requested via query string', function() {
			var url = '/api/?url=' + encodeURIComponent('http://www.google.com/') + '&graph=true&format=json';
			var urlData = urlParser.parse(url);

			expect(urlData.url).to.be('http://www.google.com/');
			expect(urlData.options.graph).to.be(true);
			expect(urlData.options.format).to.be('json');
		});

		it('should return false for a invalid URL', function() {
			var urlData = urlParser.parse('');

			expect(urlData).to.be(false);
		});

		it('should assume HTTP if no protocol was specified', function() {
			var url = '/api/' + encodeURIComponent('www.google.com');
			var urlData = urlParser.parse(url);

			expect(urlData.url).to.be('http://www.google.com');
		});
	});
});
