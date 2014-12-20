define(function (require) {
  "use strict";

  var $ = require('jquery');

  var ESPRESSO = 100; //mg

  $(document).ready(function() {
    $('#advanced-form-target').html($('#advanced-form').html());
  });

  $(document).ready(function() {
    setTimeout(function() {
      $('.messages--success').fadeOut();
    }, 2000);
  });

  var data = {
    when: new Date(),
    what: undefined,
    how_much: undefined
  };

  var zeroFill = function(number, decimals, pad_character) {
    decimals = decimals || 2;
    pad_character = pad_character || '0';
    var pad = new Array(1 + decimals).join(pad_character);
    return (pad + number).slice(-pad.length);
  };

  var stage = 1;
  var advanceStage = function() {
    stage += 1;
    var current_stage = $('[data-ct-ui-stage=' + stage + ']');
    $('[data-ct-ui-stage]').addClass('ui--removed');
    $('[data-ct-ui-abort]').removeClass('ui--removed');
    current_stage.removeClass('ui--removed');
    window.data = data;
    if (current_stage.data('ct-ui-result')) {
      // This is the result stage
      setTimeout(showResult, 0); //TODO fix hack.
    }
  };

  var showResult = function() {
    var date = '';

    date += data.when.getFullYear();
    date += '-' + zeroFill(data.when.getMonth() + 1);
    date += '-' + data.when.getDate();
    date += ' ';
    date += zeroFill(data.when.getHours());
    date += ':' + zeroFill(data.when.getMinutes());
    date += ':00'; // Seconds

    //var recorded = 'Recorded ' + data.what + ' at ' + date;

    $('#id_time').val(date);
    $('#id_description').val(data.what);
    $('#id_caffeine').val(Math.round(data.how_much));

    $('#record-form').trigger('submit');
  };

  $(document).ready(function() {
    $('[data-ct-form-default]').each(function() {
      var type = $(this).data('ct-form-default');
      if (type === 'today') {
        var today = new Date();
        this.value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      }
    });
  });

  $(document).ready(function() {

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

  });

  $(document).ready(function () {

    $('[data-ct-data-item]').on('click change', function() {
      var type = $(this).data('ct-data-item');
      var item;
      if (type === 'this') {
        item = $(this).val().split('::');
        data.what = item[0];
        data.how_much = parseFloat(item[1]);
      }
    });


    $('[data-ct-data-new-item-input]').on('click change keyup', function(e) {

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

    function getInt(number) {
      number = parseInt(number, 10);
      if (isNaN(number)) {
        number = 0;
      }
      return number;
    }

    $('[data-ct-ui-data-new-item-save]').on('click', function(e) {
      e.preventDefault();
      data.what = $('#new_item').val();
      var modes = $('[data-ct-ui-new-item-mode]');
      modes.each(function() {
        if ($(this).data('ct-ui-data-new-item-active')) {
          var amount = 0;
          var mode = $(this).data('ct-ui-new-item-mode');
          var inputs = $(this).find('[data-ct-data-new-item-input]');
          if (mode === 'absolute') {
            amount = getInt(inputs[0].value);
          }
          if (mode === 'espresso') {
            amount = getInt(inputs[0].value) * ESPRESSO;
          }
          if (mode === 'concentration') {
            var mg = getInt(inputs[0].value);
            var ml = getInt(inputs[1].value);
            var quantity = getInt(inputs[2].value);
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
          data.how_much = amount;
        }
      });
      advanceStage();
    });

    $('[data-ct-data-date]').on('click change', function() {
      var type = $(this).data('ct-data-date');
      var time;
      if (type === 'now') {
        data.when = new Date();
      } else if (type === 'time') {
        time = $(this).val().split(':');
        if (time.length === 2) {
          data.when.setHours(time[0], time[1], 0);
        }
      } else if (type === 'today') {
        time = new Date();
        data.when.setFullYear(time.getFullYear(), time.getMonth(), time.getDate());
      } else if (type === 'date') {
        time = $(this).val().split('-');
        if (time.length === 3) {
          data.when.setFullYear(time[0], parseInt(time[1], 10) - 1, time[2]);
        }
      }
    });
  });
});
