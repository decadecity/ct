/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');

  var passwordReveal = function(form) {
    $(form).find('input[type=password]').each(function() {
      $(this).attr('type', 'text');
      $(this).data('ct-ui-password-originally', true);
    });
  };

  var passwordHide = function(form) {
    $(form).find('input[type=text]').each(function() {
      if ($(this).data('ct-ui-password-originally')) {
        $(this).attr('type', 'password');
      }
    });
  };

  var setControls = function(form) {
    $(form).append('<p><label>Show passwords<input type="checkbox" data-dc-ui-password-show checked/></p>');
  };

  var toggleReveal = function() {
    $(document).on('change', '[data-dc-ui-password-show]', function(e) {
      if ($(this).is(':checked')) {
        passwordReveal($(e.target).parents('form'));
      } else {
        passwordHide($(e.target).parents('form'));
      }
    });
  };

  module.exports.ready = function() {
    $('form').each(function() {
      setControls(this);
      passwordReveal(this);
    });
    toggleReveal();
  };

});
