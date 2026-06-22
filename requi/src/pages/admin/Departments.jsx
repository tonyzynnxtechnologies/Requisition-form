import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment, getUsers } from '../../services/api';
import { Building2, User, TriangleAlert, Search, Pencil, Trash2 } from 'lucide-react';

const Departments = ({ currentUser, onNavigate, onLogout }) => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal and form state
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [deptData, userData] = await Promise.all([
        getDepartments(),
        getUsers()
      ]);
      setDepartments(deptData);
      setFilteredDepts(deptData);
      setUsers(userData);
    } catch (err) {
      console.error('Error loading departments data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      setFilteredDepts(
        departments.filter(d => {
          const code = getDeptCode(d.name).toLowerCase();
          const hodName = getHodName(d.id).toLowerCase();
          return d.name.toLowerCase().includes(q) || code.includes(q) || hodName.includes(q);
        })
      );
    } else {
      setFilteredDepts(departments);
    }
  }, [searchQuery, departments, users]);

  const handleOpenAdd = () => {
    setEditingDept(null);
    setName('');
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingDept(dept);
    setName(dept.name);
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Department name is required.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingDept) {
        await updateDepartment(editingDept.id, { name: name.trim() });
      } else {
        await createDepartment({ name: name.trim() });
      }
      setShowModal(false);
      await loadData();
    } catch (err) {
      setError(editingDept ? 'Failed to update department.' : 'Failed to create department.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        await loadData();
      } catch (err) {
        alert('Failed to delete department.');
      }
    }
  };

  const getDeptCode = (deptName) => {
    if (!deptName) return '';
    const words = deptName.trim().split(/\s+/);
    if (words.length > 1) {
      return words.map(w => w.charAt(0).toUpperCase()).join('');
    }
    return deptName.slice(0, 3).toUpperCase();
  };

  const getHodName = (deptId) => {
    const hodUser = users.find(u => u.role === 'hod' && String(u.department) === String(deptId));
    return hodUser ? hodUser.name : '— Not assigned';
  };

  const getStaffCount = (deptId) => {
    return users.filter(u => u.role === 'staff' && String(u.department) === String(deptId)).length;
  };

  // Stats calculation
  const totalDepts = departments.length;
  const totalStaff = users.filter(u => u.role === 'staff').length;
  const deptsWithoutHod = departments.filter(d => !users.some(u => u.role === 'hod' && String(u.department) === String(d.id))).length;

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="Departments" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Departments</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage departments that can submit requisitions</p>
          </div>
          <div>
            <button
              onClick={handleOpenAdd}
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
            <div style={{ fontSize: '24px', color: '#16a34a' }}><Building2 size={30} /></div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL STAFF</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{totalStaff}</div>
            </div>
            <div style={{ fontSize: '24px', color: '#4b5563' }}><User size={30} /></div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>DEPARTMENTS WITHOUT HOD</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: deptsWithoutHod > 0 ? '#ef4444' : '#111827' }}>
                {deptsWithoutHod < 10 ? `0${deptsWithoutHod}` : deptsWithoutHod}
              </div>
            </div>
            <div style={{ fontSize: '24px', color: deptsWithoutHod > 0 ? '#ef4444' : '#16a34a' }}>{deptsWithoutHod > 0 ? <TriangleAlert size={30} /> : <CheckCircle size={30} />}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}><Search size={20} color='black' /></span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search departments by name, code or HOD..."
              style={{ width: '100%', padding: '12px 16px 12px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
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
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '15%' }}>STAFF COUNT</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '10%', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center' }}>Loading departments...</td>
                  </tr>
                ) : filteredDepts.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No departments found.</td>
                  </tr>
                ) : (
                  filteredDepts.map((dept) => {
                    const hodName = getHodName(dept.id);
                    const isUnassigned = hodName === '— Not assigned';
                    return (
                      <tr key={dept.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: isUnassigned ? '#fef2f2' : 'transparent' }}>
                        <td style={{ padding: '20px 24px', fontWeight: '600', color: '#4b5563' }}>{getDeptCode(dept.name)}</td>
                        <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>{dept.name}</td>
                        <td style={{ padding: '20px 24px', color: isUnassigned ? '#ef4444' : '#374151', fontWeight: isUnassigned ? '500' : 'normal' }}>
                          <span style={{ color: isUnassigned ? '#ef4444' : '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span>
                          {hodName}
                        </td>
                        <td style={{ padding: '20px 24px', color: '#374151' }}>{getStaffCount(dept.id)}</td>
                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <span onClick={() => handleOpenEdit(dept)} style={{ cursor: 'pointer', fontSize: '16px' }} title="Edit"><Pencil size={20} color='orange' /></span>
                            <span onClick={() => handleDelete(dept.id)} style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }} title="Delete"><Trash2 size={20} /></span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111827' }}>
                {editingDept ? 'Edit Department' : 'Add New Department'}
              </h2>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Department Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Commerce" style={inputStyle} required />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Saving...' : 'Save Department'}
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

export default Departments;
