const test = require('tape');
const chance = require('chance')();

const Compress = require('../index.js');

test('compress-object', (t) => {
    t.plan(9);

    t.test('should serialize the object', (t) => {
        const flattened = new Compress({
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

    t.test('should serialize the object with empty attributes', (t) => {
        const flattened = new Compress({
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

    t.test('should serialize complex object', (t) => {
        const flattened = new Compress({
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

    t.test('should serialize complex object and fill in the missing values', (t) => {
        const flattened = new Compress({
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
            friends: []
        });
        t.deepEqual(flattened, ['Gabriel J. Csapo', 21, 'Male', [],['', '']])
        t.end();
    });

    t.test('should serialize an array of objects', (t) => {
        const flattened = new Compress({
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

    t.test('should deserialize the array', (t) => {
        const flattened = [ 'Gabriel J. Csapo', 21, 'Male' ];
        const object = new Compress({
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

    t.test('should deserialize complex object array', (t) => {
        const flattened = ['Gabriel J. Csapo', 21, 'Male', [],['PayPal', 'Software Engineer']];
        const object = new Compress({
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

    t.test('should deserialize complex multi object array', (t) => {
        const flattened = [ [ 'Gabriel J. Csapo', 21, 'Male' ], [ 'Stephanie Csapo', 20, 'Female' ] ];
        const object = new Compress({
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

    t.test('should serialize and deserialize', (t) => {
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
        const compress = new Compress({
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
        })
        const flattened = compress.serialize(people);
        const object = compress.deserialize(flattened);
        console.log(`original size: ${Buffer.from(JSON.stringify(object), 'utf8').length / 1000}kb`); // eslint-disable-line
        console.log(`flattened size: ${Buffer.from(JSON.stringify(flattened), 'utf8').length / 1000}kb`); // eslint-disable-line
        t.deepEqual(people, object);
        t.end();
    });

});
