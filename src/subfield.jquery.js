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

(function($) {

  $.fn.subfield = function() {
    subfieldWatcher.init(this);
  };

  let subfieldWatcher = {

    pairs: {
      $parent: {},
      $subfield: {}
    },

    init: function($elements) {
      this.$elements = $elements;
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
        pair.$parent.change(function() {
          _this.checkValues(pair);
        });
      });
    },

    checkValues: function(pair) {
      if (!pair.$parent || !pair.$subfield) {
        return;
      }

      if (pair.$parent.val() == pair.$subfield.data('parent-value')) {
        pair.$subfield.show();
      } else {
        pair.$subfield.hide();
        this.clearValues(pair.$subfield);
      }
    },

    clearValues: function($subfield) {
      if ($subfield[0].localName === 'option') {
        $subfield.prop('selected', false);
      } else if ($subfield[0].localName === 'input' || $subfield[0].localName === 'textarea') {
        $subfield.val('');
      } else {
        // Clear any values within the subfield.
        $subfield.find('option').prop('selected', false);
        $subfield.find('input, texarea').val('');
      }
    },

    establishPairs: function() {
      let pairs = [];
      $(this.$elements).each(function() {
        let parentSelector = $(this).data('watch');
        pairs.push({
          $parent: $(parentSelector),
          $subfield: $(this)
        });
      });

      this.pairs = pairs;
    }

  };

})(jQuery);
