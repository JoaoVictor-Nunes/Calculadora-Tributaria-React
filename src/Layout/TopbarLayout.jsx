import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Footer from "../Components/Footer";

const TopbarLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // altura total da tela
      }}
    >
      <Topbar />
      <div style={{ flex: 1 }}> {/* ocupa o espaço restante */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default TopbarLayout;
