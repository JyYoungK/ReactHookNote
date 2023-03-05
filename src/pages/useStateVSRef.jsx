import React, { useState, useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

function useStateVSRef() {
  const [useStateValue, setStateValue] = useState("");
  const [prevStateValue, setStatePrevValue] = useState("");

  useEffect(() => {
    console.log("useStateValue: " + useStateValue);
    console.log("prevStateValue: " + prevStateValue);
    setStatePrevValue(useStateValue);
  }, [useStateValue]);

  const [useRefValue, setUseRefValue] = useState("");
  const prevUseRefValue = useRef("");

  useEffect(() => {
    console.log("useRefValue: " + useRefValue);
    console.log("prevUseRefValue: " + prevUseRefValue.current);
    prevUseRefValue.current = useRefValue;
  }, [useRefValue]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">useState vs useRef</h1>
      <div>
        One of the most effective uses of useRef is to store the previous value
        of useState, since using useRef does not trigger a re-render. If you
        attempt to use useState to set the previous value instead, it will cause
        your component to re-render unnecessarily. However, by using useRef in
        this case, we can avoid this additional re-render that is not actually
        needed.
      </div>

      <h2 className="mt-5">For example, let's try to save a previous state</h2>
      <h2 className="text-2xl my-3 font-bold">Using useState </h2>
      <SyntaxHighlighter language="javascript" style={nord}>
        {`  const [useStateValue, setStateValue] = useState("");
    const [prevStateValue, setStatePrevValue] = useState("");
  
    useEffect(() => {
      console.log("useStateValue: " + useStateValue);
      console.log("prevStateValue: " + prevStateValue);
      setStatePrevValue(useStateValue);
    }, [useStateValue]);
    
    return (
      <input
      value={useRefvalue}
      onChange={(e) => setUseRefValue(e.target.value)}
    />
    <div>
      This is the value used by useState: {useStateValue}
    </div>
    <div>
      This is the previous value using useState: {prevStateValue}
    </div>
  </div>
    )`}
      </SyntaxHighlighter>

      <div className="my-8">
        <input
          className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={useStateValue}
          placeholder="Type something to display"
          onChange={(e) => setStateValue(e.target.value)}
        />
        <div className="text-xl text-blue-600 mb-2">
          This is the current value using useState: {useStateValue}
        </div>
        <div className="text-xl text-green-600 mb-2">
          This is the previous value using useState: {prevStateValue}
        </div>

        <div className="text-gray-700">
          If you open the browser's developer tools and inspect the page, you
          can see that prevStateValue correctly logs the previous state of
          useStateValue. However, on the actual page, the displayed value
          remains the same. This is because the component is{" "}
          <span className="underline font-bold">re-rendered</span>!
        </div>
      </div>

      <h2 className="text-2xl my-3 font-bold"> Using useRef </h2>
      <SyntaxHighlighter language="javascript" style={nord}>
        {`  const [useRefValue, setUseRefValue] = useState("");
    const prevUseRefValue = useRef("");
  
    useEffect(() => {
      console.log("useRefValue: " + useRefValue);
      console.log("prevUseRefValue: " + prevUseRefValue.current);
      prevUseRefValue.current = useRefValue;
    }, [useRefValue]);
    
    return (
      <input
      value={useRefvalue}
      onChange={(e) => setUseRefValue(e.target.value)}
    />
    <div>
      This is the value used by useState: {useRefValue}
    </div>
    <div>
      This is the previous value using useRef: {prevUseRefValue.current}
    </div>
  </div>
    )`}
      </SyntaxHighlighter>

      <div className="my-8">
        <input
          className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something to display"
          value={useRefValue}
          onChange={(e) => setUseRefValue(e.target.value)}
        />
        <div className="text-xl text-blue-600 mb-2">
          This is setValue used by useState: {useRefValue}
        </div>
        <div className="text-xl text-green-600 mb-2">
          This is the previous value using useRef: {prevUseRefValue.current}
        </div>

        <div className="text-gray-700">
          If you open the browser's developer tools and inspect the page, you
          can see that prevStateValue correctly logs the previous state of
          useStateValue <span className="font-bold"> AND </span> on the actual
          page, the displayed value matches. This is because the component is{" "}
          <span className="underline font-bold">NOT</span> re-rendered!
        </div>
      </div>

      <h2 className="text-2xl my-3 font-bold"> Conclusion</h2>
      <div>
        If you want to update data and cause a UI update, useState is your Hook.
        If you need some kind of data container throughout the component’s
        lifecycle without causing render cycles on mutating your variable, then
        useRef is your solution.
      </div>
    </div>
  );
}

export default useStateVSRef;
