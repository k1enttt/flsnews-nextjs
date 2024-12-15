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
        <Accordion.Title className="focus:ring-0 first:rounded-none bg-transparent hover:bg-green text-white font-gotham-bold">
          {label.toUpperCase()}
        </Accordion.Title>
        <Accordion.Content className="last:rounded-none font-gotham-book">
          <ul className="space-y-2">
            {/* [Explain] Lý do thẻ <li> không dùng "tag" làm key thay vì "index" là bởi 
            tag là dữ liệu có thể bị trùng nếu người nhập không kiểm tra kỹ, còn với "index" thì không thể nào bị trùng. */}
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
