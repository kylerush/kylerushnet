---
template: blog-post.hbs
date: 2014-03-05
body_id: blog
title: Tips for working with JSON APIs in JavaScript
summary: Many unexpected issues can happen when you're working with an API. This post provides some tips on how to avoid JavaScript errors when working with an API.
---
Many unexpected errors can occur when you're working with an API. When you're consuming an API in JavaScript, one error can stop the entire JavaScript engine and completely break your app. Here are some tips to prevent this from happening.

##Check to see if you actually received JSON

You might start your code like this:

<script src="https://gist.github.com/kylerush/9360816.js"></script>

The problem is that this code makes the assumption that the response from the server contains JSON in the response body. That is a logical conclusion since you are working with a JSON API, however, any seasoned API consumer can tell you that crazy stuff happens on the server side.

For example, a recent JSON API that I was working with had a proxy forwarding to a server that was either intentionally or un-intentionally removed from production. In this scenario the proxy server responded how Apache does by default with a 503 status code and the response body contained a description of the problem in HTML. Trying to parse HTML as JSON causes a JavaScript error and stopped the JavaScript engine from running anymore, thus breaking the entire app and making for a poor user experience.

There are a couple solutions here. The first is to check the HTTP status code on the response before doing anything. If it's not what you expected then don't try to parse the JSON. Here's an example:

<script src="https://gist.github.com/kylerush/9360957.js"></script>

This isn't foolproof however because it is still possible for the server to respond with a 200 status code (or the one you're expecting) and still have HTML in the response body.

In addition to checking the HTTP status code on the response, wrap the function that parses the JSON in a try/catch block. This way you can detect if there is an error parsing the response body and update the UI of your app to indicate that there was a problem to your user rather than the app abruptly ceasing to function. Here is an example:

<script src="https://gist.github.com/kylerush/9361429.js"></script>

##Strictly check the structure of the JSON

When you read some documentation on the API you're working with you'll most likely see example responses. Don't assume that every response will be identical to the example. Stuff happens and sometimes properties in the JSON object are left out or are a different type than you're expecting. Always check the type of the variable before trying to use it. Additionally, check the value of the variable. As you can see in the code samples above, I'm expecting a string with a value, not an empty string. It's important to also check that the string has a value. Here is an example:

<script src="https://gist.github.com/kylerush/9361437.js"></script>

If you do it this way, you'll avoid the JavaScript error when the variable isn't the type you're expecting it to be and you'll be able to update the DOM to alert the user that something went wrong.

###Report errors

At this point we have a great function checks which for many possible errors in the XHR response. However, if we leave the code like this, we'll be flying blind. That is, we'll have no idea how many times each error is occuring. When you get a bug report, in order to prioritize it, it's extremely helpful to know the scope (or how many times it is occuring in the wild). If you're using Google Analytics, you can do this easily with [custom events](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide). Here is an example:

<script src="https://gist.github.com/kylerush/9361443.js"></script>

Once you put this tracking in place you might be surprised how many errors occur. Below is a screenshot of the Google Analytics account from the Obama campaign once I put this tracking in place. It shows that, for the month of August 2012, we had 137,430 unique and 1,571,080 non-unique unexpected/malformed responses from our own internal APIs. Had we not strictly checked the type before trying to use properties of the JSON object in the response, that would have resulted in a lot of JavaScript errors.

![API response errors](http://cdn.kylerush.org/kr/images/api-response-errors.png)

Now we've checked for almost every type of problem with the response on the XHR request and we will know exactly how many times each problem will occur.
