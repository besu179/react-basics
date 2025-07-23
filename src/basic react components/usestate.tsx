import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>this is an example of usestate usage</h1>
      <h3>count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>count</button>
      <button onClick={()=> setCount(0)}>reset</button>
    </>
  );
}
