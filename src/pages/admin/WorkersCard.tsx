// import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";

// interface Props {
//   image: string;
//   title: string;
//   price: number;
//   categoryName: string;
//   index: number;
//   deleteProduct: () => void;
//   editProduct: () => void;
// }

// const ProductCard = ({ title, price, categoryName, index, image, deleteProduct, editProduct }: Props) => {
//   return (
//     <tr className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b]! hover:bg-gray-50 dark:hover:bg-[#334155]! transition-colors">
//       <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
//         {index}
//       </td>
//       <td className="p-4">
//         <img 
//           src={image} 
//           alt={title} 
//           className="w-14 h-14 rounded-md object-cover border border-gray-200 dark:border-gray-600 shadow-sm" 
//         />
//       </td>
//       <td className="p-4 font-semibold text-gray-900 dark:text-white">
//         {title}
//       </td>
//       <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
//         {price.toLocaleString()} $
//       </td>
//       <td className="p-4">
//         <span className="bg-gray-100 text-gray-700 dark:bg-[#0f172a] dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 dark:border-gray-700 tracking-wide">
//           {categoryName}
//         </span>
//       </td>
//       <td className="p-4">
//         <div className="flex gap-3">
//           <button
//             onClick={editProduct}
//             className="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white p-2.5 rounded-lg! transition-all active:scale-95"
//             title="Tahrirlash"
//           >
//             <MdOutlineEdit size={20} />
//           </button>
//           <button
//             onClick={deleteProduct}
//             className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white p-2.5 rounded-lg! transition-all active:scale-95"
//             title="O'chirish"
//           >
//             <MdDeleteForever size={20} />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default ProductCard;

import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";

interface Props {
  image: string;
  title: string;
  price: number;
  categoryName: string;
  index: number;
  deleteProduct: () => void;
  editProduct: () => void;
}

const ProductCard = ({ title, price, categoryName, index, image, editProduct }: Props) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700! dark:bg-[#1e293b]!  dark:hover:bg-[#334155]! transition-colors">
      <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
        {index}
      </td>
      <td className="p-4">
        <img
          src={image}
          alt={title}
          className="w-14 h-14 rounded-md object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
        />
      </td>
      <td className="p-4 font-semibold text-gray-900 dark:text-white">
        {title}
      </td>
      <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
        {price.toLocaleString()} so'm
      </td>
      <td className="p-4">
        <span className="bg-gray-100 text-gray-700 dark:bg-[#0f172a] dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 dark:border-gray-700 tracking-wide">
          {categoryName}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-3">
          <button
            onClick={editProduct}
            className="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white p-2.5 rounded-lg transition-all active:scale-95"
          >
            <MdOutlineEdit size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductCard;