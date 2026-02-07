---
title: "Ending the Debug Session in Visual Studio 2013 Preview Kills IISExpress, and How to Fix It"
publishedDate: 2013-08-21
author: ely-lucas
summary: "A quick fix for Visual Studio 2013 Preview's behavior of terminating IISExpress when stopping a debug session, by disabling Edit and Continue."
canonicalUrl: https://www.elylucas.net/post/ending-the-debug-session-in-visual-studio-2013-preview-kills-iisexpress-and-how-to-fix-it/
---

Visual Studio 2013 Preview has a default behavior where terminating a debugging session for an ASP.NET application also terminates the IISExpress instance. This is fairly annoying because my typical workflow involves keeping the browser window open, performing a new build, and refreshing the page.

## The Fix

To resolve this, go to the project properties for the web application, go to the Web tab, and uncheck **"Enable Edit and Continue"**.

That's it. This should prevent IISExpress from being killed when you stop debugging.

## Commentary

I suspect this is a bug that will be resolved in the final Visual Studio 2013 release. While the return of Edit and Continue functionality is desirable, it shouldn't come at the cost of killing IISExpress during normal debugging workflows.
