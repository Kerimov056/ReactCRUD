import React from "react";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <div style={{ backgroundColor: "bisque" ,fontSize:"20px" ,padding:"10px" }}>Header</div>
      <Outlet />
      <div style={{ backgroundColor: "bisque" ,fontSize:"20px" ,padding:"10px" }}>Footer</div>
    </div>
  );
}
