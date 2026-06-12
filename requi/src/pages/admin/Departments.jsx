import React, { useState, useEffect } from 'react';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../services/api";

const Departments = ({
  currentUser,
  onNavigate,
  onLogout
}) => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Form state for adding department
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [hod, setHod] = useState('');
  const [staffCount, setStaffCount] = useState(1);
  const [error, setError] = useState('');

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const data = await getDepartments();
      setDepartments(data);
      setFilteredDepts(data);
    } catch (err) {
      console.error('Error loading departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      setFilteredDepts(
        departments.filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.hod.toLowerCase().includes(q)
        )
      );
    } else {
      setFilteredDepts(departments);
    }
  }, [searchQuery, departments]);

  const handleEditDepartment = async (
    department
  ) => {
    await updateDepartment(
      department.id,
      {
        name: department.name,
        code: department.code,
        hod: department.hod
      }
    );

    loadDepartments();
  };

  const handleDeleteDepartment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    try {
      await deleteDepartment(id);
      await loadDepartments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete department");
    }
  };

  const handleAddDept = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !code) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await createDepartment({
        name,
        code,
        hod: hod || "— Not assigned"
      });

      setName('');
      setCode('');
      setHod('');
      setStaffCount(1);
      setShowAddModal(false);

      await loadDepartments();
    } catch (err) {
      setError('Failed to create department.');
    }
  };

  // Stats calculation
  const totalDepts = departments.length;
  const totalStaff = departments.reduce((acc, curr) => acc + curr.staffCount, 0);
  const deptsWithoutHod = departments.filter(d => !d.hod || d.hod.includes('Not assigned') || d.hod === '—').length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f5f6fa"
      }}
    >
      {/* Shared Sidebar */}
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

        <div style={{ paddingTop: "20px" }}>
          <div
            onClick={() => onNavigate("Dashboard")}
            style={{
              padding: "12px 20px",
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
              backgroundColor: "#1f2937",
              borderLeft: "3px solid #16a34a",
              cursor: "pointer",
            }}
          >
            🏢 Departments
          </div>

          <div onClick={() => onNavigate("Clubs")}
            style={{
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            ♣ Clubs
          </div>

          <div onClick={() => onNavigate("Reports")}
            style={{
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            📊 Reports
          </div>

          <div onClick={() => onNavigate("Settings")}
            style={{
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            ⚙ Settings
          </div>
        </div>

        <div
          onClick={() => onNavigate("Logout")}
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

      {/* Main Content */}
      <div
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          padding: "32px 40px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Administrator</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>
              👤
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Departments</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage departments that can submit requisitions</p>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> Add Department
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL DEPARTMENTS</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
                {totalDepts < 10 ? `0${totalDepts}` : totalDepts}
              </div>
            </div>
            <div style={{ fontSize: '24px', color: '#16a34a' }}>🏢</div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL STAFF</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{totalStaff}</div>
            </div>
            <div style={{ fontSize: '24px', color: '#4b5563' }}>👤</div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>DEPARTMENTS WITHOUT HOD</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: deptsWithoutHod > 0 ? '#ef4444' : '#111827' }}>
                {deptsWithoutHod < 10 ? `0${deptsWithoutHod}` : deptsWithoutHod}
              </div>
            </div>
            <div style={{ fontSize: '24px', color: deptsWithoutHod > 0 ? '#ef4444' : '#16a34a' }}>{deptsWithoutHod > 0 ? '⚠️' : '✓'}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search departments by name, code or HOD..."
              style={{ width: '100%', padding: '12px 16px 12px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '15%' }}>CODE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '35%' }}>DEPARTMENT NAME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '25%' }}>HOD ASSIGNED</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '25%' }}>STAFF COUNT</th>
                  <th
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #e5e7eb"
                    }}
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center' }}>Loading departments...</td>
                  </tr>
                ) : filteredDepts.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No departments found.</td>
                  </tr>
                ) : (
                  filteredDepts.map((dept) => {
                    const isUnassigned = !dept.hod || dept.hod.includes('Not assigned');
                    return (
                      <tr key={dept.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: isUnassigned ? '#fef2f2' : 'transparent' }}>
                        <td style={{ padding: '20px 24px', fontWeight: '600', color: '#4b5563' }}>{dept.code}</td>
                        <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>{dept.name}</td>
                        <td style={{ padding: '20px 24px', color: isUnassigned ? '#ef4444' : '#374151', fontWeight: isUnassigned ? '500' : 'normal' }}>
                          <span style={{ color: isUnassigned ? '#ef4444' : '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span>
                          {dept.hod}
                        </td>
                        <td style={{ padding: '20px 24px', color: '#374151' }}>{dept.staffCount}</td>
                        <td style={{ padding: "20px 24px", textAlign: "center" }}>
                          <button onClick={() => handleDeleteDepartment(dept.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444", fontSize: "18px" }}>🗑️</button>
                          <button onClick={() => handleEditDepartment(dept)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444", fontSize: "18px" }}>✏️</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Department Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111827' }}>Add New Department</h2>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleAddDept}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Department Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Physics" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Department Code *</label>
                  <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="e.g. PHY" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>HOD Assigned Name</label>
                  <input type="text" value={hod} onChange={(e) => setHod(e.target.value)} placeholder="e.g. Dr. Ramesh Kumar" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Staff Count</label>
                  <input type="number" value={staffCount} onChange={(e) => setStaffCount(e.target.value)} min="1" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Save Department</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
