const DOMNodeCollection = require("./dom_node_collection.js");
window.DOMNodeCollection = DOMNodeCollection;

const callbacks = [];

window.$l = (arg) => {
  let nodesArr;

  switch (typeof arg) {
    case "function":
      return callbacks.push(arg);
    case "string":
      let nodes = document.querySelectorAll(arg);
      nodesArr = Array.from(nodes);
      return new DOMNodeCollection(nodesArr);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }

  const execFuncs = fnsArr => {
    fnsArr.forEach( func => func.call());
  };

  document.addEventListener("DOMContentLoaded", () => {
    return execFuncs(callbacks);
  });
};

window.$l.extend = (base, ...objects) => {
  let props, prop;
  objects.forEach( obj => {
    props = Object.keys(obj);
    for (let i = 0; i < props.length; i++) {
      prop = props[i];
      base[prop] = obj[prop];
    }
  });
  return base;
};

window.$l.ajax = options => {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: window.location.href,
    success: () => {},
    error: () => {},
    data: {},
  };

  options = window.$l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  const request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.onload = function () {
    if (request.status < 400) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
  
  request.send(JSON.stringify(options.data));
};
