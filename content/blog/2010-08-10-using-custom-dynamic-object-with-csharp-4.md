---
title: "Using Custom Dynamic Object with C# 4.0 for Even More Flexible Parameter Passing"
publishedDate: 2010-08-10
author: ely-lucas
summary: "How to create a custom DynamicObject subclass in C# 4.0 that supports safe property existence checking for more flexible and resilient dynamic parameter passing."
canonicalUrl: https://www.elylucas.net/post/using-custom-dynamic-object-with-c-4-0-for-even-more-flexible-parameter-passing/
---

A few days back, Rob Conery wrote a post comparing C# and Ruby, discussing how the dynamic keyword in C# enables flexible parameter passing similar to Ruby. I have experience with .NET applications using dictionary parameters but agree that flexibility is valuable during API development when signatures change frequently.

Rob's original example demonstrates basic dynamic usage:

```csharp
DoStuff(new { Message = "Hello Monkey" });

static void DoStuff(dynamic args) {
    Console.WriteLine(args.Message);
}
```

However, there is a critical limitation: all the arguments used inside of the DoStuff method are now required to be defined in the dynamic object being passed in. This creates runtime crashes when accessing undefined properties.

The solution is to check property existence using a "Has" prefix pattern -- inspired by JavaScript's conditional checking -- by creating a custom `DynamicParam` class inheriting from `DynamicObject`.

**Complete Code Implementation:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Dynamic;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {
            dynamic param = new DynamicParam();
            param.Message = "butt";
            param.SayHi = new Action<string>(s => Console.WriteLine(s));

            DoStuff(param);
            Console.ReadLine();
        }

        static void DoStuff(dynamic args)
        {
            Console.WriteLine(args.Message);
            if (args.HasTitle)
                Console.WriteLine(args.Title);
            if (args.HasSayHi)
                args.SayHi("h22i");
        }
    }

    class DynamicParam : DynamicObject
    {
        private Dictionary<string, object> _members = new Dictionary<string, object>();

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            if (binder.Name.StartsWith("Has"))
            {
                var name = binder.Name.Substring(3);
                if (_members.ContainsKey(name))
                    result = true;
                else
                    result = false;
                return true;
            }
            else
            {
                if (_members.ContainsKey(binder.Name))
                {
                    result = _members[binder.Name];
                    return true;
                }
                else
                {
                    result = false;
                    return true;
                }
            }
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            if (!_members.ContainsKey(binder.Name))
                _members.Add(binder.Name, value);
            else
                _members[binder.Name] = value;
            return true;
        }
    }
}
```

The `DynamicParam` class uses a dictionary to track dynamic members and their values. The `TryGetMember` override checks if the requested property name starts with "Has" -- if so, it checks whether the corresponding property (without the "Has" prefix) exists in the dictionary and returns a boolean. This allows safe property existence checking before access, and supports method invocation on dynamic parameters.
