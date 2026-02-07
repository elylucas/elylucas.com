---
title: "Authenticating with SharePoint Online in an Ionic/Angular/PhoneGap App"
publishedDate: 2014-11-22
author: ely-lucas
summary: "A walkthrough of authenticating with SharePoint Online from a hybrid mobile app built with Ionic, Angular, and PhoneGap using SAML tokens and Microsoft's login service."
canonicalUrl: https://www.elylucas.net/post/authenticating-with-sharepoint-online-in-a-ionicangularphonegap-app/
---

I have been developing a hybrid mobile application using PhoneGap and the Ionic framework to update lists in a SharePoint Online instance. Ionic uses AngularJS, which is my fav MV* framework of the moment, and the tooling around Ionic is really great.

The primary challenge was figuring out SharePoint authentication. After extensive searching, I discovered that SharePoint Online authentication differs significantly from on-premises SharePoint 2013 implementations. SharePoint Online authentication requires sending a SAML token to the Microsoft ID Service, which handles authentication across Microsoft properties including Office365 and Xbox.

## The Approach

I created an Angular service that leverages cookies from Microsoft ID Service authentication. After successful authentication, two cookies are generated: `rtFA` and `FedAuth`. These cookies are automatically included in SharePoint REST API requests, providing ongoing authentication.

## Process Flow

The service first constructs a SAML token using a userId, password, and the URL of the SharePoint Online instance. It then calls into Microsoft's login service to obtain an authentication token. The Bearer Token is extracted from the response and then passed into SharePoint's Forms-based authentication, which establishes the necessary cookies for subsequent API requests.

Since the app runs locally on the device via PhoneGap, the cookies persist in the app's web view environment and are automatically sent with each subsequent REST API call to SharePoint, keeping the user authenticated.
