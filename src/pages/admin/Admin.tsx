import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

const Admin = () => {
  return (
    <div className="flex h-screen dark:bg-gray-700 dark:border-black">
            <SideBar/>
        <div className="p-4 w-full">
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin

