// Tân: Anh nghĩ cái này em nhét vào cái sidebar luôn thì hơn vì chỉ mình nó xài khỏi export lung tung đụng
const ItemTag = ({ label }: { label: string }) => {
  return (
    <>
      <label htmlFor={label} className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={label}
          name={label}
          className="w-6 h-6 border border-gray-300 rounded mr-2"
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
    </>
  );
};

export default ItemTag;
