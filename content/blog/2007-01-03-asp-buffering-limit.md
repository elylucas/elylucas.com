---
title: "ASP Buffering Limit"
publishedDate: 2007-01-03
author: ely-lucas
summary: "How to fix the IIS6 Response Buffer Limit Exceeded error by increasing the ASP buffering limit using the adsutil utility."
canonicalUrl: https://www.elylucas.net/post/asp-buffering-limit/
---

I ran into an error on an ASP page running on IIS6 today:

> Response object error 'ASP 0251 : 80004005' Response Buffer Limit Exceeded

The problem was the total output was over 12MB, and the default for the ASPBufferLimit is only 4MB.

Now, I know that a page that produces 12MB of HTML output has a design problem and is in need of some restructuring, but in the meantime, I needed a quick fix to get it working.

To resolve the issue, use the adsutil utility to increase the buffering limit:

```bash
adsutil set w3svc/aspbufferinglimit "4194304"
```

This will set the ASPBufferingLimit on the global web service that all the virtual directories inherit from, meaning that all the sites configured on this box now have this limit. The number is the amount of bytes for the buffer limit, 4194304 (4MB) being the default. You can increase this value to accommodate larger responses as needed.
