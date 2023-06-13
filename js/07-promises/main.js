// Beispiel promise.then & Promise.all

const apiGet = (timeout, data = { foo: "bar" }) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(data);
    }, timeout * 1000);
  });
};

/** Basic await multiple */
const example1 = () => {
  const promise1 = apiGet(0.5, "one");
  const promise2 = apiGet(1, "two");

  Promise.all([promise1, promise2]).then((res) => {
    console.log("res", JSON.stringify(res));
  });
};

/** then for one & multiple promises */
const example2 = () => {
  const promise1 = apiGet(0.5, "one");
  const promise2 = apiGet(1, "two");

  promise1.then(() => 3).then(console.log);

  Promise.all([promise1, promise2]).then((res) => {
    console.log("res", JSON.stringify(res));
  });
};

/** Simple then chain */
const example4 = () => {
  const promise1 = apiGet(0.5);

  promise1.then(() => console.log(1)).then(() => console.log(2));
};

/** Sync then return */
const example5 = () => {
  apiGet(0.5, "one")
    .then((res) => {
      console.log(1, res);
      return "two";
    })
    .then((res) => console.log(2, res));
};

/** Async then return */
const example6 = () => {
  apiGet(0.5, "one")
    .then((res) => {
      console.log(1, res);
      return apiGet(3, "two");
    })
    .then((res) => console.log(2, res));
};

/** Multiple chains */
const example7 = () => {
  const promise = apiGet(0.5, "one");

  promise
    .then((res) => {
      console.log(1, res);
      return apiGet(3, "two");
    })
    .then((res) => console.log(2, res));

  promise.then((res) => console.log(3, res));
};

/** Wrong execution order? */
const example10 = () => {
  const promise1 = apiGet(0.5);

  promise1.then(() => console.log(1)).then(console.log(2));
};

const double = (n) => {
  debugger;
  return 2 * n;
};

double(double(3 + 4));

example10();
