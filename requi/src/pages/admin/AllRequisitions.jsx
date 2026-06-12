import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions, getDashboardStats, getDepartments, getClubs } from '../../services/api';

const AllRequisitions = ({ currentUser, onNavigate, onLogout, onViewRequisition }) => {
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    activeQueue: 0,
    approvalRate: '0%',
    criticalAlerts: 0
  });

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  // Load requisitions & calculate stats
  const loadRegistryData = async () => {
    setLoading(true);
    try {
      const [reqsData, dashboardStats, deptsData, clubsData] = await Promise.all([
        getRequisitions(),
        getDashboardStats(),
        getDepartments(),
        getClubs()
      ]);

      const reqs = reqsData?.data || reqsData || [];
      setAllRequisitions(reqs);
      setFilteredRequisitions(reqs);
      setDepartments(deptsData || []);
      setClubs(clubsData || []);

      const statsData = dashboardStats?.data || dashboardStats || {};
      const total = statsData.total_requisitions || reqs.length;
      const approved = statsData.approved || reqs.filter(r => r.status === 'approved').length;
      const pending = (statsData.pending_hod || 0) + (statsData.pending_ed || 0);

      setStats({
        activeQueue: pending,
        approvalRate: total > 0 ? `${Math.round((approved / total) * 100)}%` : '0%',
        criticalAlerts: reqs.filter(r => ['pending_hod', 'pending_ed', 'returned_to_hod'].includes(r.status)).length
      });
    } catch (err) {
      console.error('Error loading registry data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistryData();
  }, []);

  // Filter application handler
  const handleApplyFilters = () => {
    let result = [...allRequisitions];

    if (statusFilter !== 'All') {
      if (statusFilter === 'Pending') {
        result = result.filter(r => ['pending_hod', 'pending_ed', 'returned_to_hod'].includes(r.status));
      } else if (statusFilter === 'Approved') {
        result = result.filter(r => r.status === 'approved');
      } else if (statusFilter === 'Rejected') {
        result = result.filter(r => r.status === 'rejected');
      } else if (statusFilter === 'Returned') {
        result = result.filter(r => r.status === 'returned_to_staff');
      }
    }

    if (typeFilter !== 'All') {
      if (typeFilter === 'Dept') {
        result = result.filter(r => r.requisition_type === 'department');
      } else if (typeFilter === 'Club') {
        result = result.filter(r => r.requisition_type === 'club');
      }
    }

    if (deptFilter !== 'All') {
      if (deptFilter.startsWith('dept_')) {
        const id = deptFilter.replace('dept_', '');
        result = result.filter(r => r.requisition_type === 'department' && String(r.department) === String(id));
      } else if (deptFilter.startsWith('club_')) {
        const id = deptFilter.replace('club_', '');
        result = result.filter(r => r.requisition_type === 'club' && String(r.club) === String(id));
      }
    }

    setFilteredRequisitions(result);
  };

  const handleExportCSV = () => {
    alert('CSV Export generated! Check your downloads folder (Simulated).');
  };

  const getStatusStyle = (status) => {
    const map = {
      approved: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a', label: 'APPROVED' },
      pending_hod: { bg: '#f3f4f6', text: '#4b5563', dot: '#9ca3af', label: 'PENDING HOD' },
      pending_ed: { bg: '#f3f4f6', text: '#4b5563', dot: '#9ca3af', label: 'PENDING ED' },
      returned_to_hod: { bg: '#e0e7ff', text: '#4f46e5', dot: '#4f46e5', label: 'RETURNED HOD' },
      returned_to_staff: { bg: '#e0e7ff', text: '#4f46e5', dot: '#4f46e5', label: 'RETURNED' },
      rejected: { bg: '#fef2f2', text: '#ef4444', dot: '#ef4444', label: 'REJECTED' }
    };
    return map[status] || { bg: '#f3f4f6', text: '#4b5563', dot: '#9ca3af', label: String(status).toUpperCase() };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="AllRequisitions" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Management Registry</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Review and manage all institutional requisition requests</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={handleExportCSV}
              style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              <span style={{ marginRight: '8px' }}>📥</span> Export CSV
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE QUEUE</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{stats.activeQueue}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>⏱ Avg. 2.4 days delay</div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVAL RATE</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{stats.approvalRate}</div>
            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>✓ Institutional standard met</div>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px' }}>PENDING REVIEW</div>
              <div style={{ color: '#f97316' }}>🔔</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>
              {stats.criticalAlerts < 10 ? `0${stats.criticalAlerts}` : stats.criticalAlerts}
            </div>
            <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>⚠ Awaiting immediate action</div>
          </div>
        </div>

        {/* Filter Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Returned">Returned</option>
          </select>

          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">Type: All</option>
            <option value="Dept">Departments</option>
            <option value="Club">Clubs</option>
          </select>

          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}
          >
            <option value="All">Department/Club: All</option>
            <optgroup label="Departments">
              {departments.map(d => <option key={d.id} value={`dept_${d.id}`}>{d.name}</option>)}
            </optgroup>
            <optgroup label="Clubs">
              {clubs.map(c => <option key={c.id} value={`club_${c.id}`}>{c.name}</option>)}
            </optgroup>
          </select>

          <button 
            onClick={handleApplyFilters}
            style={{ padding: '10px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}
          >
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>TITLE & DESCRIPTION</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>TYPE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>SUBMITTED BY</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DEPT/CLUB</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                      Loading requisitions registry...
                    </td>
                  </tr>
                ) : filteredRequisitions.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                      No requisitions match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredRequisitions.map((req) => {
                    const isClub = req.requisition_type === 'club';
                    const deptOrClubName = isClub ? req.club_name : req.department_name;
                    const statusStyle = getStatusStyle(req.status);
                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#{req.id}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{req.programme_name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{deptOrClubName || 'General'}</div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            backgroundColor: isClub ? '#dcfce7' : '#f3e8ff', 
                            color: isClub ? '#16a34a' : '#9333ea', 
                            padding: '4px 8px', 
                            borderRadius: '9999px', 
                            fontSize: '12px', 
                            fontWeight: '600' 
                          }}>
                            {isClub ? 'CLUB' : 'DEPT'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#374151' }}>{req.created_by_name}</td>
                        <td style={{ padding: '16px 24px', color: '#374151' }}>{deptOrClubName || 'General'}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            backgroundColor: statusStyle.bg, 
                            color: statusStyle.text, 
                            padding: '4px 12px', 
                            borderRadius: '9999px', 
                            fontSize: '12px', 
                            fontWeight: '500' 
                          }}>
                            <span style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              backgroundColor: statusStyle.dot, 
                              marginRight: '6px' 
                            }}></span>
                            {statusStyle.label}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#6b7280' }}>{req.requisition_date}</td>
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <button 
                            onClick={() => onViewRequisition(req.id)}
                            style={{ background: 'none', border: 'none', color: '#16a34a', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>
              Showing {filteredRequisitions.length} results
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', borderRadius: '6px', color: '#9ca3af', cursor: 'not-allowed' }}>&lt;</button>
              <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', borderRadius: '6px', color: '#9ca3af', cursor: 'not-allowed' }}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequisitions;
