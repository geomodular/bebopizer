/**
 * Main module. Provides the bebopizer class
 *
 * @module bebopizer
 */

var defaultEngine = require('./engines/default');

/**
 * A string to an arraybuffer converter. This function is used to
 * ensure the same interface for the engine inside encode function
 */
function str2ab(string) {
  var ab = new ArrayBuffer(string.length);
  var bytes = new Uint8Array(ab);
  for (var i = 0, len = string.length; i < len; i++) {
    bytes[i] = string.charCodeAt(i);
  }
  return ab;
}

/**
 * A list of 16 notes. This is the F major bebop scale
 */
var bebopFmaj = ['F', 'G', 'A', 'Bb', 'C', 'Db', 'D', 'E', 'f', 'g', 'a', 'bb', 'c', 'db', 'd', 'e'];

/**
 * The main bebopizer class
 *
 * @class Bebopizer
 * @constructor
 * @param [symbols=bebopFmaj] {list} List of notes with length of 16
 * @param [engine=defaultEngine] {engine} Encoder/decoder object with known interface
 */
function Bebopizer(symbols, engine) {
  this.symbols = symbols || bebopFmaj;
  this.engine = engine || defaultEngine(bebopFmaj);
}

/**
 * Encodes the data
 *
 * @method encode
 * @for Bebopizer
 * @param data {string|buffer|arrayBuffer} The data to encode
 * @return {arrayBuffer} The encoded data
 */
Bebopizer.prototype.encode = function encode(data) {
  if (typeof data === 'string') {
    return this.engine.encode(str2ab(data));
  }
  return this.engine.encode(data);
};

/**
 * Decodes the data
 *
 * @method decode
 * @for Bebopizer
 * @param data {string} The encoded data
 * @return {arrayBuffer} The decoded data
 */
Bebopizer.prototype.decode = function decode(data) {
  return this.engine.decode(data);
};

/**
 * Decodes the data but returns a string
 *
 * @method decodeToStr
 * @for Bebopizer
 * @param data {string} The encoded data
 * @return {string} The decoded data
 */
Bebopizer.prototype.decodeToStr = function decodeToStr(data) {
  var ab = this.engine.decode(data);
  return String.fromCharCode.apply(null, new Uint8Array(ab));
};


/**
 * Creates the new bebopizer instance with new options
 *
 * @method create
 * @for Bebopizer
 * @param symbols {list} A list of 16 notes
 * @param engine {engine} The engine to be used
 */
Bebopizer.prototype.create = function create(symbols, engine) {
  return new Bebopizer(symbols, engine);
};

module.exports = new Bebopizer();

