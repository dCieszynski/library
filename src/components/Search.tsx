const Search = () => {
  return (
    <div className="fixed top-0 right-0 z-50 h-16 pr-8 flex items-center justify-center bg-white">
      <input type="text" placeholder="Search" />
      <button className="border-2 border-black px-4 py-2 rounded-xl">
        Search
      </button>
    </div>
  );
};

export default Search;
