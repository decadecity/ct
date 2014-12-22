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

  var model = require('record/model');

  return {
    runTests: function() {

      module('Model - record');

      var record = model.record;

      test('structure', function() {
        ok(record.hasOwnProperty('description'), 'Has a description');
        strictEqual(typeof record.description, 'string', 'Description is a string');
        ok(record.hasOwnProperty('time'), 'Has a time');
        strictEqual(typeof record.time, 'object', 'Time is an object');
        ok(record.hasOwnProperty('caffeine'), 'Has a caffeine amount');
        strictEqual(typeof record.caffeine, 'number', 'Caffeine is a number');
      });

      test('timeString', function() {
        record.time = new Date(2014, 0, 2, 3, 4, 5);
        strictEqual(record.timeString(), '2014-01-02 03:04:00', 'Correctly formats a date');
      });

      test('timeType', function() {
        var now = new Date();
        record.timeType('', 'now');
        strictEqual('' + record.time, '' + now, '`now` => Current time');
        record.timeType('01:02', 'time');
        now.setHours(1, 2, 0);
        strictEqual('' + record.time, '' + now, '`time` => Parse hours');
        record.timeType('2014-01-02', 'date');
        now.setFullYear(2014, 0, 2);
        strictEqual('' + record.time, '' + now, '`date` => Parse date');
        record.timeType('', 'none');
        strictEqual('' + record.time, '' + now, 'Invalid option ignored');
      });
    }
  };
});
