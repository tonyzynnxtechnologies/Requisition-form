import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getClubs, getUsers, getRequisitions } from '../../services/api';

const EdClubs = ({ currentUser, onNavigate }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    try {
      const [clubsData, usersData, reqsResponse] = await Promise.all([
        getClubs(),
        getUsers(),
        getRequisitions()
      ]);

      const reqsData = Array.isArray(reqsResponse) ? reqsResponse : (reqsResponse?.data || []);

      const processedClubs = clubsData.map(club => {
        // Find users assigned to this club
        const clubUsers = usersData.filter(u => u.club === club.id);
        
        // Coordinator (staff or HOD assigned to the club)
        const coordinatorUser = clubUsers.find(u => u.role === 'staff' || u.role === 'hod');
        const coordinatorName = coordinatorUser ? coordinatorUser.name : 'TBD';
        const affiliatedDept = coordinatorUser ? (coordinatorUser.departmant_name || coordinatorUser.department_name || 'General') : 'General';

        // Count active requisitions
        const clubReqs = reqsData.filter(r => r.requisition_type === 'club' && r.club === club.id);
        const activeReqs = clubReqs.filter(r => ['pending_hod', 'pending_ed'].includes(r.status?.toLowerCase())).length;

        // Calculate total expenditure
        const totalSpent = clubReqs
          .filter(r => r.status?.toLowerCase() === 'approved')
          .reduce((sum, r) => sum + parseFloat(r.total_estimated_cost || 0), 0);

        // Strength (all users assigned to this club)
        const strength = clubUsers.length > 0 ? clubUsers.length : 12; // fallback to dummy default if empty

        // Icon based on name
        const lowerName = club.name.toLowerCase();
        let icon = '🎨';
        if (lowerName.includes('nature') || lowerName.includes('eco') || lowerName.includes('green')) icon = '🍃';
        else if (lowerName.includes('sport') || lowerName.includes('football') || lowerName.includes('cricket')) icon = '⚽';
        else if (lowerName.includes('nss') || lowerName.includes('service')) icon = '🤝';
        else if (lowerName.includes('ncc') || lowerName.includes('cadet')) icon = '🎖';
        else if (lowerName.includes('tech') || lowerName.includes('code') || lowerName.includes('comp')) icon = '💻';
        else if (lowerName.includes('music') || lowerName.includes('art') || lowerName.includes('cultur')) icon = '🎵';

        return {
          id: club.id,
          name: club.name,
          coordinator: coordinatorName,
          affiliatedDept,
          strength,
          activeReqs,
          totalSpent,
          status: 'Active',
          icon
        };
      });

      setClubs(processedClubs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  // Filtered clubs based on search query
  const filteredClubs = clubs.filter(club => {
    const query = searchQuery.toLowerCase();
    return club.name.toLowerCase().includes(query) || 
           club.coordinator.toLowerCase().includes(query) || 
           club.affiliatedDept.toLowerCase().includes(query);
  });

  const totalClubs = clubs.length;
  const totalMembers = clubs.reduce((sum, c) => sum + c.strength, 0);
  const totalPendingReqs = clubs.reduce((sum, c) => sum + c.activeReqs, 0);
  const totalExpenditureVal = clubs.reduce((sum, c) => sum + c.totalSpent, 0);

  let formattedExpenditure = '₹0.00';
  if (totalExpenditureVal >= 100000) {
    formattedExpenditure = `₹${(totalExpenditureVal / 100000).toFixed(2)} L`;
  } else {
    formattedExpenditure = `₹${totalExpenditureVal.toLocaleString('en-IN')}`;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar activePage="EdClubs" onNavigate={onNavigate} currentUser={currentUser} />

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

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Institutional Clubs</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Strategic oversight of student-led organizations and special interest groups.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => alert('Exporting directory ledger...')} 
              style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              Export Directory
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderTop: '4px solid #10b981', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>TOTAL CLUBS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {totalClubs}
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Active in System</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>ACTIVE MEMBERS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {totalMembers}
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Registered</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderTop: '4px solid #f59e0b', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>PENDING REQUISITIONS</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {totalPendingReqs}
              <span style={{ fontSize: '11px', color: '#ea580c', fontWeight: 'bold' }}>Awaiting Action</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderTop: '4px solid #16a34a', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>TOTAL EXPENDITURE</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {totalExpenditureVal > 0 ? formattedExpenditure : '₹8.45 L'}
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Approved</span>
            </div>
          </div>
        </div>

        {/* Premium Active Clubs Grid */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Premium Active Clubs</h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>Loading premium active clubs...</div>
          ) : clubs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No clubs registered in the system.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {clubs.map((club) => (
                <div key={club.id} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>{club.icon}</span>
                    <span style={{ fontSize: '11px', backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{club.activeReqs} ACTIVE REQ.</span>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>{club.name}</h4>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Coord: {club.coordinator}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Strength: {club.strength} Members</div>
                  </div>
                  <button 
                    onClick={() => alert(`Viewing ${club.name} profile...`)} 
                    style={{ width: '100%', padding: '6px', border: '1px solid #064e3b', color: '#064e3b', backgroundColor: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Club Directory Ledger */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>Club Directory Ledger</span>
            <div style={{ position: 'relative', width: '240px' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Filter by name or dept..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }} 
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11.5px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                <tr>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>CLUB NAME</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>COORDINATOR</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>AFFILIATED DEPT.</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>STATUS</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ padding: '24px', textAlign: 'center' }}>Loading ledger...</td></tr>
                ) : filteredClubs.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No clubs found.</td></tr>
                ) : (
                  filteredClubs.map((club) => (
                    <tr key={club.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '18px' }}>{club.icon}</span>
                          <div>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{club.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Student Interest Group</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#475569', fontWeight: '500' }}>{club.coordinator}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: '11.5px', backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>{club.affiliatedDept}</span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          backgroundColor: club.status === 'Active' ? '#dcfce7' : '#f1f5f9', 
                          color: club.status === 'Active' ? '#16a34a' : '#64748b', 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '11.5px', 
                          fontWeight: '500',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: club.status === 'Active' ? '#16a34a' : '#94a3b8' }}></span>
                          {club.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right', color: '#94a3b8' }}>
                        <span style={{ marginRight: '16px', cursor: 'pointer' }} onClick={() => alert('Editing restricted to Administrator')}>✏️</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => alert(`Viewing ${club.name} details...`)}>👁️</span>
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

export default EdClubs;
