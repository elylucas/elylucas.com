---
title: "MVC4 Quick Tip #3 - Removing the XML Formatter from ASP.Net Web API"
publishedDate: 2012-03-05
author: ely-lucas
summary: "How to remove the default XML formatter from ASP.Net Web API so that your API only returns JSON responses."
canonicalUrl: https://www.elylucas.net/post/mvc4-quick-tip-3-removing-the-xml-formatter-from-asp-net-web-api/
---

_Disclaimer: This code is based on MVC 4 Beta 1, and might change in future releases._

One of the cool features that ASP.Net Web API includes is content negotiation. Content negotiation automatically formats the response based on what the client asks for. So if the client sends 'application/xml' as the Content-Type HTTP header, the response will be XML. The Web API includes two formatters out of the box, XML and JSON.

The nice thing about this is that we don't have to code anything into our methods to format the model, that all happens automagically. However, if you know that you are only going to serve up JSON from your Web API, say for web or mobile clients, you might want to get rid of any other formats. This also simplifies testing your Web API from a browser, since some browsers default to requesting application/xml content types.

To remove the XML formatter, put the following code somewhere in your Application_Start method in the global.asax.cs file:

```csharp
GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
```

Thanks to Glenn Block for this one, he has it documented on his blog as well.
