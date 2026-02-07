---
title: "How to Upgrade Angular and Ionic in Your Ionic v4 Apps"
publishedDate: 2018-08-06
author: ely-lucas
summary: "A guide to upgrading Angular and Ionic in Ionic v4 apps using the Angular CLI ng update command."
canonicalUrl: https://www.elylucas.net/posts/2018-08-06-angular-6-1-in-ionic-v4/
---

**Note:** This post is based on an early Ionic v4 beta release.

**Update 8/8/2018:** Ionic v4 beta 2 has been released and includes Angular 6.1.

Ionic v4 represents a significant architectural shift from previous versions. In Ionic v3, Ionic included its own build tooling (`ionic-app-scripts`), but in v4, Ionic now relies on the underlying framework to provide a lot of these needed features. For Angular apps, this means the Angular CLI is now the build system.

## Upgrading Angular

To update Angular libraries to the latest version (6.1 at the time of writing) and TypeScript to 2.9, run:

```bash
ng update @angular/core
```

You may encounter peer dependency warnings, but your app should remain functional.

## Upgrading Ionic

When new Ionic versions are released, you can upgrade with:

```bash
ng update @ionic/angular
```

## Angular 6.1 Features

Angular 6.1 introduced several nice features:

- **keyValue pipe** - A new pipe for iterating over plain JavaScript objects and maps in templates.
- **Scroll position restoration** - This does not work with Ionic because Ionic has its own method of scrolling. Ionic's custom scrolling implementation conflicts with Angular's window scroll position handling.
- **TypeScript 2.9 upgrade** - Provides improved type checking and new language features.
