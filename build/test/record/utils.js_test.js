/* jshint qunit:true */
/*
  ======== A Handy Little QUnit Reference ========
  http://docs.jquery.com/QUnit

  Test methods:
    expect(numAssertions)
    stop(increment)
    start(decrement)
  Test assertions:
    ok(value, [message])
    equal(actual, expected, [message])
    notEqual(actual, expected, [message])
    deepEqual(actual, expected, [message])
    notDeepEqual(actual, expected, [message])
    strictEqual(actual, expected, [message])
    notStrictEqual(actual, expected, [message])
    raises(block, [expected], [message])
*/

define(function(require) {
  "use strict";

  var utils = require('record/utils');

  return {
    runTests: function() {

      module('Utils');

      test('getInt', function() {
        strictEqual(utils.getInt('10'), 10, 'String integer');
        strictEqual(utils.getInt(10), 10, 'Integer');
        strictEqual(utils.getInt('invalid string'), 0, 'Invalid string');
      });

      test('zeroFill', function() {
        strictEqual(utils.zeroFill(1), '01', 'Basic function');
      });
    }
  };
});

