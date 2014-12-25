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

  var caffeine_content = require('caffeine_content');

  return {
    runTests: function() {

      module('Caffeine content');

      test('amountAtTime', function() {
        strictEqual(caffeine_content.amountAtTime(100, 0, 1000 * 60 * 60 * 6), 50, 'One half life');
      });

      test('getStartData', function() {
        var expected = {
          'date': new Date('Thu, 25 Dec 2014 22:20:45 +0000'),
          'amount': 13
        };
        deepEqual(caffeine_content.getStartData(), expected, 'Got start data');
      });
    }
  };
});

