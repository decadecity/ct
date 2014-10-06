$(document).ready(function() {
  $('[data-ct-form-default]').each(function() {
    var type = $(this).data('ct-form-default');
    if (type === 'today') {
      var today = new Date();
      this.value = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    }
  });
});

$(document).ready(function() {
  var advanceStage = function() {
    stage += 1;
    $('[data-ct-ui-stage]').addClass('ui--removed');
    $('[data-ct-ui-stage=' + stage + ']').removeClass('ui--removed');
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
