#Working Definitions and References

###Node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

###npm

npm, short for Node Package Manager, is two things: 
- first and foremost, it is an online repository for the publishing of open-source Node.js projects; 
- second, it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management. 

A plethora of node.js libraries and applications are published on npm, and many more are added every day. These applications can be searched for on http://search.npmjs.org/. Once you have a package you want to install, it can be installed with a single commmand-line command.

Another important use for npm is dependency management. When you have a node project with a package.json file, you can run npm install from the project root and npm will install all the dependencies listed in the package.json. This makes installing a Node project from a git repo much easier! For example, vows, one of Node's testing frameworks, can be installed from git, and its single dependency, eyes, can be automatically handled:

###Express

Express is a minimal and flexible _Node.js web application framework_ that provides a robust set of features for web and mobile applications.

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

###Using Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

    - Application-level middleware
    - Router-level middleware
    - Error-handling middleware
    - Built-in middleware
    - Third-party middleware
You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

For a complete discussion see: https://expressjs.com/en/guide/using-middleware.html

###Pug

Pug is a high performance _template engine_ heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.

###Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation. A promise may be created using its constructor. However, most people are consumers of already-created promises returned from functions. This guide will therefore explore consumption of returned promises first.

Essentially, a promise is a returned object you attach callbacks to, instead of passing callbacks into a function.

…modern functions return a promise you can attach your callbacks to instead:

    let promise = doSomething();
    promise.then(successCallback, failureCallback);
…or simply:

    doSomething().then(successCallback, failureCallback);
We call this an asynchronous function call. This convention has several advantages. We will explore each one.

####Guarantees

Unlike old-style passed-in callbacks, a promise comes with some guarantees:

- Callbacks will never be called before the completion of the current run of the JavaScript event loop.
- Callbacks added with .then even after the success or failure of the asynchronous operation, will be called, as above.
- Multiple callbacks may be added by calling .then several times, to be executed independently in insertion order.

But the most immediate benefit of promises is chaining.

####Chaining

A common need is to execute two or more asynchronous operations back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. We accomplish this by creating a promise chain.

Here's the magic: the then function returns a new promise, different from the original:

    const promise = doSomething();
    const promise2 = promise.then(successCallback, failureCallback);
or

    let promise2 = doSomething().then(successCallback, failureCallback);
This second promise represents the completion not just of doSomething(), but also of the successCallback or failureCallback you passed in, which can be other asynchronous functions returning a promise. When that's the case, any callbacks added to promise2 get queued behind the promise returned by either successCallback or failureCallback.

Basically, each promise represents the completion of another asynchronous step in the chain.

####Nics explanation of the difference between Promises and callbacks

Most async processes can be converted to promises now with either a promise library or the newly native “util.promisfy”, but it’s not always worth it to go against a library’s intent.

The second thing to consider is “how hard is this going to be to debug?”

    - Callbacks are just a function, so if an error occurs, the error will point right to the offending line most of the time. 
    - Promises are more of a data structure, and if implemented poorly, a promise can completely swallow your error. 
    
Another reason to work WITH a library instead of against it. If a library returns promises, they’ve usually taken the time on their end to return all possible errors. You just have to remember to write a catch statement.

All that said, twit supports both promises and callbacks, so why use promises, which can seem and be more complex than just a callback function?

    - Promises, specifically Promise.all, more than looking pretty, are a performance enhancement.
    
Take your example above.

If you were to write it with nested callbacks
Then we’d run our first request and wait…

    …till that first request came back, then run our second request in the nested callback and wait…
    
    … till the second request came back, then run our third request in the nested callback and wait…
    
    … till the third request came back, then run our fourth request in the nested callback and wait…
    
    … till the fourth request came back, then send the page.
    
So the amount of time the route would take would be equal to the sum of every request we make to twitter.

#####In a Promise.all

    We would make our first, second, third, and fourth request all at the same time…
    
    …when all the requests have come back, we’ll send the page
So the amount of time Promise.all will take is only as long as our longest request

That can be a performance boost of a factor of 4, or however many requests we need at the same time.
If we need 6 requests, the performance could be increased by a factor of 6 using Promise.all.

Currently, simultaneous connections to a server MIGHT max out at 6-8 for HTTP/1.1, but HTTP/2 multiplexes the connections and doesn’t have that limitation I believe. That’s the bleeding edge of my knowledge, though, so don’t quote me on that.

    TLDR - Promise.all might look neat, but it’s also WAY faster
    
    One caveat to this is that some tasks have to be done before other tasks. 
    
Take for instance your request for a screen name. The next four requests all require you to have that screen name before you make them, so the request for a screen name can’t be done in parallel to those other requests, it has to be first.

The ability to split up the data needed into smaller tasks that aren’t dependent on each other is called concurrency. Because of this, when we talk about parallel tasks, we also have to talk about the concurrency of the overall task, or can I split this task up into independent, smaller tasks. If we can, then we can run them in parallel.

#####Callbacks

A callback is a function another function runs after it’s done doing whatever it does.

    - There’s a callback in the promise. In the “then” method. (edited)
    - But Promise.all makes it so I don’t have to wait four different times for four independent requests.
If I was only making one request, I could use a callback and their would be no difference in performance. So, in theory, the screen name request could be a callback and their would be no performance difference. But better to stay consistent for readability.


####Promise.all()

The Promise.all() method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.

#####Syntax
    Promise.all(iterable);
    
    iterable (An iterable object such as an Array or String.)
#####Return value

    - An already resolved Promise if the iterable passed is empty.
    - An asynchronously resolved Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case.
    - A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject. See the example about "Asynchronicity or synchronicity of Promise.all" below.
#####Description

This method can be useful for aggregating the results of multiple promises.

    - Fulfillment:
        If an empty iterable is passed, then this method returns (synchronously) an already resolved promise.
        If all of the passed-in promises fulfill, or are not promises, the promise returned by Promise.all is fulfilled asynchronously.
        In all cases, the returned promise is fulfilled with an array containing all the values of the iterable passed as argument (also non-promise values).

    - Rejection:
        If any of the passed-in promises reject, Promise.all asynchronously rejects with the value of the promise that rejected, whether or not the other promises have resolved.

#####Examples
#####Using Promise.all

Promise.all waits for all fulfillments (or the first rejection).

    var p1 = Promise.resolve(3);
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'foo');
    });
    
    Promise.all([p1, p2, p3]).then(values => { 
      console.log(values); // [3, 1337, "foo"] 
    });
If the iterable contains non-promise values, they will be ignored, but still counted in the returned promise array value (if the promise is fulfilled):

###Understanding module.exports / exports
####What is a module

A module encapsulates related code into a single unit of code. When creating a module, this can be interpreted as moving all related functions into a file. Let’s illustrate this point with an example involving an application built with Node.js. Imagine that we created a file called greetings.js and it contains the following two functions:

    // greetings.js
    sayHelloInEnglish = function() {
        return "Hello";
    };

    sayHelloInSpanish = function() {
        return "Hola";
    };

####Exporting a module
The utility of greetings.js increases when its encapsulated code can be utilized in other files. So let’s refactor greetings.js to achieve this goal. To comprehend what is actually happening, we can follow a three-step process:

1) Imagine that this line of code exists as the first line of code in greetings.js:

    // greetings.js
    
    var exports = module.exports = {};
2) Assign any expression in greetings.js that we want to become available in other files to the exports object:

    // greetings.js
    
    // var exports = module.exports = {};
            
    exports.sayHelloInEnglish = function() {
      return "HELLO";
    };
   
    exports.sayHelloInSpanish = function() {
      return "Hola";
    };
    
In the code above, we could have replaced exports with module.exports and achieved the same result. If this seems confusing, remember that exports and module.exports reference the same object.

3) This is the current value of module.exports:
    
    module.exports = {
      sayHelloInEnglish: function() {
        return "HELLO";
      },
           
      sayHelloInSpanish: function() {
        return "Hola";
      }
    };
    
####Importing a Module
Let’s import the publicly available methods of greetings.js to a new file called main.js. This process can be described in three steps:

1) The keyword require is used in Node.js to import modules. Imagine that this is how require is defined:

    var require = function(path) {
    
      // ...
    
      return module.exports;
    };
    
2) Let’s require greetings.js in main.js:

    // main.js
    
    var greetings = require("./greetings.js");
    The above code is equivalent to this:
    
    // main.js
    var greetings = {
      sayHelloInEnglish: function() {
        return "HELLO";
      },
           
      sayHelloInSpanish: function() {
        return "Hola";
      }
    };
    
3) We can now access the publicly available methods of greetings.js as a property of our greetings variable in main.js.

    // main.js
    var greetings = require("./greetings.js");
    
    // "Hello"
    greetings.sayHelloInEnglish();
            
    // "Hola"  
    greetings.sayHelloInSpanish();
