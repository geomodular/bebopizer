var defaultEngine = require('./engines/default');

/* String to arraybuffer converter */
function str2ab(string) {
  var ab = new ArrayBuffer(string.length);
  var bytes = new Uint8Array(ab);
  for (var i = 0, len = string.length; i < len; i++) {
    bytes[i] = string.charCodeAt(i);
  }
  return ab;
}

var bebopFmaj = ['F', 'G', 'A', 'Bb', 'C', 'Db', 'D', 'E', 'f', 'g', 'a', 'bb', 'c', 'db', 'd', 'e'];

var Bebopizer = function(symbols, engine) {
  this.symbols = symbols || bebopFmaj;
  this.engine = engine || defaultEngine(bebopFmaj);
};

Bebopizer.prototype.encode = function encode(data) {
  if (typeof data === 'string') {
    return this.engine.encode(str2ab(data));
  }
  return this.engine.encode(data);
};

Bebopizer.prototype.decode = function decode(data) {
  return this.engine.decode(data);
};

Bebopizer.prototype.decodeToStr = function decodeToStr(data) {
  var ab = this.engine.decode(data);
  return String.fromCharCode.apply(null, new Uint8Array(ab));
};

Bebopizer.prototype.create = function create(symbols, engine) {
  return new Bebopizer(symbols, engine);
};

module.exports = new Bebopizer();

