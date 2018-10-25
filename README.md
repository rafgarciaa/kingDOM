# KingDOM

KingDOM is a JavaScript DOM interaction library. Using this library, users can:
+ Select single or multiple DOM elements.
+ Traverse and manipulate different DOM elements.
+ Build DOM elements.2
+ Create `DOMNodeCollection` objects from `HTMLElement`s.
+ Queue functions until DOM is fully loaded (ready).
+ Make simple `HTTP` requests

## Setup
+ The quickest way to get started with KingDOM is to include this

```javascript
<script src="https://cdn.rawgit.com/rafgarciaa/kingDOM/00effd60/lib/kingDOM.js"></script>
```
script tag in your HTML file.


## API

#### $k
The KingDOM library utilizes the global variable `$k` as a wrapper for all its methods.

`$k(selector)` is used to select CSS elements on an HTML page.  `$k("div")` returns a `DOMNodeCollection` object which is an object custom to the KingDOM library that is an array of `HTMLElement`s.
The `$k` can be used to ...
+ Create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to the KingDOM methods.
+ Take in a string of HTML code that builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.
+ Queue functions to run once the DOM is fully loaded.

### DOM Traversal

### Dom Manipulation
