import React, { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const UserDashboard = ({ currentUser, onNavigate, onViewDetail }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [stats, setStats] = useState({
    submitted: 0,
    pending: 0,
    approved: 0
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const email = currentUser ? currentUser.email : 'staff@naipunnya.edu';
      const userReqs = await api.getRequisitions({ email });
      setRequisitions(userReqs.slice(0, 5)); // show top 5

      // Calculate stats
      const submitted = userReqs.length;
      const pending = userReqs.filter(r => r.status === 'PENDING').length;
      const approved = userReqs.filter(r => r.status === 'APPROVED').length;
      setStats({ submitted, pending, approved });

      const listNotices = await api.getNotices();
      setNotices(listNotices);
    } catch (err) {
      console.error('Error loading user dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleClearNotices = async (e) => {
    e.preventDefault();
    await api.clearNotices();
    setNotices([]);
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared User Sidebar */}
      <UserSidebar activePage="User_Dashboard" onNavigate={onNavigate} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', gap: '16px', color: '#6b7280', fontSize: '20px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('User_Profile')}>👤</span>
        </div>

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
              onClick={() => onNavigate('Create_Requisition')}
              style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' }}
              hover-style={{ backgroundColor: '#15803d' }}
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
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>PENDING APPROVAL</div>
              <div style={{ color: '#f97316' }}>📅</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>
                {stats.pending < 10 ? `0${stats.pending}` : stats.pending}
              </div>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#fef3c7', borderRadius: '3px', marginBottom: '8px' }}>
              <div style={{ width: `${stats.submitted > 0 ? (stats.pending / stats.submitted) * 100 : 0}%`, height: '100%', backgroundColor: '#f97316', borderRadius: '3px' }}></div>
            </div>
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

        {/* Two Columns */}
        <div style={{ display: 'flex', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
          {/* Left: Recent Requisitions */}
          <div style={{ flex: 2, minWidth: '350px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Recent Requisitions</div>
              <button 
                onClick={() => onNavigate('My_Requisitions')}
                style={{ background: 'none', border: 'none', color: '#111827', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                View All →
              </button>
            </div>
            
            <div style={{ flex: 1, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                  <tr>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DESCRIPTION</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '32px', textAlgin: 'center', color: '#6b7280' }}>
                        You haven't submitted any requisitions yet.
                      </td>
                    </tr>
                  ) : (
                    requisitions.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>{req.id}</td>
                        <td style={{ padding: '16px 24px', color: '#374151' }}>{req.description}</td>
                        <td style={{ padding: '16px 24px', color: '#6b7280' }}>{req.date}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            backgroundColor: req.status === 'APPROVED' ? '#dcfce7' : req.status === 'PENDING' ? '#fef3c7' : '#fef2f2', 
                            color: req.status === 'APPROVED' ? '#16a34a' : req.status === 'PENDING' ? '#d97706' : '#ef4444', 
                            padding: '4px 12px', 
                            borderRadius: '9999px', 
                            fontSize: '12px', 
                            fontWeight: '500' 
                          }}>
                            <span style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              backgroundColor: req.status === 'APPROVED' ? '#16a34a' : req.status === 'PENDING' ? '#d97706' : '#ef4444', 
                              marginRight: '6px' 
                            }}></span>
                            {req.status}
                          </span>
                        </td>
                        <td 
                          style={{ padding: '16px 24px', textAlign: 'right', color: '#16a34a', cursor: 'pointer', fontSize: '16px' }}
                          onClick={() => onViewDetail(req.id)}
                        >
                          👁️
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Notices */}
          <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>📢</span>
                <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Notices</div>
              </div>
              {notices.length > 0 && <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>}
            </div>
            
            <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
              {notices.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                  No active notices.
                </div>
              ) : (
                notices.map((not) => (
                  <div 
                    key={not.id} 
                    style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderLeft: `4px solid ${not.type === 'success' ? '#16a34a' : not.type === 'warning' ? '#ef4444' : '#3b82f6'}`, 
                      borderRadius: '8px', 
                      padding: '16px' 
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: not.type === 'success' ? '#dcfce7' : not.type === 'warning' ? '#fee2e2' : '#dbeafe', 
                        color: not.type === 'success' ? '#16a34a' : not.type === 'warning' ? '#ef4444' : '#3b82f6', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexShrink: 0, 
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {not.type === 'success' ? '✓' : not.type === 'warning' ? '!' : 'i'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{not.text}</div>
                        <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px', lineHeight: '1.4' }}>{not.desc}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>{not.time}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
              <a href="#" onClick={handleClearNotices} style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
                Clear All Notifications
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '32px 0 0 0', color: '#9ca3af', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <div>© 2026 Naipunnya Digital Requisition System</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
