import axios from "axios";
import { useState, useEffect } from "react";
import { Jobs } from "../../types";
import { Worker } from "../../types";
import { API } from "../../types";
import { Link } from "react-router-dom";

const jobs = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [Workers, setWorkers] = useState<Worker[]>([]);

  const getJobs = async () => {
    try {
      const { data } = await axios.get<Jobs[]>(`${API}/jobs`);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWorker = async () => {
    try {
      const { data } = await axios.get<Worker[]>(`${API}/Workers`);
      setWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
    getWorker();
  }, []);

  const calculateWorkerCount = (JobsId: number) => {
    return Workers.filter((p) => p.jobs?.id === JobsId).length;
  };

  return (
    <div className="p-5 max-w-300 mx-auto font-sans dark:bg-gray-700">
      <div className="flex justify-between items-end mb-5">
        <h2 className="m-0 text-2xl text-gray-800 font-semibold">
          Kategoriyalar
        </h2>
        <Link
          to="/MainJobs"
          className="relative z-50 hover:text-gray-800 no-underline! text-black hover!:text-gray-800! transition-color!"
        >
          Barchasi
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {jobs.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full pt-10 pb-5 px-5 bg-linier-to-t from-black/80 to-transparent text-white">
              <h3 className="m-0 mb-1 text-lg font-bold dark:text-black!">{item.name}</h3>
              <p className="m-0 text-[13px] text-gray-300 dark:text-black">
                {calculateWorkerCount(item.id)} mahsulot
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default jobs;
