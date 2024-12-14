"use client";
import { Accordion } from "flowbite-react";
import ItemTag from "./SidebarItemTag";
import { off } from "process";

const AccordianTags = ({
  label,
  childrenTags,
}: {
  label: string;
  childrenTags: string[];
}) => {
  return (
    <Accordion className="divide-blue-light rounded-none border-blue-light" collapseAll>
      <Accordion.Panel className="">
        <Accordion.Title className="focus:ring-0 first:rounded-none bg-transparent hover:bg-green text-white">
          {label.toUpperCase()}
        </Accordion.Title>
        <Accordion.Content className="last:rounded-none">
          <ul className="space-y-2">
            {childrenTags.map((tag, index) => (
              <li key={index}>
                <ItemTag label={tag} />
              </li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default AccordianTags;
