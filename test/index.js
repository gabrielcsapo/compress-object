var chance = require('chance')();
var fs = require('fs');
var filesize = require('filesize');
var test = require('tape').test;
var compress = require('../index.js');

test('compress-object', function(t) {
    t.plan(9);

    t.test('should serialize the object', function(t) {
        var flattened = compress({
            name: '',
            age: 0,
            gender: ''
        }).serialize({
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        });
        t.deepEqual(flattened, [ 'Gabriel J. Csapo', 21, 'Male' ]);
        t.end();
    });

    t.test('should serialize the object with empty attributes', function(t) {
        var flattened = compress({
            name: '',
            age: 0,
            gender: '',
            friends: []
        }).serialize({
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        });
        t.deepEqual(flattened, [ 'Gabriel J. Csapo', 21, 'Male', []]);
        t.end()
    });

    t.test('should serialize complex object', function(t) {
        var flattened = compress({
            name: '',
            age: 0,
            gender: '',
            friends: [],
            job: {
                employer: '',
                position: ''
            }
        }).serialize({
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male',
            friends: [],
            job: {
                employer: 'PayPal',
                position: 'Software Engineer'
            }
        });
        t.deepEqual(flattened, ['Gabriel J. Csapo', 21, 'Male', [],['PayPal', 'Software Engineer']])
        t.end();
    });

    t.test('should serialize an array of objects', function(t) {
        var flattened = compress({
            name: '',
            age: 0,
            gender: ''
        }).serialize([{
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        },{
            name: 'Stephanie Csapo',
            age: 20,
            gender: 'Female'
        }]);
        t.deepEqual(flattened, [ [ 'Gabriel J. Csapo', 21, 'Male' ], [ 'Stephanie Csapo', 20, 'Female' ] ])
        t.end();
    });

    t.test('should deserialize the array', function(t) {
        var flattened = [ 'Gabriel J. Csapo', 21, 'Male' ];
        var object = compress({
            name: '',
            age: 0,
            gender: ''
        }).deserialize(flattened);
        t.deepEqual(object, {
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        });
        t.end();
    });

    t.test('should deserialize complex object array', function(t) {
        var flattened = ['Gabriel J. Csapo', 21, 'Male', [],['PayPal', 'Software Engineer']];
        var object = compress({
            name: '',
            age: 0,
            gender: '',
            friends: [],
            job: {
                employer: '',
                position: ''
            }
        }).deserialize(flattened);
        t.deepEqual(object, {
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male',
            friends: [],
            job: {
                employer: 'PayPal',
                position: 'Software Engineer'
            }
        });
        t.end();
    });

    t.test('should deserialize complex multi object array', function(t) {
        var flattened = [ [ 'Gabriel J. Csapo', 21, 'Male' ], [ 'Stephanie Csapo', 20, 'Female' ] ];
        var object = compress({
            name: '',
            age: 0,
            gender: ''
        }).deserialize(flattened);
        t.deepEqual(object, [{
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        }, {
            name: 'Stephanie Csapo',
            age: 20,
            gender: 'Female'
        }]);
        t.end();
    });

    t.test('should serialize and deserialize', function(t) {
        var people = [];
        for(var i = 0; i < 1000; i++) {
            people.push({
                name: chance.name(),
                birthday: chance.birthday().toString(),
                suffix: chance.suffix(),
                age: chance.age(),
                gender: chance.gender(),
                bio: chance.sentence(),
                friends: [chance.name(), chance.name(), chance.name()],
                job: {
                    employer: chance.word(),
                    position: chance.word()
                }
            });
        }
        fs.writeFileSync('./test/uncompressed.json', JSON.stringify(people));
        var flattened = compress({
            name: '',
            birthday: '',
            suffix: '',
            age: '',
            gender: '',
            bio: '',
            friends: [],
            job: {
                employer: '',
                position: ''
            }
        }).serialize(people);
        fs.writeFileSync('./test/compressed.json', JSON.stringify(flattened));
        var object = compress({
            name: '',
            birthday: '',
            suffix: '',
            age: '',
            gender: '',
            bio: '',
            friends: [],
            job: {
                employer: '',
                position: ''
            }
        }).deserialize(flattened);
        t.deepEqual(people, object);
        t.end();
    });

    t.test('should show filesize between the two files', function() {
        var compressed = fs.statSync('./test/compressed.json')['size'];
        var uncompressed = fs.statSync('./test/uncompressed.json')['size'];
        console.log('compressed: ', filesize(compressed)); // eslint-disable-line no-console
        console.log('uncompressed: ', filesize(uncompressed)) // eslint-disable-line no-console
    });

    t.end();
});
