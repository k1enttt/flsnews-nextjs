const SearchBar = () => {
  return (
    <form action="" method="get">
      <div className="flex flex-row gap-1 items-center font-gotham-book">
        <input
          type="text"
          placeholder="Find case study"
          className="w-full p-2 border border-gray-300 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        />
        <div className="flex-none">
          <button type="submit" className="w-full p-2 bg-green text-white hover:underline">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
