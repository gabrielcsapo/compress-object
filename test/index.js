var assert = require('chai').assert;
var chance = require('chance')();
var fs = require('fs');
var filesize = require('filesize');

var compress = require('../index.js');

describe('compress-object', function() {

    it('should serialize the object', function() {
        var flattened = compress({
            name: '',
            age: 0,
            gender: ''
        }).serialize({
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        });
        assert.deepEqual(flattened, [ 'Gabriel J. Csapo', 21, 'Male' ]);
    });

    it('should serialize the object with empty attributes', function() {
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
        assert.deepEqual(flattened, [ 'Gabriel J. Csapo', 21, 'Male', []]);
    });

    it('should serialize complex object', function() {
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
        assert.deepEqual(flattened, ['Gabriel J. Csapo', 21, 'Male', [],['PayPal', 'Software Engineer']])
    });

    it('should serialize an array of objects', function() {
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
        assert.deepEqual(flattened, [ [ 'Gabriel J. Csapo', 21, 'Male' ], [ 'Stephanie Csapo', 20, 'Female' ] ])
    });

    it('should deserialize the array', function() {
        var flattened = [ 'Gabriel J. Csapo', 21, 'Male' ];
        var object = compress({
            name: '',
            age: 0,
            gender: ''
        }).deserialize(flattened);
        assert.deepEqual(object, {
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        });
    });

    it('should deserialize complex object array', function() {
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
        assert.deepEqual(object, {
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male',
            friends: [],
            job: {
                employer: 'PayPal',
                position: 'Software Engineer'
            }
        })
    });

    it('should deserialize complex multi object array', function() {
        var flattened = [ [ 'Gabriel J. Csapo', 21, 'Male' ], [ 'Stephanie Csapo', 20, 'Female' ] ];
        var object = compress({
            name: '',
            age: 0,
            gender: ''
        }).deserialize(flattened);
        assert.deepEqual(object, [{
            name: 'Gabriel J. Csapo',
            age: 21,
            gender: 'Male'
        }, {
            name: 'Stephanie Csapo',
            age: 20,
            gender: 'Female'
        }]);
    });

    it('should serialize and deserialize', function() {
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
        assert.deepEqual(people, object);
    });

    it('should show filesize between the two files', function() {
        var compressed = fs.statSync('./test/compressed.json')['size'];
        var uncompressed = fs.statSync('./test/uncompressed.json')['size'];
        console.log('compressed: ', filesize(compressed));
        console.log('uncompressed: ', filesize(uncompressed))
    });

});
