import { useState } from "react";
import ShoppingList from "./basic react components/list";
import Counter from "./basic react components/usestate";

function App() {
  const [count, setCount] = useState(0);
  function handleAdd() {
    setCount(count + 1);
  }
  function handleReset() {
    setCount(0);
  }
  return (
    <>
      <ShoppingList />
      <h1>this is an example of usestate usage</h1>
      <Counter count={count} handleAdd={handleAdd} handleReset={handleReset} />
      <Counter count={count} handleAdd={handleAdd} handleReset={handleReset} />
      <Counter count={count} handleAdd={handleAdd} handleReset={handleReset} />
      <Counter count={count} handleAdd={handleAdd} handleReset={handleReset} />
    </>
  );
}

export default App;
