function get(obj, pathKey) {
  pathKey = pathKey.replaceAll("[", ".");
  pathKey = pathKey.replaceAll("]", "");

  const keys = pathKey.split(".").filter(Boolean);
  let value = obj;

  for (let key of keys) {
    value = value[key];
    if (value === undefined) {
      return undefined;
    }
  }
  return value;
}

const obj = {
  a: {
    b: {
      c: 42,
      d: [1, 2, { e: "hello" }],
    },
  },
  x: [{ y: 99 }, { z: [7, 8, 9] }],
  foo: "bar",
};

console.log("gets nested property with dot notation", get(obj, "a.b.c"));

console.log("gets array element with bracket notation", get(obj, "a.b.d[1]"));

console.log(
  "gets nested property inside array with mixed notation",
  get(obj, "a.b.d[2].e"),
);

console.log(
  "gets property from array of objects",
  get(obj, "x[0].y"),
  get(obj, "x[1].z[2]"),
);

console.log(
  "returns undefined for non-existent path",
  get(obj, "a.b.x"),
  get(obj, "x[2].y"),
  get(obj, "foo.bar"),
);

console.log("returns root object for empty path", get(obj, ""));

console.log("gets top-level property", get(obj, "foo"));
