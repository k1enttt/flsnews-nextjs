"use client";
import type { MinimalTag } from "@/lib/types";
import { Accordion } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";

const ItemTag = ({ label, slug }: { label: string; slug: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTags = searchParams.get("tags")?.split(",") || [];

  // Set tags to URL
  const onTagChange = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    // Reset other search params when searching
    params.set("page", "1");
    params.delete("query");

    // Giá trị của tags sẽ được lưu dưới dạng mảng như sau: slug1,slug2,slug3
    // Tạo một mảng mới để lưu các tags đã được chọn
    // Nếu tag được chọn thì thêm vào mảng, nếu bỏ chọn thì xóa khỏi mảng đó
    if (value) {
      selectedTags.push(slug);
      params.set("tags", selectedTags.join(","));
    } else {
      if (selectedTags.length === 1) {
        params.delete("tags");
      } else {
        const index = selectedTags.indexOf(slug);
        if (index > -1) {
          selectedTags.splice(index, 1);
        }
        params.set("tags", selectedTags.join(","));
      }
    }
    router.replace(`?${params.toString()}`);
  };

  // Load tags from URL
  const isSelected = selectedTags.includes(slug);

  return (
    <>
      <label htmlFor={label} className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={label}
          name={label}
          defaultChecked={isSelected}
          onChange={(e) => onTagChange(e.target.checked)}
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
  childrenTags: MinimalTag[];
}) => {
  return (
    <Accordion
      className="divide-blue-light rounded-none border-blue-light"
      collapseAll
    >
      <Accordion.Panel className="">
        <Accordion.Title className="focus:ring-0 first:rounded-none bg-transparent hover:bg-green text-white font-gotham-bold">
          {label.toUpperCase()}
        </Accordion.Title>
        <Accordion.Content className="last:rounded-none font-gotham-book">
          <ul className="space-y-2">
            {/* Tag này được tạo và quản lý bởi ghostcms và nó không bị trùng nên mình thoải mái dùng nó để làm key */}
            {childrenTags.map((tag) => (
              <li key={tag.slug}>
                <ItemTag label={tag.name} slug={tag.slug} />
              </li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default AccordianTags;
