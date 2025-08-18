import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header"
import Sidebar from "../sections/SideBarSection"

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy auth states, replace with your own auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedImages, setSavedImages] = useState([]);

  const navigate = useNavigate();

  const handleSignIn = () => {
    setSidebarOpen(false);
    navigate("/login"); // Navigate to login page
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSidebarOpen(false);
    // You might also want to clear savedImages on logout
    setSavedImages([]);
  };

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAuthenticated={isAuthenticated}
        savedImages={savedImages}
        onSignIn={handleSignIn}
        onLogout={handleLogout}
      />
      
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
