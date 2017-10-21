module.exports = {
    title: "compress-object",
    description: "💎 when objects become too large, let's turn them into something smaller",
    nav: {
      Source: "https://github.com/gabrielcsapo/compress-object"
    },
    body: [{
      type: "code",
      title: "Compress Object",
      subtitle: "This will take an object with a schema and compress it.",
      value: `
        var compress = require('compress-object');

        var compressed = compress({
          name: '',
          age: 0,
          gender: ''
        }).serialize({
          name: 'Gabriel J. Csapo',
          age: 21,
          gender: 'Male'
        });

        console.log(JSON.stringify(compressed));
      `
    }, {
      type: "code",
      title: "Decompress Object",
      subtitle: "This will take a decompressed object and inflate it with a schema.",
      value: `
        var compress = require('compress-object');
        var flattened = ['Gabriel J. Csapo', 21, 'Male'];

        var object = compress({
          name: '',
          age: 0,
          gender: ''
        }).deserialize(flattened);

        console.log(JSON.stringify(object, null, 4));
      `
    }],
    output: "./docs",
    externals: [
      "./dist/compress-object.js"
    ]
};
