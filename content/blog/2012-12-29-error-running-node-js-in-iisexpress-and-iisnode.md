---
title: "Error Running Node JS in IISExpress and IISNode"
publishedDate: 2012-12-29
author: ely-lucas
summary: "How to fix the IISNode error when running Node.js in IISExpress on a 64-bit system by installing the 32-bit version of Node."
canonicalUrl: https://www.elylucas.net/post/error-running-node-js-in-iisexpress-and-iisnode/
---

I recently started exploring Node.js while following TekPub's Backbone JS tutorials, which utilized Node for the backend. Following along with the instructor's use of WebMatrix on Windows 8, I encountered an error upon first attempting to run the site via IISExpress and IISNode.

## The Error

> The iisnode module is unable to start the node.exe process. Make sure the node.exe executable is available at the location specified in the `system.webServer/iisnode/@nodeProcessCommandLine` element of web.config. By default node.exe is expected to be installed in `%ProgramFiles%\nodejs` folder on x86 systems and `%ProgramFiles(x86)%\nodejs` folder on x64 systems.

## The Solution

Upon examining the web.config file, I found a commented-out section containing various IISNode configuration options, including `nodeProcessCommandLine` -- the path specification for node.exe. Although the path appeared correct on my 64-bit system, IISNode still refused to initialize.

Research on StackOverflow revealed a known bug where IISNode consistently searches for Node in the 32-bit Program Files (x86) directory path, regardless of system architecture or configuration settings.

The resolution was to download and install the **32-bit version of Node.js** from the official Node website rather than using the default 64-bit installation. This resolved the issue immediately.

It was surprising that this problem wasn't more widely documented, given that the default Node.js download targets 64-bit systems.
