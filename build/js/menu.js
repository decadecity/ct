/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');

  var toggleMenu = function() {
    $(document).on('click', '[data-ct-ui-menu-control]', function() {
      $('body').toggleClass('menu--open');
    });
  };

  module.exports.ready = function() {
    toggleMenu();
  };

});
