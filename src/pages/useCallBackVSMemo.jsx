import React, { useState, useCallback, useMemo } from "react";
import List from "./list";
import List2 from "./list2";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

function useCallBackVSMemo() {
  const [firstButtonClicked, setFirstButtonClicked] = useState(true);
  const [memoButtonClicked, setMemoButtonClicked] = useState(false);

  const [count, setCount] = useState(0);
  const [dontCount, setDontCount] = useState(1000);

  const getNumbers = () => {
    return [count, count + 1, count + 2];
  };

  const [useCallBackCount, useCallBackSetCount] = useState(0);
  const [useCallBackDontCount, useCallBackSetDontCount] = useState(1000);

  const useCallBackGetNumbers = useCallback(() => {
    return [useCallBackCount, useCallBackCount + 1, useCallBackCount + 2];
  }, [useCallBackCount]);

  const [number, setNumber] = useState(0);
  const [useMemoNumber, setUseMemoNumber] = useState(0);
  const [increaseNumber, setIncreaseNumber] = useState(0);
  const [useMemoIncreaseNumber, setUseMemoIncreaseNumber] = useState(0);

  const printSlow = slowFunction(number);

  const useMemoPrintSlow = useMemo(() => {
    return memoSlowFunction(useMemoNumber);
  }, [useMemoNumber]);

  function slowFunction(num) {
    if (!memoButtonClicked) {
      for (let i = 0; i <= 999999999; i++) {}
    }
    return num;
  }

  function memoSlowFunction(num) {
    for (let i = 0; i <= 999999999; i++) {}

    return num;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">useCallBack vs useMemo</h1>
      <div>
        useCallBack and useMemo are similiar in a sense that they both aim to
        optimize performance by preventing unnecessary re-renders of a component
        when its dependencies have not changed. However, they differ in how they
        achieve this optimization: useCallback memoizes a function instance,
        while useMemo memoizes a value computed by a function.
      </div>
      <h2 className="mt-5">
        Consider the following code snippet where the objective is to increment
        a number and print three consecutive numbers when the 'Print' button is
        clicked, and to decrement the number when the 'Should not print' button
        is clicked.{" "}
      </h2>
      <SyntaxHighlighter language="javascript" style={nord}>
        {`    const getNumbers = () => {
        return [count, count + 1, count + 2];
    };

  
    return (
        <div>
            <button onClick={() => setDontCount(dontCount - 1)}>
                Should not print
            </button>
            <button onClick={() => setCount(count + 1)}>
                Print
            </button>
         <List getNumbers={getNumbers} />
        </div> )`}
      </SyntaxHighlighter>

      <h2 className="mt-5"> Try pressing both buttons!</h2>
      <div className="flex flex-col  mb-8 mt-5">
        <div className="flex flex-row space-x-4">
          <div>Print Number: {count}</div>
          <div>Should Not Print Number: {dontCount}</div>
        </div>
        <div className="flex flex-row space-x-4 mt-3">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              setCount(count + 1);
              setFirstButtonClicked(true);
            }}
          >
            Print
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              setDontCount(dontCount - 1);
              setFirstButtonClicked(true);
            }}
          >
            Should not print
          </button>
        </div>
      </div>

      {firstButtonClicked && <List getNumbers={getNumbers} />}

      <h2 className="mt-5">
        Currently, both buttons are printing numbers on your web, but we want
        only the 'Print' button to do so. This is because the parent component
        has a state, and whenever the buttons are clicked, the child component
        gets re-rendered, as the state for the parent component changes. We are
        passing a function down as a prop, and as a result, the children
        function gets re-rendered. To prevent this issue, we want the function
        to only re-render when the 'print' state changes and not when the 'not
        print' state changes.
      </h2>
      <h2 className="mt-5">
        To accomplish this, we should enclose the getNumbers function within a
        useCallback hook that receives two arguments. The first argument is the
        function we want to cache, and the second argument is the dependencies
        that determine when to execute this function. We only want this function
        to execute when the print state changes.
      </h2>

      <h2 className="text-2xl my-3 font-bold">Using useCallBack </h2>

      <SyntaxHighlighter language="javascript" style={nord}>
        {`    const getNumbers = useCallback(() => {
        return [count, count + 1, count + 2];
    }, [count]);
    ;

  
    return (
        <div>
            <button onClick={() => setDontCount(dontCount - 1)}>
                Should not print
            </button>
            <button onClick={() => setCount(count + 1)}>
                Print
            </button>
         <List getNumbers={getNumbers} />
        </div> )`}
      </SyntaxHighlighter>

      <h2 className="mt-5"> Try pressing both buttons now!</h2>
      <div className="flex flex-col  mb-8 mt-5">
        <div className="flex flex-row space-x-4">
          <div>Print Number: {useCallBackCount}</div>
          <div>Should Not Print Number: {useCallBackDontCount}</div>
        </div>
        <div className="flex flex-row space-x-4 mt-3">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              useCallBackSetCount(useCallBackCount + 1);
              setFirstButtonClicked(false);
            }}
          >
            Print
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              useCallBackSetDontCount(useCallBackDontCount - 1);
              setFirstButtonClicked(false);
            }}
          >
            Should not print
          </button>
        </div>
      </div>

      <List2 useCallBackGetNumbers={useCallBackGetNumbers} />

      <h2 className="mt-5">
        By adding useCallBack to getNumbers(), we have successfully restricted
        the printing of numbers to only the "Print" button, which can increase
        the number, while the "Should Not Print" button can decrease the number
        without printing any numbers. As a result, we have gained the ability to
        control which component renders the application in a single component.{" "}
      </h2>

      <h2 className="text-2xl my-3 font-bold">Using useMemo </h2>

      <h2 className="mt-5">
        Now, what is with useMemo. The purpose of useMemo is similar to
        useCallback in that it optimizes your React application by controlling
        when your components are re-rendered after state updates. However, the
        difference lies in their usage. useMemo takes a function and returns the
        return value of that function, while useCallback returns the function
        itself. For instance, if we used useMemo instead of useCallback in our
        example, the getNumbers variable would be set to an array rather than
        the entire function.
      </h2>

      <h2 className="mt-5">
        Consider the following code snippet where the objective for both button
        is to increment a number.
      </h2>
      <SyntaxHighlighter language="javascript" style={nord}>
        {`  const [number, setNumber] = useState(0);
  const [increaseNumber, setIncreaseNumber] = useState(0);

  const printSlow = slowFunction(number);

  function slowFunction(num) {
    for (let i = 0; i <= 999999999; i++) {}
    return num;
  }


    return (
        <div>
            <div className="flex flex-row space-x-4">
                <div>Slow Number: {printSlow}</div>
                <div>Fast Number: {printFast}</div>
            </div>
            <button onClick={() => setNumber(number + 1)}>
            Slow Increase
            </button>
            <button onClick={() => setPrintFast(printFast + 1)}>
            Fast Increase 
            </button>
        </div> )`}
      </SyntaxHighlighter>

      <h2 className="mt-5"> Try pressing both buttons</h2>

      <div className="flex flex-col  mb-8 mt-5">
        <div className="flex flex-row space-x-4">
          <div>Slow Number: {printSlow}</div>
          <div>Fast Number: {increaseNumber}</div>
        </div>
        <div className="flex flex-row space-x-4 mt-3">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              setNumber(number + 1);
              setMemoButtonClicked(false);
            }}
          >
            Slow Increase
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              setIncreaseNumber(increaseNumber + 1);
              setMemoButtonClicked(false);
            }}
          >
            Fast Increase
          </button>
        </div>
      </div>

      <h2 className="mt-5">
        The code contains a function called "printSlow" which intentionally
        takes a long time to execute and return. When the "Slow Number" button
        calls this function, it causes a delay in updating the number displayed
        on the button. However, this delay also affects the "Fast Number"
        button, which should not be impacted. This behavior is similar to the
        "useCallback" example discussed earlier, where re-rendering the
        component causes delays. If you have a slow-performing piece of code
        that doesn't change frequently, it can have a significant impact on
        performance and cause delays in other components. This issue is
        especially pronounced when working with large API data fetches. To
        resolve this issue and make the "Fast Increase" button update
        immediately, we need to implement a solution that separates the slow and
        fast buttons' logic, which is to use useMemo.
      </h2>
      <h2 className="mt-5">
        In this scenario, it is more appropriate to use "useMemo" instead of
        "useCallback" since we are anticipating a value as output rather than a
        function. So in our example, this slowFunction takes an input of number
        and it's always going to give us the same output every time we give it
        the same input. So we can cache that input value number and output it
        gives us. That way if the number doesn't change we don't have to
        re-render our slowFunction again.
      </h2>

      <SyntaxHighlighter language="javascript" style={nord}>
        {`  const [number, setNumber] = useState(0);
  const [increaseNumber, setIncreaseNumber] = useState(0);

  const printSlow = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  function slowFunction(num) {
    for (let i = 0; i <= 999999999; i++) {}
    return num;
  }


    return (
        <div>
            <div className="flex flex-row space-x-4">
                <div>Slow Number: {printSlow}</div>
                <div>Fast Number: {printFast}</div>
            </div>
            <button onClick={() => setNumber(number + 1)}>
            Slow Increase
            </button>
            <button onClick={() => setPrintFast(printFast + 1)}>
            Fast Increase 
            </button>
        </div> )`}
      </SyntaxHighlighter>

      <h2 className="mt-5"> Try pressing both buttons now!</h2>

      <div className="flex flex-col  mb-8 mt-5">
        <div className="flex flex-row space-x-4">
          <div>Slow Number: {useMemoPrintSlow}</div>
          <div>Fast Number: {useMemoIncreaseNumber}</div>
        </div>
        <div className="flex flex-row space-x-4 mt-3">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              setUseMemoNumber(useMemoNumber + 1);
              setMemoButtonClicked(true);
            }}
          >
            Slow Increase
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              setUseMemoIncreaseNumber(useMemoIncreaseNumber + 1);
              setMemoButtonClicked(true);
            }}
          >
            Fast Increase
          </button>
        </div>
      </div>
      <h2 className="mt-5">
        {" "}
        By implementing the "useMemo" hook, we were able to improve the
        performance of the "Fast Number" button by allowing it to render
        instantly, without waiting for the slower "Slow Number" button to finish
        rendering. This is because, when we click the "Fast Increase" button,
        the component is re-rendered but the "useMemo" hook recognizes that the
        number has not changed since the last time it was calculated, so it
        skips calling the slower function. This optimization saves us the time
        and resources needed to recalculate the number using the slower
        function.{" "}
      </h2>

      <h2 className="text-2xl my-3 font-bold"> Conclusion</h2>
      <div>
        While useMemo and useCallback have some similarities in how they can be
        used, they serve different purposes in React.{" "}
      </div>
      <div>
        <span className="underline font-bold">useCallBack</span> is used to
        memoize functions, specifically event handlers that are passed down as
        props to child components. It takes two arguments: a function and an
        array of dependencies. If any of the dependencies change, the function
        is re-created, and if they don't change, the same function reference is
        returned.
      </div>
      <div>
        <span className="underline font-bold">useMemo</span> is used for
        memoization, which means it is used to cache the result of a computation
        so that the computation is not repeated unnecessarily. It takes two
        arguments: a function that returns a value and an array of dependencies.
        If any of the dependencies change, the function is re-run, and if they
        don't change, the cached result is returned.
      </div>
    </div>
  );
}

export default useCallBackVSMemo;
