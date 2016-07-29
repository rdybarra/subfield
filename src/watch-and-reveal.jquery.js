/*
 * Watches fields for changes. If a field's value ever matches what the
 * watching element is configured to look for, then the watching element will
 * show, otherwise it will be hidden.
 *
 * <select id="foo" name="foo">
 *   <option value="baz">Baz</option>
 * </select>
 *
 * <input class="watching-element" data-watch-field="foo" data-watched-field-value="baz">
 */

(function($) {

  $.fn.watchAndReveal = function(options) {
    options = options || {};

    let defaults = {
      showOnEmpty: false
    };

    let settings = Object.assign(defaults, options);

    watchAndReveal.init(this, settings);
  };

  let watchAndReveal = {

    pairs: {
      $watchedField: {},
      $watchingElement: {}
    },

    init: function($elements, settings) {
      this.$elements = $elements;
      this.settings = settings;
      this.establishPairs();
      this.setupEvents();
      this.initialCheck();
    },

    initialCheck: function() {
      this.pairs.forEach(pair => {
        this.checkValues(pair);
      });
    },

    setupEvents: function() {
      var _this = this;
      this.pairs.forEach(function(pair) {
        pair.$watchedField.change(function() {
          _this.checkValues(pair);
        });
      });
    },

    checkValues: function(pair) {
      if (!pair.$watchedField || !pair.$watchingElement) {
        return;
      }

      if (this.settings.showOnEmpty && pair.$watchedField.val() == '' ) {
        return pair.$watchingElement.show();
      }

      if (pair.$watchedField.val() == pair.$watchingElement.data('watch-field-value')) {
        pair.$watchingElement.show();
      } else {
        pair.$watchingElement.hide();
        this.clearValues(pair.$watchingElement);
      }
    },

    clearValues: function($watchingElement) {
      if ($watchingElement[0].localName === 'option') {
        $watchingElement.prop('selected', false);
      } else if ($watchingElement[0].localName === 'input' || $watchingElement[0].localName === 'textarea') {
        $watchingElement.val('');
      } else {
        // Clear any values within the watching element.
        $watchingElement.find('option').prop('selected', false);
        $watchingElement.find('input, texarea').val('');
      }
    },

    establishPairs: function() {
      let pairs = [];
      $(this.$elements).each(function() {
        let watchedFieldSelector = $(this).data('watch-field');
        pairs.push({
          $watchedField: $(watchedFieldSelector),
          $watchingElement: $(this)
        });
      });

      this.pairs = pairs;
    }

  };

})(jQuery);
