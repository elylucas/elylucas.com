---
title: "MVC4 Quick Tip #1 - Put Your API Controllers in a Different Folder to Avoid Class Naming Collisions"
publishedDate: 2012-02-20
author: ely-lucas
summary: "A tip on organizing ASP.NET MVC 4 API controllers in a separate folder to prevent naming collisions with standard MVC controllers."
canonicalUrl: https://www.elylucas.net/post/mvc4-quick-tip-1-put-your-api-controllers-in-a-different-folder-to-avoid-class-naming-collisions/
---

_Disclaimer: This code is based on MVC 4 Beta 1, and might change in future releases._

This is the start of a series of quick tips that I have come across while exploring ASP.NET MVC 4, which was released in beta form last week. For more info on MVC 4, check out www.asp.net/mvc/mvc4.

One of the new features of MVC 4 is the introduction of ASP.net Web APIs, which allow you to create RESTful services in your web projects. Before, we typically used MVC Controllers to return back JSON to our client, but the new Web APIs provide a much better way to create truly RESTful services that take advantage of what HTTP has to offer.

When you start a new MVC 4 project, you will see Controllers and Views folders like before. Before Web APIs, all of our controllers went into the Controllers folder. But now, you might have a controller that serves up Views and an API Controller that handles XHR requests from the browser or a mobile device. If both controllers are for the same concept, say an Account, you would naturally want to name both controllers AccountController. However, you cannot have two classes with the same name in the same namespace.

The simple solution is to put your API Controllers in their own folder, such as an "API" folder, which would give them a separate namespace. The default MVC route responds to "/{controller}" while the API route responds to "/api/{controller}". Since API Controllers inherit from APIController and not the standard Controller, the routing engine will know which class to use, even if both classes have the same name, as they will be in different namespaces.
