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

  var passwords = require('passwords'),
      $ = require('jquery');

  return {
    runTests: function() {

      module('Passwords');

      passwords.ready();

      test('passwords', function() {
        strictEqual($('#test-password').attr('type'), 'text', 'Set type to text');
        strictEqual($('#other-password').attr('type'), 'text', 'Set type to text');
        var control = $('#test-form').find('input[type=checkbox]');
        strictEqual(control.length, 1, 'Added control');
        control.trigger('click');
        strictEqual($('#test-password').attr('type'), 'password', 'Set type back to password');
        strictEqual($('#test-text').attr('type'), 'text', 'Didn\'t alter text field');
        strictEqual($('#other-password').attr('type'), 'text', 'Didn\'t set type to password');
        control.trigger('click');
        strictEqual($('#test-password').attr('type'), 'text', 'Set type to text');
      });
    }
  };
});

