// function computeAmount(initial = 0) {
//   let sum = initial;
//   return {
//     crore(value) {
//       sum += value * Math.pow(10, 7);
//       return this;
//     },
//     lac(value) {
//       sum += value * Math.pow(10, 5);
//       return this;
//     },
//     thousand(value) {
//       sum += value * Math.pow(10, 3);
//       return this;
//     },
//     value() {
//       return sum;
//     },
//   };
// }
// const total = computeAmount().crore(5).lac(10).thousand(20).value();

// console.log("Total", total);

class ComputeAmount {
  constructor(initial = 0) {
    this.sum = initial;

    this.crore = function (value) {
      this.sum += value * Math.pow(10, 7);
      return this;
    };
    this.lac = function (value) {
      this.sum += value * Math.pow(10, 5);
      return this;
    };
    this.thousand = function (value) {
      this.sum += value * Math.pow(10, 3);
      return this;
    };
    this.value = function () {
      return this.sum;
    };
  }
}
const total = new ComputeAmount().crore(5).lac(10).thousand(20).value();

console.log("Total", total);
