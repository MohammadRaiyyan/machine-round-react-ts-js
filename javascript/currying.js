/*
Example:
    const sum = generateSum(4);
    console.log(sum(1)(2)(3)(4))// 10
    console.log(sum(1,2,3,4,5,6)) // 10
    console.log(sum(1)(2,3,4)) // 10
*/

function generateSum(executeLimit) {
  if (!executeLimit) {
    throw new Error(
      `generateSum function expects execution limit as number to calculate the sum but it got ${typeof executeLimit} `,
    );
  }
  return function executer(...args) {
    if (args.length < executeLimit) {
      return (...nextArgs) => {
        return executer(...args, ...nextArgs);
      };
    } else {
      let sum = 0;
      for (let i = 0; i < executeLimit; i++) {
        sum = sum + args[i];
      }
      return sum;
    }
  };
}

const sum = generateSum(4);
console.log(sum(1)(2)(3)(4)); // 10
console.log(sum(1, 2, 3, 4, 5, 6)); // 10
console.log(sum(1)(2, 3, 4)); // 10
