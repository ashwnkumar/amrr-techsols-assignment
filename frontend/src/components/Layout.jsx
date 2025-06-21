import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50   ">
        <Navbar />
      </div>
      <main className="w-full min-h-screen flex items-center justify-center ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
