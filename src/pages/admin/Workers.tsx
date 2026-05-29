import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../types";
import type { Worker } from "../../types";

const Workers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div className="p-6 min-h-screen transition-colors ">
      <div className="border dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white!">
          Ishchilar ro'yxati ({workers.length})
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-gray-500 animate-pulse dark:text-gray-400">
            Ma'lumotlar yuklanmoqda...
          </div>
        </div>
      ) : workers.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Hozircha hech qanday ishchi topilmadi.
        </div>
      ) : (
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
                  className="hover:bg-gray-50 dark:border-gray-700! dark:bg-[#1e293b]!  dark:hover:bg-[#334155]! transition-colors"
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
                      className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-4 py-1.5 rounded-lg! text-sm font-medium transition-all shadow-sm"
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