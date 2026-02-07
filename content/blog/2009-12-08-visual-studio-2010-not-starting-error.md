---
title: "Visual Studio 2010 Not Starting with an 'The Application Cannot Start' Error?"
publishedDate: 2009-12-08
author: ely-lucas
summary: "A quick fix for the Visual Studio 2010 startup error 'The Application Cannot Start' caused by a corrupted user profile."
canonicalUrl: https://www.elylucas.net/post/visual-studio-2010-not-starting-with-an-the-application-cannot-start-error/
---

I started getting this error out of the blue trying to startup VS 2010 tonight. I searched around and found a bug on the Connect site and a workaround.

The problem seems to stem from having a corrupted profile (at least it did for me), and running the following command fixed the problem.

Navigate to the IDE directory and run the reset command:

```bash
cd "C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE"
devenv /resetuserdata
```

If you are having this issue, give this a try, and head over to the Connect site and vote up the bug to get it fixed.
