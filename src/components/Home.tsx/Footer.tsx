import { FaLongArrowAltRight } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="font-sans">
      <section className="bg-[#1a1a1a] text-white py-20 px-4 text-center dark:bg-gray-400!">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Maxsus takliflar kutmoqda!
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto dark:text-white!">
            Hoziroq ro'yxatdan o'tingva birinchi 3ta ishilar uchun 20% chegirmaga ega bo'ling.
        </p>
        <button className="bg-[#00b7ffe3] hover:bg-blue-800 rounded-4xl! text-white px-8 py-3 font-medium transition-all flex items-center gap-2 mx-auto">
          Hozir xarid qiling
          <FaLongArrowAltRight />
        </button>
      </section>
      <footer className="bg-[#fdfcf9] py-16 px-6 md:px-20 text-gray-700 dark:bg-gray-700!">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black dark:text-white!">UzShop</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-white!">
              Ishinchli ishchilar, qulay narxlar. O'zbekistonning eng yaxshi
              ishchilari.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-black dark:text-white!">Sahifalar</h4>
            <ul className="space-y-2 text-sm">
              <li className="no-underline! text-gray-800! hover:text-gray-800! transition-color!">
                <a href="#" className="no-underline! text-gray-800! hover:text-gray-800! transition-color! dark:text-white!">
                  Bosh sahifa
                </a>
              </li>
              <li className="no-underline! text-gray-800! hover:text-gray-800! transition-color!">
                <a href="#" className="no-underline! text-gray-800! hover:text-gray-800! transition-color! dark:text-white!">
                  ishchilar
                </a>
              </li>
              <li className="no-underline! text-gray-800! hover:text-gray-800! transition-color! dark:text-white!">
                <a href="#" className="no-underline! text-gray-800! hover:text-gray-800! transition-color! dark:text-white!">
                  Ishlar
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-black dark:text-white!">Yordam</h4>
            <ul className="space-y-2 text-sm">
              <li className="dark:text-white!">Yetkazib berish</li>
              <li className="dark:text-white!">Qaytarish</li>
              <li className="dark:text-white!">Bog'lanish</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-black dark:text-white!">Aloqa</h4>
            <ul className="space-y-2 text-sm m-auto">
              <li className="dark:text-white!">Bexruz@gmail.com</li>
              <li className="dark:text-white!">+998914068782</li>
              <li className="dark:text-white!">Bukhoro,O'zbekiston</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400 dark:text-white!">
          © 2026 UzShop. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
