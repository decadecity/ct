/* jshint qunit:true */
/*
  ======== A Handy Little QUnit Reference ========
  http://docs.jquery.com/QUnit

  Test methods:
    expect(numAssertions)
    stop(increment)
    start(decrement)
  Test assertions:
    ok(value, [message])
    equal(actual, expected, [message])
    notEqual(actual, expected, [message])
    deepEqual(actual, expected, [message])
    notDeepEqual(actual, expected, [message])
    strictEqual(actual, expected, [message])
    notStrictEqual(actual, expected, [message])
    raises(block, [expected], [message])
*/

define(function(require) {
  "use strict";

  var menu = require('menu'),
      $ = require('jquery');

  return {
    runTests: function() {

      module('Menu');

      menu.ready();

      test('toggleMenu', function() {
        var body = $('body');
        strictEqual(body.hasClass('menu--open'), false, 'Initial state');
        $('#menu-control').trigger('click');
        strictEqual(body.hasClass('menu--open'), true, 'Body class triggered');
        $('#menu-control').trigger('click');
        strictEqual(body.hasClass('menu--open'), false, 'Body class removed');
      });

      test('toggleSubMenu', function() {
        var submenu = $('#submenu');
        strictEqual(submenu.hasClass('menu__sub-menu--open'), false, 'Initial state');
        $('#submenu-control').trigger('click');
        strictEqual(submenu.hasClass('menu__sub-menu--open'), true, 'Submenu class triggered');
        $('#submenu-control').trigger('click');
        strictEqual(submenu.hasClass('menu__sub-menu--open'), false, 'Submenu class removed');
      });
    }
  };
});

