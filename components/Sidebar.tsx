import React from "react";
import AccordianTags from "./SidebarAccordianTags";
import type { MinimalTag } from "@/lib/types";

function Sidebar({ tags }: { tags: Record<string, MinimalTag[]>[] }) {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-dark sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 overflow-y-auto dark:bg-gray-800 md:pb-4 pb-16">
        <ul className="space-y-2 font-medium">
          {tags.map((tag) => (
            <li key={Object.keys(tag)[0]}>
              <AccordianTags
                label={Object.keys(tag)[0]}
                childrenTags={Object.values(tag)[0]}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
