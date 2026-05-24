import Rodal from "rodal";
import "rodal/lib/rodal.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { API, Product, Category } from "../../types";
import ProductCard from "./WorkersCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<null | number>(null);

  const getProducts = async () => {
    try {
      const [resProd, resCat] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/categories`),
      ]);
      setProducts(resProd.data);
      setCategories(resCat.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSave = async () => {
    const imagesArray = [img1, img2, img3, img4].filter(url => url.trim() !== "");
    const productObj = {
      title,
      price: Number(price),
      images: imagesArray,
      categoryId: Number(categoryId), // API formatiga qarab category: {id} yoki categoryId
    };

    try {
      if (editingId === null) {
        const response = await axios.post(`${API}/products`, productObj);
        setProducts([...products, response.data]);
      } else {
        const response = await axios.put(`${API}/products/${editingId}`, productObj);
        setProducts(products.map((p) => (p.id === editingId ? response.data : p)));
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryName = (product: Product): string => {
    if (product.category?.name) return product.category.name;
    const found = categories.find((c) => c.id === product.category?.id);
    return found ? found.name : "Noma'lum";
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setTitle("");
    setPrice("");
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setCategoryId("");
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("O'chirishni tasdiqlaysizmi?")) {
      try {
        await axios.delete(`${API}/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setModalVisible(true);
    setTitle(product.title);
    setPrice(product.price);
    setImg1(product.images[0] || "");
    setImg2(product.images[1] || "");
    setImg3(product.images[2] || "");
    setImg4(product.images[3] || "");
    setCategoryId(product.category.id.toString());
  };

  return (
    <div className="p-6 min-h-screentransition-colors">
      {/* Header Bolimi */}
      <div className="border dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white!">Products</h1>
        <button
          onClick={() => {
            closeModal();
            setModalVisible(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg! transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Jadval Bolimi */}
      <div className="mt-6 overflow-hidden border dark:border-gray-700 rounded-xl shadow-md">
        <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">No</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Image</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Name</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Price</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Category</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index + 1}
                title={product.title}
                price={product.price}
                image={product.images[0]}
                categoryName={getCategoryName(product)}
                deleteProduct={() => handleDelete(product.id)}
                editProduct={() => handleEdit(product)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Bolimi */}
      <Rodal
        customStyles={{ 
          height: "max-content", 
          width: "450px", 
          borderRadius: "12px",
          backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000'
        }}
        visible={modalVisible}
        onClose={closeModal}
      >
        <div className="p-2 flex flex-col gap-3 dark:text-white">
          <h2 className="text-xl font-bold mb-2 border-b pb-2 dark:border-gray-700">
            {editingId ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            {[setImg1, setImg2, setImg3, setImg4].map((setImg, i) => (
              <input
                key={i}
                value={[img1, img2, img3, img4][i]}
                onChange={(e) => setImg(e.target.value)}
                type="text"
                className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Rasm ${i+1} URL`}
              />
            ))}
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mahsulot nomi"
          />
          
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full border dark:border-gray-600 bg-transparent p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Narxi ($)"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border dark:border-gray-600 bg-white dark:bg-slate-800! p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Kategoriya tanlang</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 mt-4 rounded-lg font-bold shadow-lg transition-transform active:scale-95"
          >
            Saqlash
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default Products;