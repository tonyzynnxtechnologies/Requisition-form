import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions } from '../../services/api';
import { ChartLine, FileDown, IndianRupee, Zap, Search, Eye } from 'lucide-react';

const EdRequisitions = ({ currentUser, onNavigate, onViewRequisition, initialDeptFilter }) => {
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [filteredReqs, setFilteredReqs] = useState([]);
  
  // Filter states
  const [deptFilter, setDeptFilter] = useState(initialDeptFilter || 'All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getRequisitions();
      const reqs = Array.isArray(data) ? data : (data?.data || []);
      setAllRequisitions(reqs);
    } catch (e) {
      console.error(e);
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
  }, []);

  // Sync deptFilter when initialDeptFilter prop changes (e.g., navigating from dept card)
  useEffect(() => {
    if (initialDeptFilter) {
      setDeptFilter(initialDeptFilter);
    }
  }, [initialDeptFilter]);

  const handleApplyFilters = () => {
    let result = [...allRequisitions];

    if (deptFilter !== 'All') {
      result = result.filter(r => {
        const entity = r.requisition_type === 'department' ? r.department_name : r.club_name;
        return entity === deptFilter;
      });
    }

    if (statusFilter !== 'All') {
      const sf = statusFilter.toLowerCase();
      result = result.filter(r => {
        const s = r.status?.toLowerCase() || '';
        if (sf === 'pending ed') return s === 'pending_ed';
        if (sf === 'pending hod') return s === 'pending_hod';
        if (sf === 'approved') return s === 'approved';
        if (sf === 'returned') return s.startsWith('returned');
        if (sf === 'rejected') return s === 'rejected';
        return true;
      });
    }

    if (categoryFilter !== 'All') {
      if (categoryFilter === 'Clubs') {
        result = result.filter(r => r.requisition_type === 'club');
      } else if (categoryFilter === 'Depts') {
        result = result.filter(r => r.requisition_type === 'department');
      }
    }

    setFilteredReqs(result);
  };

  // Keep filtered list in sync with updates and filter changes
  useEffect(() => {
    handleApplyFilters();
  }, [allRequisitions, deptFilter, categoryFilter, statusFilter]);

  const pendingEdCount = allRequisitions.filter(r => r.status?.toLowerCase() === 'pending_ed').length;
  
  // Calculate total approved expenditure dynamically
  const approvedReqs = allRequisitions.filter(r => r.status?.toLowerCase() === 'approved');
  const totalApprovedValue = approvedReqs.reduce((sum, r) => sum + parseFloat(r.total_estimated_cost || 0), 0);
  let formattedExp = '₹0.00';
  if (totalApprovedValue >= 100000) {
    formattedExp = `₹${(totalApprovedValue / 100000).toFixed(2)} L`;
  } else {
    formattedExp = `₹${totalApprovedValue.toLocaleString('en-IN')}`;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar activePage="EdRequisitions" onNavigate={onNavigate} currentUser={currentUser} />

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

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Institutional Requisitions</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Comprehensive oversight of all departmental and club resource requests.</p>
          </div>
          <button 
            onClick={() => alert('Exporting Annual CAPEX Expenditure Report... (PDF)')}
            style={{ backgroundColor: '#064e3b', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            Export Annual Report
          </button>
        </div>

        {/* Overview KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>TOTAL REQUISITIONS</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                {allRequisitions.length}
                <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>+12%</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>vs last year</div>
            </div>
            <span style={{ fontSize: '24px', color: '#16a34a' }}><ChartLine size={30} /></span>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>PENDING FINAL APPROVAL</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {pendingEdCount}
                {pendingEdCount > 0 && (
                  <span style={{ fontSize: '9px', backgroundColor: '#fee2e2', color: '#ef4444', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>URGENT</span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Awaiting ED Sign-off</div>
            </div>
            <span style={{ fontSize: '24px', color: '#f59e0b' }}><FileDown size={30 } /></span>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>INSTITUTIONAL EXPENDITURE</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{totalApprovedValue > 0 ? formattedExp : '₹12.45 L'}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Total approved value</div>
            </div>
            <span style={{ fontSize: '24px', color: '#059669' }}><IndianRupee size={30} /></span>
          </div>

          {/* Card 4 */}
          {/*<div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>APPROVAL TAT</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>2.8 Days</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Average turnaround time</div>
            </div>
            <span style={{ fontSize: '24px', color: '#3b82f6' }}>⚡</span>
          </div>*/}
        </div>

        {/* Filter Bar Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ flex: 1, minWidth: '140px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Entities</option>
            {Array.from(new Set(allRequisitions.map(r => r.requisition_type === 'department' ? r.department_name : r.club_name).filter(Boolean))).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ flex: 1, minWidth: '140px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Categories</option>
            <option value="Depts">Departments Only</option>
            <option value="Clubs">Clubs Only</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ flex: 1, minWidth: '140px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending ED">Pending ED</option>
            <option value="Approved">Approved</option>
            <option value="Returned">Returned</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button 
            onClick={handleApplyFilters}
            style={{ padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span><Search size={20} color='white' /></span> Apply Filters
          </button>
        </div>

        {/* Requisitions List Table */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11.5px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                <tr>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>INITIATOR</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>ENTITY</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>PROGRAMME NAME</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>DATE</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>VALUE (₹)</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{ padding: '24px', textAlign: 'center' }}>Loading requisitions...</td></tr>
                ) : filteredReqs.length === 0 ? (
                  <tr><td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No requisitions match the selected filter.</td></tr>
                ) : (
                  filteredReqs.map((req) => {
                    const isPendingEd = req.status?.toLowerCase() === 'pending_ed';
                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '18px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e2e8f0', color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '11px' }}>
                              {req.created_by_name ? req.created_by_name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: '#0f172a' }}>{req.created_by_name || 'Unknown'}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{req.created_by_email || ''}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 24px', color: '#475569', fontWeight: '500' }}>
                          {req.requisition_type === 'department' ? req.department_name : req.club_name}
                        </td>
                        <td style={{ padding: '18px 24px', color: '#0f172a', fontWeight: '600' }}>{req.programme_name}</td>
                        <td style={{ padding: '18px 24px', color: '#64748b' }}>{req.requisition_date}</td>
                        <td style={{ padding: '18px 24px', fontWeight: '600', color: '#0f172a' }}>
                          ₹{parseFloat(req.total_estimated_cost || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '18px 24px' }}>
                          {req.status?.toLowerCase() === 'pending_hod' && (
                            <span style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              PENDING HOD
                            </span>
                          )}
                          {req.status?.toLowerCase() === 'pending_ed' && (
                            <span style={{ backgroundColor: '#ffe8d6', color: '#ea580c', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              PENDING ED
                            </span>
                          )}
                          {req.status?.toLowerCase() === 'approved' && (
                            <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              APPROVED
                            </span>
                          )}
                          {req.status?.toLowerCase()?.startsWith('returned') && (
                            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              RETURNED
                            </span>
                          )}
                          {req.status?.toLowerCase() === 'rejected' && (
                            <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              REJECTED
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          {isPendingEd ? (
                            <button 
                              onClick={() => onViewRequisition(req.id)}
                              style={{ padding: '6px 12px', border: 'none', backgroundColor: '#16a34a', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              Sign-off
                            </button>
                          ) : (
                            <span 
                              onClick={() => onViewRequisition(req.id)}
                              style={{ color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}
                            >
                              <Eye size={25} />
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>
              Showing 1-{filteredReqs.length} of {filteredReqs.length} requisitions
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#94a3b8', cursor: 'not-allowed' }}>&lt;</button>
              <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#0f172a', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
              <button disabled style={{ padding: '6px 12px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#94a3b8', cursor: 'not-allowed' }}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdRequisitions;
