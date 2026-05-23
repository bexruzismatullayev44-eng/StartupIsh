import { FaRegMoon } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../types";
import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../../types";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaRegSun } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurentUser] = useState<User | null>(null);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");

  const getCurrentUser = async () => {
    try {
      const userId = localStorage.getItem("token");
      if (!userId) {
        setCurentUser(null);
        return;
      }
      const { data } = await axios.get<User>(`${API}/users/${userId}`);
      setCurentUser(data);
    } catch (error) {
      console.log(error);
      setCurentUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toogleDark = () => {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="w-full h-181.25 bg-[url('/images/OrqaFon.png')] bg-black/60 bg-blend-multiply ">
      <div className="h-16.25! w-full fixed top-0 z-10 bg-white dark:bg-gray-700!">
        <div className="h-16.25! w-350! flex justify-content-between  m-auto">
          <div className="w-205! h-16.25! flex align-items-center  justify-between ">
            <div className="flex flex-col leading-none select-none">
              <span className="text-[10px] font-bold tracking-[3px] text-gray-900 uppercase">
                Find a
              </span>
              <span className="text-[22px] font-bold tracking-wide text-sky-400">
                WORKER
              </span>
              <div className="h-[2px] w-full bg-sky-400 opacity-40 rounded-full mt-0.5" />
            </div>
            <ul className="flex gap-4 list-none">
              <NavLink
                to="/MainPage"
                className={({ isActive }) =>
                  `px-2 py-1 no-underline! text-gray-800! hover:text-blue-400! transition-color! ${
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500 dark:text-white!"
                      : "text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-gray-700 dark:text-white!"
                  }`
                }
              >
                Boshsahifa
              </NavLink>
              <NavLink
                to="/MainProduct"
                className={({ isActive }) =>
                  `px-2 py-1 no-underline! text-gray-800! hover:text-gray-800! transition-color! ${
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500 dark:text-white!"
                      : "text-gray-800 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-800 dark:text-white!"
                  }`
                }
              >
                Mahsulotlar
              </NavLink>
              <NavLink
                to="/MainCategory"
                className={({ isActive }) =>
                  `px-2 py-1 no-underline! text-gray-800! hover:text-gray-800! transition-color!${
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500 dark:text-white!"
                      : "text-gray-800 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-800 dark:text-white!"
                  }`
                }
              >
                Kategoriyalar
              </NavLink>
            </ul>
          </div>
          <div className="my-auto flex gap-7.5">
            {/* <button>
              <FaRegMoon />
            </button> */}
            <button
              onClick={toogleDark}
              className="p-2 rounded-full hover:bg-blue-100 transition text-gray-700 dark:text-white!"
            >
              {currentTheme === "dark" ? (
                <FaRegSun size={20} />
              ) : (
                <FaRegMoon size={20} />
              )}
            </button>
            <button className="dark:text-white!">
              <CiHeart size={25} />
            </button>
            <Link
              to={`/cart`}
              className="no-underline! text-gray-800! hover:text-gray-800! transition-color! "
            >
              <button className="no-underline! my-2 text-gray-800! hover:text-gray-800! transition-color! dark:text-white!">
                <CiShoppingCart size={25} />
              </button>
            </Link>
            {currentUser && currentUser.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="no-underline text-inherit dark:text-white!"
              >
                <FaShieldAlt size={20} />
              </button>
            )}
            {currentUser ? (
              <button
                onClick={handleLogOut}
                className="no-underline text-inherit dark:text-white!"
              >
                <IoIosLogOut size={22} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="no-underline text-inherit"
              >
                <CiUser />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full h-screen flex flex-colpx-8 md:px-20 bg-cover bg-center bg-no-repeat">
        <div className="my-80 max-w-3xl ">
          <h1 className=" font-serif text-white font-bold leading-tight mb-6 tracking-wide">
            Zamonaviy uslub, <br /> sifatli tanlov
          </h1>
          <p className="text-lg md:text-xl text-white font-medium mb-10">
            Vaqtlaringizni tejagan holda ishchi buyurma qilish
          </p>
          <button className="bg-[#00b7ffe3] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full! flex items-center justify-center gap-2 transition-all w-max shadow-md">
            Ishchi tanlash <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>

  );
};

export default Header;






