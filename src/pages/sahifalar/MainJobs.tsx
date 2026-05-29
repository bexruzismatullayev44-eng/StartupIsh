import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Home.tsx/Header";
import Footer from "../../components/Home.tsx/Footer";
import { API } from "../../types";
import type { Jobs } from "../../types";

const MainJobs = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Jobs[]>(`${API}/jobs`);
      setJobs(data || []);
    } catch (error) {
      console.error("Kategoriyalarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white! mb-8 tracking-tight">
          Kategoriyalar
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-gray-200 dark:bg-gray-800 h-64 rounded-2xl"
              ></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((item) => {
              const jobImage = item.image
                ? item.image
                : "https://via.placeholder.com/400x300?text=Kategoriya+Rasmi";

              return (
                <div
                  key={item.id}
                  className="group relative h-64 overflow-hidden rounded-2xl! cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={jobImage}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-liniere-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h3 className="text-xl font-bold tracking-wide group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs opacity-75 mt-1 font-medium">
                      Yo'nalish bo'yicha ko'rish
                    </p>
                  </div>

                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 rounded-2xl m-3" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 italic">
              Hozircha hech qanday kategoriya qo'shilmagan...
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainJobs;
