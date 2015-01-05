/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery'),
      config = require('config');

  var amountAtTime = function(start_value, start_time, current_time) {
    var half_lives = (current_time - start_time) / parseFloat(1000 * 60 * 60 * 6);
    return Math.round(start_value * Math.pow(0.5, half_lives));
  };

  var getStartData = function(element) {
    var data = {};
    data.date = new Date($(element).data('ct-timestamp-now'));
    data.amount = parseInt($(element).text(), 10);
    $(element).data('ct-data-caffeine-parsed', data);
  };

  var setCurrent = function() {
    var now = new Date();
    $('[data-ct-ui-caffeine-content]').each(function() {
      var data = $(this).data('ct-data-caffeine-parsed');
      $(this).text(amountAtTime(data.amount, data.date, now));
    });
  };

  var initialiseData = function() {
    $('[data-ct-ui-caffeine-content]').each(function() {
      getStartData(this);
    });
  };

  /* istanbul ignore next */
  module.exports.ready = function() {
    initialiseData();
    setCurrent();
    window.setInterval(function() {
      setCurrent();
    }, 60 * 1000);
  };

  /* istanbul ignore next */
  if (config.debug) {
    module.exports.amountAtTime = amountAtTime;
    module.exports.initialiseData = initialiseData;
    module.exports.setCurrent = setCurrent;
  }

});
