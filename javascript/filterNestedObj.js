function deepFilter(o, filter) {
  for (let key in o) {
    const value = o[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      deepFilter(value, filter);
    } else {
      if (filter(value) === false) {
        delete o[key];
      }
    }
    if (JSON.stringify(value) === "{}") {
      delete o[key];
    }
  }
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
  c: {},
};
const filter = (n) => n >= 0;
deepFilter(obj, filter);
console.log(obj);
