$(document).ready(function() {
  $('[data-ct-ui-show-target]').on('click', function() {
    var target = $(this).data('ct-ui-show-target');
    $('[data-ct-ui-show-' + target + ']').removeClass('ui--hidden');
    $('[data-ct-ui-hide-' + target + ']').addClass('ui--hidden');
  });
  $('[data-ct-ui-show-checked]').on('change', function() {
    var target = $(this).data('ct-ui-show-checked');
    if (this.value === 'on') {
      $('[data-ct-ui-checked-show-' + target + ']').removeClass('ui--hidden');
      $('[data-ct-ui-checked-hide-' + target + ']').addClass('ui--hidden');
    } else {
      $('[data-ct-ui-checked-show-' + target + ']').addClass('ui--hidden');
      $('[data-ct-ui-checked-hide-' + target + ']').removeClass('ui--hidden');
    }
  });
});
