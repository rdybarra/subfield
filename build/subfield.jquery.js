/*
 * Watches fields for changes. If a field's value ever matches what the
 * corresponding subfield is configured to look for, then the subfield will
 * show.
 *
 * <select name="foo">
 *   <option value="baz">Baz</option>
 * </select>
 *
 * <input class="subfield" data-watch="foo" data-parent-value="baz">
 */

'use strict';

(function ($) {

  $.fn.subfield = function () {
    subfieldWatcher.init(this);
  };

  var subfieldWatcher = {

    pairs: {
      $parent: {},
      $subfield: {}
    },

    init: function init($elements) {
      this.$elements = $elements;
      this.establishPairs();
      this.setupEvents();
      this.initialCheck();
    },

    initialCheck: function initialCheck() {
      var _this2 = this;

      this.pairs.forEach(function (pair) {
        _this2.checkValues(pair);
      });
    },

    setupEvents: function setupEvents() {
      var _this = this;
      this.pairs.forEach(function (pair) {
        pair.$parent.change(function () {
          _this.checkValues(pair);
        });
      });
    },

    checkValues: function checkValues(pair) {
      if (!pair.$parent || !pair.$subfield) {
        return;
      }

      if (pair.$parent.val() == pair.$subfield.data('parent-value')) {
        pair.$subfield.show();
      } else {
        pair.$subfield.hide();
      }
    },

    establishPairs: function establishPairs() {
      var pairs = [];
      $(this.$elements).each(function () {
        var parentSelector = $(this).data('watch');
        pairs.push({
          $parent: $(parentSelector),
          $subfield: $(this)
        });
      });

      this.pairs = pairs;
    }

  };
})(jQuery);
