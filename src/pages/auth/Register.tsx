import { useState } from "react";
import axios from "axios";
import { Role, API } from "../../types";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Register() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    const userObj = {
      fullName,
      age: parseInt(age),
      email,
      password,
      role: Role.USER,
    };
    try {
      await axios.post(API + "/users", userObj);
      navigate("/login"); // Ro'yxatdan keyin login sahifasiga
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen dark:bg-gray-700">
      <div className="max-h-screen text-center p-10 bg-white dark:bg-gray-700! text-black dark:text-white! justify-between! align-items-center!">
        <h3 className="text-2xl font-bold mb-2">Ro'yxatdan o'tish</h3>
        <span className="text-gray-600 dark:text-gray-300! mb-6 block">
          Yangi hisob yarating
        </span>
        <div className="w-full max-w-md mx-auto space-y-4">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="form-control mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            type="text"
            placeholder="Ism familiya..."
          />
          <input
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="form-control mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            type="text"
            placeholder="Yosh..."
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
            type="email"
            placeholder="Email..."
          />
          <div className="flex items-center relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
              type={visible ? "text" : "password"}
              placeholder="Parol..."
            />
            {visible ? (
              <FaRegEyeSlash
                size={20}
                onClick={() => setVisible(false)}
                className="absolute right-2 top-[60%] -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300!"
              />
            ) : (
              <FaRegEye
                size={20}
                onClick={() => setVisible(true)}
                className="absolute right-2 top-[60%] -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300!"
              />
            )}
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="btn mt-4 py-2 rounded-md bg-gray-900 dark:bg-gray-700! text-white dark:text-white! hover:bg-black dark:hover:bg-gray-600! transition-all"
        >
          Ro'yxatdan o'tish
        </button>

        <p className="mt-4 text-gray-700 dark:text-gray-300!">
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="text-blue-500 dark:text-blue-400! underline"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
