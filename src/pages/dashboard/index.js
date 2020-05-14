import React from 'react';
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"

import Dash from "./list"

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Navbar/>
        <Dash />
      </div>
    </>
  );
}

export default Dashboard;
