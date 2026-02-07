---
title: "Global Filters and Dependency Injection in MVC3"
publishedDate: 2011-08-18
author: ely-lucas
summary: "A solution for resolving dependencies in ASP.NET MVC3 global filters by using Ninject to instantiate filter attributes during application startup."
canonicalUrl: https://www.elylucas.net/post/global-filters-and-dependency-injection-in-mvc3/
---

I was having trouble getting my dependencies resolved in my global filters. Turns out global filters are not instantiated through the FilterAttributeFilterProvider, so any properties I had on them with a resolve attribute were not getting resolved.

My solution was to use Ninject to instantiate the global filter during the app startup, like so:

```csharp
private static void RegisterGlobalFilters(GlobalFilterCollection filters, IKernel kernel)
{
    filters.Add(new HandleErrorAttribute());
    filters.Add(kernel.TryGet(typeof(UserProviderFilterAttribute)));
}
```

At first, I felt a little dirty doing this and thought it was a giant hack. But the more I thought about it, the more it made sense. Since global.asax is the area of responsibility for creating global filters, it seemed like an appropriate spot to have Ninject resolve any dependencies that those filters might need.

Do you have an alternative way to do this, or do you have any other thoughts? Please let me know!
