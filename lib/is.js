'use strict';

var is = function(contentType) {
	return {
		image: is.image(contentType),
		audio: is.audio(contentType),
		video: is.video(contentType),
		html: is.html(contentType),
		xml: is.xml(contentType),
		css: is.css(contentType),
		javascript: is.javascript(contentType)
	};
};

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
