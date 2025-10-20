import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Footer from "../Components/Footer";

const TopbarLayout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default TopbarLayout;
