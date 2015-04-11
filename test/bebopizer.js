var should = require('should');
var bebopizer = require('../lib/index');

describe('Bebopizer library', function() {

  var b;

  before(function() {
    // Bebop dominant
    b = bebopizer(['C', 'D', 'E', 'F', 'F#', 'G', 'A', 'H', 'c', 'd', 'e', 'f', 'f#', 'g', 'a', 'h']);
  });

  it('should throw error', function() {
    should.throws(function() {
      bebopizer(['c', 'd']);
    });
  });

  it('should encode string', function() {
    b.encode('abc').should.eql('DAEAFA');
  });

  it('should decode string', function() {
    b.decode('DAEAFA').should.eql('abc');
  });

  it('should encode and decode string', function() {
    var original = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    var trans = b.decode(b.encode(original));
    trans.should.eql(original);
  });
});

