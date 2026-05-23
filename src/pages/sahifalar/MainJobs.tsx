import Header from "../../components/Home.tsx/Header";
import Footer from "../../components/Home.tsx/Footer";
import { API } from "../../types";
import { Worker } from "../../types";
import { useEffect, useState } from "react";

import axios from "axios";


const MainCategory = () => {
  const [Workers, setWorkers] = useState<Worker[]>([]);

  const getWorker = async () => {
    try {
      const { data } = await axios.get<Worker[]>(`${API}/Workers`);
      setWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorker();
  }, []);
  return (
    <div className="dark:bg-gray-700">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div><br /><br />
    <div className="max-w-350! mx-auto px-4 py-10">
      
      <h2 className="text-2xl font-serif text-gray-800 mb-8">Kategoriyalar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Workers.map((item) => (
          <div
            key={item.id}
            className="group relative h-75! overflow-hidden rounded-xl cursor-pointer"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linier-to-t! from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-lg font-bold tracking-wide">{item.title}</h3>
              <p className="text-[12px] opacity-80 mt-1 font-medium">
                {item.jobs.name} | {item.price} so'm
              </p>
            </div>
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 rounded-xl m-2" />
          </div>
        ))}
      </div>
      <br />
    </div>
    <Footer />
    </div>
  );
};

export default MainCategory;
