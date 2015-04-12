(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.bebopizer = require('./index');

},{"./index":3}],2:[function(require,module,exports){
module.exports = function(symbols) {
  if (symbols.length != 16)
    throw new Error('The symbols has a wrong length 16 != ' + symbols.length);

  return {
    /* input arrayBuffer or buffer */
    encode: function(buffer) {
      var bytes = new Uint8Array(buffer),
        result = '';
      for (var i = 0, len = bytes.buffer.byteLength; i < len; i++) {
        result += symbols[bytes[i] & 15];
        result += symbols[bytes[i] >> 4];
      }
      return result;

      // This does not work in current implementation
      //var bytes = new Uint8Array(buffer);
      //return bytes.reduce(function(acc, byte) {
        //acc += symbols[byte & 15];
        //acc += symbols[byte >> 4];
        //return acc;
      //}, '');
    },
    decode: function(string) {
      var i = 0,
        bytes = [];

      while (i < string.length) {
        var lowNote = string[i++];
        if (string[i] === '#' || string[i] === 'b')
          lowNote += string[i++];

        var highNote = string[i++];
        if (string[i] === '#' || string[i] === 'b')
          highNote += string[i++];

        var low = symbols.indexOf(lowNote);
        var high = symbols.indexOf(highNote);
        bytes.push((high << 4) | low);
      }

      return (new Uint8Array(bytes)).buffer;
    }
  };
};


},{}],3:[function(require,module,exports){
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


},{"./engines/default":2}]},{},[1]);
