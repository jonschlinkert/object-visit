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
    }).should.throw('expected "undefined" to be an object');

    (function () {
      var ctx = {a: 'b'};
      visit(ctx, 'a', {one: 'two'});
    }).should.throw('expected "b" to be a function');

    (function () {
      visit({}, {}, 'foo');
    }).should.throw('expected "foo" to be an object');

    (function () {
      visit('foo', 'bar');
    }).should.throw('expected "foo" to be an object');

    (function () {
      visit({}, {}, {});
    }).should.throw('expected "[object Object]" to be a string');
  });
});
