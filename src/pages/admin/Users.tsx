import axios from "axios";
import { useState, useEffect } from "react";
import { API, User } from "../../types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(`${API}/users`);
      setUsers(data);
    } catch (err: any) {
      setError("Xatolik: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-gray-500 dark:text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        Yuklanmoqda...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg m-5">{error}</div>;
  }

  return (
    <div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 mb-6 dark:bg-slate-800! transition-colors">
        <h1 className="text-xl font-bold text-gray-800! dark:text-white!">Foydalanuvchilar</h1>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700! shadow-sm bg-white dark:bg-slate-800!">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-gray-500! dark:text-gray-400! font-semibold uppercase text-xs tracking-wider">No</th>
                <th className="p-4 text-gray-500! dark:text-gray-400! font-semibold uppercase text-xs tracking-wider">Ism-sharif</th>
                <th className="p-4 text-gray-500! dark:text-gray-400! font-semibold uppercase text-xs tracking-wider">Email</th>
                <th className="p-4 text-gray-500! dark:text-gray-400! font-semibold uppercase text-xs tracking-wider">Yosh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500 dark:text-gray-400">
                    Hech qanday foydalanuvchi topilmadi.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
                  >
                    <td className="p-4 text-gray-400 dark:text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white font-semibold">
                      {user.fullName}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        {user.age} yosh
                      </span>
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

export default Users;