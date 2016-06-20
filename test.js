var compress = require('./index');

var flattened = compress({
    name: '',
    age: 0,
    gender: '',
    friends: [],
    job: {
        employer: '',
        position: ''
    }
}).serialize([{
    name: 'Gabriel J. Csapo',
    age: 21,
    gender: 'Male',
    friends: ['Jane', 'Doe'],
    job: {
        employer: 'Test',
        position: 'Inc'
    }
},{
    name: 'Stephanie Csapo',
    age: 20,
    gender: 'Female',
    friends: ['Joe', 'Dane'],
    job: {
        employer: 'Fort',
        position: 'Post'
    }
}]);

console.log(flattened);
