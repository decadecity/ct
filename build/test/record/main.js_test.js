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

  var $ = require('jquery'),
      main = require('record/main');

  return {
    runTests: function() {

      module('main');

      main.ready();

      test('datalistValue', function() {
        $('#new_item').val('test1').trigger('input');
        strictEqual($('#absolute').val(), '100', 'Sets target correctly');
        $('#new_item').val('test2').trigger('input');
        strictEqual($('#absolute').val(), '200', 'Sets target correctly');
        $('#new_item').val('invalid').trigger('input');
        strictEqual($('#absolute').val(), '', 'Clears on unlisted entry');
      });

    }
  };
});

