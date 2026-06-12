import React, { useState, useEffect } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  resetPassword,
  deleteUser,
} from "../../services/api";



const Users = ({ currentUser, onNavigate, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Form state for adding user
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('staff');
  const [department, setDepartment] = useState('Computer Science');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Error loading users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter and search handling
  useEffect(() => {
    let result = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }

    if (deptFilter !== 'All') {
      result = result.filter(u => u.department === deptFilter);
    }

    setFilteredUsers(result);
  }, [searchQuery, deptFilter, users]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await createUser({
        username: email.split("@")[0],
        password: "123456",
        name,
        email,
        role,
      });

      // Reset form
      setName('');
      setEmail('');
      setRole('staff');
      setDepartment('Computer Science');
      setDesignation('Assistant Professor');
      setShowAddModal(false);

      // Reload list
      await loadUsers();
    } catch (err) {
      setError('Failed to create user.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const saveEditUser = async () => {
    await updateUser(
      editingUser.id,
      {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      }
    );

    setShowEditModal(false);
    loadUsers();
  };

  const handleResetPassword = async (id) => {
    const password = prompt(
      "Enter new password"
    );

    if (!password) return;

    try {
      await resetPassword(id, password);

      alert("Password reset successfully");
    } catch (error) {
      alert("Password reset failed");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      await loadUsers();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f5f6fa",
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

          <div
            style={{
              padding: "12px 20px",
              backgroundColor: "#1f2937",
              borderLeft: "3px solid #16a34a",
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

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "32px 40px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Manage Users</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Directory of all institutional user accounts, roles, and permissions</p>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'opacity 0.2s' }}
            >
              <span style={{ marginRight: '8px' }}>👤+</span> Add User
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL USERS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{users.length}</div>
            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>Active directory counts</div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ROLES REPRESENTED</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>3</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Admin, Management, Staff</div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>STAFF ACCOUNTS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {users.filter(u => u.role === 'staff').length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>HODs & Faculty members</div>
          </div>
        </div>

        {/* Filter Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: '200px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
              style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Management Studies">Management Studies</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>FULL NAME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>EMAIL</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>ROLE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DEPARTMENT/CLUB</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center' }}>Loading user directory...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No users found matching filters.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', color: '#111827' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{user.designation}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{user.email}</td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: user.role === 'admin' ? '#fee2e2' : user.role === 'management' ? '#dbeafe' : '#f3f4f6',
                          color: user.role === 'admin' ? '#ef4444' : user.role === 'management' ? '#2563eb' : '#4b5563'
                        }}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{user.department || user.club || 'General'}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleEditUser(user)}
                          style={{
                            marginRight: "10px",
                            color: "#2563eb",
                            cursor: "pointer"
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleResetPassword(user.id)}
                          style={{
                            marginRight: "10px",
                            color: "#f59e0b",
                            cursor: "pointer"
                          }}
                        >
                          🔑
                        </button>
                        <span
                          onClick={() => handleDeleteUser(user.id)}
                          style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}
                          title="Delete User"
                        >
                          🚫
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111827' }}>Add New User Account</h2>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleAddUser}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Prof. Sunny Joseph" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. sunny@naipunnya.edu" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}>
                    <option value="staff">Staff / Faculty</option>
                    <option value="management">Management</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Department / Club</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Management Studies">Management Studies</option>
                    <option value="English">English</option>
                    <option value="Tech Club">Tech Club</option>
                    <option value="Nature Club">Nature Club</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Designation</label>
                  <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Assistant Professor" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Save User</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
