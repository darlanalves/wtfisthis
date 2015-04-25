var URLParser = {};
var nodeUrl = require('url');
var queryString = require('query-string');

URLParser.parse = function parseUrl(url) {
	var params = extractURLParams(url);

	if (!params) return false;

	var urlData = nodeUrl.parse(params.url);
	urlData.slashes = true;

	// resolve www.domain.com to http://www.domain.com
	if (!urlData.protocol) {
		urlData.protocol = 'http:';
	}

	if (urlData.pathname && !urlData.hostname) {
		urlData.hostname = urlData.pathname;
		urlData.pathname = null;
	}

	return {
		url: nodeUrl.format(urlData),
		options: params.options
	};
};

var URLmatcher = /\/api\/([^\/?]+)(?:\?(.+))?/;

function extractURLParams(URL) {
	var match = String(URL).match(URLmatcher);

	if (!match) return null;

	var requestedUrl = decodeURIComponent(match[1]),
		options = match[2] ? queryString.parse(match[2]) : {};

	Object.keys(options).forEach(function(key) {
		if (options[key] === 'true') {
			options[key] = true;
		}

		if (options[key] === 'false') {
			options[key] = false;
		}
	});

	return {
		url: requestedUrl,
		options: options
	};
}

module.exports = URLParser;
