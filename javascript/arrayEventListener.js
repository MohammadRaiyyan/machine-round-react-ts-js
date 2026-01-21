Array.prototype.listeners = {};
Array.prototype.listener = function (event, cb) {
  if (!this.listeners[event]) {
    this.listeners[event] = [];
  }
  this.listeners[event].push(cb);
};

Array.prototype.triggerEvent = function (event, element, array) {
  if (this.listeners[event]) {
    this.listeners[event].forEach((el) => {
      el(event, element, array);
    });
  }
};

Array.prototype.event = function (event, ...rest) {
  if (event === "add") {
    this.push(...rest);
    this.triggerEvent("add", ...rest, this);
  } else if (event === "remove") {
    const popped = this.pop();
    this.triggerEvent("remove", popped, this);
  }
};

const arr = [];

arr.listener("add", (eventName, items, array) => {
  console.log("Added", items, array);
});

arr.listener("remove", (eventName, item, array) => {
  console.log("Removed", item, array);
});

arr.event("add", 5, 6);
arr.event("remove");
