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
        //TODO: move to setup.
        caffeine_content.setBaseDate(new Date($('#base-date').text()));

        var expected_start = {
          'date': new Date('Thu, 25 Dec 2014 01:00:00 +0000'),
          'amount': 12
        };
        var expected_other = {
          'date': new Date('Thu, 25 Dec 2014 07:00:00 +0000'),
          'amount': 13
        };
        caffeine_content.initialiseData();
        deepEqual($('#current_caffeine').data('ct-data-caffeine-parsed'), expected_start, 'Got start data');
        deepEqual($('#other_caffeine').data('ct-data-caffeine-parsed'), expected_other, 'Got other data');

        caffeine_content.setCurrent();
        strictEqual($('#current_caffeine').text(), '6', 'Start data halved');
        strictEqual($('#other_caffeine').text(), '13', 'Other data stayed the same');
      });
    }
  };
});

