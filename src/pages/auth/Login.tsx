// import { useState } from "react";
// import axios from "axios";
// import { API } from "../../types";
// import { useNavigate, Link } from "react-router-dom";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import toast from "react-hot-toast";

// export default function Login() {
//   const [visible, setVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

  

//   const handleLogin = async () => {
//     try {
//       const { data } = await axios.get(`${API}/users?email=${email}`);
//       if (data.length === 0) {
//         toast.error("Email xato");
//         return;
//       }

//       if (data[0].password === password) {
//         localStorage.setItem("token", data[0].id);
//         localStorage.setItem("role", data[0].role);

//         navigate(data[0].role === "admin" ? "/admin" : "/");
//       } else {
//         toast.error("Parol yoki email xato");
//         return;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Loginda xatolik yuz berdi");
//     }
//   };

//   return (
//     <div className="h-screen dark:bg-gray-700">
//       <div className="max-h-screen text-center p-10 bg-white dark:bg-gray-700! text-black dark:text-white!">
//         <Link to="/">
//           <button>Ortga qaytish</button>
//         </Link>
//         <h3 className="text-2xl font-bold mb-2">Kirish</h3>
//         <span className="text-gray-600 dark:text-gray-300! mb-6 block">
//           Hisobingizga kiring
//         </span>

//         <div className="w-full max-w-md mx-auto space-y-4">
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="form-control mt-3 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
//             type="email"
//             placeholder="Email..."
//           />
//           <div className="flex items-center relative">
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="form-control mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
//               type={visible ? "text" : "password"}
//               placeholder="Parol..."
//             />
//             {visible ? (
//               <FaRegEyeSlash
//                 size={20}
//                 onClick={() => setVisible(false)}
//                 className="absolute right-2 top-[60%] -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300!"
//               />
//             ) : (
//               <FaRegEye
//                 size={20}
//                 onClick={() => setVisible(true)}
//                 className="absolute right-2 top-[60%] -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300!"
//               />
//             )}
//           </div>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="btn mt-4 py-2 rounded-md bg-gray-900 dark:bg-gray-700! text-white dark:text-white! hover:bg-black dark:hover:bg-gray-600! transition-all"
//         >
//           Kirish
//         </button>

//         <p className="mt-4 text-gray-700 dark:text-gray-300!">
//           Hisobingiz yo'qmi?{" "}
//           <Link
//             to="/register"
//             className="text-blue-500 dark:text-blue-400! underline"
//           >
//             Ro'yxatdan o'tish
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


















import { useState } from "react";
import axios from "axios";
import { API } from "../../types";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.get(`${API}/users?email=${email}`);

      if (data.length === 0) {
        toast.error("Email xato");
        return;
      }

      const foundUser = data[0];

      if (foundUser.password !== password) {
        toast.error("Parol yoki email xato");
        return;
      }

      localStorage.setItem("token", foundUser.id);
      localStorage.setItem("role", foundUser.role);

      // Rolga qarab yo'naltirish
      if (foundUser.role === "admin") {
        navigate("/admin");

      } else if (foundUser.role === "worker") {
        const { data: workerData } = await axios.get(
          `${API}/workers?userId=${foundUser.id}`
        );

        if (workerData.length === 0) {
          navigate("/worker/anketa"); // birinchi marta
        } else {
          navigate("/worker/orders"); // anketa bor
        }

      } else {
        navigate("/"); // oddiy user
      }

    } catch (error) {
      console.log(error);
      toast.error("Loginda xatolik yuz berdi");
    }
  };

  return (
    <div className="h-screen dark:bg-gray-700">
      <div className="max-h-screen text-center p-10 bg-white dark:bg-gray-700! text-black dark:text-white!">
        <Link to="/">
          <button>Ortga qaytish</button>
        </Link>
        <h3 className="text-2xl font-bold mb-2">Kirish</h3>
        <span className="text-gray-600 dark:text-gray-300! mb-6 block">
          Hisobingizga kiring
        </span>

        <div className="w-full max-w-md mx-auto space-y-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control mt-3 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600! bg-gray-100 dark:bg-gray-700! text-black dark:text-white! outline-none focus:border-blue-400"
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
          onClick={handleLogin}
          className="btn mt-4 py-2 rounded-md bg-gray-900 dark:bg-gray-700! text-white dark:text-white! hover:bg-black dark:hover:bg-gray-600! transition-all"
        >
          Kirish
        </button>

        <p className="mt-4 text-gray-700 dark:text-gray-300!">
          Hisobingiz yo'qmi?{" "}
          <Link
            to="/register"
            className="text-blue-500 dark:text-blue-400! underline"
          >
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
}