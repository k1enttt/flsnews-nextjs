import React from "react";

import HeaderLogo from "./HeaderLogo";
import SearchBar from "./HeaderSearchBar";

function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-dark dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex-none">
            <HeaderLogo
              logosrc={"/fls-logo.webp"}
              logoalt={"FLS Group"}
              logourl={"/"}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="md:w-2/3 w-5/6">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
