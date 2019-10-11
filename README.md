Sticks.js
=========

What is it?
-----------

Sticks.js is client-side javascript library, which can be used for two things:

1. Templating (which is its preferred use)
2. Converting JSON objects into XML objects

Sticks.js relies heavily on jQuery.

Features:
- Lightweight and small (less than 150 lines of code, and it's not even minified)
- Customizable (Using the sticks.options object)
- Moustache-like templating


How does it work?
-----------------

Add jQuery and sticks.js to the head of your web page. (Or whereever you prefer to load
your scripts.) 
 
Have your elements in a JSON like this: 

 
See index.html for examples. 


Why re-invent the wheel? There are already a few templating engines out there
-----------------------------------------------------------------------------
While I really like ejs with Node.js and express.js, I recently stumbled upon a blog post 
explaining the Nova templating engine (which is for node.js only), I really missed having 
a template engine like that for the browser. 
As much as I like Node.js, I don't always need or want a whole server for my websites.
 
 
What is planned for the future?
-------------------------------
I consider this library to be stable and in the future I want to work on some bugs I have 
encountered and I want to work on making jQuery optional, but don't expect any major API 
changes or stuff like that.
 
 
License?
--------
MIT-licensed as usual. Use it however you want, no attribution necessary, but appreciated. 
For information check LICENSE.txt 
