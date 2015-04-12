var fs = require('fs');
var should = require('should');
var bebopizer = require('../lib/index');

function str2ab(string) {
  var ab = new ArrayBuffer(string.length);
  var bytes = new Uint8Array(ab);
  for (var i = 0, len = string.length; i < len; i++) {
    bytes[i] = string.charCodeAt(i);
  }
  return ab;
}

describe('Bebopizer\'s default engine', function() {
  it('should encode and decode string', function() {
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    var trans = bebopizer.decodeToStr(bebopizer.encode(lorem));
    trans.should.eql(lorem);
  });

  it('should encode and decode arraybuffer from file', function(done) {
    fs.readFile('./test/res/rnd512', function(err, data) {
      if (err) return done(err);
      var trans = bebopizer.decode(bebopizer.encode(data));
      trans.should.eql(new Uint8Array(data).buffer);
      done();
    });
  });
});

describe('Bebopizer\'s custom scale', function() {

  var custom;
  before(function() {
    var scale = ['C', 'D', 'E', 'F', 'F#', 'G', 'A', 'B', 'c', 'd', 'e', 'f', 'f#', 'g', 'a', 'b', 'c'];
    custom = bebopizer.create(scale);
  });

  it('should encode and decode string', function() {
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    var trans = custom.decodeToStr(custom.encode(lorem));
    trans.should.eql(lorem);
  });

  it('should encode and decode arraybuffer from file', function(done) {
    fs.readFile('./test/res/rnd512', function(err, data) {
      if (err) return done(err);
      var trans = custom.decode(custom.encode(data));
      trans.should.eql(new Uint8Array(data).buffer);
      done();
    });
  });
});
