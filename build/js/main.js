define(function (require) {
  "use strict";

  // Bring in all our dependencies.
  var record = require('record/main');

  var _ = typeof record;
  if (_) {
    _ = undefined;
  }

  function readyRunner() {
    // Run the ready() handlers for each module.
  }
  /**
   * Run all modules that have handlers for DOM ready.
   */
  if (document.readyState !== 'loading') {
    readyRunner();
  } else {
    document.addEventListener('DOMContentLoaded', readyRunner, false);
  }


  /**
   * Run all modules that have handlers for load and defer.
   */

  /**
   * Single holder for handlers to run as we need to call it from
   * two different places.
   */
  function loadRunner() {
    // Run the load() handlers for each module.
    window.setTimeout(function() {
      // Run the defer() handlers for each module.
    }, 100);
  }

  if (document.readyState === 'complete') {
    // Load event has already fired so run now.
    loadRunner();
  } else {
    // Attach to the load event.
    window.addEventListener('load', loadRunner, false);
  }


  /**
   * Set up a debounced resize trigger to run all modules
   * that have a resize handler.
   *
   * The debounce ensures that the handlers only run when
   * the window has finished resizing rather than continuously as
   * it is resized.
   */
      // Holder for the resize timer to allow debouncing.
  var resize_timer;

  function resizeRunner() {
      // Run the resize() handlers for each module.
  }

  window.addEventListener('resize', function(/*event*/) {
    if (resize_timer) {
      // There is a resize timer set so clear it.
      resize_timer = window.clearTimeout(resize_timer);
    }
    // Set a new timer for the resize event.
    resize_timer = window.setTimeout(function () {
      resizeRunner();
      // Clear the timeout ready for the next use.
      resize_timer = window.clearTimeout(resize_timer);
    }, 100);
  }, false);


  /**
   * Set up a throttled scroll trigger to run all modules
   * that have a scroll handler.
   *
   * The throttle ensures that the handlers only run at a controlled
   * rate rather than as fast as they get fired.
   */
      // Holder for the scroll timer to allow throttling.
  var scroll_timer,
      // Time we ran the handlers last (integer).
      last_run,
      // Throttle frequency in ms.
      threshhold = 100;

  /**
   * Single holder for handlers to run as we need to call it from
   * two different places.
   */
  function scrollRunner(/*event*/) {
    // Run the scroll() handlers for each module.
  }

  window.addEventListener('scroll', function(event) {
        // Current time as an integer.
    var now = +new Date();

    if (last_run && now < last_run + threshhold) {
      // We are still in the throttle timeout window.
      // Cancel running the events.
      window.clearTimeout(scroll_timer);
      // Set up a new timeout window.
      scroll_timer = window.setTimeout(function () {
        // If we don't get cancelled then run the handers.
        last_run = now;
        scrollRunner(event);
      }, threshhold);
    } else {
      // We are outside the timeout window so run the handers.
      last_run = now;
      scrollRunner(event);
    }
  }, false);

});
