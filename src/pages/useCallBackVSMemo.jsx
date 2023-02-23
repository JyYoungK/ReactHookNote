import React, { useState, useCallback, useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

function useCallBackVSMemo() {
  const [n, setN] = useState(1);
  const [result, setResult] = useState(0);

  const calculateFibonacci = useCallback((num) => {
    if (num <= 1) {
      return num;
    }
    return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
  }, []);

  const memoizedResult = useMemo(() => {
    return calculateFibonacci(n);
  }, [n, calculateFibonacci]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">useCallback vs useMemo</h1>
      <div>
        Here's a simple example that calculates the n-th Fibonacci number using
        recursion. The input field below lets you change the value of n, and the
        result is updated accordingly. However, since calculating the Fibonacci
        number is an expensive operation, it's a good idea to use either
        useCallback or useMemo to avoid unnecessary calculations.
      </div>

      <h2 className="mt-5">Calculate Fibonacci</h2>
      <SyntaxHighlighter language="javascript" style={nord}>
        {`const calculateFibonacci = (num) => {
  if (num <= 1) {
    return num;
  }
  return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
};

const result = calculateFibonacci(10); // 55`}
      </SyntaxHighlighter>

      <div className="my-8">
        <input
          className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
        />
        <div className="text-xl text-blue-600 mb-2">
          Result: {memoizedResult}
        </div>
      </div>

      <div className="text-gray-700">
        If you open the browser's developer tools and inspect the page, you can
        see that every time you type a number in the input field, the
        calculateFibonacci function is called. This can be a problem if you have
        a large n, because it takes a long time to calculate the Fibonacci
        number. However, if you use useCallback or useMemo to memoize the
        function or result, respectively, you can avoid unnecessary
        calculations.
      </div>
    </div>
  );
}

export default useCallBackVSMemo;
