/*!
 * object-visit <https://github.com/jonschlinkert/object-visit>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var visit = require('./');

var obj = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: { e: 'f' }
};

var ctx = {
  data: {},
  set: function (key, value) {
    if (typeof key === 'object') {
      visit(ctx, 'set', key);
    } else {
      ctx.data[key] = value;
    }
  }
};

describe('visit', function () {
  it('should call visit on every value in the given object:', function () {
    ctx.set('a', 'a');
    ctx.set('b', 'b');
    ctx.set('c', 'c');
    ctx.set({d: {e: 'f'}});
    ctx.data.should.eql(obj);
  });
});

describe('errors', function () {
  it('should throw an error when invalid args are passed:', function () {
    (function () {
      visit();
    }).should.throw('object-visit expects `thisArg` to be an object.');

    (function () {
      visit('foo', 'bar');
    }).should.throw('object-visit expects `thisArg` to be an object.');

    (function () {
      visit({}, 'foo');
    }).should.throw('object-visit expects `target` to be an object.');

    (function () {
      visit({}, 'bar', 'bar');
    }).should.throw('object-visit expects `target` to be an object.');

    (function () {
      visit({}, {}, {});
    }).should.throw('object-visit expects `method` to be a string');
  });
});
