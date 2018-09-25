const DOMNodeCollection = require("./dom_node_collection.js");
window.DOMNodeCollection = DOMNodeCollection;

const callbacks = [];

window.$l = (arg) => {
  let nodesArr;

  switch (typeof arg) {
    case "function":
      return callbacks.push(arg);
    case "string":
      // If that argument is a string, it is expected to be a
      // CSS selector that we can use to identify nodes in the page.
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
