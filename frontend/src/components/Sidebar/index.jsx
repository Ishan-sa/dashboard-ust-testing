import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="bg-header-blue w-full flex flex-col main-sidebar-container">
        <NavLink to="/schedule">
          <div className="child-sidebar-container">
            <p className="text-white">Schedule</p>
          </div>
        </NavLink>

        <NavLink to="/tmo-dallas">
          <div className="child-sidebar-container">
            <p className="text-white">TMO Dallas RTWP Main</p>
          </div>
        </NavLink>

        <NavLink to="/po-lookups">
          <div className="child-sidebar-container">
            <p className="text-white">PO Lookups</p>
          </div>
        </NavLink>

        <NavLink to="capex-report">
          <div className="child-sidebar-container">
            <p className="text-white">CAPEX Report</p>
          </div>
        </NavLink>

        <p className="text-white font-bold pt-6">RTWP Reports</p>

        <NavLink to="rtwp-analysis">
          <div className="child-sidebar-container">
            <p className="text-white">RTWP Analysis</p>
          </div>
        </NavLink>

        <NavLink to="rtwp-report">
          <div className="child-sidebar-container">
            <p className="text-white">RTWP Report</p>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
