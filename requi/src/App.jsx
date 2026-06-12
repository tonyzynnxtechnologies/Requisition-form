import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Departments from "./pages/admin/Departments";

import StaffDashboard from "./pages/staff/StaffDashboard";

import {
  logout,
  getCurrentUser,
} from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || "Dashboard"
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getCurrentUser();


        if (data.user) {
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("activePage");

      setCurrentUser(null);
      setActivePage("Dashboard");
    } catch (error) {
      console.error("Logout Error:", error);
    }

  };

  const handleNavigate = (page) => {
    if (page === "Logout") {
      handleLogout();
      return;
    }


    setActivePage(page);
    localStorage.setItem("activePage", page);


  };

  // Loading Screen
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading... </div>
    );
  }

  // Login Screen
  if (!currentUser) {
    return (<Login
      onLoginSuccess={handleLoginSuccess}
    />
    );
  }

  // Admin Pages
  if (currentUser.role === "admin") {
    switch (activePage) {
      case "Users":
        return (
          <Users
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );

      case "Departments":
        return (
          <Departments
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );

      case "Dashboard":
      default:
        return (
          <AdminDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            activePage={activePage}
          />
        );
    }
  }

  // Staff Dashboard
  if (currentUser.role === "staff") {
    return (<StaffDashboard
      currentUser={currentUser}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
    );
  }

  // HOD Dashboard
  if (currentUser.role === "hod") {
    return (
      <div style={{ padding: "30px" }}> <h1>HOD Dashboard</h1>

        ```
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );

  }

  // ED Dashboard
  if (currentUser.role === "ed") {
    return (
      <div style={{ padding: "30px" }}> <h1>ED Dashboard</h1>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );

  }

  return <div>Invalid Role</div>;
}

export default App;
