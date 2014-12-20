define(function (require) {
  "use strict";
  var $ = require('jquery');

  $(document).ready(function() {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    //var items = {{ items|safe }};
    var items = [];

    var descriptions = [];
    var caffeine_contents = {};

    items.forEach(function(item) {
      descriptions.push(item.description);
      caffeine_contents[item.description] = item.caffeine;
    });

    $('#new_items').typeahead({ //TODO - b0rked.
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'description',
      displayKey: 'value',
      source: substringMatcher(descriptions)
    }).on('typeahead:selected', function(e) {
      var description = e.target.value;
      var caffeine = $('#absolute');
      if (caffeine_contents.hasOwnProperty(description)) {
        caffeine.val(caffeine_contents[description]);
      } else {
        caffeine.val('');
      }
      //caffeine.trigger('change');
    });


  });
});
