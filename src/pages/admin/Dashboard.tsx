
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Category, Product, User, Order, API } from "../../types";
// import { CiShoppingCart } from "react-icons/ci";
// import { IoFolderOpenOutline } from "react-icons/io5";
// import { FaBox } from "react-icons/fa6";
// import { FiUsers } from "react-icons/fi";


// const Dashboard = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProduct] = useState<Product[]>([]);
//   const [users, setUser] = useState<User[]>([]);
//   const [orders, setOrder] = useState<Order[]>([]);
  

//   const getOrder = async () => {
//     try {
//       const { data } = await axios.get(`${API}/orders`);
//       setOrder(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getCategories = async () => {
//     try {
//       const { data } = await axios.get<Category[]>(`${API}/categories`);
//       setCategories(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get<Product[]>(`${API}/products`);
//       setProduct(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getUsers = async () => {
//     try {
//       const { data } = await axios.get<User[]>(`${API}/users`);
//       setUser(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOrder();
//     getCategories();
//     getProduct();
//     getUsers();
//   }, []);



//   return (
//     <div>
//       <div className="p-5">
//         <h1 className="text-xl font-semibold mb-5 dark:text-white!">Dashboard</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {/* Mahsulotlar */}
//           <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 dark:text-white">Mahsulotlar</span>
//               <span className="text-orange-500 text-xl">
//                 <FaBox color="blue" />
//               </span>
//             </div>
//             <span className="text-2xl font-bold dark:text-white">{products.length}</span>
//           </div>

//           {/* Kategoriyalar */}
//           <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 dark:text-white">Kategoriyalar</span>
//               <span className="text-orange-500 text-xl">
//                 <IoFolderOpenOutline color="blue" />
//               </span>
//             </div>
//             <span className="text-2xl font-bold dark:text-white">{categories.length}</span>
//           </div>

//           {/* Buyurtmalar */}
//           <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 dark:text-white">Buyurtmalar</span>
//               <span className="text-orange-500 text-xl">
//                 <CiShoppingCart color="blue" />
//               </span>
//             </div>
//             <span className="text-2xl font-bold dark:text-white">{orders.length}</span>
//           </div>

//           {/* Foydalanuvchilar */}
//           <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 dark:text-white">Foydalanuvchilar</span>
//               <span className="text-orange-500 text-xl">
//                 <FiUsers color="blue" />
//               </span>
//             </div>
//             <span className="text-2xl font-bold dark:text-white">{users.length}</span>
//           </div>
//         </div>
//       </div>

//       <div>
//         <div className="border rounded-lg shadow-sm p-4 mb-6 bg-white dark:text-white dark:bg-slate-800! transition-colors">
//           <h1 className="text-xl font-semibold dark:text-white">
//             So'nggi buyurtmalar
//           </h1>
//         </div>

//         <div className="container mt-3 px-0">
//           <div className="flex flex-col gap-3">
//             {orders.length === 0 ? (
//               <div className="p-10 text-center text-gray-500 bg-white border rounded-xl dark:bg-slate-800! dark:text-white! transition-colors">
//                 Hech qanday foydalanuvchi topilmadi.
//               </div>
//             ) : (
//               orders.map((order, index) => (
//                 <div
//                   key={order.id}
//                   className="flex items-center justify-between bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-slate-800! dark:text-white"
//                 >
//                   <div className="w-16 text-gray-400 font-medium dark:text-white">{index + 1}</div>
//                   <div className="flex-1 text-center text-gray-600 dark:text-white">{order.fullName}</div>
//                   <div className="flex-1 text-center text-gray-900 font-bold dark:text-white">{order.orderItems.length} ta</div>
//                   <div className="flex-1 text-center text-gray-900 font-bold dark:text-white">{Number(order.totalPrice).toLocaleString()} so'm</div>
//                   <div className="w-40 text-right">
//                     <span className="bg-orange-50 text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium dark:bg-orange-900/20 dark:text-orange-400">
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;








import axios from "axios";
import { useState, useEffect } from "react";
import { Jobs, Worker, User, Order, API } from "../../types";
import { CiShoppingCart } from "react-icons/ci";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6"; // Ishchilar uchun mos ikonka
import { FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // 1. Sohalarni (Jobs) yuklash
  const getJobs = async () => {
    try {
      const { data } = await axios.get<Jobs[]>(`${API}/jobs`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sohalarni yuklashda xatolik:", error);
    }
  };

  // 2. Ishchilarni (Workers) yuklash
  const getWorkers = async () => {
    try {
      const { data } = await axios.get<Worker[]>(`${API}/workers`);
      setWorkers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Ishchilarni yuklashda xatolik:", error);
    }
  };

  // 3. Foydalanuvchilarni (Users) yuklash
  const getUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(`${API}/users`);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Foydalanuvchilarni yuklashda xatolik:", error);
    }
  };

  // 4. Buyurtmalarni (Buyurtmalar) yuklash
  const getOrders = async () => {
    try {
      const { data } = await axios.get<Order[]>(`${API}/buyurtmalar`);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Buyurtmalarni yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    getJobs();
    getWorkers();
    getUsers();
    getOrders();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>

      {/* Statistika Kartalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        
        {/* Ishchilar (Eski mahsulotlar o'rniga) */}
        <div className="bg-white dark:bg-slate-800 border dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Ishchilar</span>
            <span className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xl">
              <FaUserTie className="text-blue-600 dark:text-blue-400" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{workers.length}</span>
        </div>

        {/* Sohalar / Kasblar (Eski kategoriyalar o'rniga) */}
        <div className="bg-white dark:bg-slate-800 border dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Sohalar</span>
            <span className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-xl">
              <IoFolderOpenOutline className="text-emerald-600 dark:text-emerald-400" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{jobs.length}</span>
        </div>

        {/* Buyurtmalar */}
        <div className="bg-white dark:bg-slate-800 border dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Buyurtmalar</span>
            <span className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-xl">
              <CiShoppingCart className="text-orange-600 dark:text-orange-400" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{orders.length}</span>
        </div>

        {/* Foydalanuvchilar */}
        <div className="bg-white dark:bg-slate-800 border dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Foydalanuvchilar</span>
            <span className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xl">
              <FiUsers className="text-purple-600 dark:text-purple-400" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{users.length}</span>
        </div>
      </div>

      {/* So'nggi Buyurtmalar Ro'yxati */}
      <div>
        <div className="border dark:border-gray-700 rounded-xl shadow-sm p-4 mb-4 bg-white dark:bg-slate-800 transition-colors">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            So'nggi buyurtmalar
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-white border dark:border-gray-700 rounded-xl dark:bg-slate-800 transition-colors font-medium">
              Hech qanday buyurtma topilmadi.
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order.id || index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all gap-4 text-gray-700 dark:text-gray-200"
              >
                <div className="w-10 text-gray-400 font-bold dark:text-gray-500">{index + 1}</div>
                <div className="flex-1 font-medium">{order.fullName || "Ism kiritilmagan"}</div>
                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                  {order.orderItems?.length || 0} ta xizmat/ishchi
                </div>
                <div className="flex-1 font-bold text-gray-950 dark:text-white">
                  {Number(order.totalPrice || 0).toLocaleString()} so'm
                </div>
                <div className="sm:text-right">
                  <span className="bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {order.status || "Yangi"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;