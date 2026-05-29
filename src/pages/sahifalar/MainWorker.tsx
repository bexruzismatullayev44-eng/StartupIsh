import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import Header from "../../components/Home.tsx/Header";
import Footer from "../../components/Home.tsx/Footer";
import { useCartContext } from "../../Providers/CartProvider";
import { API } from "../../types";
import type { Worker, Jobs } from "../../types";

const MainWorker = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [price, setPrice] = useState<number>(20000);
  const maxPriceLimit = 20000;
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCartContext();

  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState<string | Jobs>(
    location.state?.selectedJob || "Barchasi",
  );

  useEffect(() => {
    if (location.state?.selectedJob) {
      setActiveCategory(location.state.selectedJob);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let workersResponse;
        try {
          workersResponse = await axios.get(`${API}/workers`);
        } catch {
          workersResponse = await axios.get(`${API}/worker`);
        }
        const jobsResponse = await axios.get(`${API}/jobs`);

        setWorkers(workersResponse.data || []);
        setJobs(jobsResponse.data || []);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredWorkers = workers.filter((worker) => {
    let isCategoryMatch = activeCategory === "Barchasi";
    if (!isCategoryMatch && typeof activeCategory !== "string") {
      const workerJobId = String(worker.jobId || worker.jobs?.id || "");
      const selectedJobId = String(activeCategory.id);
      isCategoryMatch = workerJobId === selectedJobId;
    }

    const isSearchMatch = (worker.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isPriceMatch = (Number(worker.price) || 0) <= price;

    return isCategoryMatch && isSearchMatch && isPriceMatch;
  });

  const formatPrice = (n: number) => n?.toLocaleString() + " so'm";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 transition-colors duration-200">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white! mb-8 tracking-tight">
          Mavjud Mutaxassislar
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-gray-800! p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit space-y-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">
                Qidirish
              </p>
              <div className="relative border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <CiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Kasb yoki kalit so'z..."
                  className="w-full pl-6 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">
                Kategoriyalar
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setActiveCategory("Barchasi")}
                  className={`text-left px-4 py-2 rounded-xl! text-sm font-medium transition-all ${
                    activeCategory === "Barchasi"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Barchasi
                </button>
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setActiveCategory(job)}
                    className={`text-left px-4 py-2 rounded-xl! text-sm font-medium transition-all ${
                      typeof activeCategory !== "string" &&
                      activeCategory.id === job.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {job.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2">
                Maksimal narx
              </p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
                {formatPrice(price)} gacha
              </p>
              <input
                type="range"
                min="0"
                max={maxPriceLimit}
                step="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                <span>0 so'm</span>
                <span>20 mln so'm</span>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="animate-pulse bg-white dark:bg-gray-800! border border-gray-100 dark:border-gray-700 h-95 rounded-2xl"
                  ></div>
                ))}
              </div>
            ) : filteredWorkers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker) => {
                  const workerImage =
                    worker.images && worker.images.length > 0
                      ? worker.images[0]
                      : "https://via.placeholder.com/300x400?text=Rasm+Mavjud+Emas";

                  return (
                    <div
                      key={worker.id}
                      className="group bg-white dark:bg-gray-800! rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700!">
                          <img
                            src={workerImage}
                            alt={worker.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <button className="absolute top-3 right-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-2 rounded-full! text-gray-500 hover:text-red-500 transition-all active:scale-90 shadow-sm">
                            <CiHeart className="w-5 h-5" />
                          </button>
                          <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                            {worker.city || "O'zbekiston"}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] text-blue-600 dark:text-blue-400! font-bold uppercase tracking-wider">
                              {worker.jobs?.name || "Kategoriya"}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                              Tajriba: {worker.experience}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100! line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                            {worker.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                            {worker.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700/50 mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-medium">
                            Xizmat narxi
                          </span>
                          <span className="text-base font-bold text-gray-950 dark:text-gray-100 tracking-tight">
                            {formatPrice(Number(worker.price) || 0)}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(worker)}
                          className="bg-gray-900 dark:bg-gray-700 text-white p-2.5 rounded-full! hover:bg-blue-600 dark:hover:bg-blue-600 transition-all active:scale-95 shadow-sm"
                        >
                          <CiShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-gray-800! rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full! flex items-center justify-center mb-4">
                  <CiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white! mb-1">
                  Hech qanday mutaxassis topilmadi
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                  Kechirasiz, siz tanlagan filtrlar yoki qidiruv matniga mos
                  keladigan ishchi topilmadi.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("Barchasi");
                    setPrice(maxPriceLimit);
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl!"
                >
                  Filtrlarni tozalash
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
