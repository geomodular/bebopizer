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

