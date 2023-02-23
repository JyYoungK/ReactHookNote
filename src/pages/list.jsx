import React, { useEffect, useState } from "react";

export default function list({ getNumbers }) {
  const [numbers, setTodos] = useState([]);

  useEffect(() => {
    setTodos([...numbers, getNumbers()]);
  }, [getNumbers]);

  return (
    <div>
      {numbers.map((number, index) => (
        <p key={index}> {number} </p>
      ))}
    </div>
  );
}
