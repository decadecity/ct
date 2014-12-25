/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery'),
      config = require('config');

  var amountAtTime = function(start_value, start_time, current_time) {
    var half_lives = (current_time - start_time) / parseFloat(1000 * 60 * 60 * 6);
    return Math.round(start_value * Math.pow(0.5, half_lives));
  };

  var getStartData = function() {
    var dom_data = $('#current_caffeine');
    var data = {};
    data.date = new Date(dom_data.data('ct-timestamp-now'));
    data.amount = parseInt(dom_data.text(), 10);
    return data;
  };

  /* istanbul ignore next */
  var setCurrent = function(data) {
    $('#current_caffeine').text(amountAtTime(data.amount, data.date, new Date()));
  };

  /* istanbul ignore next */
  module.exports.ready = function() {
    var start_data = getStartData();
    setCurrent(start_data);
    window.setInterval(function() {
      setCurrent(start_data);
    }, 60 * 1000);
  };

  /* istanbul ignore next */
  if (config.debug) {
    module.exports.amountAtTime = amountAtTime;
    module.exports.getStartData = getStartData;
  }

});
