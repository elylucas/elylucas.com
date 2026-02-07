---
title: "Using a Grid That Can Sort, Page, and Filter in ASP.NET MVC3 - Part 1 - Using the WebGrid WebHelper"
publishedDate: 2011-03-07
author: ely-lucas
summary: "A walkthrough of using the WebGrid WebHelper in ASP.NET MVC3 to create a grid with built-in sorting, paging, and filtering capabilities using unobtrusive AJAX."
canonicalUrl: https://www.elylucas.net/post/using-a-grid-that-can-sort-page-and-filter-in-asp-net-mvc3-part-1-using-the-webgrid-webhelper/
---

## Introduction

ASP.NET WebForms developers are accustomed to controls like DataGrid and GridView that provide built-in functionality. While productive, these controls offer limited customization. ASP.NET MVC provides complete HTML control but lacked convenient grid solutions until MVC3 introduced the WebGrid helper from the System.Web.WebHelpers assembly.

## Setting Up the MvcWebGrid Application

Create a new MVC3 application using the Empty template with Razor view engine. Add a HomeController and create an AlbumRepo class that returns a list of music albums (available on GitHub at mvcmusicstore.codeplex.com).

**HomeController Index Action:**

```csharp
public ActionResult Index()
{
    var albums = AlbumRepo.GetAlbums();
    return View(albums);
}
```

**Updated _Layout.cshtml:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>@ViewBag.Title</title>
    <link href="@Url.Content("~/Content/Site.css")" rel="stylesheet" type="text/css" />
    <script src="@Url.Content("~/Scripts/jquery-1.4.4.min.js")" type="text/javascript">
    </script>
</head>
<body>
    <div id="header">
        Welcome to my awesome music site where
        a deep dish of awesome stew is served up daily
        <p/> <p /><p />
    </div>

    @RenderBody()

    <div id="footer">
        <p/> <p /><p />
        You have reached the bottom of this page, now what?
    </div>
</body>
</html>
```

## Adding the WebGrid

**Index.cshtml View:**

```html
@model IEnumerable<Album>

@{
    ViewBag.Title = "MVC Music Store Grid";
}

@using (Html.BeginForm())
{
    <fieldset>
        <legend>Search</legend>

        <div>
            Album Id:
        </div>
        <div>
            <input type="text" id="albumid" name="albumid" />
        </div>

        <div>
            Album Name:
        </div>
        <div>
            <input type="text" id="albumName" name="albumName" />
        </div>

        <p>
            <input type="submit" value="Search" />
        </p>
    </fieldset>
}

<div id="myGrid">
    @Html.Partial("_grid", Model)
</div>
```

Create a partial view named _grid.cshtml:

**Initial _grid.cshtml:**

```csharp
@model IEnumerable<Album>

@{
    var grid = new WebGrid(Model);
    @grid.GetHtml();
}
```

The WebGrid automatically generates clean semantic HTML with thead, tbody, and tfoot sections. Paging and sorting function out-of-the-box through query string parameters. However, the WebGrid loads all data into memory for pagination, which creates performance issues with large datasets.

**Enhanced _grid.cshtml with Configuration:**

```csharp
@model IEnumerable<Album>

@{
    var grid = new WebGrid(Model, rowsPerPage: 15, ajaxUpdateContainerId: "myGrid");
    @grid.GetHtml(columns: grid.Columns(
                        grid.Column("AlbumId", "Album Id"),
                        grid.Column("Title", "Title"),
                        grid.Column("Artist", "Artist")
                        ));
}
```

This configuration sets 15 rows per page and enables AJAX updates. While functional, the inline onclick attributes depart from the unobtrusive JavaScript approach MVC3 promotes.

## Filtering the Grid

**HTTP POST Action Method:**

```csharp
[HttpPost]
public ActionResult Index(int? albumId, string albumName)
{
    var albums = AlbumRepo.GetAlbums();

    if (!string.IsNullOrEmpty(albumName))
        albums = albums.Where(a => a.Title.Contains(albumName)).ToList();

    if (albumId.HasValue)
        albums = albums.Where(a => a.AlbumId == albumId).ToList();

    return View(albums);
}
```

To implement unobtrusive AJAX filtering, modify the form declaration:

**Updated Index.cshtml Form:**

```csharp
@using (Ajax.BeginForm(new AjaxOptions
    { InsertionMode = InsertionMode.Replace, UpdateTargetId = "myGrid" }))
{
```

Add the jQuery unobtrusive AJAX script to _Layout.cshtml:

```html
<script type="text/javascript" src="../../Scripts/jquery.unobtrusive-ajax.min.js">
</script>
```

**Modified POST Action to Return Partial View:**

```csharp
return PartialView("_grid", albums);
```

This ensures only the grid updates via AJAX rather than reloading the entire page.

## Summary

The WebGrid helper enables developers transitioning from WebForms to quickly add paging, sorting, and filtering functionality. MVC3's unobtrusive AJAX features provide modern implementation without inline JavaScript. A follow-up article will demonstrate these techniques using vanilla HTML and jQuery for deeper control.

**Code Repository:** [https://github.com/elylucas/MvcWebGrid-Part1](https://github.com/elylucas/MvcWebGrid-Part1)
