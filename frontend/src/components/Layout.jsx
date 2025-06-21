import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-background text-primary">
      <Outlet />
    </div>
  );
};

export default Layout;
