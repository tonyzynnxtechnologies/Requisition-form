import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  getUsers,
  createUser,
  updateUser,
  resetPassword,
  deleteUser,
  getDepartments,
  getClubs
} from '../../services/api';

const Users = ({ currentUser, onNavigate, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Lookups
  const [departments, setDepartments] = useState([]);

  // Form state for adding user
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('staff');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Edit User State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [userData, deptData] = await Promise.all([
        getUsers(),
        getDepartments()
      ]);
      setUsers(userData);
      setFilteredUsers(userData);
      setDepartments(deptData);
    } catch (err) {
      console.error('Error loading data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter and search handling
  useEffect(() => {
    let result = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        (u.name || '').toLowerCase().includes(q) || 
        (u.email || '').toLowerCase().includes(q) || 
        (u.role || '').toLowerCase().includes(q)
      );
    }

    if (deptFilter !== 'All') {
      result = result.filter(u => String(u.department) === String(deptFilter));
    }

    if (roleFilter !== 'All') {
      result = result.filter(u => u.role === roleFilter);
    }

    setFilteredUsers(result);
  }, [searchQuery, deptFilter, roleFilter, users]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const newFieldErrors = {};
    if (!name) {
      newFieldErrors.name = 'Full name is required.';
    }
    if (!email) {
      newFieldErrors.email = 'Email address is required.';
    }
    if (['staff', 'hod'].includes(role) && !department) {
      newFieldErrors.department = 'Department is required for Staff and HOD roles.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await createUser({
        username: email.split('@')[0],
        password: password || '123456',
        name,
        email,
        role,
        department: department || null
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('123456');
      setRole('staff');
      setDepartment('');
      setShowAddModal(false);
      
      // Reload list
      await loadData();
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.errors) {
        const mappedErrors = {};
        Object.entries(errData.errors).forEach(([field, messages]) => {
          mappedErrors[field] = Array.isArray(messages) ? messages.join(' ') : messages;
        });
        setFieldErrors(mappedErrors);
      } else {
        setError('Failed to create user.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditUser = (user) => {
    setEditData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || '',
      is_active: user.is_active
    });
    setShowEditModal(true);
  };

  const handleSaveEditUser = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const newFieldErrors = {};
    if (!editData.name) {
      newFieldErrors.name = 'Name is required.';
    }
    if (!editData.email) {
      newFieldErrors.email = 'Email is required.';
    }
    if (['staff', 'hod'].includes(editData.role) && !editData.department) {
      newFieldErrors.department = 'Department is required for Staff and HOD roles.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await updateUser(editData.id, {
        name: editData.name,
        email: editData.email,
        role: editData.role,
        department: editData.department || null,
        is_active: editData.is_active
      });
      setShowEditModal(false);
      setEditData(null);
      await loadData();
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.errors) {
        const mappedErrors = {};
        Object.entries(errData.errors).forEach(([field, messages]) => {
          mappedErrors[field] = Array.isArray(messages) ? messages.join(' ') : messages;
        });
        setFieldErrors(mappedErrors);
      } else {
        setError('Failed to update user.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (id) => {
    const pass = prompt('Enter new password (min 6 chars):');
    if (!pass || pass.length < 6) {
      if (pass) alert('Password must be at least 6 characters.');
      return;
    }
    try {
      await resetPassword(id, pass);
      alert('Password reset successfully.');
    } catch (err) {
      alert('Password reset failed.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await deleteUser(id);
        await loadData();
      } catch (err) {
        alert('Failed to deactivate user.');
      }
    }
  };

  const getDesignation = (role) => {
    switch (role) {
      case 'admin': return 'Institution Administrator';
      case 'ed': return 'Executive Director';
      case 'hod': return 'Head of Department';
      default: return 'Staff / Faculty Member';
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="Users" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Manage Users</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Directory of all institutional user accounts, roles, and permissions</p>
          </div>
          <div>
            <button 
              onClick={() => { setError(''); setShowAddModal(true); }}
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
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>4</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Admin, ED, HOD, Staff</div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>STAFF ACCOUNTS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {users.filter(u => u.role === 'staff').length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Faculty & office staff</div>
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
              style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={String(d.id)}>{d.name}</option>)}
          </select>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="ed">ED</option>
            <option value="hod">HOD</option>
            <option value="staff">Staff</option>
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
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '24px', textAlign: 'center' }}>Loading user directory...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No users found matching filters.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px', flexShrink: 0 }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', color: '#111827' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{getDesignation(user.role)}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{user.email}</td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '6px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: user.role === 'admin' ? '#fee2e2' : user.role === 'ed' ? '#dcfce7' : user.role === 'hod' ? '#dbeafe' : '#f3f4f6',
                          color: user.role === 'admin' ? '#ef4444' : user.role === 'ed' ? '#16a34a' : user.role === 'hod' ? '#2563eb' : '#4b5563'
                        }}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{user.departmant_name || user.club_name || 'General'}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          fontSize: '12px', fontWeight: '500',
                          color: user.is_active ? '#16a34a' : '#ef4444',
                        }}>
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            backgroundColor: user.is_active ? '#16a34a' : '#ef4444',
                          }} />
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <span 
                            onClick={() => handleEditUser(user)}
                            style={{ cursor: 'pointer', fontSize: '16px' }}
                            title="Edit User"
                          >
                            ✏️
                          </span>
                          <span 
                            onClick={() => handleResetPassword(user.id)}
                            style={{ cursor: 'pointer', fontSize: '16px' }}
                            title="Reset Password"
                          >
                            🔑
                          </span>
                          <span 
                            onClick={() => handleDeleteUser(user.id)}
                            style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}
                            title="Delete / Deactivate User"
                          >
                            🚫
                          </span>
                        </div>
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
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111827' }}>Add New User Account</h2>
              
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleAddUser}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Prof. Sunny Joseph" style={inputStyle} />
                  {fieldErrors.name && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.name}</div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. sunny@naipunnya.edu" style={inputStyle} />
                  {fieldErrors.email && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.email}</div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Password</label>
                  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters (defaults to 123456)" style={inputStyle} />
                  {fieldErrors.password && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.password}</div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Role</label>
                  <select value={role} onChange={(e) => { setRole(e.target.value); setDepartment(''); }} style={{ ...inputStyle, backgroundColor: 'white' }}>
                    <option value="staff">Staff / Faculty</option>
                    <option value="hod">HOD</option>
                    <option value="ed">Executive Director</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                
                {['staff', 'hod'].includes(role) && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Department *</label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                    {fieldErrors.department && (
                      <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.department}</div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Saving...' : 'Save User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editData && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111827' }}>Edit User Account</h2>
              
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSaveEditUser}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={inputStyle} />
                  {fieldErrors.name && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.name}</div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} style={inputStyle} />
                  {fieldErrors.email && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.email}</div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Role</label>
                  <select value={editData.role} onChange={(e) => setEditData({...editData, role: e.target.value, department: ''})} style={{ ...inputStyle, backgroundColor: 'white' }}>
                    <option value="staff">Staff / Faculty</option>
                    <option value="hod">HOD</option>
                    <option value="ed">Executive Director</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                
                {['staff', 'hod'].includes(editData.role) && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Department *</label>
                    <select value={editData.department} onChange={(e) => setEditData({...editData, department: e.target.value})} style={{ ...inputStyle, backgroundColor: 'white' }}>
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                    {fieldErrors.department && (
                      <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{fieldErrors.department}</div>
                    )}
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={editData.is_active} onChange={(e) => setEditData({...editData, is_active: e.target.checked})} style={{ accentColor: '#16a34a' }} />
                    Active Account
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => { setShowEditModal(false); setEditData(null); }} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
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
