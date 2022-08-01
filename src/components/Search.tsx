import { useState } from "react";
import { Data } from "../App";
interface Props {
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
}

const Search: React.FC<Props> = ({ setData }) => {
  const [searchInput, setSearchInput] = useState("");

  const getData = async () => {
    const res = await fetch(`https://gutendex.com/books?search=${searchInput}`);
    const newData: Data = await res.json();
    setData(newData);
  };

  const handleSearch = () => {
    getData();
    setSearchInput("");
  };

  return (
    <div className="fixed top-0 right-0 z-50 h-16 pr-8 flex items-center justify-center bg-white">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className="border-2 border-black px-4 py-2 rounded-xl"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
