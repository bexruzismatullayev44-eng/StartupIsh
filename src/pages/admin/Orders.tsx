import axios from "axios";
import { useState, useEffect } from "react";
import { API, Order } from "../../types";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getOrders = async () => {
    try {
      const { data } = await axios.get<Order[]>(`${API}/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDelete = async (id: number | string) => {

    try {
      await axios.delete(`${API}/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
      toast.success("Buyurtma o'chirildi!");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-gray-500 dark:text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 mb-6 dark:bg-slate-800! transition-colors">
        <h1 className="text-xl font-bold text-gray-800! dark:text-white!">Buyurtmalar</h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700! shadow-sm bg-white dark:bg-slate-800!">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">No</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Mijoz nomi</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Mahsulot soni</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Jami narxi</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Holati</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">O'chirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 dark:text-gray-400">
                    Hech qanday buyurtma topilmadi.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 text-gray-400 dark:text-gray-500 font-medium">{index + 1}</td>
                    <td className="p-4 text-gray-900 dark:text-white font-semibold">{order.fullName}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{order.orderItems.length} ta</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{Number(order.totalPrice).toLocaleString()}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{order.status}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      <button 
                        onClick={() => handleDelete(order.id)} 
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;