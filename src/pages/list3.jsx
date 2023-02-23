import React, { useEffect, useState } from "react";

export default function List3({ useMemoGetNumbers }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers([...numbers, useMemoGetNumbers]);
  }, [useMemoGetNumbers]);

  return (
    <div>
      {numbers.map((number, index) => (
        <p key={index}>{number}</p>
      ))}
    </div>
  );
}
