## Show and hide a DOM element depending on the value of a field

Watches fields for changes. If a field's value ever matches what the watching element is configured to look for, then the watching element will show, otherwise it will be hidden.

## Use-case examples
### Hide a field unless a field is has a certain value
![Select Filter](http://rdybarra.com/images/hidden-field.gif)

### Hide field options unless a field has a certain value
![Select Filter](http://rdybarra.com/images/select-filter.gif)

## Usage

### Terminology
`watching element` - an element that is shown/hidden depending on a field's value.
`watch field` - a field that when set to a specific value, triggers the display of a watching element.

### Markup
Each watching element must contain 3 things:

1. A CSS selector that can `jQuery` can use to select the item (e.g. `class="subfield"`)
2. A data attribute titled `data-watch-field` which contains the CSS selector of the watch field.
3. A data attribute titled `data-watch-field-value` which contains the value that the watch field should have before the watching element is shown.

**Example:**

```
<div class="watching-element" data-watch="#favorite-food" data-parent-value="pizza">
```

If you notice, the watching element designation can be applied to any arbitrary HTML element. It does not need to be applied directly to a field.

### Javascript
1. Include jquery (tested with jquery 3)
2. Include this plugin
3. When ready, fire-off the plugin

```
 $('.watching-element').watchAndReveal();
```

In the above example `.watching-element` is just a CSS selector. You could easily use any other CSS selector.

### Options

Options can be set when initializing the plugin in jQuery:

```
$('.field-watcher').watchAndReveal({
  showOnEmpty: true
});
```

There is only one option: `showOnEmpty`. The default value is `false`. When set to `true`, the watching element will be made visible if the watch field is empty.

## Complete Example
In the following example, the `toppings` field will show only when the `favorite-food` field has the value `pizza` selected.

```
<form>
  <label>
    <span>Favorite Food</span>
    <select id="favorite-food" name="favorite-food">
      <option value="mexican">Mexican</option>
      <option value="pizza">Pizza</option>
      <option value="hamburger">Hamburger</option>
    </select>
  </label>

  <div class="subfield" data-watch-field="#favorite-food" data-watch-fiel-value="pizza">
    <label>
      <span>Toppings:</span>
      <input type="text" name="toppings" value="">
    </label>
  </div>
</form>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="/build/subfield.jquery.js"></script>

<script type="text/javascript">
  $(document).ready(function() {
    $('.watching-element').watchAndReveal();
  });
</script>
```

## Build
This is how I build:

```
babel src/watch-and-reveal.jquery.js -o build/watch-and-reveal.jquery.js --watch
```
