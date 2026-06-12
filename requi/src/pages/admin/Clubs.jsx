import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getClubs, createClub, updateClub, deleteClub, getUsers, getRequisitions } from '../../services/api';

const Clubs = ({ currentUser, onNavigate, onLogout }) => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Form/Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clubData, userData, reqData] = await Promise.all([
        getClubs(),
        getUsers(),
        getRequisitions()
      ]);
      setClubs(clubData);
      setFilteredClubs(clubData);
      setUsers(userData);
      
      const reqs = reqData?.data || reqData || [];
      setRequisitions(reqs);
    } catch (err) {
      console.error('Error loading clubs data', err);
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
      setFilteredClubs(
        clubs.filter(c => {
          const coordinator = getCoordinatorName(c.id).toLowerCase();
          return c.name.toLowerCase().includes(q) || coordinator.includes(q);
        })
      );
    } else {
      setFilteredClubs(clubs);
    }
  }, [searchQuery, clubs, users]);

  const handleOpenAdd = () => {
    setEditingClub(null);
    setName('');
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (club) => {
    setEditingClub(club);
    setName(club.name);
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Club name is required.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingClub) {
        await updateClub(editingClub.id, { name: name.trim() });
      } else {
        await createClub({ name: name.trim() });
      }
      setShowModal(false);
      await loadData();
    } catch (err) {
      setError(editingClub ? 'Failed to update club.' : 'Failed to create club.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await deleteClub(id);
        await loadData();
      } catch (err) {
        alert('Failed to delete club.');
      }
    }
  };

  const getCoordinatorName = (clubId) => {
    const coordinatorUser = users.find(u => String(u.club) === String(clubId));
    return coordinatorUser ? coordinatorUser.name : '— Not assigned';
  };

  const getRequisitionCount = (clubId) => {
    return requisitions.filter(r => r.requisition_type === 'club' && String(r.club) === String(clubId)).length;
  };

  const totalClubs = clubs.length;
  const totalRequisitions = clubs.reduce((acc, curr) => acc + getRequisitionCount(curr.id), 0);

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
      <Sidebar activePage="Clubs" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Manage Clubs</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Directory of institutional clubs and organizations</p>
          </div>
          <div>
            <button 
              onClick={handleOpenAdd}
              style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> Add Club
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL CLUBS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
              {totalClubs < 10 ? `0${totalClubs}` : totalClubs}
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE REQUISITIONS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{totalRequisitions}</div>
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
              placeholder="Search clubs by name or coordinator..." 
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
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '35%' }}>CLUB NAME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '35%' }}>COORDINATOR</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '20%' }}>REQUISITIONS COUNT</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '10%', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center' }}>Loading clubs...</td>
                  </tr>
                ) : filteredClubs.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No clubs found.</td>
                  </tr>
                ) : (
                  filteredClubs.map((club) => (
                    <tr key={club.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px' }}>🎭</span>
                          {club.name}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{getCoordinatorName(club.id)}</td>
                      <td style={{ padding: '16px 24px', color: '#374151' }}>{getRequisitionCount(club.id)}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                          <span onClick={() => handleOpenEdit(club)} style={{ cursor: 'pointer', fontSize: '16px' }} title="Edit">✏️</span>
                          <span onClick={() => handleDelete(club.id)} style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }} title="Delete">🗑️</span>
                        </div>
                      </td>
                    </tr>
                  ))
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
                {editingClub ? 'Edit Club' : 'Add New Club'}
              </h2>
              
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Club Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fine Arts Club" style={inputStyle} required />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '8px 16px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Saving...' : 'Save Club'}
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

export default Clubs;
