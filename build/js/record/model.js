/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var utils = require('./utils');

  var Record = function record() {
    var self = {};

    self.description = '';
    self.time = new Date();
    self.caffeine = 0;

    self.timeString = function timeString() {
      var date = '';

      date += self.time.getFullYear();
      date += '-' + utils.zeroFill(self.time.getMonth() + 1);
      date += '-' + utils.zeroFill(self.time.getDate());
      date += ' ';
      date += utils.zeroFill(self.time.getHours());
      date += ':' + utils.zeroFill(self.time.getMinutes());
      date += ':00'; // Seconds

      return date;
    };

    self.timeType = function timeType(time, type) {
      if (type === 'now') {
        self.time = new Date();
      } else if (type === 'time') {
        time = time.split(':');
        /* istanbul ignore else */
        if (time.length === 2) {
          self.time.setHours(time[0], time[1], 0);
        }
      } else if (type === 'date') {
        time = time.split('-');
        /* istanbul ignore else */
        if (time.length === 3) {
          self.time.setFullYear(time[0], parseInt(time[1], 10) - 1, time[2]);
        }
      }
    };

    return self;
  };

  module.exports.record = new Record();
});
