describe('Bebopizer\'s default engine', function() {
  it('should encode and decode string', function() {
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    var trans = bebopizer.decodeToStr(bebopizer.encode(lorem));
    trans.should.eql(lorem);
  });

  it('should encode and decode arraybuffer', function(done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/webtest/res/rnd512', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      var trans = bebopizer.decode(bebopizer.encode(this.response));
      trans.should.eql(this.response);
      done();
    };
    xhr.send();
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

  it('should encode and decode arraybuffer', function(done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/webtest/res/rnd512', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      var trans = custom.decode(custom.encode(this.response));
      trans.should.eql(this.response);
      done();
    };
    xhr.send();
  });
});

