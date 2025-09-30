import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar";

const TopbarLayout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};
export default TopbarLayout;
