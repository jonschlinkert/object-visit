'use strict';

require('mocha');
var assert = require('assert');
var visit = require('./');

var obj = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: { e: 'f' }
};

var ctx = {
  data: {},
  cwd: null,
  set: function(key, value) {
    if (typeof key === 'object') {
      if (value && value.cwd) {
        this.cwd = value.cwd;
      }
      visit(ctx, 'set', key, value);
    } else {
      ctx.data[key] = value;
    }
  }
};

describe('object-visit', function() {
  describe('visit', function() {
    beforeEach(function() {
      ctx.data = {};
    });

    it('should call visit on every value in the given object:', function() {
      ctx.set('a', 'a');
      ctx.set('b', 'b');
      ctx.set('c', 'c');
      ctx.set({d: {e: 'f'}});
      assert.deepEqual(ctx.data, obj);
    });

    it('should expose additional arguments to the method', function() {
      ctx.set('a', 'a');
      ctx.set('b', 'b');
      ctx.set('c', 'c');
      ctx.set({d: {e: 'f'}}, {cwd: process.cwd()});

      assert.equal(ctx.cwd, process.cwd());
      assert.deepEqual(ctx.data, obj);
    });
  });

  describe('errors', function() {
    it('should throw an error when invalid args are passed:', function() {
      assert.throws(function() {
        visit();
      }, /thisArg/);

      assert.throws(function() {
        visit({}, {}, 'foo');
      }, /method/);

      assert.throws(function() {
        visit('foo', 'bar');
      }, /thisArg/);

      assert.throws(function() {
        visit({}, {}, {});
      }, /method/);
    });
  });
});
