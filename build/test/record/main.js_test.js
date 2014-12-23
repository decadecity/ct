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
      main = require('record/main'),
      model = require('record/model');

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

      test('selectValue', function() {
        var record = model.record;
        $('#recent_item').val('test1').trigger('input');
        strictEqual(record.description, 'test1', 'Sets description correctly');
        strictEqual(record.caffeine, 100, 'Sets caffeine correctly');
        $('#recent_item').val('test2').trigger('input');
        strictEqual(record.description, 'test2', 'Sets description correctly');
        strictEqual(record.caffeine, 200, 'Sets caffeine correctly');
        $('#recent_item').val('').trigger('input');
        strictEqual(record.description, '', 'Clears description on unlisted entry');
        strictEqual(record.caffeine, 0, 'Clears caffeine on unlisted entry');
      });

      test('hashRouter', function(assert) {
        assert.expect(4);
        var stage = model.stage;
        var done1 = assert.async();
        var done2 = assert.async();
        var done3 = assert.async();
        strictEqual(stage.current, 1, 'Initial state');
        window.location.hash = '2';
        setTimeout(function() {
          strictEqual(stage.current, 2, 'Moved to hash');
          window.location.hash = 'test';
          done1();
        }, 1);
        setTimeout(function() {
          strictEqual(stage.current, 2, 'Ignore invalid');
          done2();
          window.location.hash = '';
        }, 10);
        setTimeout(function() {
          strictEqual(stage.current, 1, 'Reset on blank');
          done3();
        }, 20);
      });
    }
  };
});

