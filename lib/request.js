var request = require('request');
var orgasmatron = require('orgasmatron');
var async = require('async');
var is = require('./is');
// var opengrapher = require('opengrapher');

var Request = {};

Request.fetch = function(URL, options, callback) {
	options = options || {};

	async.waterfall([
		function(cb) {
			fetchUrl(URL, cb);
		},

		function metaTags(response, next) {
			if (!response) {
				next(new Error('404'), null);
				return;
			}

			fetchMeta(response._href, response, next);
		}

		/*function(response, next) {
			if (options.graph) {
				fetchOpenGraph(response._href, response, next);
			} else {
				next(null, response);
			}
		},*/
	], callback);
};

function fetchUrl(url, next) {
	request(url, function(error, response, body) {
		if (!response) {
			next(error, null);
			return;
		}

		var headers = response ? response.headers : {};
		var contentType = headers['content-type'] || '';

		// remove option values from header
		contentType = contentType.replace(/;.+$/g, '');

		response._type = contentType;
		response._body = body;
		response._href = response.request ? response.request.href : '';

		next(error, response);
	});
}

/*function fetchOpenGraph(url, response, next) {
	opengrapher.parse(url, function(error, og) {
		if (!error) {
			response._opengraph = og;
		}

		next(error, response);
	});
}*/

function fetchMeta(url, response, next) {
	if (!is.html(response._type)) {
		next(null, response);
		return;
	}

	orgasmatron(url, function(error, bundle) {
		if (!error) {
			var meta = {},
				twitter = {},
				openGraph = {},

				openGraphMatcher = /^(og|fb):/i,
				twitterMatcher = /^twitter:/i,

				tags = bundle.where('meta');

			tags.forEach(function(tag) {
				var name = tag.name || tag.property || tag['http-equiv'],
					value = tag.content;

				if (!name) return;

				meta[name] = value;

				if (openGraphMatcher.test(name)) {
					openGraph[name.replace(openGraphMatcher, '')] = value;
				}

				if (twitterMatcher.test(name)) {
					twitter[name.replace('twitter:', '')] = value;
				}
			});

			response._metaTags = meta;
			response._twitter = twitter;
			response._openGraph = openGraph;
		}

		next(error, response);
	});
}

module.exports = Request;
