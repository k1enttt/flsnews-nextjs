"use client";
import { Accordion } from "flowbite-react";
import ItemTag from "./SidebarItemTag";

const AccordianTags = ({ label, childrenTags }: { label: string, childrenTags: string[] }) => {
  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>{label}</Accordion.Title>
        <Accordion.Content>
          <ul className="space-y-2">
            {
              childrenTags.map((tag, index) => (
                // Xài thêm index làm key ở đây hơi miễn cưỡng và cồng kềnh vì em có tag cũng unique đủ làm key rồi
                <li key={index}>
                  <ItemTag label={tag} />
                </li>
              ))
            }
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default AccordianTags;
