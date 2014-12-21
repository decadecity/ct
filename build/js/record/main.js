/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');
  var view = require('./view');
  var utils = require('./utils');
  var model = require('./model');

  var ESPRESSO = 100; //mg

  var data = model.record();

  var stage = 1;

  /* instanbul ignore next */
  var advanceStage = function() {
    stage += 1;
    var current_stage = $('[data-ct-ui-stage=' + stage + ']');
    $('[data-ct-ui-stage]').addClass('ui--removed');
    $('[data-ct-ui-abort]').removeClass('ui--removed');
    current_stage.removeClass('ui--removed');
    if (current_stage.data('ct-ui-result')) {
      // This is the result stage
      setTimeout(showResult, 0); //TODO fix hack.
    }
  };

  /* instanbul ignore next */
  var showResult = function() {

    $('#id_time').val(data.timeString());
    $('#id_description').val(data.description);
    $('#id_caffeine').val(Math.round(data.caffeine));

    $('#record-form').trigger('submit');
  };

  /* instanbul ignore next */
  var setStage = function() {

    if (window.location.hash) {
      var new_stage = parseInt(window.location.hash.slice(1), 10);
      if (!isNaN(new_stage)) {
        stage = new_stage - 1;
        advanceStage();
      }
    }

    $('[data-ct-ui-show-target]').on('click', function() {
      var target = $(this).data('ct-ui-show-target');
      $('[data-ct-ui-show-' + target + ']').removeClass('ui--removed');
      $('[data-ct-ui-hide-' + target + ']').addClass('ui--removed');
    });

    $('[data-ct-ui-show-checked]').on('change', function() {
      var target = $(this).data('ct-ui-show-checked');
      if (this.value === 'on') {
        $('[data-ct-ui-checked-show-' + target + ']').removeClass('ui--removed');
        $('[data-ct-ui-checked-hide-' + target + ']').addClass('ui--removed');
      } else {
        $('[data-ct-ui-checked-show-' + target + ']').addClass('ui--removed');
        $('[data-ct-ui-checked-hide-' + target + ']').removeClass('ui--removed');
      }
    });

    $('[data-ct-ui-stage-change=click]').on('click', function() {
      advanceStage();
    });
    $('[data-ct-ui-stage-change=change]').on('change', function() {
      advanceStage();
    });
    $('[data-ct-ui-stage-change=checked]').on('change', function() {
      if (this.value === 'on') {
        advanceStage();
      }
    });
    $('[data-ct-ui-stage-change=complete]').on('blur', function() {
      if (this.value && this.value !== 'off') {
        advanceStage();
      }
    });

    $('[data-ct-ui-restart]').on('click', function() {
      document.location.reload(false);
    });

  };

  /* instanbul ignore next */
  var main = function () {
    $('[data-ct-data-item]').on('input', function() {
      var type = $(this).data('ct-data-item');
      var item;
      if (type === 'this') {
        item = $(this).val().split('::');
        data.description = item[0];
        data.caffeine = utils.getInt(item[1]);
      }
    });


    $('[data-ct-data-new-item-input]').on('input', function(e) {

      var modes = $('[data-ct-ui-new-item-mode]');

      function resetForm() {
        modes.each(function() {
          $(this).val('');
          $(this).removeClass('disabled');
          $(this).find('input').prop('disabled', false);
          $(this).data('ct-ui-data-new-item-active', false);
        });
      }

      if (!$(this).val()) {
        resetForm();
        return;
      }

      var mode = $(e.target).parents('[data-ct-ui-new-item-mode]');
      modes.each(function() {
        if ($(this).data('ct-ui-new-item-mode') === mode.data('ct-ui-new-item-mode')) {
          $(this).removeClass('disabled');
          $(this).data('ct-ui-data-new-item-active', true);
          $(this).find('input').prop('disabled', false);
        } else {
          $(this).addClass('disabled');
          $(this).data('ct-ui-data-new-item-active', false);
          $(this).find('input').prop('disabled', true);
        }
      });
    });

    $('[data-ct-ui-data-new-item-save]').on('click', function(e) {
      e.preventDefault();
      data.description = $('#new_item').val();
      var modes = $('[data-ct-ui-new-item-mode]');
      modes.each(function() {
        if ($(this).data('ct-ui-data-new-item-active')) {
          var amount = 0;
          var mode = $(this).data('ct-ui-new-item-mode');
          var inputs = $(this).find('[data-ct-data-new-item-input]');
          if (mode === 'absolute') {
            amount = utils.getInt(inputs[0].value);
          }
          if (mode === 'espresso') {
            amount = utils.getInt(inputs[0].value) * ESPRESSO;
          }
          if (mode === 'concentration') {
            var mg = utils.getInt(inputs[0].value);
            var ml = utils.getInt(inputs[1].value);
            var quantity = utils.getInt(inputs[2].value);
            switch ($(this).find('[name=measure]:checked').val()) {
              case 'ml':
                break;
              case 'cl':
                quantity = quantity * 10;
                break;
              case 'l':
                quantity = quantity * 1000;
                break;
            }
            amount = mg / ml * quantity;
          }
          data.caffeine = amount;
        }
      });
      advanceStage();
    });

    $('[data-ct-data-date]').on('click change', function() {
      data.timeType($(this).val(), $(this).data('ct-data-date'));
    });
  };

  /**
   * Sets a target when a data list item is selected.
   */
  var datalistValue = function() {
    $('[data-ct-datalist-value]').on('input', function() {
      var value = $(this).val();
      var datalist = $('#' + $(this).attr('list'));
      var target = $('[data-ct-value-target-' + datalist.data('ct-value-target') + ']');

      var found = false;
      datalist.find('option').each(function() {
        if ($(this).val() === value) {
          target.val($(this).data('ct-data-value'));
          found = true;
        }
      });
      if (!found) {
        target.val('');
      }
    });
  };

  module.exports.ready = function () {
    view.ready();
    setStage();
    main();
    datalistValue();
  };
});
