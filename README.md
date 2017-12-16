# compress-object

> 💎 when objects become too large, let's turn them into something smaller

[![Npm Version](https://img.shields.io/npm/v/compress-object.svg)](https://www.npmjs.com/package/compress-object)
[![Build Status](https://travis-ci.org/gabrielcsapo/compress-object.svg?branch=master)](https://travis-ci.org/gabrielcsapo/compress-object)
[![Dependency Status](http://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/compress-object/status.svg)](http://starbuck.gabrielcsapo.com/github/gabrielcsapo/compress-object)
[![devDependency Status](http://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/compress-object/dev-status.svg)](http://starbuck.gabrielcsapo.com/github/gabrielcsapo/compress-object#info=devDependencies)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/compress-object.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/compress-object)
[![npm](https://img.shields.io/npm/dt/compress-object.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/compress-object.svg?maxAge=2592000)]()

## Installation

```
npm install compress-object --save
```

## Usage

> a AMD version of this is available at dist/compress-object.js

```javascript
var compress = require('compress-object');
var flattened = ['Gabriel J. Csapo', 22, 'Male', [], ['PayPal', 'Software Engineer']];
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

### Is it worth it?

Turning an array of 1000 complex objects (objects that have nsted objects and nested arrays) (373ms)

|before|after|
|---|---|
|315.04 KB|231.06 KB|
