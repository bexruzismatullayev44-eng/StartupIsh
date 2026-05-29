import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCartContext } from "../Providers/CartProvider";
import Header from "../components/Home.tsx/Header";
import Footer from "../components/Home.tsx/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { API, OrderStatus } from "../types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearAll,
    calculateTotalPrice,
  } = useCartContext();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token !== currentUserId) {
        setCurrentUserId(token);
      }
    };

    const tokenInterval = setInterval(checkToken, 500);
    return () => clearInterval(tokenInterval);
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) {
      toast.error("Savatni ko'rish uchun iltimos avval tizimga kiring!");
      navigate("/login");
    }
  }, [currentUserId, navigate]);

  const handleBuy = async () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      toast.error("Iltimos ma'lumotlaringizni to'liq kiriting");
      return;
    }

    if (cart.length <= 0) {
      toast.error("Savatingiz bo'sh. Iltimos mutaxassis qo'shing.");
      navigate("/MainWorker");
      return;
    }

    try {
      if (!currentUserId) {
        toast.error("Iltimos tizimga kiring yoki ro'yxatdan o'ting");
        return;
      }

      const orderObj = {
        fullName,
        phone,
        address,
        orderItems: cart,
        totalPrice: calculateTotalPrice(),
        status: OrderStatus.NEW,
        createAt: new Date().toISOString(),
        UserId: currentUserId,
      };

      const { data: myData } = await axios.post(`${API}/orders`, orderObj);
      console.log("Buyurtma muvaffaqiyatli yaratildi:", myData);

      clearAll();
      setFullName("");
      setPhone("");
      setAddress("");

      toast.success("Buyurtmangiz muvaffaqiyatli yuborildi!");
      navigate("/");
    } catch (error) {
      toast.error("Xatolik yuz berdi. Server bilan aloqani tekshiring.");
      console.error("Buyurtma yuborishda xato:", error);
    }
  };

  if (!currentUserId) return null;

  return (
    <div className="bg-[#f9f9f9] dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-200">
      <div className="[&>div:first-child]:h-auto [&>div:first-child]:bg-none [&>div:first-child]:min-h-0 [&>div>div:last-child]:hidden">
        <Header />
      </div>

      {!cart.length ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white!">
            Savatingiz bo'sh
          </h2>
          <p className="text-gray-500 mt-3 max-w-md dark:text-gray-400">
            Hozircha savatingizda mutaxassislar yo'q. Iltimos, o'zingizga ma'qul
            bo'lgan mutaxassislarni qo'shing.
          </p>
          <button
            onClick={() => navigate("/MainWorker")}
            className="mt-6 px-6 py-2.5 rounded-xl! bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            Mutaxassis xarid qilish
          </button>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 pb-2 pt-28 flex items-center justify-between">
            <h3 className="text-3xl font-black tracking-tight dark:text-white!">Savat</h3>
            <button
              onClick={clearAll}
              className="px-4 py-2 dark:bg-red-950/30! text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 rounded-xl! text-sm font-semibold border dark:border-red-900/30!"
            >
              Hammasini o'chirish
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 mt-6">
            <div className="w-full lg:w-[65%] space-y-4">
              {cart.map((item) => {
                const imgUrl =
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : "https://via.placeholder.com/150";

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-gray-800! p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={imgUrl}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-50 dark:border-gray-700!"
                        alt={item.title}
                      />
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 dark:text-white! line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400! mt-0.5">
                          {item.price?.toLocaleString()} so'm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-1 rounded-xl border border-gray-100 dark:border-gray-600">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-2 rounded-lg! bg-white dark:bg-gray-600! shadow-sm text-gray-500! dark:text-gray-300! hover:text-red-500"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="font-bold text-sm px-1 min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-2 rounded-lg! bg-white dark:bg-gray-600! shadow-sm text-gray-500! dark:text-gray-300! hover:text-blue-500"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-black text-base text-gray-900 dark:text-white text-right min-w-30">
                          {(item.price * item.quantity).toLocaleString()} so'm
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400! hover:bg-red-50 dark:hover:bg-red-950/30! rounded-xl! transition-all"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full lg:w-[35%] bg-white dark:bg-gray-800! p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60! ">
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Buyurtma xulosasi
                </p>
                <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400!">
                  Jami: {calculateTotalPrice().toLocaleString()} so'm
                </h4>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
                    F.I.SH (Ism va Familiya)
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Ismingizni kiriting"
                    className="w-full border border-gray-200 dark:border-gray-600 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
                    Telefon Raqam
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Masalan: +998901234567"
                    className="w-full border border-gray-200 dark:border-gray-600 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
                    Manzil
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Viloyat, tuman, ko'cha va uy raqami..."
                    className="w-full border border-gray-200 dark:border-gray-600 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 h-28 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleBuy}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl! font-bold text-base mt-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  Sotib olishni tasdiqlash
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <br />
      <Footer />
    </div>
  );
};

export default Cart;
