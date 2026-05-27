import Rodal from "rodal";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../types";
import JobsCard from "./JobsCard";
import "rodal/lib/rodal.css";

export type Job = {
  id: string;
  name: string;
  image: string;
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<null | string>(null);

  const getJobs = async () => {
    try {
      const response = await axios.get(`${API}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleSave = async () => {
    const jobObj = { name, image };

    try {
      if (editingId === null) {
        const response = await axios.post(`${API}/jobs`, jobObj);
        setJobs([...jobs, response.data]);
      } else {
        const response = await axios.put(`${API}/jobs/${editingId}`, jobObj);
        setJobs(jobs.map((j) => (j.id === editingId ? response.data : j)));
        setEditingId(null);
      }
      setModalVisible(false);
      setName("");
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setModalVisible(true);
    setName(job.name);
    setImage(job.image);
  };

  return (
    <div>
      {/* Header */}
      <div className="border border-gray-200 dark:border-gray-700 h-20 rounded-xl shadow-sm flex items-center justify-between p-6 bg-white dark:bg-slate-800! mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white!">
          Ishlar
        </h1>
        <button
          onClick={() => {
            setModalVisible(true);
            setEditingId(null);
            setName("");
            setImage("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Add Job
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700! shadow-sm bg-white! dark:bg-slate-800!">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">
                  No
                </th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">
                  Image
                </th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">
                  Name
                </th>
                <th className="p-4 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {jobs.map((job, index) => (
                <JobsCard
                  key={job.id}
                  index={index + 1}
                  name={job.name}
                  image={job.image}
                  editCategory={() => handleEdit(job)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Rodal
        customStyles={{
          height: "max-content",
          borderRadius: "16px",
          padding: "24px",
          backgroundColor: document.documentElement.classList.contains("dark")
            ? "#1e293b"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#ffffff"
            : "#1f2937",
        }}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animation="slideUp"
      >
        <div className="mt-2">
          <h2 className="text-lg font-bold mb-5 dark:text-white">
            {editingId ? "Ishni tahrirlash" : "Yangi ish qo'shish"}
          </h2>
          <div className="flex flex-col gap-4">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none block px-4 py-3 transition-all placeholder:text-gray-400"
              placeholder="Rasm URL"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none block px-4 py-3 transition-all placeholder:text-gray-400"
              placeholder="Ish nomi"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition-all active:scale-95 shadow-md shadow-blue-500/20 mt-2"
            >
              Saqlash
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default Jobs;
