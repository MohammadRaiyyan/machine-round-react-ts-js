function pipingFn(obj) {
  return function process(...args) {
    for (let key in obj) {
      const value = obj[key];
      if (typeof value === "function") {
        obj[key] = value.apply(this, args);
      } else {
        if (typeof value === "object" && value) {
          pipingFn(value)(...args);
        }
      }
    }
  };
}
const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

pipingFn(obj)(1, 1, 1);

console.log(obj);
