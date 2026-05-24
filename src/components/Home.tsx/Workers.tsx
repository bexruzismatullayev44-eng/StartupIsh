import { useEffect, useState } from "react";
import axios from "axios";
import { Worker } from "../../types";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { API } from "../../types";
import { Link } from "react-router-dom";
import { useCartContext } from "../../Providers/CartProvider";


const Workers = () => {
  const { addToCart } = useCartContext();
  const [Workers, setWorkers] = useState<Worker[]>([]);

  const getWorker = async () => {
    try {
      const { data } = await axios.get<Worker[]>(`${API}/workers`);
      setWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorker();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 dark:bg-gray-700!">
      <div className="flex justify-between items-end mb-5">
        <h2 className="m-0 text-2xl text-gray-800 font-semibold dark:text-white!">
          Mahsulotlar
        </h2>
        <Link
          to="/MainWorker"
          className="relative z-50 no-underline! text-gray-800! hover:text-gray-800! transition-color! dark:text-white!"
        >
          Barchasi
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Workers.slice(0, 8).map((item) => (
          <div key={item.id} className="group flex flex-col border rounded-2xl dark:border-0!">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full! flex items-center justify-center shadow-sm hover:text-red-500 transition-colors dark:bg-gray-800/80 dark:text-white!">
                <CiHeart />
              </button>
            </div>
            <div className="mt-3 flex flex-col flex-1">
              <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wide">
                {item.jobs.name}
              </span>
              <Link
                to={`/Worker/${item.id}`}
                className="no-underline! text-gray-800! hover:text-gray-800! transition-color!"
              >
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mt-1 dark:text-white!">
                  {item.title}
                </h3>
              </Link>

              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="text-[16px] font-bold text-gray-900 dark:text-white!">
                  {item.price} so'm
                </span>
                {/* <button onClick={()=>addToCart()} className="w-9 h-9 bg-[#222] text-white rounded-full! flex items-center justify-center hover:bg-orange-600 transition-all active:scale-95">
                  <CiShoppingCart />
                </button> */}
                <button
                  onClick={() => addToCart(item)}
                  className="w-9 h-9 bg-[#222] text-white rounded-full! flex items-center justify-center hover:bg-orange-600 transition-all active:scale-95"
                >
                  <CiShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workers;
