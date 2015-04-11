function encode(symbols, string) {
  var result = '';
  for (var i = 0; i < string.length; i++) {
    var low = string.charCodeAt(i) & 15;
    var high = string.charCodeAt(i) >> 4;
    result += symbols[low];
    result += symbols[high];
  }
  return result;
}

function decode(symbols, string) {
  var result = '';
  var i = 0;
  while (i < string.length) {
    var lowNote = string[i++];
    if (string[i] === '#' || string[i] === 'b')
      lowNote += string[i++];

    var highNote = string[i++];
    if (string[i] === '#' || string[i] === 'b')
      highNote += string[i++];

    var low = symbols.indexOf(lowNote);
    var high = symbols.indexOf(highNote);
    result += String.fromCharCode((high << 4) | low);
  }
  return result;
}

module.exports = function(symbols) {
  symbols = symbols || ['C', 'D', 'E', 'F', 'F#', 'G', 'A', 'H', 'c', 'd', 'e', 'f', 'f#', 'g', 'a', 'h'];
  if (symbols.length != 16)
    throw new Error('The symbols has a wrong length 16 != ' + symbols.length);

  return {
    encode: function(data) {
      return encode(symbols, data);
    },
    decode: function(data) {
      return decode(symbols, data);
    }
  };
};

