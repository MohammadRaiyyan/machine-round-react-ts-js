const targetObj = {
  count: 0,
};

const obj = new Proxy(targetObj, {
  get(target, property) {
    if (property === "count") {
      target[property] = target[property] + 1;
      return target[property];
    }
    return target[property];
  },
});

console.log(obj.count);
console.log(obj.count);
console.log(obj.count);
console.log(obj.count);
console.log(obj.count);
console.log(obj.count);
