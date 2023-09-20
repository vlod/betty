const fruit = ["apple", "peach", "pear"];

const Hello = ({ counter, handleClick }) => {
  return (
    <div>
      <div>Current counter: {counter}</div>

      <ul>
        {fruit.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
};
