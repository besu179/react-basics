interface CounterProps {
  count: number;
  handleAdd: () => void;
  handleReset: () => void;
}

export default function Counter({
  count,
  handleAdd,
  handleReset,
}: CounterProps) {
  return (
    <>
      <h3>count: {count}</h3>
      <button onClick={handleAdd}>count</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}
