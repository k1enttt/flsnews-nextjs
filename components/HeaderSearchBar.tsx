const SearchBar = () => {
  return (
    <div className="flex flex-row gap-1">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="flex-none">
        <button className="w-full p-2 bg-primary text-white rounded-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
