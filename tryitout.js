module.exports = {
    title: 'compress-object',
    description: '💎 when objects become too large, let\'s turn them into something smaller',
    nav: {
      Source: 'https://github.com/gabrielcsapo/compress-object'
    },
    body: [{
      type: 'text',
      value: '> `compress-object` aims to remove the need for keys in JSON, by having a map to and from the flattened structure'
    },
    {
      type: 'code',
      title: 'Compress Object',
      subtitle: 'This will take an object with a schema and compress it.',
      value: `
        var Compress = require('compress-object');

        var compressed = new Compress({
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
      type: 'code',
      title: 'Decompress Object',
      subtitle: 'This will take a decompressed object and inflate it with a schema.',
      value: `
        var Compress = require('compress-object');
        var flattened = ['Gabriel J. Csapo', 21, 'Male'];

        var object = new Compress({
          name: '',
          age: 0,
          gender: ''
        }).deserialize(flattened);

        console.log(JSON.stringify(object, null, 4));
      `
    }],
    template: 'code',
    output: './docs',
    externals: [
      './dist/compress-object.js'
    ]
};
