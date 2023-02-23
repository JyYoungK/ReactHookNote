import React, { useEffect, useState } from "react";

export default function list({ useCallBackGetNumbers }) {
  const [numbers, setTodos] = useState([]);

  useEffect(() => {
    setTodos([...numbers, useCallBackGetNumbers()]);
  }, [useCallBackGetNumbers]);

  return (
    <div>
      {numbers.map((number, index) => (
        <p key={index}> {number} </p>
      ))}
    </div>
  );
}
