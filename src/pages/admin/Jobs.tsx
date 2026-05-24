import Rodal from "rodal";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../types";
import CategoryCard from "./JobsCard";
import "rodal/lib/rodal.css";

export type Category = {
  id: string;
  name: string;
  image: string;
};

const Categoryies = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<null | string>(null);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSave = async () => {
    const categoryObj = { name, image };

    try {
      if (editingId === null) {
        const response = await axios.post(`${API}/categories`, categoryObj);
        setCategories([...categories, response.data]);
      } else {
        const response = await axios.put(
          `${API}/categories/${editingId}`,
          categoryObj
        );
        setCategories(
          categories.map((c) => (c.id === editingId ? response.data : c))
        );
        setEditingId(null);
      }
      setModalVisible(false);
      setName("");
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setModalVisible(true);
    setName(category.name);
    setImage(category.image);
  };

  return (
    <div >
      {/* Header qismi */}
      <div className="border border-gray-200 dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-white dark:bg-slate-800! mb-6">
        <h1 className="text-xl font-bold text-gray-800  dark:text-white!">Kategoriyalar</h1>
        <button
          onClick={() => {
            setModalVisible(true);
            setEditingId(null);
            setName("");
            setImage("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Add Category
        </button>
      </div>

      {/* Jadval qismi */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700! shadow-sm bg-white! dark:bg-slate-800!">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">No</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Image</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Name</th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  index={index + 1}
                  name={category.name}
                  image={category.image}
                  editCategory={() => handleEdit(category)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal qismi */}
      <Rodal
        customStyles={{
          height: "max-content",
          borderRadius: "16px",
          padding: "24px",
          backgroundColor: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
          color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#1f2937",
        }}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animation="slideUp"
      >
        <div className="mt-2">
          <h2 className="text-lg font-bold mb-5 dark:text-white">
            {editingId ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo'shish"}
          </h2>
          <div className="flex flex-col gap-4">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none block px-4 py-3 transition-all placeholder:text-gray-400"
              placeholder="Category image url"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none block px-4 py-3 transition-all placeholder:text-gray-400"
              placeholder="Category name"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition-all active:scale-95 shadow-md shadow-blue-500/20 mt-2"
            >
              Save
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default Categoryies;