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



}

module.exports = DOMNodeCollection;
