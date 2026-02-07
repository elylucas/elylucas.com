---
title: "MVC4 Quick Tip #2 - Use Delegates to Setup the Dependency Resolver"
publishedDate: 2012-02-20
author: ely-lucas
summary: "A tip showing how to simplify MVC dependency resolver setup by using delegate methods instead of creating a full IDependencyResolver implementation class."
canonicalUrl: https://www.elylucas.net/post/mvc4-quick-tip-2-use-delegates-to-setup-the-dependency-resolver-instead-of-creating-a-dependency-resolver-class/
---

I'm a big fan of cutting out unneeded or unnecessary code, so here is a tip that isn't new in MVC4, but I just discovered it and thought it was really cool and worth sharing. When using IOC in MVC, you setup a class that implements IDependencyResolver, which has methods to return services for a given type. While these classes where simple, it always seemed like a bit of ceremony was required whenever starting up a new MVC app.

The following example shows what a DependencyResolver class looks like using my favorite IOC framework, Ninject:

```csharp
public class NinjectDependencyResolver : IDependencyResolver
{
    private readonly IKernel _kernel;

    public NinjectDependencyResolver(IKernel kernel)
    {
        _kernel = kernel;
    }

    public object GetService(Type serviceType)
    {
        return _kernel.TryGet(serviceType);
    }

    public IEnumerable<object> GetServices(Type serviceType)
    {
        return _kernel.GetAll(serviceType);
    }
}
```

Nothing terribly complicated, but a lot of fluff.

I saw in a demo in last week's C4MVC talk, that the DependencyResolver that was setup to create the APIController classes had some overrides I never saw before, and low and behold, the standard MVC DependencyResolver also has these overrides.

So instead of providing the SetResolver method with a DependencyResolver class, you can just provide it two delegate methods that would normally be in the DependencyResolver (GetService, and GetServices):

```csharp
DependencyResolver.SetResolver(
    x => kernel.TryGet(x),
    x => kernel.GetAll(x));
```

POW! Cut that 20+ line class down to a method that takes two parameters. BAM!
