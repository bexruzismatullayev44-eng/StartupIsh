import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API, Worker } from "../types";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const WorkerDetailed = () => {
  const { id } = useParams();
  const [Worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchSingleWorker = async () => {
      try {
        const { data } = await axios.get(`${API}/Workers/${id}`);
        setWorker(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error("Mahsulotni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleWorker();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-medium text-gray-600">
        Yuklanmoqda...
      </div>
    );
  if (!Worker)
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Mahsulot topilmadi!
      </div>
    );

  return (
    <div className="w-screen h-screen dark:bg-gray-700">
      <div className="max-w-7xl mx-auto p-4 md:p-10 text-black dark:bg-gray-700!">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-4/5! overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-600! border border-gray-100 dark:border-gray-500!">
              <img
                src={selectedImage}
                alt={Worker.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {Worker.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all
              ${selectedImage === img ? "border-orange-500 ring-2 ring-orange-100 dark:ring-orange-500!" : "border-gray-200 opacity-70 hover:opacity-100 dark:border-gray-500!"}`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col pt-4">
            <span className="text-[12px] text-gray-400 dark:text-white! uppercase font-bold tracking-[2px]">
              {Worker.jobs?.name || "Kategoriya"}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white! mt-2">
              {Worker.title}
            </h1>

            <p className="text-gray-400 mt-4 leading-relaxed max-w-md dark:text-white!">
              Yuqori sifatli va zamonaviy uslubda ishlangan ushbu mahsulot
              kundalik hayotingizda qulaylik va nafosat bag'ishlaydi.
            </p>

            <div className="mt-8">
              <span className="text-3xl font-bold text-gray-900 dark:text-white!">
                {Worker.price.toLocaleString()} so'm
              </span>
            </div>

            <div className="mt-8">
              <label className="text-xs font-bold text-gray-400 dark:text-white! uppercase tracking-wider">
                Miqdor
              </label>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center border border-gray-200 dark:border-gray-500! rounded-full px-4 py-2 gap-4">
                  <button className="text-xl font-medium hover:text-orange-500 transition-colors">
                    -
                  </button>
                  <span className="text-lg font-semibold w-4 text-center">
                    1
                  </span>
                  <button className="text-xl font-medium hover:text-orange-500 transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button className="flex-1 bg-[#222] dark:bg-gray-900! hover:bg-black dark:hover:bg-black! text-white py-4 px-8 rounded-full! flex items-center justify-center gap-3 transition-all shadow-xl shadow-gray-200 dark:shadow-gray-800! active:scale-95 group">
                <CiShoppingCart className="text-2xl group-hover:scale-110 transition-transform rounded" />
                <span className="font-semibold rounded">Savatga qo'shish</span>
              </button>

              <button className="w-14 h-14 border border-gray-200 dark:border-gray-500! rounded-full! flex items-center justify-center text-2xl hover:bg-red-50 dark:hover:bg-red-600! hover:text-red-500 dark:hover:text-red-300! transition-all active:scale-90">
                <CiHeart />
              </button>
            </div>

            <div className="mt-12 space-y-4 border-t border-gray-100 dark:border-gray-500! pt-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 dark:text-white!">
                  Yetkazib berish
                </span>
                <span className="text-gray-900 font-semibold italic dark:text-white!">
                  1-3 ish kuni ichida
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 dark:text-white!">Kafolat</span>
                <span className="text-gray-900 font-semibold italic dark:text-white!">
                  30 kunlik qaytarish
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 dark:text-white!">
                  To'lov turi
                </span>
                <span className="text-gray-900 font-semibold italic dark:text-white!">
                  Naqd yoki karta orqali
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailed;
