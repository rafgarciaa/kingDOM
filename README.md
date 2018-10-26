# KingDOM

KingDOM is a JavaScript DOM interaction library. Using this library, users can:
+ Select single or multiple DOM elements.
+ Traverse and manipulate different DOM elements.
+ Build DOM elements.2
+ Create `DOMNodeCollection` objects from `HTMLElement`s.
+ Queue functions until DOM is fully loaded (ready).
+ Make simple `HTTP` requests

## Setup
+ The quickest way to get started with KingDOM is to include this ```javascript
<script src="https://cdn.rawgit.com/rafgarciaa/kingDOM/00effd60/lib/kingDOM.js"></script>
``` script tag in your HTML file.


## API

#### $k
The KingDOM library utilizes the global variable `$k` as a wrapper for all its methods.

`$k(selector)` is used to select CSS elements on an HTML page.  `$k("div")` returns a `DOMNodeCollection` object which is an object custom to the KingDOM library that is an array of `HTMLElement`s.
The `$k` can be used to ...
+ Create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to the KingDOM methods.
+ Take in a string of HTML code that builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.
+ Queue functions to run once the DOM is fully loaded.

### DOM Traversal

+ `each` iterates through the elements in a DOMNodeCollection and applies a callback function passed as an argument

+ `children` returns a DOMNodeCollection object that contains all the children elements of each `HTML Element(s)` in the original DOMNodeCollection. This is only limited to the direct children of the said `HTML Element(s)`.

+ `parent` returns a DOMNodeCollection object containing the parent elements of every `HTMLElement(s)` in the original DOMNodeCollection


### Dom Manipulation

+ `.html(string)` changes the innerHTML of the selected element(s) with the string argument. Otherwise, returns the innerHTML of the first element selected, if no argument is given.

+ `.empty()` replaces all the innerHTML of the selected elements with an empty string.

+ `.append(children)` is used to append `HTML Elements` to each of the selected elements. This will work with strings, `HTML Element(s)`, or any DOMNodeCollection object.

+ `.remove()` removes all the selected elements from the DOM.

+ `.attr(attributeName, value)` value argument is optional. If given one argument, the function returns the value of the attribute given for the first element in the DOMNodeCollection. The method sets the attribute given as the first argument, as the value, given as the second argument, for each DOMNodeCollection element.

+ `.addClass(newClass)` adds an HTML class or classes to each selected element. In order to add multiple classes, separate them with a space within the same string.

+ `.removeClass(oldClass)` removes an HTML class or classes from each selected element. In order to remove multiple classes, separate them with a space within the same string.

+ `.children()` selects all immediate children of the selected element(s), and returns them as an instance of the DOMNodeCollection.

+ `.parent()` selects all immediate parents of the selected element(s), and returns them as an instance of the DOMNodeCollection.

+ `.find(selector)` selects all children (recursively) that match the given selector and returns them as a new instance of the DOMNodeCollection.

### Event Handling
+ `.on(eventName, callback)` adds an event listener to each selected DOMNodeCollection element, and invoke the callback event on trigger. The list of events can be found [here](https://developer.mozilla.org/en-US/docs/Web/Events).

+ `.off(eventName)` removes an event listener from each selected DOMNodeCollection element, and all the associated callbacks attached to it.

### AJAX
+ `$k.ajax()` allows for sending HTTP requests and returns a `promise` object. This argument accepts an object as argument with the following attributes:
  * method (defaults to `GET`): HTTP request method/type.
  * url: URL for the HTTP request
  * success: success callback
  * error: error callback
  * contentType: content type of the HTTP request
