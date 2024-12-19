import React from "react";
import AccordianTags from "./SidebarAccordianTags";
import { tags } from "@/lib/constant";

function Sidebar({}) {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-dark sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 overflow-y-auto dark:bg-gray-800 md:pb-4 pb-16">
        <ul className="space-y-2 font-medium">
          <li>
            <AccordianTags label="Origin" childrenTags={tags.origin} />
          </li>
          <li>
            <AccordianTags
              label="Destination"
              childrenTags={tags.destination}
            />
          </li>
          <li>
            <AccordianTags label="Commodity" childrenTags={tags.commodity} />
          </li>
          <li>
            <AccordianTags
              label="Bussiness Unit"
              childrenTags={tags.bussinessUnit}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
