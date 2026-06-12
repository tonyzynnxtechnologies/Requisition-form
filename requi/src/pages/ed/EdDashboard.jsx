import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions } from '../../services/api';

const EdDashboard = ({ currentUser, onNavigate, onViewRequisition, onLogout }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const loadRequisitions = async () => {
    setLoading(true);
    try {
      const data = await getRequisitions();
      const reqs = Array.isArray(data) ? data : (data?.data || []);
      setRequisitions(reqs);
      setFiltered(reqs);
    } catch (err) {
      console.error('Failed to load requisitions for ED', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequisitions();
  }, [currentUser]);

  useEffect(() => {
    let result = [...requisitions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.programme_name?.toLowerCase().includes(q) ||
        r.created_by_name?.toLowerCase().includes(q) ||
        r.department_name?.toLowerCase().includes(q) ||
        r.club_name?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') result = result.filter(r => r.status === statusFilter);
    if (typeFilter !== 'all') result = result.filter(r => r.requisition_type === typeFilter);
    setFiltered(result);
  }, [search, statusFilter, typeFilter, requisitions]);

  const stats = {
    total: requisitions.length,
    pending: requisitions.filter(r => r.status === 'pending_ed').length,
    approved: requisitions.filter(r => r.status === 'approved').length,
    rejected: requisitions.filter(r => r.status === 'rejected').length,
  };

  const getStatusBadge = (status) => {
    const map = {
      draft: { bg: '#f3f4f6', color: '#6b7280', label: 'Draft' },
      pending_hod: { bg: '#fef3c7', color: '#d97706', label: 'Pending HOD' },
      pending_ed: { bg: '#ffedd5', color: '#ea580c', label: 'Pending ED' },
      approved: { bg: '#dcfce7', color: '#16a34a', label: 'Approved' },
      rejected: { bg: '#fee2e2', color: '#dc2626', label: 'Rejected' },
      returned_to_staff: { bg: '#e0e7ff', color: '#4f46e5', label: 'Returned' },
      returned_to_hod: { bg: '#e0e7ff', color: '#4f46e5', label: 'Returned to HOD' },
    };
    const s = map[status] || { bg: '#f3f4f6', color: '#6b7280', label: status };
    return (
      <span style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', backgroundColor: s.bg, color: s.color }}>
        {s.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const map = {
      urgent: { bg: '#fef2f2', color: '#dc2626' },
      high: { bg: '#fff7ed', color: '#ea580c' },
      medium: { bg: '#fefce8', color: '#ca8a04' },
      low: { bg: '#f0fdf4', color: '#16a34a' },
    };
    const s = map[priority] || map.medium;
    return (
      <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', backgroundColor: s.bg, color: s.color, textTransform: 'capitalize' }}>
        {priority}
      </span>
    );
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1px solid #d1d5db',
    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      <Sidebar activePage="Dashboard" onNavigate={onNavigate} currentUser={currentUser} />

      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827', margin: '0 0 6px' }}>Executive Director Dashboard</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Review and approve club requisitions and HOD-recommended departmental requests</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'TOTAL INCOMING', value: stats.total, color: '#111827', icon: '📋' },
            { label: 'PENDING ACTION', value: stats.pending, color: '#ea580c', icon: '⏳' },
            { label: 'APPROVED', value: stats.approved, color: '#16a34a', icon: '✅' },
            { label: 'REJECTED', value: stats.rejected, color: '#dc2626', icon: '❌' },
          ].map((s, i) => (
            <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>{s.label}</div>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: '200px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search by programme, submitter, department or club..." 
              style={{ ...inputStyle, paddingLeft: '36px' }} 
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            style={{ ...inputStyle, flex: 1, minWidth: '140px', backgroundColor: 'white' }}
          >
            <option value="all">All Statuses</option>
            <option value="pending_ed">Pending ED Action</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="returned_to_staff">Returned to Staff</option>
            <option value="returned_to_hod">Returned to HOD</option>
          </select>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)} 
            style={{ ...inputStyle, flex: 1, minWidth: '140px', backgroundColor: 'white' }}
          >
            <option value="all">All Types</option>
            <option value="department">Departmental Request</option>
            <option value="club">Club Request</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  {['REQ ID', 'PROGRAMME', 'TYPE', 'SUBMITTED BY', 'DEPT / CLUB', 'PRIORITY', 'DATE', 'STATUS'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left', fontSize: '11px',
                      fontWeight: '600', color: '#6b7280', borderBottom: '1px solid #e5e7eb',
                      letterSpacing: '0.5px',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>No requisitions found.</td></tr>
                ) : (
                  filtered.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => onViewRequisition(req.id)}
                      style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background-color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '14px 20px', color: '#6b7280', fontWeight: '500' }}>#{req.id}</td>
                      <td style={{ padding: '14px 20px', fontWeight: '500', color: '#111827' }}>{req.programme_name}</td>
                      <td style={{ padding: '14px 20px', color: '#6b7280', textTransform: 'capitalize' }}>{req.requisition_type}</td>
                      <td style={{ padding: '14px 20px', color: '#374151' }}>{req.created_by_name}</td>
                      <td style={{ padding: '14px 20px', color: '#4b5563' }}>
                        {req.requisition_type === 'department' ? (
                          <span>🏢 {req.department_name}</span>
                        ) : (
                          <span>🎭 {req.club_name}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 20px' }}>{getPriorityBadge(req.priority)}</td>
                      <td style={{ padding: '14px 20px', color: '#6b7280' }}>{req.requisition_date}</td>
                      <td style={{ padding: '14px 20px' }}>{getStatusBadge(req.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdDashboard;
