"use client";
import { Tag } from "@/lib/types";
import { Accordion } from "flowbite-react";

const ItemTag = ({ label }: { label: string }) => {
  return (
    <>
      <label htmlFor={label} className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={label}
          name={label}
          className="w-6 h-6 border border-gray-300 rounded mr-2 focus:ring-green checked:bg-green"
        />
        <span className="text-sm font-medium text-white">{label}</span>
      </label>
    </>
  );
};


const AccordianTags = ({
  label,
  childrenTags,
}: {
  label: string;
  childrenTags: Tag[];
}) => {
  return (
    <Accordion className="divide-blue-light rounded-none border-blue-light" collapseAll>
      <Accordion.Panel className="">
        <Accordion.Title className="focus:ring-0 first:rounded-none bg-transparent hover:bg-green text-white font-gotham-bold">
          {label.toUpperCase()}
        </Accordion.Title>
        <Accordion.Content className="last:rounded-none font-gotham-book">
          <ul className="space-y-2">
            {/* Tag này được tạo và quản lý bởi ghostcms và nó không bị trùng nên mình thoải mái dùng nó để làm key */}
            {childrenTags.map((tag) => (
              <li key={tag.slug}>
                <ItemTag label={tag.name} />
              </li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default AccordianTags;
