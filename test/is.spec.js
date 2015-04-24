var is = require('../lib/is');
var expect = require('expect.js');

describe('is', function() {
	describe('#audio(MIME)', function() {
		it('should return true', function() {
			expect(is.audio('audio/midi')).to.be(true);
			expect(is.audio('audio/mpeg')).to.be(true);
		});

		it('should return false', function() {
			expect(is.audio('text/xml')).to.be(false);
			expect(is.audio('video/xml')).to.be(false);
		});
	});

	describe('#video(MIME)', function() {
		it('should return true', function() {
			expect(is.video('video/mpeg')).to.be(true);
			expect(is.video('video/avi')).to.be(true);
		});

		it('should return false', function() {
			expect(is.video('audio/mpeg')).to.be(false);
			expect(is.video('text/xml')).to.be(false);
		});
	});

	describe('#image(MIME)', function() {
		it('should return true', function() {
			expect(is.image('image/png')).to.be(true);
			expect(is.image('image/jpeg')).to.be(true);
		});

		it('should return false', function() {
			expect(is.image('text/xml')).to.be(false);
		});
	});

	describe('#html(MIME)', function() {
		it('should return true', function() {
			expect(is.html('text/html')).to.be(true);
		});

		it('should return false', function() {
			expect(is.html('text/xml')).to.be(false);
			expect(is.html('text/css')).to.be(false);
		});
	});

	describe('#xml(MIME)', function() {
		it('should return true', function() {
			expect(is.xml('application/xml')).to.be(true);
			expect(is.xml('text/xml')).to.be(true);
		});

		it('should return false', function() {
			expect(is.xml('text/css')).to.be(false);
		});
	});

	describe('#css(MIME)', function() {
		it('should return true', function() {
			expect(is.css('text/css')).to.be(true);
		});

		it('should return false', function() {
			expect(is.css('text/html')).to.be(false);
			expect(is.css('text/xml')).to.be(false);
		});
	});

	describe('#javascript(MIME)', function() {
		it('should return true', function() {
			expect(is.javascript('application/javascript')).to.be(true);
			expect(is.javascript('text/javascript')).to.be(true);
		});

		it('should return false', function() {
			expect(is.javascript('text/xml')).to.be(false);
			expect(is.javascript('text/css')).to.be(false);
		});
	});
});
