import { FiMoon } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { FaRegSun } from "react-icons/fa";
import { useState } from "react";

const SideBar = () => {
  const { pathname } = useLocation();
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");
  const toogleDark = () => {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-70! border-r border-gray-300! dark:bg-gray-700 dark:border-black!">
      <div className="flex items-center justify-content-between px-3 py-4">
        <h1 className="text-sa dark:text-white!">Admin</h1>

        <button className="dark:text-black!" onClick={toogleDark}>
          {currentTheme === "dark" ? (
            <FaRegSun className="dark:text-black!" size={20} />
          ) : (
            <FiMoon size={20} />
          )}
        </button>
      </div>
      <div className="mt-3 px-2">
        <Link to="/admin/dashboard">
          <button
            className={`btn btn-outline-primary w-full mb-3 ${
              isActive("/admin/dashboard") ? "active" : ""
            }`}
          >
            Dashboard
          </button>
        </Link>

        <Link to="/admin/jobs">
          <button
            className={`btn btn-outline-primary w-full mb-3 ${
              isActive("/admin/categories") ? "active" : ""
            }`}
          >
            Jobs
          </button>
        </Link>

        <Link to="/admin/workers">
          <button
            className={`btn btn-outline-primary w-full mb-3 ${
              isActive("/admin/product") ? "active" : ""
            }`}
          >
            Workers
          </button>
        </Link>

        <Link to="/admin/orders">
          <button
            className={`btn btn-outline-primary w-full mb-3 ${
              isActive("/admin/orders") ? "active" : ""
            }`}
          >
            Orders
          </button>
        </Link>

        <Link to="/admin/users">
          <button
            className={`btn btn-outline-primary w-full mb-3 ${
              isActive("/admin/users") ? "active" : ""
            }`}
          >
            Users
          </button>
        </Link>

        <hr />
        <Link to="/">
          <button className="btn btn-primary w-full">Asosiy Sahifa</button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

