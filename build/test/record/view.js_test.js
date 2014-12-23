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

  var model = require('record/model'),
      view = require('record/view'),
      $ = require('jquery');

  return {
    runTests: function() {

      module('View');

      test('setStage', function() {
        view.initialStage();
        view.setStage();
        function stages() {
          return [
            $('#stage-1').hasClass('ui--removed'),
            $('#stage-2').hasClass('ui--removed'),
            $('#stage-3').hasClass('ui--removed')
          ];
        }
        deepEqual(stages(), [false, true, true], 'Initial state');
        model.stage.advance();
        view.setStage();
        deepEqual(stages(), [true, false, true], 'Advance state');
      });

      test('setDefaults', function() {
        view.setDefaults();
        var today = new Date();
        var value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        strictEqual($('#default-today').val(), value, 'Date is correctly set (today)');
        strictEqual($('#default-other').val(), 'fnord', 'Arbitrary is correctly set');
      });

      test('resetModeForm', function() {
        function isFormReset() {
          var reset = true;
          $('#resetModeForm').find('[data-ct-ui-new-item-mode]').each(function() {
            if ($(this).hasClass('disabled')) {
              reset = false;
            }
            if ($(this).data('ct-ui-data-new-item-active')) {
              reset = false;
            }
            $(this).find('input').each(function() {
              if ($(this).val()) {
                reset = false;
              }
              if ($(this).prop('disabled')) {
                reset = false;
              }
            });
          });
          return reset;
        }
        strictEqual(isFormReset(), false, 'Initial state');
        view.resetModeForm();
        strictEqual(isFormReset(), true, 'Reset');
      });
    }
  };
});

