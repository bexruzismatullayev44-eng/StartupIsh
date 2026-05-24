
import axios from "axios";
import { useState, useEffect } from "react";
import { Category, Product, User, Order, API } from "../../types";
import { CiShoppingCart } from "react-icons/ci";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";


const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProduct] = useState<Product[]>([]);
  const [users, setUser] = useState<User[]>([]);
  const [orders, setOrder] = useState<Order[]>([]);
  

  const getOrder = async () => {
    try {
      const { data } = await axios.get(`${API}/orders`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get<Category[]>(`${API}/categories`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get<Product[]>(`${API}/products`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(`${API}/users`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
    getCategories();
    getProduct();
    getUsers();
  }, []);



  return (
    <div>
      <div className="p-5">
        <h1 className="text-xl font-semibold mb-5 dark:text-white!">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Mahsulotlar */}
          <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-white">Mahsulotlar</span>
              <span className="text-orange-500 text-xl">
                <FaBox color="blue" />
              </span>
            </div>
            <span className="text-2xl font-bold dark:text-white">{products.length}</span>
          </div>

          {/* Kategoriyalar */}
          <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-white">Kategoriyalar</span>
              <span className="text-orange-500 text-xl">
                <IoFolderOpenOutline color="blue" />
              </span>
            </div>
            <span className="text-2xl font-bold dark:text-white">{categories.length}</span>
          </div>

          {/* Buyurtmalar */}
          <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-white">Buyurtmalar</span>
              <span className="text-orange-500 text-xl">
                <CiShoppingCart color="blue" />
              </span>
            </div>
            <span className="text-2xl font-bold dark:text-white">{orders.length}</span>
          </div>

          {/* Foydalanuvchilar */}
          <div className="bg-white border rounded-lg p-4 shadow flex flex-col justify-between dark:bg-slate-800! transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-white">Foydalanuvchilar</span>
              <span className="text-orange-500 text-xl">
                <FiUsers color="blue" />
              </span>
            </div>
            <span className="text-2xl font-bold dark:text-white">{users.length}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="border rounded-lg shadow-sm p-4 mb-6 bg-white dark:text-white dark:bg-slate-800! transition-colors">
          <h1 className="text-xl font-semibold dark:text-white">
            So'nggi buyurtmalar
          </h1>
        </div>

        <div className="container mt-3 px-0">
          <div className="flex flex-col gap-3">
            {orders.length === 0 ? (
              <div className="p-10 text-center text-gray-500 bg-white border rounded-xl dark:bg-slate-800! dark:text-white! transition-colors">
                Hech qanday foydalanuvchi topilmadi.
              </div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-slate-800! dark:text-white"
                >
                  <div className="w-16 text-gray-400 font-medium dark:text-white">{index + 1}</div>
                  <div className="flex-1 text-center text-gray-600 dark:text-white">{order.fullName}</div>
                  <div className="flex-1 text-center text-gray-900 font-bold dark:text-white">{order.orderItems.length} ta</div>
                  <div className="flex-1 text-center text-gray-900 font-bold dark:text-white">{Number(order.totalPrice).toLocaleString()} so'm</div>
                  <div className="w-40 text-right">
                    <span className="bg-orange-50 text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium dark:bg-orange-900/20 dark:text-orange-400">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;