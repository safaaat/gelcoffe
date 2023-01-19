import { React, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Navigate } from "react-router-dom";

function InputNav() {
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);

  const updateInput = input => {
    setInput(input);
  };

  const onSubmit = event => {
    event.preventDefault();
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setInput("");
    }, 1);
  };

  return (
    <form className="w-full relative flex items-center" onSubmit={onSubmit}>
      {/* Button Input */}
      <div
        className="absolute z-[1] bg-color-primary right-0 py-2 px-2 rounded-lg text-xl mr-[5px] cursor-pointer hover:bg-color-hover transition-all duration-500"
        onClick={onSubmit}
      >
        <AiOutlineSearch />
      </div>

      {/* Input */}
      <input
        className="placeholder:italic placeholder:text-slate-400 text-color-gray block bg-white w-full border border-slate-300 rounded-md py-[10px] px-3 shadow-sm focus:outline-none focus:border-color-hover focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        value={input}
        onChange={input => updateInput(input.target.value)}
      />

      {/* Link Navigasi */}
      {!active ? "" : <Navigate to={`/search/${input}`} />}
    </form>
  );
}

export default InputNav;
