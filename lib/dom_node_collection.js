class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach( node => {
        node.innerHTML = arg;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (this.nodes.length === 0) return;

    if (typeof arg === 'object') {
      arg = $l(arg);
    }

    if (typeof arg === "string") {
      this.nodes.forEach( node => {
        node.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach( node => {
        arg.nodes.forEach( childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.nodes.forEach( node => node.setAttribute(key, val));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.nodes.forEach( node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.nodes.forEach( node => node.classList.remove(oldClass));
  }

  children() {
    let childNodes = [];

    this.nodes.forEach( node => {
      Array.from(node.children.forEach( child => {
        childNodes.push(child);
      }));
    });

    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];

    this.nodes.forEach( node => {
      const parentEl = node.parentElement;

      if (!parentEl.visited) {
        parentNodes.push(node.parentElement);
        parentEl.visited = true;
      }
    });

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let selectedNodes = [];

    this.nodes.forEach( node => {
      const nodeList = node.querySelectorAll(selector);
      selectedNodes = selectedNodes.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(selectedNodes);
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  on(eventName, callback) {
    this.nodes.forEach( node => {
      node.addEventListener(eventName, callback);
      const eKey = `kingDOMEvents-${eventName}`;

      if (typeof node[eKey] === 'undefined') {
        node[eKey] = [];
      }
      node[eKey].push(callback);
    });
  }

  off(eventName) {
    this.nodes.forEach( node => {
      const eKey = `kingDOMEvents-${eventName}`;
      if (node[eKey]) {
        node[eKey].forEach( callback => {
          node.removeEventListener(eventName, callback);
        });
      }
    });
  }


}

module.exports = DOMNodeCollection;
