/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery');

  var toggleMenu = function() {
    $(document).on('click', '[data-ct-ui-menu-control]', function() {
      $('body').toggleClass('menu--open');
    });
  };

  var toggleSubMenu = function() {
    $(document).on('click', '[data-ct-ui-submenu-control]', function() {
      $(this).parents('[data-ct-ui-submenu]').toggleClass('menu__sub-menu--open');
    });
  };

  module.exports.ready = function() {
    toggleMenu();
    toggleSubMenu();
  };

});
