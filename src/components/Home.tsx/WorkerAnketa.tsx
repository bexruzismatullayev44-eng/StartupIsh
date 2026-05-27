import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../types";
import type { Jobs } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CITIES = [
  "Buxoro",
  "Toshkent",
  "Samarqand",
  "Navoiy",
  "Qarshi",
  "Qashqadaryo",
  "Surxandaryo",
  "Jizzax",
  "Andijon",
  "Qoraqalpog'iston",
  "Farg'ona",
  "Namangan",
];

interface ImagePreview {
  file: File;
  previewUrl: string;
}

export default function WorkerAnketa() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Buxoro");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const { data } = await axios.get(`${API}/jobs`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Ish turlarini yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    getJobs();
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error("Maksimal 5 ta rasm yuklash mumkin!");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].previewUrl);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Sarlavha kiriting!");
    if (!selectedJob) return toast.error("Ish turini tanlang!");
    if (!price) return toast.error("Ish haqini kiriting!");
    if (!experience.trim()) return toast.error("Tajribangizni kiriting!");
    if (!description.trim()) return toast.error("O'zingiz haqida yozing!");

    const userId = localStorage.getItem("token");
    const targetJob = jobs.find((j: any) => {
      const jobId = String(j.id || j._id || "");
      return jobId === String(selectedJob);
    });

    if (!targetJob) {
      console.log("Mavjud jobs:", jobs);
      console.log("Tanlangan ID:", selectedJob);
      return toast.error("Tanlangan ish turi tizimda topilmadi!");
    }

    const formData = new FormData();
    formData.append("userId", userId || "");
    formData.append("title", title);
    formData.append("jobId", selectedJob);
    formData.append("jobs", JSON.stringify(targetJob));
    formData.append("price", String(parseInt(price) || 0));
    formData.append("experience", experience);
    formData.append("description", description);
    formData.append("city", city);

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      setLoading(true);
      await axios.post(`${API}/workers`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Anketa muvaffaqiyatli saqlandi!");
      navigate("/");
    } catch (error: any) {
      console.error("Xatolik:", error);
      try {
        console.log("FormData rad etildi. JSON formatida qayta urinish...");
        const fallbackObj = {
          userId: userId || "",
          title,
          jobId: selectedJob,
          jobs: targetJob,
          price: parseInt(price) || 0,
          experience,
          description,
          city,
          images: [], 
        };
        await axios.post(`${API}/workers`, fallbackObj);
        toast.success("Anketa saqlandi (Rasmlarsiz)!");
        navigate("/");
      } catch (fallbackError) {
        toast.error("Server ma'lumotni qabul qilmadi (500)");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ishchi Anketa</h3>
          <span className="text-gray-500 dark:text-gray-300 text-sm mt-1 block">Ma'lumotlaringizni to'liq kiriting</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Ismingizni kiriting</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="nozim kozimov"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Ish turi</label>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400"
            >
              <option value="">— Ish turini tanlang —</option>
              {jobs.map((job: any) => {
                const currentId = job.id || job._id;
                return (
                  <option key={currentId} value={currentId}>
                    {job.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Shahar</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Ish haqi (so'm)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Masalan: 3000000"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Tajriba</label>
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              type="text"
              placeholder="Masalan: 2 yil"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">O'zingiz haqida</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tajriba, ko'nikmalar, qo'shimcha ma'lumotlar..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Rasmlar <span className="text-gray-400 dark:text-gray-500 font-normal">(max 5 ta)</span>
            </label>

            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">Rasm yuklash uchun bosing</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">PNG, JPG, WEBP</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>

            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img.previewUrl} alt={`rasm-${i + 1}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full flex items-center justify-center shadow transition-all">×</button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all">
                    <span className="text-2xl text-gray-400">+</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-2.5 rounded-md bg-blue-800 dark:bg-gray-600 text-white font-semibold hover:bg-blue-900 dark:hover:bg-gray-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? "Saqlanmoqda..." : "Anketani saqlash"}
        </button>
      </div>
    </div>
  );
}