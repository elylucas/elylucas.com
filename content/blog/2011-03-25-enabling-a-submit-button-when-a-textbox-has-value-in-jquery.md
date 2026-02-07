---
title: "Enabling a Submit Button When a Textbox Has Value in jQuery"
publishedDate: 2011-03-25
author: ely-lucas
summary: "A quick guide to using jQuery's keyup event to enable or disable a submit button based on whether a textbox has a value."
canonicalUrl: https://www.elylucas.net/post/enabling-a-submit-button-when-a-textbox-has-value-in-jquery/
---

A common pattern on the web involves enabling a submit button only after a user fills in a textbox value. A colleague asked how to implement this functionality using jQuery.

The approach requires monitoring textbox changes and toggling the button's disabled state accordingly. The form initially loads with the submit button disabled.

I tested several events before finding the right solution. The `change` event fires only when focus is lost. The `keypress` event fires before the textbox updates, returning the previous value rather than the current input. The `keyup` event proved effective for this use case.

```javascript
$(document).ready(function () {
    $("#name").keyup(function (data) {
        if ($(this).val() != "") {
            $("#enter").removeAttr("disabled");
        }
        else {
            $("#enter").attr("disabled", "disabled");
        }
    });
});
```

The HTML structure includes a text input with `id="name"` and a submit button with `id="enter"` initially set to `disabled="disabled"`.

Make sure you always validate on the server side as well, as this client-side approach requires backend validation for security.
