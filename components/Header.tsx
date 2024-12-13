import React from "react";

import HeaderUser from "./HeaderUser";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "./HeaderSearchBar";

function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex-none">
            <HeaderLogo
              logosrc={
                // Tân: Em nên down cái logo về bỏ vào thư mục public nha.
                "https://static.wixstatic.com/media/41a104_38f6dc9dc3a34d6e92a8abaa089233c8~mv2.png/v1/fill/w_204,h_91,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/FLS%20Group%20Logo%20with%20Tagline%20_%20Color_edited.png"
              }
              logoalt={"ok nha"}
              logourl={"https://carp.vn"} // Tân: sao không sửa ở đây???
            />
          </div>
          <div className="w-1/2">
            <SearchBar />
          </div>

          {/* Đoạn này nên xóa hẳn luôn và remove cái import ở trên */}

          {/* Tương lai là phải truyền vào avatar, tên, email             */}
          {/* <HeaderUser
            /> */}

          {/* Không nên để các div trắng vầy cho vào code commit */}
          <div className="flex-none"></div>

        </div>
      </div>
    </nav>
  );
}

export default Header;
