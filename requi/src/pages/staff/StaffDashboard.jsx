import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions } from '../../services/api';

const UserDashboard = ({ currentUser, onNavigate, onViewRequisition, onLogout }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [stats, setStats] = useState({
    submitted: 0,
    pending: 0,
    approved: 0
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getRequisitions();
      const userReqs = Array.isArray(data) ? data : (data?.data || []);
      setRequisitions(userReqs.slice(0, 5)); // show top 5

      // Calculate stats
      const submitted = userReqs.length;
      const pending = userReqs.filter(r => ['pending_hod', 'pending_ed', 'draft'].includes(r.status)).length;
      const approved = userReqs.filter(r => r.status === 'approved').length;
      setStats({ submitted, pending, approved });
    } catch (err) {
      console.error('Error loading user dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 18) return 'Good afternoon';
    return 'Good evening';
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
      <span style={{
        padding: '4px 10px', borderRadius: '9999px', fontSize: '11px',
        fontWeight: '600', backgroundColor: s.bg, color: s.color,
      }}>{s.label}</span>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      <Sidebar activePage="Dashboard" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', display: 'flex', flexDirection: 'column' }}>
        {/* Hero Banner */}
        <div style={{ backgroundColor: '#1f2937', borderRadius: '16px', padding: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '12px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </div>
            <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              {getGreeting()}, {currentUser ? currentUser.name : 'Faculty Member'}
            </h1>
            <p style={{ color: '#d1d5db', margin: 0, fontSize: '15px', maxWidth: '600px', lineHeight: '1.5' }}>
              Welcome back to your requisition console. You have {stats.pending} pending requests. Use the button to initiate a new request.
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <button 
              onClick={() => onNavigate('CreateRequisition')}
              style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' }}
            >
              <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> New Requisition
            </button>
          </div>
          {/* Abstract background shape */}
          <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', backgroundColor: '#374151', borderRadius: '50%', opacity: 0.5 }}></div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>TOTAL SUBMITTED</div>
              <div style={{ color: '#4b5563' }}>📊</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{stats.submitted}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Overall request history</div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>PENDING REVIEW</div>
              <div style={{ color: '#f97316' }}>⏳</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316', marginBottom: '8px' }}>{stats.pending}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Awaiting decision</div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>APPROVED</div>
              <div style={{ color: '#16a34a' }}>✅</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>{stats.approved}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Processed and fulfilled</div>
          </div>
        </div>

        {/* Recent Requisitions */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Recent Requisitions</div>
            <button 
              onClick={() => onNavigate('MyRequisitions')}
              style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              View All →
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>PROGRAMME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>TYPE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>Loading...</td></tr>
                ) : requisitions.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                      You haven't submitted any requisitions yet.
                    </td>
                  </tr>
                ) : (
                  requisitions.map((req) => (
                    <tr 
                      key={req.id} 
                      onClick={() => onViewRequisition(req.id)}
                      style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background-color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#{req.id}</td>
                      <td style={{ padding: '16px 24px', color: '#374151', fontWeight: '500' }}>{req.programme_name}</td>
                      <td style={{ padding: '16px 24px', color: '#6b7280', textTransform: 'capitalize' }}>{req.requisition_type}</td>
                      <td style={{ padding: '16px 24px', color: '#6b7280' }}>{req.requisition_date}</td>
                      <td style={{ padding: '16px 24px' }}>
                        {getStatusBadge(req.status)}
                      </td>
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

export default UserDashboard;
