/**
 * Trả về một tag item để biểu diễn các tag trong sidebar, component này có thể sử dụng thẳng vào AccordionTags thay vì phải tạo một component mới
 * @param label string
 * @returns ReactDom
 */
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

export default ItemTag;
