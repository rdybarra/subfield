## Show and hide a subfield depending on the value of another field

Watches fields for changes. If a field's value ever matches what the corresponding subfield is configured to look for, then the subfield will show. Otherwise, it is hidden.

## Usage

### Terminology 
`subfield` - a field that is shown/hidden depending on another field's value.
`parent` - a field that when set to a specific value, triggers the display of a subfield.

### Markup
Each subfield must contain 3 things:
1. A CSS selector that can `jQuery` can use to select the item (e.g. `class="subfield"`)
2. A data attribute titled `data-watch` which contains the CSS selector of the parent field.
3. A data attribute titled `data-parent-value` which contains the value that the parent field should have before the subfield is shown.

**Example:**

```
<div class="subfield" data-watch="#favorite-food" data-parent-value="pizza">
```

If you notice, the subfield designation can be applied to any arbitrary HTML element. It does not need to be applied directly to the field.

### Javascript
1. Include jquery (tested with jquery 3)
2. Include this plugin
3. When ready, fire-off the plugin

```
 $('.subfield').subfield();
```  

In the above example `.subfield` is just a CSS selector. You could easily use any other CSS selector.

## Complete Example
In the following example, the `toppings` field will show only when the `favorite-food` field has the value `pizza` selected.

<form>
  <label>
    <span>Favorite Food</span>
    <select id="favorite-food" name="favorite-food">
      <option value="mexican">Mexican</option>
      <option value="pizza">Pizza</option>
      <option value="hamburger">Hamburger</option>
    </select>
  </label>

  <div class="subfield" data-watch="#favorite-food" data-parent-value="pizza">
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
    $('.subfield').subfield();
  });
</script>
```

## Build
This is how I build:

```
babel src/subfield.jquery.js -o build/subfield.jquery.js --watch
```   
