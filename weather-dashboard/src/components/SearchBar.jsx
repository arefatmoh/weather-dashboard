import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="text"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 rounded-l-xl border-none outline-none"
      />
      <button
        type="submit"
        className="bg-indigo-700 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-800"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
