import { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import Header from "../../components/Home.tsx/Header";
import Footer from "../../components/Home.tsx/Footer";
import { useCartContext } from "../../Providers/CartProvider";
import { API } from "../../types";

const MainWorker = () => {
  const [Worker, setWorker] = useState<any[]>([]);
  const [Jobs, setJobs] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<any>("Barchasi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [price, setPrice] = useState<number>(70000);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resWorker, resJobs] = await Promise.all([
          axios.get(`${API}/worker`),
          axios.get(`${API}/jobs`),
        ]);
        setWorker(resWorker.data);
        setJobs(resJobs.data);
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredWorker = Worker.filter((worker) => {
    let isCategoryMatch = activeCategory === "Barchasi";

    if (!isCategoryMatch) {
      const pCatName =
        worker.category?.name?.toString().toLowerCase().trim() || "";
      const pCatId = worker.category?.id || worker.categoryId;

      const activeName =
        activeCategory.name?.toString().toLowerCase().trim() ||
        activeCategory.toString().toLowerCase().trim();
      const activeId = activeCategory.id;

      isCategoryMatch = pCatName === activeName || pCatId === activeId;
    }

    const isSearchMatch = worker.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isPriceMatch = Number(worker.price) <= price;

    return isCategoryMatch && isSearchMatch && isPriceMatch;
  });

  const formatPrice = (n: number) => n?.toLocaleString() + " so'm";

  return (
    <div className="min-h-screen bg-white  font-sans text-gray-800 dark:text-gray-700 dark:bg-gray-700!">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-24 pb-20">
        <h1 className="text-3xl font-serif text-gray-900 dark:text-white mb-10 tracking-tight">
          Mahsulotlar
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 shrink-0 space-y-10">
            <div>
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest mb-3">
                Qidirish
              </p>
              <div className="relative border-b border-gray-200 dark:border-gray-600 pb-2 focus-within:border-blue-500 transition-all">
                <CiSearch className="absolute left-0 top-1 w-5 h-5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Mahsulot nomi..."
                  className="w-full pl-8 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest mb-4">
                Kategoriyalar
              </p>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveCategory("Barchasi")}
                  className={`text-left px-4 py-2.5 rounded-4xl! text-sm transition-all ${
                    activeCategory === "Barchasi"
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                      : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  Barchasi
                </button>
                {Jobs.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                      activeCategory?.id === cat.id ||
                      activeCategory === cat.name
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                        : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest mb-4">
                Narx: {formatPrice(price)} gacha
              </p>
              <input
                type="range"
                min="1000"
                max="70000"
                step="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="animate-pulse bg-gray-100 dark:bg-gray-600  h-80 rounded-3xl"
                  ></div>
                ))}
              </div>
            ) : filteredWorker.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWorker.map((worker) => (
                  <div key={worker.id} className="group cursor-pointer">
                    <div className="relative aspect-4/5 rounded-3xl! overflow-hidden bg-gray-50 dark:bg-gray-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <img
                        src={worker.images[0]}
                        alt={worker.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <button className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/80 backdrop-blur-md p-2.5 rounded-full! text-gray-400 hover:text-red-500 transition-all active:scale-90 shadow-sm z-10">
                        <CiHeart className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="px-1">
                      <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1.5 dark:text-white!">
                        {worker.category?.name}
                      </p>
                      <h3 className="text-base font-medium text-gray-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors dark:text-white!">
                        {worker.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-200 tracking-tight">
                          {formatPrice(worker.price)}
                        </span>
                        <button
                          onClick={() => addToCart(worker)}
                          className="bg-gray-900 text-white dark:text-white p-3 rounded-full! hover:bg-blue-600 transition-all active:scale-90 shadow-md dark:bg-gray-800/80"
                        >
                          <CiShoppingCart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 dark:bg-gray-600 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-500">
                <p className="text-gray-400 dark:text-gray-300 text-lg italic">
                  Bu narxda mahsulot topilmadi...
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("Barchasi");
                    setPrice(70000);
                    setSearchQuery("");
                  }}
                  className="mt-4 text-blue-500 font-bold hover:underline"
                >
                  Filtrni qayta o'rnatish
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainWorker;
