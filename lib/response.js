var nodeUrl = require('url');
var is = require('./is');
var queryString = require('query-string');

var Response = {};

Response.create = function(error, options, response) {
	options = options || {};

	var isError = Boolean(error || !response || (200 < response.statusCode || response.statusCode >= 400));
	var contentType, contentSize;

	if (response) {
		var headers = response ? response.headers : {};

		contentType = response._type;
		contentSize = headers['content-length'] || (response && response._body || '').length;
	}

	var code = isError ? (response ? response.statusCode : 400) : (response.statusCode || 200);
	var errorMessage = isError ? String(error || (response && response._body) || '').slice(0, 256) : false;

	var result = {
		error: errorMessage,
		code: code,
		is: is(isError ? '' : contentType),
		content: {
			type: isError ? '' : contentType,
			length: isError ? 0 : contentSize,
		}
	};

	if (response) {
		result.meta = response._metaTags || {};
		result.twitter = response._twitter || {};
		result.facebook = response._openGraph || {};
	}

	return result;
};

Response.createUrlObject = function(url) {
	var urlData = nodeUrl.parse(url);
	var protocol = urlData.protocol.replace(':', '');
	var isSsl = protocol === 'https';
	var isHttp = protocol === 'http' || isSsl;
	var queryParams = urlData.query ? queryString.parse(urlData.query) : {};

	return {
		isSsl: isSsl,
		isHttp: isHttp,
		protocol: protocol,
		host: urlData.host,
		port: urlData.port ? Number(urlData.port) : null,
		hostName: urlData.hostname,
		hash: urlData.hash,
		search: urlData.search,
		query: urlData.query,
		queryParams: queryParams,
		pathName: urlData.pathname,
		path: urlData.path,
		href: urlData.href
	};
};

module.exports = Response;
