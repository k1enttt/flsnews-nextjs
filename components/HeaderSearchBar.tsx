"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onQueryChange = (term: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    if (term) {
      newSearchParams.set("query", term);
    } else {
      newSearchParams.delete("query");
    }
    replace(`${pathname}?${newSearchParams.toString()}`);
  };
  const onSubmit = (formData: FormData) => {
    onQueryChange(formData.get("query") as string);
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-row gap-1 items-center font-gotham-book">
        <input
          type="text"
          name="query"
          placeholder="Find case study"
          defaultValue={searchParams.get("query") || ""}
          className="w-full p-2 border border-gray-300 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        />
        <div className="flex-none">
          <button
            type="submit"
            className="w-full p-2 bg-green text-white hover:underline"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
