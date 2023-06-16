export const Test = () => {
  return (
    <div style={{ display: "flex" }}>
      <TestItem />
    </div>
  );
};

const TestItem = () => {
  return (
    <>
      <div>Hello</div>
      <div>React</div>
      {true ? "true" : "false"}
      {"" && "only shown when true"}
    </>
  );
};

const a = "one";
const b = "";

console.log(a || b);

if (a || b) {
  // ...
}

if (b && a) {
  // ...
}
