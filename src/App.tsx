// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
// import Admin from "./pages/admin/Admin";
// import Categories from "./pages/admin/Categories";
// import Dashboard from "./pages/admin/Dashboard";
// import Orders from "./pages/admin/Orders";
// import Users from "./pages/admin/Users";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import ProductDetailed from "./components/ProductDetailed"
// import MainPage from "./pages/sahifalar/MainPage";
// import MainProducts from "./pages/sahifalar/MainProduct";
// import MainCategory from "./pages/sahifalar/MainCategory";

// function App() {
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

//   return (
//       <div>
//       <>
//         <Toaster />
//       </>
// <Routes>
//   <Route path="/" element={<MainPage />} />
//   <Route path="/MainPage" element={<MainPage />} />
//   <Route path="/MainProduct" element={<MainProducts />} />
//   <Route path="/MainCategory" element={<MainCategory />} />
//   <Route path="/product/:id" element={<ProductDetailed/>}/>

//   {/* Auth routes */}
//   <Route path="/register" element={<Register />} />
//   <Route path="/login" element={<Login />} />

//   {/* Admin routes */}
//   <Route path="/admin" element={<Admin />}>
//     <Route path="/admin/categories" element={<Categories />} />

//     <Route path="/admin/dashboard" element={<Dashboard />} />
//     <Route path="/admin/orders" element={<Orders />} />
//     <Route path="/admin/users" element={<Users />} />
//   </Route>
// </Routes>
//     </div>
//   );
// }

// export default App;










import * as reactRouterDom from "react-router-dom";
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

const App = () => (
  <div>
    <>
      <Toaster />
    </>
    <reactRouterDom.Routes>
      <reactRouterDom.Route path="/" element={<MainPage />} />
      <reactRouterDom.Route path="/MainPage" element={<MainPage />} />
      <reactRouterDom.Route path="/MainWorker" element={<MainWorker />} />
      <reactRouterDom.Route path="/MainJobs" element={<MainJobs />} />
      <reactRouterDom.Route path="/MainOrders" element={<MainOrders />} />
      <reactRouterDom.Route path="/worker/anketa" element={<WorkerAnketa />} />
      <reactRouterDom.Route path="/cart" element={<Cart/>} />

      <reactRouterDom.Route path="/register" element={<Register />} />
      <reactRouterDom.Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <reactRouterDom.Route path="/admin" element={<Admin />}>
        <reactRouterDom.Route path="/admin/jobs" element={<Jobs />} />
        <reactRouterDom.Route path="/admin/workers" element={<Workers />} />
        <reactRouterDom.Route path="/admin/dashboard" element={<Dashboard />} />
        <reactRouterDom.Route path="/admin/orders" element={<Orders />} />
        <reactRouterDom.Route path="/admin/users" element={<Users />} />
      </reactRouterDom.Route>
    </reactRouterDom.Routes>
  </div>
);

export default App;
