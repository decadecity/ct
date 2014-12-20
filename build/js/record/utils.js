/* global: exports */
define(function (require, exports, module) {
  "use strict";

  module.exports.getInt = function getInt(number) {
    number = parseInt(number, 10);
    if (isNaN(number)) {
      number = 0;
    }
    return number;
  };


  module.exports.zeroFill = function zeroFill(number, decimals, pad_character) {
    decimals = decimals || 2;
    pad_character = pad_character || '0';
    var pad = new Array(1 + decimals).join(pad_character);
    return (pad + number).slice(-pad.length);
  };

});
