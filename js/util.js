const double = function (number) {
  return number * 2;
};

const doubleAndSquareAndSum = (arr) =>
  arr.reduce((sum, val) => sum + Math.pow(val * 2, 2), 0);

console.log("dss", doubleAndSquareAndSum([2, 4, 5]));

const a = {
  foo: "bar",
  two: 2,
  nested: {
    nestedA: "a",
    nestedB: "b",
  },
  double: (val) => val * 2,
};

const b = a;
b.foo = "baz";
console.log("a === b", a === b);
console.log(a.foo);

const shallowCopy = { ...a };
shallowCopy.foo = "drei";
// console.log(shallowCopy === a);
// console.log(shallowCopy.foo, a.foo);
console.log(shallowCopy.nested === a.nested);

a.nested.nestedA = "c";
console.log(shallowCopy.nested.nestedA);

const deepCopy = {
  ...a,
  nested: { ...a.nested },
};

const deepCopyData = JSON.parse(JSON.stringify(a));
console.log(deepCopyData.double(2));
