
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../../components/Home.tsx/Header";
// import Footer from "../../components/Home.tsx/Footer";
// import { API, OrderStatus } from "../../types"; 
// import type { Order } from "../../types"; 
// import { CiClock1, CiCircleCheck, CiDeliveryTruck } from "react-icons/ci";
// import { FaTimesCircle } from "react-icons/fa";

// const MainOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMyOrders = async () => {
//       try {
//         setLoading(true);
//         const currentUserId = localStorage.getItem("token");
        
//         if (!currentUserId) {
//           setLoading(false);
//           return;
//         }

//         // 1. Serverdan barcha buyurtmalarni olamiz
//         const { data } = await axios.get<Order[]>(`${API}/orders`);
        
//         if (!data || !Array.isArray(data)) {
//           setOrders([]);
//           setLoading(false);
//           return;
//         }

//         // LOG TEKSHIRISH: Serverdan nima kelayotganini ko'rish uchun (Console'ni ochib ko'ring)
//         console.log("Serverdan kelgan barcha buyurtmalar:", data);
//         console.log("Sizning hozirgi ID (Token):", currentUserId);

//         // 2. FILTRLASH: Sizni (ishchini) ichidan qidirish
//         const myOrders = data.filter((order) => {
//           if (!order) return false;

//           // Mijoz sizni sotib olganini tekshirish (orderItems ichidan chuqur qidiruv)
//           const amIOrdered = order.orderItems?.some((item: any) => {
//             if (!item) return false;

//             // Obyekt ichidagi barcha qiymatlarni string qilib tekshiramiz (eng xavfsiz yo'l)
//             // Agar savat dagi element ichida sizning ID raqamingiz bo'lsa, demak bu sizning mijozingiz!
//             const itemString = JSON.stringify(item).toLowerCase();
//             const searchId = String(currentUserId).toLowerCase().trim();

//             return itemString.includes(searchId);
//           });

//           return amIOrdered;
//         });

//         console.log("Filtrlangan buyurtmalarim (Mijozlarim):", myOrders);
        
//         // Sanasiga ko'ra saralash
//         myOrders.sort((a, b) => {
//           const timeA = a.createAt ? new Date(a.createAt).getTime() : 0;
//           const timeB = b.createAt ? new Date(b.createAt).getTime() : 0;
//           return timeB - timeA;
//         });
        
//         setOrders(myOrders);
//       } catch (error) {
//         console.error("Buyurtmalarni yuklashda xatolik:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyOrders();
//   }, []);

//   const renderStatus = (status: OrderStatus) => {
//     switch (status) {
//       case OrderStatus.NEW: 
//         return (
//           <span className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-yellow-100 dark:border-yellow-900/50">
//             <CiClock1 className="w-4 h-4" /> Yangi
//           </span>
//         );
//       case OrderStatus.Progress: 
//         return (
//           <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
//             <CiDeliveryTruck className="w-4 h-4" /> Jarayonda
//           </span>
//         );
//       case OrderStatus.FINISHED: 
//         return (
//           <span className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-100 dark:border-green-900/50">
//             <CiCircleCheck className="w-4 h-4" /> Yakunlandi
//           </span>
//         );
//       case OrderStatus.CANCELED: 
//         return (
//           <span className="flex items-center gap-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100 dark:border-red-900/50">
//             <FaTimesCircle className="w-4 h-4" /> Bekor qilindi
//           </span>
//         );
//       default:
//         return (
//           <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold">
//             {status || "Yangi"}
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f9f9f9] dark:bg-gray-900 transition-colors duration-200 text-black dark:text-white">
//       <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
//         <Header />
//       </div>

//       <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
//         <h2 className="text-3xl font-bold tracking-tight mb-8">Mening Mijozlarim (Buyurtmalar)</h2>

//         {loading ? (
//           <div className="space-y-4">
//             {[1, 2].map((n) => (
//               <div key={n} className="animate-pulse bg-white dark:bg-gray-800 border h-44 rounded-2xl"></div>
//             ))}
//           </div>
//         ) : orders.length > 0 ? (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-sm overflow-hidden"
//               >
//                 <div className="bg-gray-50/70 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-4">
//                   <div>
//                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Buyurtma ID</p>
//                     <p className="text-sm font-bold text-gray-700 dark:text-gray-300">#{order.id}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sana</p>
//                     <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                       {order.createAt ? new Date(order.createAt).toLocaleDateString("uz-UZ", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }) : "Sana ko'rsatilmagan"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Holati</p>
//                     {renderStatus(order.status)}
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Umumiy Narx</p>
//                     <p className="text-lg font-black text-blue-600 dark:text-blue-400">
//                       {order.totalPrice?.toLocaleString()} so'm
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-6 divide-y divide-gray-100 dark:divide-gray-700/50">
//                   {order.orderItems?.map((item: any) => {
//                     const imgUrl = item.images && item.images.length > 0 
//                       ? item.images[0] 
//                       : "https://via.placeholder.com/150";
//                     return (
//                       <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={imgUrl}
//                             alt={item.title || "Mutaxassis"}
//                             className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-100 dark:border-gray-700"
//                           />
//                           <div>
//                             <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title || "Ism kiritilmagan"}</h4>
//                             <p className="text-xs text-gray-400 mt-0.5">
//                               Kategoriya: {item.jobs?.name || "Mutaxassis"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right shrink-0">
//                           <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
//                             {item.price?.toLocaleString()} so'm
//                           </p>
//                           <p className="text-xs text-gray-400 mt-0.5">Soni: {item.quantity || 1} ta</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* INFO (Sizni buyurtma qilgan mijoz ma'lumotlari) */}
//                 <div className="bg-gray-50/30 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-50 dark:border-gray-700/30 text-sm flex flex-col gap-1">
//                   <p className="text-blue-600 dark:text-blue-400 font-bold mb-1 border-b pb-1 border-gray-100 dark:border-gray-700">Mijoz Ma'lumotlari:</p>
//                   <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Ismi:</strong> {order.fullName || "Noma'lum"}</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Tel raqami:</strong> {order.phone || "Noma'lum"}</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Manzili:</strong> {order.address || "Noma'lum"}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
//             <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CiClock1 className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-bold mb-1">Sizda hali mijozlar yo'q</h3>
//             <p className="text-sm text-gray-400 max-w-sm mx-auto">
//               Mijozlar sizni savatga qo'shib, xaridni tasdiqlashganidan so'ng, ularning buyurtmalari shu yerda ko'rinadi.
//             </p>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MainOrders;
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Home.tsx/Header";
import Footer from "../../components/Home.tsx/Footer";
import { API, OrderStatus } from "../../types"; 
import type { Order } from "../../types"; 
import { CiClock1, CiCircleCheck, CiDeliveryTruck } from "react-icons/ci";
import { FaTimesCircle } from "react-icons/fa";

const MainOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const currentUserId = localStorage.getItem("token");
        
        if (!currentUserId) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get<Order[]>(`${API}/orders`);
        
        if (!data || !Array.isArray(data)) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const myFilteredOrders: Order[] = [];

        data.forEach((order) => {
          if (!order || !order.orderItems) return;

          // Faqat sizga tegishli bo'lgan worker obyektlarini aniq ID bo'yicha filtrlaymiz
          const myItems = order.orderItems.filter((item: any) => {
            // Savat elementining o'z IDsi emas, uning ichidagi haqiqiy Worker ID sini olish variantlari:
            // 1. item.workerId (agar DBda alohida saqlangan bo'lsa)
            // 2. item.worker?.id (agar usta obyekti ichma-ich kelgan bo'lsa)
            // 3. item.userId (agar usta IDsi userId deb nomlangan bo'lsa)
            // 4. item.id (agar savatga to'g'ridan-to'g'ri workerning o'zi id bilan push qilingan bo'lsa)
            
            const workerId = item.workerId || 
                             item.WorkerId || 
                             (item.worker && item.worker.id) || 
                             item.userId || 
                             item.id;

            return workerId && String(workerId).trim() === String(currentUserId).trim();
          });

          // Agar buyurtma ichida sizga tegishli ish bo'lsa, uni ro'yxatga olamiz
          if (myItems.length > 0) {
            // Faqat sizning ishlaringizning narxini hisoblaymiz
            const myTotalPrice = myItems.reduce((sum, item) => {
              const price = Number(item.price) || 0;
              const qty = Number(item.quantity) || 1;
              return sum + (price * qty);
            }, 0);

            myFilteredOrders.push({
              ...order,
              orderItems: myItems,     // Faqat sizning xizmatingiz qoladi (Begonalar o'chadi)
              totalPrice: myTotalPrice // Jami narx o'rniga faqat sizning haqingiz yoziladi
            });
          }
        });
        
        // Sanasiga ko'ra saralash
        myFilteredOrders.sort((a, b) => {
          const timeA = a.createAt ? new Date(a.createAt).getTime() : 0;
          const timeB = b.createAt ? new Date(b.createAt).getTime() : 0;
          return timeB - timeA;
        });
        
        setOrders(myFilteredOrders);
      } catch (error) {
        console.error("Buyurtmalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const renderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW: 
        return (
          <span className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-yellow-100 dark:border-yellow-900/50">
            <CiClock1 className="w-4 h-4" /> Yangi
          </span>
        );
      case OrderStatus.Progress: 
        return (
          <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
            <CiDeliveryTruck className="w-4 h-4" /> Jarayonda
          </span>
        );
      case OrderStatus.FINISHED: 
        return (
          <span className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-100 dark:border-green-900/50">
            <CiCircleCheck className="w-4 h-4" /> Yakunlandi
          </span>
        );
      case OrderStatus.CANCELED: 
        return (
          <span className="flex items-center gap-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100 dark:border-red-900/50">
            <FaTimesCircle className="w-4 h-4" /> Bekor qilindi
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold">
            {status || "Yangi"}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-gray-900 transition-colors duration-200 text-black dark:text-white">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Mening Ishlarim (Mijozlar)</h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-gray-800 border h-44 rounded-2xl"></div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Ustki qism */}
                <div className="bg-gray-50/70 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Buyurtma ID</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sana</p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {order.createAt ? new Date(order.createAt).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) : "Sana ko'rsatilmagan"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Holati</p>
                    {renderStatus(order.status)}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sizning Haqingiz</p>
                    <p className="text-lg font-black text-green-600 dark:text-green-400">
                      {order.totalPrice?.toLocaleString()} so'm
                    </p>
                  </div>
                </div>

                {/* Faqat sizning ishingiz ro'yxati */}
                <div className="p-6 divide-y divide-gray-100 dark:divide-gray-700/50">
                  {order.orderItems?.map((item: any) => {
                    const imgUrl = item.images && item.images.length > 0 
                      ? item.images[0] 
                      : "https://via.placeholder.com/150";
                    return (
                      <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={imgUrl}
                            alt={item.title || "Mutaxassis"}
                            className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-100 dark:border-gray-700"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Kategoriya: {item.jobs?.name || "Mutaxassis"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
                            {item.price?.toLocaleString()} so'm
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">Soni: {item.quantity || 1} ta</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mijoz haqida ma'lumot */}
                <div className="bg-gray-50/30 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-50 dark:border-gray-700/30 text-sm flex flex-col gap-1">
                  <p className="text-blue-600 dark:text-blue-400 font-bold mb-1 border-b pb-1 border-gray-100 dark:border-gray-700">Sizni yollagan mijoz ma'lumotlari:</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Ismi:</strong> {order.fullName || "Noma'lum"}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Tel raqami:</strong> {order.phone || "Noma'lum"}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Manzili:</strong> {order.address || "Noma'lum"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CiClock1 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Sizda hali buyurtmalar yo'q</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Mijozlar aynan sizni savatga qo'shib xarid qilishganda, ma'lumotlar bu yerda toza holatda chiqadi.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainOrders;