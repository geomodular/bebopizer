# bebopizer
Bebopizer is a binary to a musical notes encoder and decoder. You can encode a text or a binary data to bunch of a musical notes and decode it back again.

## Usage
```js
var bebopizer = require('bebopizer');

// To get encoded string 
var notes = bebopizer.encode('Hello world!');
// To decode notes back to string
var string = bebopizer.decodeToStr(notes);

// Encode binary data stored in arrayBuffer or buffer
var notes = bebopizer.encode(buffer);
// Decode to arrayBuffer
var ab = bebopizer.decode(notes);
```

## Tests
```bash
npm test
```

