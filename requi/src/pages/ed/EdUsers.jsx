import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getUsers, getDepartments } from '../../services/api';
import { Users, Shield, GraduationCap, Search, Eye } from 'lucide-react';

const EdUsers = ({ currentUser, onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [loading, setLoading] = useState(true);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  const loadUsers = async () => {
    try {
      const [usersData, deptData] = await Promise.all([
        getUsers(),
        getDepartments()
      ]);
      setUsers(usersData);
      setDepartments(deptData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let result = users.filter(u => u.role !== 'admin' && u.role !== 'ed');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        (u.name || '').toLowerCase().includes(q) || 
        (u.username || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    }

    if (deptFilter !== 'All') {
      result = result.filter(u => u.departmant_name === deptFilter);
    }

    if (roleFilter !== 'All') {
      if (roleFilter === 'HOD') {
        result = result.filter(u => u.role === 'hod');
      } else if (roleFilter === 'Staff') {
        result = result.filter(u => u.role === 'staff');
      }
    }

    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      result = result.filter(u => u.is_active === isActive);
    }

    setFilteredUsers(result);
  }, [users, searchQuery, deptFilter, roleFilter, statusFilter]);

  const totalCount = users.filter(u => u.role !== 'admin' && u.role !== 'ed').length;
  const activeStaffCount = users.filter(u => u.role === 'staff' && u.is_active).length;
  const hodsCount = users.filter(u => u.role === 'hod').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Style injection for modal animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />

      {/* Sidebar */}
      <Sidebar activePage="EdUsers" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#111827', fontSize: '14px', fontWeight: '600' }}>
                {currentUser?.name || 'Fr. Thomas Kurian'}
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold' }}>EXECUTIVE DIRECTOR</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#064e3b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              {currentUser?.name ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'TK'}
            </div>
          </div>
        </div>

        {/* Title Section 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Institutional User Directory</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Comprehensive oversight of all staff, department heads, and club coordinators.</p>
          </div>
          <button 
            onClick={() => alert('Inviting new user account... (Functionality restricted to Administrator)')}
            style={{ backgroundColor: '#064e3b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👤+</span> Invite User
          </button>
        </div>*/}

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><Users size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>TOTAL USERS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{totalCount}</div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><Shield size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>ACTIVE STAFF</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{activeStaffCount}</div>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><GraduationCap size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>HODS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{hodsCount}</div>
            </div>
          </div>

        </div>

        {/* Filter & Search Bar Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ flex: 1.5, minWidth: '200px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><Search size={20} color='black' /></span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or employee ID..." 
              style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
            />
          </div>

          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ flex: 1, minWidth: '130px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ flex: 1, minWidth: '130px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Roles</option>
            <option value="HOD">HODs</option>
            <option value="Staff">Staff Only</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ flex: 1, minWidth: '130px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* User Directory Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11.5px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>USER</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>ROLE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>PRIMARY DEPARTMENT</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>EMAIL</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center' }}>Loading user directory...</td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No users match the selected filters.</td></tr>
                ) : (
                  filteredUsers.map((user) => {
                    const isUserHod = user.role === 'hod';
                    return (
                      <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#064e3b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '11px' }}>
                            {user.name ? user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{user.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{user.username}</div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          {isUserHod ? (
                            <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>HOD</span>
                          ) : (
                            <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Staff</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>{user.departmant_name || 'N/A'}</td>
                        <td style={{ padding: '16px 24px', color: '#64748b' }}>{user.email}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            backgroundColor: user.is_active ? '#dcfce7' : '#fee2e2', 
                            color: user.is_active ? '#16a34a' : '#ef4444', 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            fontSize: '11.5px', 
                            fontWeight: '500' 
                          }}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', textAlign: 'right', color: '#94a3b8' }}>
                          <span style={{ cursor: 'pointer' }} onClick={() => setSelectedUserForModal(user)}><Eye size={20} /></span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>
              Showing 1-{filteredUsers.length} of {filteredUsers.length} users
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#94a3b8', cursor: 'not-allowed' }}>&lt;</button>
              <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#0f172a', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#94a3b8', cursor: 'not-allowed' }}>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedUserForModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }} onClick={() => setSelectedUserForModal(null)}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', width: '450px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Header banner decoration */}
            <div style={{ height: '80px', backgroundColor: '#064e3b', position: 'relative' }}>
              <button 
                onClick={() => setSelectedUserForModal(null)}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)', border: 'none',
                  color: 'white', fontWeight: 'bold', cursor: 'pointer',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px',
                  outline: 'none'
                }}
              >
                ✕
              </button>
            </div>

            {/* Profile Avatar section */}
            <div style={{ padding: '24px', position: 'relative', marginTop: '-48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '96px', height: '96px', borderRadius: '50%',
                backgroundColor: '#064e3b', border: '4px solid white',
                color: 'white', display: 'flex', justifyContent: 'center',
                alignItems: 'center', fontSize: '32px', fontWeight: 'bold',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}>
                {selectedUserForModal.name ? selectedUserForModal.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '12px 0 4px 0', textAlign: 'center' }}>
                {selectedUserForModal.name}
              </h2>
              <span style={{
                backgroundColor: selectedUserForModal.role === 'hod' ? '#dcfce7' : '#f1f5f9',
                color: selectedUserForModal.role === 'hod' ? '#16a34a' : '#475569',
                padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase'
              }}>
                {selectedUserForModal.role === 'hod' ? 'HOD' : 'Staff'}
              </span>
            </div>

            {/* Details Section */}
            <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Employee ID</span>
                    <span style={{ color: '#0f172a', fontWeight: '600', fontFamily: 'monospace' }}>{selectedUserForModal.username}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Email Address</span>
                    <span style={{ color: '#0f172a', fontWeight: '600' }}>{selectedUserForModal.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Department</span>
                    <span style={{ color: '#0f172a', fontWeight: '600' }}>{selectedUserForModal.departmant_name || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Account Status</span>
                    <span style={{
                      backgroundColor: selectedUserForModal.is_active ? '#dcfce7' : '#fee2e2',
                      color: selectedUserForModal.is_active ? '#16a34a' : '#ef4444',
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600'
                    }}>
                      {selectedUserForModal.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div style={{ backgroundColor: '#f8fafc', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9' }}>
              <button 
                onClick={() => setSelectedUserForModal(null)}
                style={{
                  padding: '8px 16px', backgroundColor: '#0f172a', color: 'white',
                  border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EdUsers;
