console.log("hello world");

const alert = function anders() {
  console.log("alert");
};

console.log("fn", alert());

const arr = [1, 2, 3];

const sum = (sum, number) => sum + number;
const arrSum = arr.reduce(sum, 0);

console.log("sum", arrSum);
// 6

// 0, 1
// 1, 2
// 3, 3
