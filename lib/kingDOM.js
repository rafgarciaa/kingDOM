/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  html(arg) {\n    if (typeof arg === \"string\") {\n      this.nodes.forEach( node => {\n        node.innerHTML = arg;\n      });\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(arg) {\n    if (this.nodes.length === 0) return;\n\n    if (typeof arg === 'object') {\n      arg = $l(arg);\n    }\n\n    if (typeof arg === \"string\") {\n      this.nodes.forEach( node => {\n        node.innerHTML += arg;\n      });\n    } else if (arg instanceof DOMNodeCollection) {\n      this.nodes.forEach( node => {\n        arg.nodes.forEach( childNode => {\n          node.appendChild(childNode.cloneNode(true));\n        });\n      });\n    }\n  }\n\n  attr(key, val) {\n    if (typeof val === \"string\") {\n      this.nodes.forEach( node => node.setAttribute(key, val));\n    } else {\n      return this.nodes[0].getAttribute(key);\n    }\n  }\n\n  addClass(newClass) {\n    this.nodes.forEach( node => node.classList.add(newClass));\n  }\n\n  removeClass(oldClass) {\n    this.nodes.forEach( node => node.classList.remove(oldClass));\n  }\n\n  children() {\n    let childNodes = [];\n\n    this.nodes.forEach( node => {\n      Array.from(node.children.forEach( child => {\n        childNodes.push(child);\n      }));\n    });\n\n    return new DOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    let parentNodes = [];\n\n    this.nodes.forEach( node => {\n      const parentEl = node.parentElement;\n\n      if (!parentEl.visited) {\n        parentNodes.push(node.parentElement);\n        parentEl.visited = true;\n      }\n    });\n\n    return new DOMNodeCollection(parentNodes);\n  }\n\n  find(selector) {\n    let selectedNodes = [];\n\n    this.nodes.forEach( node => {\n      const nodeList = node.querySelectorAll(selector);\n      selectedNodes = selectedNodes.concat(Array.from(nodeList));\n    });\n    return new DOMNodeCollection(selectedNodes);\n  }\n\n  remove() {\n    this.each(node => node.parentNode.removeChild(node));\n  }\n\n  on(eventName, callback) {\n    this.nodes.forEach( node => {\n      node.addEventListener(eventName, callback);\n      const eKey = `kingDOMEvents-${eventName}`;\n\n      if (typeof node[eKey] === 'undefined') {\n        node[eKey] = [];\n      }\n      node[eKey].push(callback);\n    });\n  }\n\n  off(eventName) {\n    this.nodes.forEach( node => {\n      const eKey = `kingDOMEvents-${eventName}`;\n      if (node[eKey]) {\n        node[eKey].forEach( callback => {\n          node.removeEventListener(eventName, callback);\n        });\n      }\n    });\n  }\n\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\nwindow.DOMNodeCollection = DOMNodeCollection;\n\nconst callbacks = [];\n\nwindow.$l = (arg) => {\n  let nodesArr;\n\n  switch (typeof arg) {\n    case \"function\":\n      return callbacks.push(arg);\n    case \"string\":\n      let nodes = document.querySelectorAll(arg);\n      nodesArr = Array.from(nodes);\n      return new DOMNodeCollection(nodesArr);\n    case \"object\":\n      if (arg instanceof HTMLElement) {\n        return new DOMNodeCollection([arg]);\n      }\n  }\n\n  const execFuncs = fnsArr => {\n    fnsArr.forEach( func => func.call());\n  };\n\n  document.addEventListener(\"DOMContentLoaded\", () => {\n    return execFuncs(callbacks);\n  });\n};\n\nwindow.$l.extend = (base, ...objects) => {\n  let props, prop;\n  objects.forEach( obj => {\n    props = Object.keys(obj);\n    for (let i = 0; i < props.length; i++) {\n      prop = props[i];\n      base[prop] = obj[prop];\n    }\n  });\n  return base;\n};\n\nwindow.$l.ajax = options => {\n  const defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: 'GET',\n    url: window.location.href,\n    success: () => {},\n    error: () => {},\n    data: {},\n  };\n\n  options = window.$l.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  const request = new XMLHttpRequest();\n  request.open(options.method, options.url, true);\n  request.onload = function () {\n    if (request.status < 400) {\n      options.success(request.response);\n    } else {\n      options.error(request.response);\n    }\n  };\n  \n  request.send(JSON.stringify(options.data));\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });