/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');

  var setDefaults = function setDefaults() {
    $('[data-ct-form-default]').each(function() {
      var type = $(this).data('ct-form-default');
      if (type === 'today') {
        var today = new Date();
        this.value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      }
    });
  };

  module.exports.ready = function() {
    $('#advanced-form-target').html($('#advanced-form').html());
    setTimeout(function() {
      $('.messages--success').fadeOut();
    }, 2000);

    setDefaults();
  };

});
