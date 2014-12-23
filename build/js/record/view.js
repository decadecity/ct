/* global: exports */
define(function (require, exports, module) {
  "use strict";

  var $ = require('jquery'),
      model = require('record/model'),
      config = require('config');

  var stage = model.stage;

  /**
   * Set defaults on form fields.
   */
  var setDefaults = function setDefaults() {
    $('[data-ct-form-default]').each(function() {
      var type = $(this).data('ct-form-default');
      var value = '';
      if (type === 'today') {
        var today = new Date();
        value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      } else {
        value = type;
      }
      $(this).val(value);
    });
  };

  /**
   * Set the current stage in the view.
   */
  var setStage = function advanceStage() {
    var current_stage = $('[data-ct-ui-stage=' + stage.current + ']');
    $('[data-ct-ui-stage]').addClass('ui--removed');
    current_stage.removeClass('ui--removed');
  };
  var initialStage = function advanceStage() {
    $('[data-ct-ui-stage]').addClass('ui--removed');
  };

  /**
   * Setup the view.
   */
  /* istanbul ignore  next */
  var init = function init() {
    // Get the form ready.
    $('#advanced-form-target').html($('#advanced-form').html());

    // Stages.
    initialStage();
    setStage();

    // Default form values.
    setDefaults();

    // Clear the messages.
    setTimeout(function() {
      $('.messages--success').fadeOut();
    }, 2000);
  };

  /* istanbul ignore  next */
  module.exports.ready = function() {
    init();
  };
  module.exports.setStage = setStage;

  /* istanbul ignore  next */
  if (config.debug) {
    module.exports.setDefaults = setDefaults;
    module.exports.initialStage = initialStage;
  }

});
