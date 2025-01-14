import React from "react";
import Image from "next/image";

function HeaderLogo({
  logosrc,
  logoalt,
  logourl,
}: {
  logosrc: string;
  logoalt: string;
  logourl: string;
}) {
  return (
    <div className="flex items-center justify-start">
      {/* Icon menu chỉ hiện ra lúc thu gọn  */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            className="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      {/* Logo và cái text kế bên */}
      <a href={logourl} className="flex ml-2 md:mr-24">
        <div className="h-8 mr-3">
          <Image src={logosrc} alt={logoalt} height={37} width={84} />
        </div>

        {/* [Explain] Lý do comment đoạn code sau là bởi khách hàng chưa cần đến và có thể uncomment nếu khách hàng có nhu cầu */}
        {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          A new dasboard
        </span> */}
      </a>
    </div>
  );
}

export default HeaderLogo;
