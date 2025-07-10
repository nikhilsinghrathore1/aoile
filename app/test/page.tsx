"use client";
import React, { useEffect } from "react";

const Page = () => {
  const submit = () => {
    alert("pressed");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submit();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
    console.log("stst")
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Enter name" type="text" className="border p-2" />
        <button type="button" onClick={submit} className="ml-2 p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
