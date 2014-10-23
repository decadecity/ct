(function() {
  var data = {
    when: new Date(),
    what: undefined,
    how_much: undefined
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
    var showResult = function() {
      var date = data.when.getHours() + ':' + data.when.getMinutes() + ' ' + data.when.getFullYear() + '-' + (data.when.getMonth() + 1) + '-' + data.when.getDate()
      var recorded = 'Recorded ' + data.what + ' at ' + date;
      $('[data-ct-ui-result-text]').text(recorded);
    };

    var advanceStage = function() {
      stage += 1;
      var current_stage = $('[data-ct-ui-stage=' + stage + ']');
      $('[data-ct-ui-stage]').addClass('ui--removed');
      $('[data-ct-ui-abort]').removeClass('ui--removed');
      current_stage.removeClass('ui--removed');
      window.data = data;
      if (current_stage.data('ct-ui-result')) {
        // This is the result stage
        window.setTimeout(showResult, 0); //TODO: FIX HACK!
        $('[data-ct-ui-abort]').addClass('ui--removed');
      }
    };

    var stage = 1;
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
        advanceStage()
      }
    });
    $('[data-ct-ui-stage-change=complete]').on('blur', function() {
      if (this.value && this.value !== 'off') {
        advanceStage()
      }
    });

    $('[data-ct-ui-restart]').on('click', function() {
      document.location.reload(false);
    });

  });

  $(document).ready(function () {

    $('[data-ct-data-item]').on('click, change', function() {
      var type = $(this).data('ct-data-item');
      var item;
      console.log(type);
      if (type === 'this') {
        item = $(this).val().split('::');
        data.what = item[0];
        data.how_much = parseFloat(item[1]);
        console.log(item);
      }
    });


    $('[data-ct-data-date]').on('click, change', function() {
      var type = $(this).data('ct-data-date');
      var time;
      if (type === 'now') {
        data.when = new Date();
      } else if (type === 'time') {
        time = $(this).val().split(':');
        console.log(time);
        data.when.setHours(time[0], time[1], 00);
      } else if (type === 'today') {
        time = new Date();
        data.when.setFullYear(time.getFullYear(), time.getMonth(), time.getDate());
      } else if (type === 'date') {
        time = $(this).val().split('-');
        console.log(time);
        data.when.setFullYear(time[0], parseInt(time[1], 10) - 1, time[2]);
      }
    });
  });
}());
