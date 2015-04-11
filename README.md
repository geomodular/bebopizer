# bebopizer
Bebopizer is a binary to a musical notes encoder and decoder. You can encode a text or a binary data to bunch of a musical notes and decode it back again.

## Usage

```js
var bebopizer = require('bebopizer');

// To get alphabetical notes in list
var notes = bebopizer.encode('Hello world!');
// To decode notes to get back string
var string = bebopizer.decode(notes);
```

## Tests
  npm test
