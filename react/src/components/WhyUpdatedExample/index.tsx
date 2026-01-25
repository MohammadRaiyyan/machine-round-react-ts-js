import React, { useState } from "react";
import whyDidYouUpdate from "../../hooks/useWhyDidYouUpdate";

function WhyUpdated() {
  const [count, setCount] = useState(0);
  return (
    <div>
      WhyUpdated {count}
      <Counter count={count} />
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}

export default WhyUpdated;

const Counter = React.memo(function Counter(props: { count: number }) {
  whyDidYouUpdate("Counter", props);
  return <div>{props.count}</div>;
});
