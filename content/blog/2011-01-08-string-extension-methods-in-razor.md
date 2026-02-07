---
title: "String Extension Methods in Razor"
publishedDate: 2011-01-08
author: ely-lucas
summary: "A look at the helpful string extension methods available in the Razor view engine for type detection and conversion of query string values."
canonicalUrl: https://www.elylucas.net/post/string-extension-methods-in-razor/
---

The Razor view engine provides helpful extension methods for views that handle type detection and conversion of string values. Here is an example:

```csharp
@{
    if (Request.QueryString["amount"].IsDecimal())
    {
        @Request.QueryString["amount"].AsDecimal().ToString("c")
    }
    else
    {
        @: Amount is not a valid number
    }
}
```

Extension methods exist in pairs: `Is(Type)` and `As(Type)` methods for bools, datetimes, decimals, floats, and ints. The `As(Type)` conversion methods accept an optional second parameter serving as a default value if conversion fails.

These utilities reside in the `System.Web.WebPages` namespace, which MVC3 and Webmatrix projects reference by default. Developers can add a using statement to `System.Web.WebPages` to leverage these methods in their views when needed.
