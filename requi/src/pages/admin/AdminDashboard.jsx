import React, { useState, useEffect } from 'react';
import {
  getDashboardStats,
  getRequisitions
} from "../../services/api";
import Users from "./Users";





const AdminDashboard = ({
  currentUser,
  onLogout,
  onNavigate = () => { },
  activePage = "Dashboard",
  onViewDetail = () => { }
}) => {
  const [stats, setStats] = useState({
    totalSubmitted: 0,
    pendingApproval: 0,
    approvedCount: 0,
    rejectedCount: 0,
    approvalRate: '0%',
    avgProcessingTime: '2.4d'
  });
  const [recentRequisitions, setRecentRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
        const reqs = await getRequisitions();

        setRecentRequisitions(reqs.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (activePage === "Users") {
      return (
        <Users
          currentUser={currentUser}
          onNavigate={onNavigate}
        />
      );
    }

    return (
      <>
        {/* KEEP YOUR EXISTING DASHBOARD CONTENT HERE */}
      </>
    );
  };

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0, marginLeft: '250px' }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#6b7280', cursor: 'pointer', fontSize: '20px' }} onClick={() => onNavigate('Settings')}>⚙️</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white' }}>
              {currentUser?.name?.charAt(0) || "A"}
            </div>
          </div>
        </div>

        {/* {Sidebar} */}
        <div
          style={{
            width: "240px",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "#111827",
            color: "white",
            overflowY: "auto",
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "24px 20px",
              borderBottom: "1px solid #1f2937",
            }}
          >
            <h2 style={{ margin: 0 }}>Naipunnya</h2>
            <p
              style={{
                color: "#16a34a",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              ADMIN PORTAL
            </p>
          </div>

          {/* Menu */}
          <div style={{ flex: 1, paddingTop: "20px" }}>
            <div
              style={{
                padding: "12px 20px",
                backgroundColor: "#1f2937",
                borderLeft: "3px solid #16a34a",
                cursor: "pointer",
              }}
            >
              ⊞ Dashboard
            </div>

            <div onClick={() => onNavigate("Users")}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              👥 Users
            </div>

            <div onClick={() => onNavigate("Departments")}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              🏢 Departments
            </div>

            <div
              style={{
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              ♣ Clubs
            </div>

            <div
              style={{
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              📊 Reports
            </div>

            <div
              style={{
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              ⚙ Settings
            </div>
          </div>

          {/* Logout */}
          <div
            onClick={onLogout}
            style={{
              padding: "20px",
              borderTop: "1px solid #1f2937",
              color: "#ef4444",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🚪 Logout
          </div>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            marginLeft: "240px",
            padding: "30px",
            minHeight: "100vh",
            width: "calc(100% - 240px)",
          }}
        >
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap', }}>
            <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL REQUISITIONS</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{stats.total_requisitions}</div>
                <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '4px' }}>📈</span>Live</div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>PENDING REVIEW</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>{stats.pending_hod + stats.pending_ed}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Requires Action</div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVED REQS</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>{stats.approved}</div>
                <div style={{ color: '#16a34a', fontSize: '18px' }}>✅</div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>REJECTED REQS</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{stats.rejected}</div>
                <div style={{ color: '#ef4444', fontSize: '18px' }}>❌</div>
              </div>
            </div>
          </div>

          {/* Two Columns */}
          <div style={{ display: 'flex', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
            {/* Left: Requisition list for action */}
            <div style={{ flex: 2, minWidth: '350px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>Pending Requisition Registry</div>
                <button
                  onClick={() => onNavigate('Management_Registry')}
                  style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  View Registry →
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                {recentRequisitions.length === 0 ? (
                  <div style={{ padding: '40px 24px', textAlign: 'center', color: '#6b7280' }}>
                    No recent requisitions found.
                  </div>
                ) : (
                  recentRequisitions.map((req) => (
                    <div
                      key={req.id}
                      style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid #f3f4f6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => onViewDetail(req.id)}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: req.status === 'APPROVED' ? '#dcfce7' : req.status === 'PENDING' ? '#ffedd5' : '#fee2e2',
                          color: req.status === 'APPROVED' ? '#16a34a' : req.status === 'PENDING' ? '#ea580c' : '#ef4444',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
                          {req.status === 'APPROVED' ? '✓' : req.status === 'PENDING' ? '⏱' : '✕'}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>
                            {req.description} ({req.id})
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                            Initiator: {req.initiator} ({req.deptOrClub}) · {req.date}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: req.status === 'APPROVED' ? '#dcfce7' : req.status === 'PENDING' ? '#ffedd5' : '#fee2e2',
                          color: req.status === 'APPROVED' ? '#16a34a' : req.status === 'PENDING' ? '#ea580c' : '#ef4444'
                        }}>
                          {req.status}
                        </span>
                        <span style={{ color: '#9ca3af', fontSize: '16px' }}>👁️</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                <button
                  onClick={() => onNavigate('Management_Registry')}
                  style={{ background: 'none', border: 'none', color: '#111827', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                >
                  View Full Registry List
                </button>
              </div>
            </div>

            {/* Right: Requisition Status Donut Chart */}
            <div style={{ flex: 1, minWidth: '250px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '32px' }}>Requisition Status</div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', flex: 1, alignItems: 'center' }}>
                <div style={{
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: 'conic-gradient(#16a34a 0% 65%, #ff9800 65% 85%, #ef4444 85% 95%, #d1d5db 95% 100%)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  position: 'relative',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{stats.totalSubmitted}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>TOTAL</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#16a34a', borderRadius: '2px', marginRight: '8px' }}></div>
                  <span style={{ color: '#4b5563' }}>Approved (65%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#ff9800', borderRadius: '2px', marginRight: '8px' }}></div>
                  <span style={{ color: '#4b5563' }}>Pending (20%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px', marginRight: '8px' }}></div>
                  <span style={{ color: '#4b5563' }}>Rejected (10%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#d1d5db', borderRadius: '2px', marginRight: '8px' }}></div>
                  <span style={{ color: '#4b5563' }}>Other (5%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', color: '#9ca3af', fontSize: '12px' }}>
          © 2026 Naipunnya Digital Requisition System · v2.4.0
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
