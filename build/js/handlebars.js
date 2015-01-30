/**
 * Shim for Handlebars runtime to work with 2.0 in AMD.
 */
define('handlebars', ['handlebars.runtime'], function(Handlebars) {
  "use strict";
  // Handlebars 2 has the interface on Handlebars.default
  // `default` is a reserved keyword so use the array syntax.
  return Handlebars['default'];
});
