import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions } from '../../services/api';
import { ClipboardList, FileDown, SquareCheckBig, RotateCcw, TriangleAlert, Eye } from 'lucide-react';

const HodRequisitions = ({ currentUser, onNavigate, onViewDetail, onViewRequisition }) => {
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [filteredReqs, setFilteredReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    approved: 0,
    returnRate: '0.0%'
  });

  // Filter states
  const [timeframe, setTimeframe] = useState('This Month');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleView = onViewDetail || onViewRequisition || ((id) => alert(`Viewing Requisition ${id}`));

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await getRequisitions();
      const reqs = Array.isArray(response) ? response : (response?.data || []);

      // Filter requests for HOD's department/club
      const hodDeptName = currentUser?.departmant_name || currentUser?.department_name;
      const hodClubName = currentUser?.club_name;

      const filteredByDept = reqs.filter(r => {
        if (r.requisition_type === 'department' && hodDeptName) {
          return r.department_name === hodDeptName;
        } else if (r.requisition_type === 'club' && hodClubName) {
          return r.club_name === hodClubName;
        }
        return false;
      });

      setAllRequisitions(filteredByDept);

      const pending = filteredByDept.filter(r => r.status?.toLowerCase() === 'pending_hod').length;
      const active = filteredByDept.filter(r => r.status?.toLowerCase() === 'pending_ed').length;
      const approved = filteredByDept.filter(r => r.status?.toLowerCase() === 'approved').length;
      const returned = filteredByDept.filter(r => r.status?.toLowerCase()?.startsWith('returned')).length;

      // Calculate return rate dynamically
      const total = filteredByDept.length;
      const returnRatePct = total > 0 ? ((returned / total) * 100).toFixed(1) + '%' : '0.0%';

      setStats({
        pending: pending,
        active: active,
        approved: approved,
        returnRate: returnRatePct
      });
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
    const interval = setInterval(() => {
      loadData(false);
    }, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, [currentUser]);

  // Apply filters locally
  useEffect(() => {
    let result = [...allRequisitions];

    if (statusFilter !== 'All') {
      const sf = statusFilter.toLowerCase();
      if (sf === 'pending hod') {
        result = result.filter(r => r.status?.toLowerCase() === 'pending_hod');
      } else if (sf === 'pending ed') {
        result = result.filter(r => r.status?.toLowerCase() === 'pending_ed');
      } else if (sf === 'approved') {
        result = result.filter(r => r.status?.toLowerCase() === 'approved');
      } else if (sf === 'returned') {
        result = result.filter(r => r.status?.toLowerCase()?.startsWith('returned'));
      }
    }

    setFilteredReqs(result);
  }, [statusFilter, allRequisitions]);

  // Needs review count (PENDING_HOD)
  const needsReviewCount = allRequisitions.filter(r => r.status?.toLowerCase() === 'pending_hod').length;

  const hodDeptDisplay = currentUser?.departmant_name || currentUser?.department_name || currentUser?.club_name || 'DEPARTMENT';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Sidebar */}
      <Sidebar activePage="HodRequisitions" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#111827', fontSize: '14px', fontWeight: '500' }}>{currentUser?.name || 'Dr. Sarah Jacob'}</div>
              <div style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>HOD - {hodDeptDisplay}</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e5e7eb', color: '#111827', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              {currentUser?.name ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'SJ'}
            </div>
          </div>
        </div>

        {/* Title Block */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Departmental Requisitions</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Review, authorize, and track resource request workflows for {hodDeptDisplay}.</p>
        </div>

        {/* Overview Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' }}>PENDING MY APPROVAL</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.pending}</div>
              <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', fontWeight: '500' }}><TriangleAlert size={14} /> Action required</div>
            </div>
            <span style={{ fontSize: '24px', color: '#f59e0b' }}><ClipboardList size={30} /></span>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' }}>ACTIVE SUBMISSIONS</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.active < 10 ? `0${stats.active}` : stats.active}</div>
              <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px', fontWeight: '500' }}>⚙️ Processing by ED</div>
            </div>
            <span style={{ fontSize: '24px', color: '#10b981' }}><FileDown size={30} /></span>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' }}>APPROVED</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.approved}</div>
              <div style={{ fontSize: '11px', color: '#3b82f6', marginTop: '4px', fontWeight: '500' }}>Total approved requests</div>
            </div>
            <span style={{ fontSize: '24px', color: '#3b82f6' }}><SquareCheckBig size={30} /></span>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' }}>RETURN RATE</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.returnRate}</div>
              <div style={{ fontSize: '11px', color: '#8b5cf6', marginTop: '4px', fontWeight: '500' }}>Requisitions sent back</div>
            </div>
            <span style={{ fontSize: '24px', color: '#8b5cf6' }}><RotateCcw size={30} /></span>
          </div>
        </div>

        {/* Filters and Needs Review banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', outline: 'none' }}
            >
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', outline: 'none' }}
            >
              <option value="All">Status: All</option>
              <option value="Pending HOD">Pending HOD</option>
              <option value="Pending ED">Pending ED</option>
              <option value="Approved">Approved</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {needsReviewCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', color: '#b45309', fontWeight: '500' }}>
              <span>⚠️</span> Needs Review <span style={{ backgroundColor: '#f59e0b', color: 'white', padding: '1px 6px', borderRadius: '10px', fontSize: '11px' }}>{needsReviewCount}</span>
            </div>
          )}
        </div>

        {/* Requisitions List Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQUISITION ID</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STAFF NAME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>PROGRAMME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Loading requisitions...</td></tr>
                ) : filteredReqs.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>No requisitions found.</td></tr>
                ) : (
                  filteredReqs.map((req) => {
                    const statusLower = req.status?.toLowerCase() || '';
                    const isPendingHod = statusLower === 'pending_hod';
                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '18px 24px', fontWeight: '500', color: '#16a34a' }}>{req.id}</td>
                        <td style={{ padding: '18px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '10px' }}>
                              {req.created_by_name ? req.created_by_name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: '#111827' }}>{req.created_by_name || 'Unknown'}</div>
                              <div style={{ fontSize: '11px', color: '#6b7280' }}>{req.created_by_email || ''}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 24px', color: '#6b7280' }}>{req.requisition_date}</td>
                        <td style={{ padding: '18px 24px', color: '#374151', fontWeight: '500' }}>{req.programme_name}</td>
                        <td style={{ padding: '18px 24px' }}>
                          {statusLower === 'pending_hod' && (
                            <span style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                              Pending HOD
                            </span>
                          )}
                          {statusLower === 'pending_ed' && (
                            <span style={{ color: '#16a34a', padding: '4px 0', fontSize: '13px', fontWeight: '600' }}>
                              ● Pending ED
                            </span>
                          )}
                          {statusLower === 'approved' && (
                            <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                              Approved
                            </span>
                          )}
                          {statusLower?.startsWith('returned') && (
                            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                              Returned
                            </span>
                          )}
                          {statusLower === 'rejected' && (
                            <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                              Rejected
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                            {isPendingHod ? (
                              <button
                                onClick={() => handleView(req.id)}
                                style={{ backgroundColor: 'white', border: '1px solid #16a34a', color: '#16a34a', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                              >
                                Review
                              </button>
                            ) : (
                              <span
                                onClick={() => handleView(req.id)}
                                style={{ color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}
                              >
                                <Eye size={20} />
                              </span>
                            )}
                          </div>
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
              Showing 1-{filteredReqs.length} of {filteredReqs.length} entries
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

export default HodRequisitions;
