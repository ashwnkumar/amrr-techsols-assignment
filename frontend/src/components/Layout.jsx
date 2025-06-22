import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-background text-primary">
      <div className="w-screen h-full flex gap-0.5">
      
        <div className="w-[320px] h-screen hidden md:block border-r border-gray">
          <Sidebar />
        </div>

        <div className="w-full p-4 flex items-center justify-center overflow-y-auto bg-background transition-all duration-150">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
