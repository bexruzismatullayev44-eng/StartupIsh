import axios from "axios";
import { useState, useEffect } from "react";
import { Jobs, Worker, User, Order, API } from "../../types";
import { CiShoppingCart, CiClock1 } from "react-icons/ci";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6"; 
import { FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getJobs = async () => {
    try {
      const { data } = await axios.get<Jobs[]>(`${API}/jobs`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sohalarni yuklashda xatolik:", error);
    }
  };

  const getWorkers = async () => {
    try {
      const { data } = await axios.get<Worker[]>(`${API}/workers`);
      setWorkers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Ishchilarni yuklashda xatolik:", error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(`${API}/users`);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Foydalanuvchilarni yuklashda xatolik:", error);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get<Order[]>(`${API}/orders`);
      if (data && Array.isArray(data)) {
        const sortedOrders = [...data].sort((a, b) => {
          const timeA = a.createAt ? new Date(a.createAt).getTime() : 0;
          const timeB = b.createAt ? new Date(b.createAt).getTime() : 0;
          return timeB - timeA;
        });
        setOrders(sortedOrders.slice(0, 5));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Buyurtmalarni yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([getJobs(), getWorkers(), getUsers(), getOrders()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white!">Dashboard</h1>
      
      {/* Statisika Kartalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        
        {/* Ishchilar */}
        <div className="bg-white dark:bg-[#1e293b]! border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-300! font-medium">Ishchilar</span>
            <span className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg text-xl shrink-0">
              <FaUserTie className="text-blue-600 dark:text-blue-400!" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white!">{workers.length}</span>
        </div>
        
        {/* Sohalar */}
        <div className="bg-white dark:bg-[#1e293b]! border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-300! font-medium">Sohalar</span>
            <span className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-xl shrink-0">
              <IoFolderOpenOutline className="text-emerald-600 dark:text-emerald-400!" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white!">{jobs.length}</span>
        </div>
        
        {/* Buyurtmalar */}
        <div className="bg-white dark:bg-[#1e293b]! border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-300! font-medium">Buyurtmalar</span>
            <span className="p-2 bg-orange-50 dark:bg-orange-950/50 rounded-lg text-xl shrink-0">
              <CiShoppingCart className="text-orange-600 dark:text-orange-400!" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white!">{orders.length}</span>
        </div>

        {/* Foydalanuvchilar */}
        <div className="bg-white dark:bg-[#1e293b]! border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-gray-300! font-medium">Foydalanuvchilar</span>
            <span className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg text-xl shrink-0">
              <FiUsers className="text-purple-600 dark:text-purple-400!" />
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 dark:text-white!">{users.length}</span>
        </div>
      </div>

      {/* So'nggi Buyurtmalar Ro'yxati */}
      <div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 mb-4 bg-white dark:bg-[#1e293b]! transition-colors flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white! flex items-center gap-2">
            <CiClock1 className="w-5 h-5 text-blue-500!" /> Eng so'nggi 5 ta buyurtma
          </h2>
          <span className="text-xs text-gray-400 dark:text-gray-400 font-medium">Real vaqt rejimi</span>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 bg-white dark:bg-[#1e293b]! border dark:border-gray-700 rounded-xl"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-white border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-[#1e293b]! transition-colors font-medium">
              Hech qanday buyurtma topilmadi.
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order.id || index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-[#1e293b]! p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all gap-4 text-gray-700 dark:text-gray-200!"
              >
                <div className="w-20 text-gray-400 font-bold dark:text-gray-400!">
                  #{order.id?.slice(0, 6) || index + 1}
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white!">{order.fullName || "Ism kiritilmagan"}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-400! mt-0.5">
                    {order.createAt ? new Date(order.createAt).toLocaleDateString("uz-UZ", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : "Sana yo'q"}
                  </p>
                </div>
                
                <div className="flex-1 text-sm text-gray-500 dark:text-gray-300 font-medium">
                  {order.orderItems?.length || 0} ta xizmat / usta
                </div>
                
                <div className="flex-1 font-black text-blue-600 dark:text-blue-400!">
                  {Number(order.totalPrice || 0).toLocaleString()} so'm
                </div>
                
                <div className="sm:text-right">
                  <span className="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400! px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-100 dark:border-amber-900/40">
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