'use strict';

var is = {};

is.image = makeMatcher(/^image\/.+$/i);
is.video = makeMatcher(/^video\/.+$/i);
is.audio = makeMatcher(/^audio\/.+$/i);
is.html = makeMatcher(/^text\/html$/i);
is.css = makeMatcher(/^text\/css$/i);
is.xml = makeMatcher(/^text\/xml|application\/xml$/i);
is.javascript = makeMatcher(/^text\/javascript|application\/javascript$/i);

module.exports = is;

function makeMatcher(matcher) {
	return function(MIME) {
		return matcher.test(MIME);
	};
}
