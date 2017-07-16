# compress-object

[![Greenkeeper badge](https://badges.greenkeeper.io/gabrielcsapo/compress-object.svg)](https://greenkeeper.io/)

[![Npm Version](https://img.shields.io/npm/v/compress-object.svg)](https://www.npmjs.com/package/compress-object)
[![Build Status](https://travis-ci.org/gabrielcsapo/compress-object.svg?branch=master)](https://travis-ci.org/gabrielcsapo/compress-object) [![Dependency Status](https://david-dm.org/gabrielcsapo/compress-object.svg)](https://david-dm.org/gabrielcsapo/compress-object)
[![devDependency Status](https://david-dm.org/gabrielcsapo/compress-object/dev-status.svg)](https://david-dm.org/gabrielcsapo/compress-object#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/gabrielcsapo/compress-object/badge.svg?branch=master)](https://coveralls.io/github/gabrielcsapo/compress-object?branch=master)
![npm license](https://img.shields.io/npm/l/compress-object.svg)
[![npm](https://img.shields.io/npm/dt/compress-object.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/compress-object.svg?maxAge=2592000)]()

> when objects become too large, let's turn them into something smaller

## TLDR;

This is a simple library to turn javascript objects into flat representations

### Is it worth it?

Turning an array of 1000 complex objects (objects that have nsted objects and nested arrays) (373ms)

|before|after|
|---|---|
|315.04 KB|231.06 KB|

## Usage

```
npm install compress-object
```

or if you want to use a browserified version use

```javascript
require('compress-object/dist/compress-object.js');
```

## serialize

```javascript
var compress = require('compress-object');

var flattened = compress({
    name: '',
    age: 0,
    gender: ''
}).serialize({
    name: 'Gabriel J. Csapo',
    age: 21,
    gender: 'Male'
});
```

> ```javascript
[ 'Gabriel J. Csapo', 21, 'Male' ]
```

<br>

> Complex Objects

```javascript
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
```

> ```javascript
['Gabriel J. Csapo', 21, 'Male', [],['PayPal', 'Software Engineer']]
```

## deserialize

```javascript
var flattened = [ 'Gabriel J. Csapo', 21, 'Male' ];
var object = compress({
    name: '',
    age: 0,
    gender: ''
}).deserialize(flattened);
```

> ```javascript
{
    name: 'Gabriel J. Csapo',
    age: 21,
    gender: 'Male'
}
```

<br>

> Complex Objects

```javascript
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
```

> ```javascript
{
    name: 'Gabriel J. Csapo',
    age: 21,
    gender: 'Male',
    friends: [],
    job: {
        employer: 'PayPal',
        position: 'Software Engineer'
    }
}
```
