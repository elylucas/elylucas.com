---
title: "MVC4 Quick Tip #4 - Updating a Model the HTTP Way with ASP.Net Web API"
publishedDate: 2012-03-18
author: ely-lucas
summary: "A guide to implementing model updates in ASP.Net Web API using the HTTP PUT verb along with proper response codes and jQuery AJAX calls."
canonicalUrl: https://www.elylucas.net/post/mvc4-quick-tip-4-updating-a-model-the-http-way-with-asp-net-web-api/
---

_Disclaimer: This code is based on MVC 4 Beta 1, and might change in future releases._

The ASP.Net Web API site has some great videos and examples to get you started, but I noticed there was not a whole lot of information on actually doing an update. Here is a quick look at how I implemented mine.

## HTTP Verbs in Web API

If you are used to writing MVC Controllers, one of the things you will notice thats different is how the Web API embraces HTTP. In a standard MVC Controller, we typically did a POST for all of our Create, Update, and Delete actions. With the Web API, the recommended way is to use the POST verb for creating objects, PUT for updating objects, and DELETE for deleting objects.

Another difference is that the Web API controllers follow naming conventions to figure out what verb the method responds to, instead of using HTTP verb attributes. So a method starting with Put will respond to PUT requests, Post will respond to POST requests, etc.

Here is what a PUT request for updating a Person object looks like in a Web API controller:

```csharp
HttpResponseMessage<Person> PutPerson(Person person)
{
    _repo.Attach(person);
    _unitOfWork.Commit();
    var response = new HttpResponseMessage<Person>(person, HttpStatusCode.OK);
    response.Headers.Location = new Uri(Request.RequestUri, "/api/person/" + person.Id);
    return response;
}
```

And to call it from jQuery, you set the type to PUT and provide the data to send:

```javascript
$.ajax("/api/person", {
    data: person,
    type: "PUT",
    contentType: "application/json",
    statusCode: {
        200: function (data) {
            //success
        },
        500: function (data) {
            //error
        }
    }
});
```
