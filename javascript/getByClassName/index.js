const root = document.getElementById("root");

function getByClassName(root, className) {
  function process(node) {
    const result = [];

    if (node.classList.contains(className)) {
      result.push(node.id);
    }

    for (let child of node.children) {
      result.push(...process(child));
    }
    return result;
  }

  return process(root);
}
console.log("Result:", getByClassName(root, "a"));
