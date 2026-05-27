// // import Rodal from "rodal";
// // import "rodal/lib/rodal.css";
// // import axios from "axios";
// // import { useState, useEffect } from "react";
// // import { API, Product, Category } from "../../types";
// // import ProductCard from "./WorkersCard";

// // const Products = () => {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [title, setTitle] = useState("");
// //   const [price, setPrice] = useState<number | string>("");
// //   const [img1, setImg1] = useState("");
// //   const [img2, setImg2] = useState("");
// //   const [img3, setImg3] = useState("");
// //   const [img4, setImg4] = useState("");
// //   const [categoryId, setCategoryId] = useState("");
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [editingId, setEditingId] = useState<null | number>(null);

// //   const getProducts = async () => {
// //     try {
// //       const [resProd, resCat] = await Promise.all([
// //         axios.get(`${API}/products`),
// //         axios.get(`${API}/categories`),
// //       ]);
// //       setProducts(resProd.data);
// //       setCategories(resCat.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getProducts();
// //   }, []);

// //   const handleSave = async () => {
// //     const imagesArray = [img1, img2, img3, img4].filter(url => url.trim() !== "");
// //     const productObj = {
// //       title,
// //       price: Number(price),
// //       images: imagesArray,
// //       categoryId: Number(categoryId), // API formatiga qarab category: {id} yoki categoryId
// //     };

// //     try {
// //       if (editingId === null) {
// //         const response = await axios.post(`${API}/products`, productObj);
// //         setProducts([...products, response.data]);
// //       } else {
// //         const response = await axios.put(`${API}/products/${editingId}`, productObj);
// //         setProducts(products.map((p) => (p.id === editingId ? response.data : p)));
// //       }
// //       closeModal();
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const getCategoryName = (product: Product): string => {
// //     if (product.category?.name) return product.category.name;
// //     const found = categories.find((c) => c.id === product.category?.id);
// //     return found ? found.name : "Noma'lum";
// //   };

// //   const closeModal = () => {
// //     setModalVisible(false);
// //     setEditingId(null);
// //     setTitle("");
// //     setPrice("");
// //     setImg1("");
// //     setImg2("");
// //     setImg3("");
// //     setImg4("");
// //     setCategoryId("");
// //   };

// //   const handleDelete = async (id: number) => {
// //     if (window.confirm("O'chirishni tasdiqlaysizmi?")) {
// //       try {
// //         await axios.delete(`${API}/products/${id}`);
// //         setProducts(products.filter(p => p.id !== id));
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     }
// //   };

// //   const handleEdit = (product: Product) => {
// //     setEditingId(product.id);
// //     setModalVisible(true);
// //     setTitle(product.title);
// //     setPrice(product.price);
// //     setImg1(product.images[0] || "");
// //     setImg2(product.images[1] || "");
// //     setImg3(product.images[2] || "");
// //     setImg4(product.images[3] || "");
// //     setCategoryId(product.category.id.toString());
// //   };

// //   return (
// //     <div className="p-6 min-h-screentransition-colors">
// //       {/* Header Bolimi */}
// //       <div className="border dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800">
// //         <h1 className="text-2xl font-bold text-gray-800 dark:text-white!">Workers</h1>
// //       </div>

// //       {/* Jadval Bolimi */}
// //       <div className="mt-6 overflow-hidden border dark:border-gray-700 rounded-xl shadow-md">
// //         <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
// //           <thead className="bg-gray-100 dark:bg-slate-700">
// //             <tr>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">No</th>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Image</th>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Name</th>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Price</th>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Category</th>
// //               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y dark:divide-gray-700">
// //             {products.map((product, index) => (
// //               <ProductCard
// //                 key={product.id}
// //                 index={index + 1}
// //                 title={product.title}
// //                 price={product.price}
// //                 image={product.images[0]}
// //                 categoryName={getCategoryName(product)}
// //                 deleteProduct={() => handleDelete(product.id)}
// //                 editProduct={() => handleEdit(product)}
// //               />
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Modal Bolimi */}
// //       <Rodal
// //         customStyles={{ 
// //           height: "max-content", 
// //           width: "450px", 
// //           borderRadius: "12px",
// //           backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
// //           color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000'
// //         }}
// //         visible={modalVisible}
// //         onClose={closeModal}
// //       >
// //         <div className="p-2 flex flex-col gap-3 dark:text-white">
// //           <h2 className="text-xl font-bold mb-2 border-b pb-2 dark:border-gray-700">
// //             {editingId ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
// //           </h2>
          
// //           <div className="grid grid-cols-2 gap-2">
// //             {[setImg1, setImg2, setImg3, setImg4].map((setImg, i) => (
// //               <input
// //                 key={i}
// //                 value={[img1, img2, img3, img4][i]}
// //                 onChange={(e) => setImg(e.target.value)}
// //                 type="text"
// //                 className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
// //                 placeholder={`Rasm ${i+1} URL`}
// //               />
// //             ))}
// //           </div>

// //           <input
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             type="text"
// //             className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
// //             placeholder="Mahsulot nomi"
// //           />
          
// //           <input
// //             value={price}
// //             onChange={(e) => setPrice(e.target.value)}
// //             type="number"
// //             className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
// //             placeholder="Narxi ($)"
// //           />

// //           <select
// //             value={categoryId}
// //             onChange={(e) => setCategoryId(e.target.value)}
// //             className="w-full border dark:border-gray-600 bg-white dark:bg-slate-800! p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
// //           >
// //             <option value="">Kategoriya tanlang</option>
// //             {categories.map((c) => (
// //               <option key={c.id} value={c.id}>{c.name}</option>
// //             ))}
// //           </select>

// //           <button
// //             onClick={handleSave}
// //             className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 mt-4 rounded-lg font-bold shadow-lg transition-transform active:scale-95"
// //           >
// //             Saqlash
// //           </button>
// //         </div>
// //       </Rodal>
// //     </div>
// //   );
// // };

// // export default Products;

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { API } from "../../types";
// import type { Worker } from "../../types";

// const Workers = () => {
//   const [workers, setWorkers] = useState<Worker[]>([]);

//   const getWorkers = async () => {
//     try {
//       const { data } = await axios.get(`${API}/workers`);
//       setWorkers(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getWorkers();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (window.confirm("O'chirishni tasdiqlaysizmi?")) {
//       try {
//         await axios.delete(`${API}/workers/${id}`);
//         setWorkers(workers.filter((w) => w.id !== id));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen transition-colors">

//       <div className="border dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white!">Workers</h1>
//       </div>


//       <div className="mt-6 overflow-hidden border dark:border-gray-700 rounded-xl shadow-md">
//         <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
//           <thead className="bg-gray-100 dark:bg-slate-700">
//             <tr>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">No</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Sarlavha</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Ish turi</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Narx</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Shahar</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Tajriba</th>
//               <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Amallar</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y dark:divide-gray-700">
//             {workers.map((worker, index) => (
//               <tr key={worker.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
//                 <td className="p-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
//                 <td className="p-4 text-gray-700 dark:text-gray-300">{worker.title}</td>
//                 <td className="p-4 text-gray-700 dark:text-gray-300">{worker.jobs?.name}</td>
//                 <td className="p-4 text-gray-700 dark:text-gray-300">
//                   {worker.price.toLocaleString()} so'm
//                 </td>
//                 <td className="p-4 text-gray-700 dark:text-gray-300">{worker.city}</td>
//                 <td className="p-4 text-gray-700 dark:text-gray-300">{worker.experience}</td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => handleDelete(worker.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
//                   >
//                     O'chirish
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Workers;

import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../types";
import type { Worker } from "../../types";

const Workers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Serverdan ma'lumotlarni o'qib olish (GET)
  const getWorkers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/workers`);
      setWorkers(data);
    } catch (error) {
      console.error("Ishchilarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  // Ma'lumotni o'chirish (DELETE)
  const handleDelete = async (id: string) => {
    if (window.confirm("O'chirishni tasdiqlaysizmi?")) {
      try {
        await axios.delete(`${API}/workers/${id}`);
        setWorkers(workers.filter((w) => w.id !== id));
      } catch (error) {
        console.error("O'chirishda xatolik yuz berdi:", error);
      }
    }
  };

  return (
    <div className="p-6 min-h-screen transition-colors dark:bg-gray-900">
      {/* Header qismi */}
      <div className="border dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white!">
          Ishchilar ro'yxati ({workers.length})
        </h1>
      </div>

      {/* Yuklanayotgan holat animatsiyasi */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-gray-500 animate-pulse dark:text-gray-400">
            Ma'lumotlar yuklanmoqda...
          </div>
        </div>
      ) : workers.length === 0 ? (
        // Agar bazada ma'lumot bo'lmasa ko'rinadigan qism
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Hozircha hech qanday ishchi topilmadi.
        </div>
      ) : (
        /* Toza jadval (Table) qismi */
        <div className="mt-6 overflow-hidden border dark:border-gray-700 rounded-xl shadow-md">
          <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">No</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Sarlavha</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Ish turi</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Narx</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Shahar</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Tajriba</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {workers.map((worker, index) => (
                <tr 
                  key={worker.id} 
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="p-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-800 dark:text-white">{worker.title}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {worker.jobs?.name || "Kategoriya yo'q"}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300 font-semibold">
                    {worker.price ? `${worker.price.toLocaleString()} so'm` : "Kelishiladi"}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {worker.city || "Kiritilmagan"}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {worker.experience ? `${worker.experience} yil` : "Tajribasiz"}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(worker.id)}
                      className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm"
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Workers;