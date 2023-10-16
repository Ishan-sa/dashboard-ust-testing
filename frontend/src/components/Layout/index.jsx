import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="main-app-container">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
