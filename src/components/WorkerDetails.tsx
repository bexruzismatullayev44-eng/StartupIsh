import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API, Worker } from "../types";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const WorkerDetailed = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoursOrDays, setHoursOrDays] = useState(1);

  useEffect(() => {
    const fetchSingleWorker = async () => {
      try {
        setLoading(true);
  
        const { data } = await axios.get(`${API}/workers/${id}`);
        setWorker(data);

        if (data && data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.warn(
          "Kichik harfda xato, zaxira sifatida katta harfda sinab ko'ramiz...",
        );
        try {
          const { data } = await axios.get(`${API}/Workers/${id}`);
          setWorker(data);
          if (data && data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }
        } catch (secondError) {
          console.error("Ishchini yuklashda xatolik:", secondError);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleWorker();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-xl font-medium text-gray-600 dark:text-gray-300">
        Mutaxassis ma'lumotlari yuklanmoqda...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 gap-4">
        <div className="text-xl font-medium text-red-500">
          Bunday mutaxassis topilmadi!
        </div>
        <div className="text-sm text-gray-400">ID: {id}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-150">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <div className="flex flex-col md:flex-row gap-12">

          <div className="w-full md:w-1/2">
            <div className="w-full aspect-4/5 overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={worker.title || "Worker"}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="text-gray-400 font-medium">
                  Rasm mavjud emas
                </div>
              )}
            </div>


            {worker.images && worker.images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {worker.images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-orange-500 ring-2 ring-orange-100 dark:ring-orange-500/30"
                        : "border-gray-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col pt-4">
            <span className="text-[12px] text-gray-400 dark:text-orange-400 uppercase font-bold tracking-[2px]">
              {worker.jobs?.name || "Kategoriya / Mutaxassislik"}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {worker.title || "Sarlavha kiritilmagan"}
            </h1>

            <p className="text-gray-500 dark:text-gray-300 mt-4 leading-relaxed max-w-md">
              {worker.description ||
                "O'z ishining ustasi bo'lgan ushbu mutaxassis belgilangan muddat ichida vazifalarni yuqori sifat va professional darajada bajarib beradi."}
            </p>

            <div className="flex gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800 pb-4">
              {worker.city && (
                <div>
                  <span className="text-gray-400">Shahar:</span>{" "}
                  <strong className="text-gray-700 dark:text-gray-200">
                    {worker.city}
                  </strong>
                </div>
              )}
              {worker.experience && (
                <div>
                  <span className="text-gray-400">Tajriba:</span>{" "}
                  <strong className="text-gray-700 dark:text-gray-200">
                    {worker.experience} yil
                  </strong>
                </div>
              )}
            </div>

            <div className="mt-6">
              <span className="text-xs text-gray-400 block uppercase font-bold">
                Xizmat narxi (boshlang'ich):
              </span>
              <span className="text-3xl font-bold text-gray-900 dark:text-orange-400 mt-1 block">
                {worker.price ? worker.price.toLocaleString() : 0} so'm
              </span>
            </div>

            <div className="mt-8">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Buyurtma muddati (kun yoki soat hisobida)
              </label>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-full px-4 py-2 gap-4">
                  <button
                    onClick={() =>
                      setHoursOrDays((prev) => Math.max(1, prev - 1))
                    }
                    className="text-xl font-medium hover:text-orange-500 dark:text-gray-300 transition-colors px-2"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-6 text-center text-gray-900 dark:text-white">
                    {hoursOrDays}
                  </span>
                  <button
                    onClick={() => setHoursOrDays((prev) => prev + 1)}
                    className="text-xl font-medium hover:text-orange-500 dark:text-gray-300 transition-colors px-2"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Umumiy: {((worker.price || 0) * hoursOrDays).toLocaleString()}{" "}
                  so'm
                </span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button className="flex-1 bg-gray-900 dark:bg-orange-500 hover:bg-black dark:hover:bg-orange-600 text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-lg dark:shadow-orange-500/10">
                <CiShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Ishchini band qilish</span>
              </button>

              <button className="w-14 h-14 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center text-2xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all active:scale-90">
                <CiHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailed;
