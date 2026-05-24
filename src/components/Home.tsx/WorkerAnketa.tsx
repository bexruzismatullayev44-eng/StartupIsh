import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../types";
import type { Jobs, Worker } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function WorkerAnketa() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const { data } = await axios.get(`${API}/jobs`);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Sarlavha kiriting!");
      return;
    }
    if (!selectedJob) {
      toast.error("Ish turini tanlang!");
      return;
    }
    if (!price) {
      toast.error("Ish haqini kiriting!");
      return;
    }
    if (!experience.trim()) {
      toast.error("Tajribangizni kiriting!");
      return;
    }
    if (!description.trim()) {
      toast.error("O'zingiz haqida yozing!");
      return;
    }

    const userId = localStorage.getItem("token");

    const workerObj: Omit<Worker, "id"> = {
      userId: userId!,
      title,
      jobId: selectedJob,
      jobs: jobs.find((j) => j.id === Number(selectedJob))!,
      price: parseInt(price),
      experience,
      description,
      images: [],
    };

    try {
      await axios.post(`${API}/workers`, workerObj);
      toast.success("Anketa muvaffaqiyatli saqlandi!");
      navigate("/worker/orders");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800! rounded-2xl shadow-lg p-10">

        {/* Sarlavha */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white!">
            Ishchi Anketa
          </h3>
          <span className="text-gray-500 dark:text-gray-300! text-sm mt-1 block">
            Ma'lumotlaringizni to'liq kiriting
          </span>
        </div>

        <div className="space-y-4">

          {/* Sarlavha */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300! mb-1 block">
              Sarlavha
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Masalan: Professional dasturchi"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            />
          </div>

          {/* Ish turi */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300! mb-1 block">
              Ish turi
            </label>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            >
              <option value="">— Ish turini tanlang —</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ish haqi */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300! mb-1 block">
              Ish haqi (so'm)
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Masalan: 3000000"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            />
          </div>

          {/* Tajriba */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300! mb-1 block">
              Tajriba
            </label>
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              type="text"
              placeholder="Masalan: 2 yil"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            />
          </div>

          {/* O'zi haqida */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300! mb-1 block">
              O'zingiz haqida
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tajriba, ko'nikmalar, qo'shimcha ma'lumotlar..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400 resize-none"
            />
          </div>

        </div>

        {/* Tugma */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-2.5 rounded-md bg-gray-900 dark:bg-gray-600! text-white font-semibold hover:bg-black dark:hover:bg-gray-500! transition-all"
        >
          Anketani saqlash
        </button>

      </div>
    </div>
  );
}