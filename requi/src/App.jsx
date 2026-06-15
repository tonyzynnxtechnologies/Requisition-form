import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Departments from "./pages/admin/Departments";
import Clubs from "./pages/admin/Clubs";
import AllRequisitions from "./pages/admin/AllRequisitions";
import Settings from "./pages/admin/Settings";

import StaffDashboard from "./pages/staff/StaffDashboard";
import CreateRequisition from "./pages/staff/CreateRequisition";
import MyRequisitions from "./pages/staff/MyRequisitions";
import UserProfile from "./pages/staff/UserProfile";

import HodDashboard from "./pages/hod/HodDashboard";
import HodRequisitions from "./pages/hod/HoDRequisition";
import HodStaff from "./pages/hod/HoDStaff";
import HodProfile from "./pages/hod/HodProfile";
import EdDashboard from "./pages/ed/EdDashboard";
import EdRequisitions from "./pages/ed/EdRequisitions";
import EdUsers from "./pages/ed/EdUsers";
import EdDepartments from "./pages/ed/EdDepartments";
import EdClubs from "./pages/ed/EdClubs";
import EdProfile from "./pages/ed/EdProfile";

import RequisitionDetail from "./pages/shared/RequisitionDetail";

import { logout, getCurrentUser } from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || "Dashboard"
  );
  const [selectedRequisitionId, setSelectedRequisitionId] = useState(null);

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
    setActivePage("Dashboard");
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("activePage");
      setCurrentUser(null);
      setActivePage("Dashboard");
      setSelectedRequisitionId(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavigate = (page, id = null) => {
    if (page === "Logout") {
      handleLogout();
      return;
    }
    setActivePage(page);
    localStorage.setItem("activePage", page);
    setSelectedRequisitionId(id);
  };

  const handleViewRequisition = (id) => {
    setSelectedRequisitionId(id);
    setActivePage("RequisitionDetail");
    localStorage.setItem("activePage", "RequisitionDetail");
  };

  // Loading Screen
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "#6b7280",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f5f6fa",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px", border: "3px solid #e5e7eb",
            borderTop: "3px solid #16a34a", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading...
        </div>
      </div>
    );
  }

  // Login Screen
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Shared page: Requisition Detail (all roles)
  if (activePage === "RequisitionDetail" && selectedRequisitionId) {
    return (
      <RequisitionDetail
        requisitionId={selectedRequisitionId}
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    );
  }

  // ─── Admin Pages ────────────────────────────────────────────────────────
  if (currentUser.role === "admin") {
    switch (activePage) {
      case "Users":
        return <Users currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Departments":
        return <Departments currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Clubs":
        return <Clubs currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "AllRequisitions":
        return <AllRequisitions currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
      case "Settings":
        return <Settings currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Dashboard":
      default:
        return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} activePage={activePage} onViewRequisition={handleViewRequisition} />;
    }
  }

  // ─── Staff Pages ────────────────────────────────────────────────────────
  if (currentUser.role === "staff") {
    switch (activePage) {
      case "CreateRequisition":
        return <CreateRequisition currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} editId={selectedRequisitionId} />;
      case "MyRequisitions":
        return <MyRequisitions currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
      case "UserProfile":
      case "User_Profile":
        return <UserProfile currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Dashboard":
      default:
        return <StaffDashboard currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
    }
  }

  // ─── HOD Pages ──────────────────────────────────────────────────────────
  if (currentUser.role === "hod") {
    switch (activePage) {
      case "HodRequisitions":
      case "HOD_Requisitions":
        return <HodRequisitions currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
      case "HodStaff":
      case "HOD_Staff":
        return <HodStaff currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "HodProfile":
      case "HOD_Profile":
        return <HodProfile currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Dashboard":
      default:
        return <HodDashboard currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
    }
  }

  // ─── ED Pages ───────────────────────────────────────────────────────────
  if (currentUser.role === "ed") {
    switch (activePage) {
      case "EdRequisitions":
      case "Ed_Requisitions":
        return <EdRequisitions currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
      case "EdUsers":
      case "Ed_Users":
        return <EdUsers currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "EdDepartments":
      case "Ed_Departments":
        return <EdDepartments currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "EdClubs":
      case "Ed_Clubs":
        return <EdClubs currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "EdProfile":
      case "Ed_Profile":
        return <EdProfile currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "Dashboard":
      default:
        return <EdDashboard currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} onViewRequisition={handleViewRequisition} />;
    }
  }

  return <div>Invalid Role</div>;
}

export default App;
