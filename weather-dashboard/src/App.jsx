import { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchValue) => {
    setCity(searchValue);
    console.log("Searching for:", searchValue); // temp log
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">🌤️ Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {city && (
        <p className="text-white mt-4 text-lg">
          Showing weather for: <span className="font-semibold">{city}</span>
        </p>
      )}
    </div>
  );
}

export default App;
