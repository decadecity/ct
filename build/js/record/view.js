/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');

  module.exports.ready = function() {
    $('#advanced-form-target').html($('#advanced-form').html());
    setTimeout(function() {
      $('.messages--success').fadeOut();
    }, 2000);
  };

});
