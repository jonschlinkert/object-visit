/*!
 * object-visit <https://github.com/jonschlinkert/object-visit>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');
var expected = require('expected');

module.exports = function visit(thisArg, method, target) {
  if (!isObject(thisArg) && typeof thisArg !== 'function') {
    expected(thisArg).to.be.an('object');
  }

  if (!isObject(target) && typeof target !== 'function') {
    expected(target).to.be.an('object');
  }

  if (typeof method !== 'string') {
    expected(method).to.be.a('string');
  }

  for (var key in target) {
    var fn = thisArg[method];
    if (typeof fn !== 'function') {
      expected(fn).to.be.a('function');
    }
    fn(key, target[key]);
  }
  return thisArg;
};
