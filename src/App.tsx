// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { Toaster } from "react-hot-toast";
// import MainPage from "./pages/sahifalar/MainPage";
// import MainJobs from "./pages/sahifalar/MainJobs";
// import MainWorker from "./pages/sahifalar/MainWorker";
// import Admin from "./pages/admin/Admin";
// import Jobs from "./pages/admin/Jobs";
// import Workers from "./pages/admin/Workers";
// import Dashboard from "./pages/admin/Dashboard";
// import Orders from "./pages/admin/Orders";
// import Users from "./pages/admin/Users";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import WorkerAnketa from "./components/Home.tsx/WorkerAnketa";
// import Cart from "./Providers/Card";
// import MainOrders from "./pages/sahifalar/MainOrders";

//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (pathname.startsWith("/admin")) {
//       checkUser();
//     }
//   }, [pathname]);

//   const checkUser = async () => {
//     try {
//       const role = localStorage.getItem("role");
//       if (role !== "admin") {
//         toast.error("Siz bu sahifaga kirishga haqqingiz yo'q!");
//         navigate("/");
//         return;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Siz bu sahifaga kirishga haqqingiz yo'q!");
//       navigate("/");
//       return;
//     }
//   };

// const App = () => (
//   <div>
//     <>
//       <Toaster />
//     </>
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/MainPage" element={<MainPage />} />
//       <Route path="/MainWorker" element={<MainWorker />} />
//       <Route path="/MainJobs" element={<MainJobs />} />
//       <Route path="/MainOrders" element={<MainOrders />} />
//       <Route path="/worker/anketa" element={<WorkerAnketa />} />
//       <Route path="/cart" element={<Cart/>} />

//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />

//       {/* Admin routes */}
//       <Route path="/admin" element={<Admin />}>
//         <Route path="/admin/jobs" element={<Jobs />} />
//         <Route path="/admin/workers" element={<Workers />} />
//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/admin/orders" element={<Orders />} />
//         <Route path="/admin/users" element={<Users />} />
//       </Route>
//     </Routes>
//   </div>
// );

// export default App;


import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/sahifalar/MainPage";
import MainJobs from "./pages/sahifalar/MainJobs";
import MainWorker from "./pages/sahifalar/MainWorker";
import Admin from "./pages/admin/Admin";
import Jobs from "./pages/admin/Jobs";
import Workers from "./pages/admin/Workers";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import WorkerAnketa from "./components/Home.tsx/WorkerAnketa";
import Cart from "./Providers/Card";
import MainOrders from "./pages/sahifalar/MainOrders";
import WorkerDetails from "./components/WorkerDetails"; 

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      checkUser();
    }
  }, [pathname]);

  const checkUser = async () => {
    try {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        toast.error("Siz bu sahifaga kirishga haqqingiz yo'q!");
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Siz bu sahifaga kirishga haqqingiz yo'q!");
      navigate("/");
      return;
    }
  };

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Asosiy sahifalar */}
        <Route path="/" element={<MainPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/MainWorker" element={<MainWorker />} />
        <Route path="/MainJobs" element={<MainJobs />} />
        <Route path="/MainOrders" element={<MainOrders />} />
        <Route path="/worker/anketa" element={<WorkerAnketa />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/worker/:id" element={<WorkerDetails />} />

        {/* Autentifikatsiya */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin sahifalari */}
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/jobs" element={<Jobs />} />
          <Route path="/admin/workers" element={<Workers />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;