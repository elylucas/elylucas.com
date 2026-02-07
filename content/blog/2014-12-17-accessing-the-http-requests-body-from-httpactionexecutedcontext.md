---
title: "Accessing the Http Request's Body from HttpActionExecutedContext"
publishedDate: 2014-12-17
author: ely-lucas
summary: "How to read the HTTP request body from an HttpActionExecutedContext in Web API by resetting the stream position before reading."
canonicalUrl: https://www.elylucas.net/post/accessing-the-http-requests-body-from-httpactionexecutedcontext/
---

Accessing HTTP request bodies in Web API differs from MVC due to stream-based processing. Once the stream is read during the model binding phase, the stream is at the end, and if you try to read it at a later time, you might notice the body is just a blank string.

I encountered this issue while developing an exception filter for logging request bodies. The `Request.Content` property appeared to contain data, but reading it yielded empty results.

The solution involves repositioning the stream pointer before reading. The following method demonstrates this approach:

```csharp
private string GetBodyFromRequest(HttpActionExecutedContext context)
{
    string data;
    using (var stream = context.Request.Content.ReadAsStreamAsync().Result)
    {
        if (stream.CanSeek)
        {
            stream.Position = 0;
        }
        data = context.Request.Content.ReadAsStringAsync().Result;
    }
    return data;
}
```

This function resets the stream position to zero before attempting to read the content, allowing you to retrieve request body data within Web API filter attributes effectively.
