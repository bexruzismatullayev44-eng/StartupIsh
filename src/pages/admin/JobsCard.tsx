import { MdOutlineEdit } from "react-icons/md";

interface Props {
  image: string;
  name: string;
  index: number;
  editCategory: () => void;
}

const JobsCard = ({ image, name, index, editCategory }: Props) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700! hover:bg-gray-50! dark:hover:bg-slate-800! transition-colors">
      <td className="p-3 text-gray-700! dark:text-gray-300! font-medium">
        {index}
      </td>
      <td className="p-3">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-600! shadow-sm"
        />
      </td>
      <td className="p-3 font-semibold text-gray-900 dark:text-white">
        {name}
      </td>
      <td className="p-3 ml-2 text-left">
        <button
          onClick={editCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg! transition-all active:scale-95 shadow-md shadow-blue-500/20"
        >
          <MdOutlineEdit size={20} />
        </button>
      </td>
    </tr>
  );
};

export default JobsCard;



