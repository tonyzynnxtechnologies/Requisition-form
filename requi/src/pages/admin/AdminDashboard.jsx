import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDashboardStats, getRequisitions } from '../../services/api';
import { ChartLine, Check, X } from "lucide-react";

const AdminDashboard = ({ currentUser, onNavigate, onViewRequisition }) => {
  const [stats, setStats] = useState({
    totalSubmitted: 0,
    pendingApproval: 0,
    approvedCount: 0,
    rejectedCount: 0,
    approvalRate: '0%'
  });
  const [recentRequisitions, setRecentRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const dashboardStats = await getDashboardStats();
        const data = dashboardStats?.data || dashboardStats || {};

        const total = data.total_requisitions || 0;
        const pending = (data.pending_hod || 0) + (data.pending_ed || 0);
        const approved = data.approved || 0;
        const rejected = data.rejected || 0;

        setStats({
          totalSubmitted: total,
          pendingApproval: pending,
          approvedCount: approved,
          rejectedCount: rejected,
          approvalRate: total > 0 ? `${Math.round((approved / total) * 100)}%` : '0%'
        });

        const reqData = await getRequisitions();
        const reqs = reqData?.data || reqData || [];
        // Filter to show only pending requisitions (pending HOD, pending ED, or returned to HOD)
        const pendingReqs = Array.isArray(reqs)
          ? reqs.filter(r => ['pending_hod', 'pending_ed', 'returned_to_hod'].includes(r.status))
          : [];
        setRecentRequisitions(pendingReqs.slice(0, 3));
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        if (showLoading) setLoading(false);
      }
    };
    fetchData(true);
    const interval = setInterval(() => {
      fetchData(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (status) => {
    const map = {
      draft: { bg: '#f3f4f6', color: '#6b7280', icon: '📝', label: 'DRAFT' },
      pending_hod: { bg: '#fef3c7', color: '#d97706', icon: '⏱', label: 'PENDING HOD' },
      pending_ed: { bg: '#ffedd5', color: '#ea580c', icon: '⏱', label: 'PENDING ED' },
      approved: { bg: '#dcfce7', color: '#16a34a', icon: '✓', label: 'APPROVED' },
      rejected: { bg: '#fee2e2', color: '#ef4444', icon: '✕', label: 'REJECTED' },
      returned_to_staff: { bg: '#e0e7ff', color: '#4f46e5', icon: '↩', label: 'RETURNED' },
      returned_to_hod: { bg: '#e0e7ff', color: '#4f46e5', icon: '↩', label: 'RETURNED HOD' },
    };
    return map[status] || { bg: '#f3f4f6', color: '#6b7280', icon: '•', label: String(status).toUpperCase() };
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
        <Sidebar activePage="Dashboard" onNavigate={onNavigate} currentUser={currentUser} />
        <div style={{ flex: 1, marginLeft: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280' }}>
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const total = stats.totalSubmitted || 0;
  const approvedPct = total > 0 ? Math.round((stats.approvedCount / total) * 100) : 0;
  const pendingPct = total > 0 ? Math.round((stats.pendingApproval / total) * 100) : 0;
  const rejectedPct = total > 0 ? Math.round((stats.rejectedCount / total) * 100) : 0;
  const otherPct = total > 0 ? Math.max(0, 100 - (approvedPct + pendingPct + rejectedPct)) : 100;

  const stop1 = approvedPct;
  const stop2 = stop1 + pendingPct;
  const stop3 = stop2 + rejectedPct;

  const gradientString = total > 0
    ? `conic-gradient(#16a34a 0% ${stop1}%, #ff9800 ${stop1}% ${stop2}%, #ef4444 ${stop2}% ${stop3}%, #d1d5db ${stop3}% 100%)`
    : 'conic-gradient(#d1d5db 0% 100%)';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="Dashboard" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#f5f6fa', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white' }}>
              {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL REQUISITIONS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{stats.totalSubmitted}</div>
              <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '4px' }}><ChartLine size={20} /></span>Live</div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>PENDING REVIEW</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>{stats.pendingApproval}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Requires Action</div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVED REQS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>{stats.approvedCount}</div>
              <div style={{ color: '#16a34a', fontSize: '18px' }}><Check size={20} /></div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>REJECTED REQS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{stats.rejectedCount}</div>
              <div style={{ color: '#ef4444', fontSize: '18px' }}><X size={20} /></div>
            </div>
          </div>
        </div>

        {/* Two Columns */}
        <div style={{ display: 'flex', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
          {/* Left: Requisition list for action */}
          <div style={{ flex: 2, minWidth: '350px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Pending Requisition Registry</div>
              <button
                onClick={() => onNavigate('AllRequisitions')}
                style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                View Registry →
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {recentRequisitions.length === 0 ? (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: '#6b7280' }}>
                  No recent requisitions found.
                </div>
              ) : (
                recentRequisitions.map((req) => {
                  const statusConf = getStatusConfig(req.status);
                  return (
                    <div
                      key={req.id}
                      style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid #f3f4f6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => onViewRequisition(req.id)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: statusConf.bg,
                          color: statusConf.color,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
                          {statusConf.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>
                            {req.programme_name} (#{req.id})
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                            Initiator: {req.created_by_name} ({req.requisition_type === 'department' ? req.department_name : req.club_name}) · {req.requisition_date}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: statusConf.bg,
                          color: statusConf.color
                        }}>
                          {statusConf.label}
                        </span>
                        <span style={{ color: '#9ca3af', fontSize: '16px' }}>👁️</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
              <button
                onClick={() => onNavigate('AllRequisitions')}
                style={{ background: 'none', border: 'none', color: '#111827', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                View Full Registry List
              </button>
            </div>
          </div>

          {/* Right: Requisition Status Donut Chart */}
          <div style={{ flex: 1, minWidth: '250px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '32px', color: '#111827' }}>Requisition Status</div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', flex: 1, alignItems: 'center' }}>
              <div style={{
                width: '180px', height: '180px', borderRadius: '50%',
                background: gradientString,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                position: 'relative',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
              }}>
                <div style={{ width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{stats.totalSubmitted}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>TOTAL</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#16a34a', borderRadius: '2px', marginRight: '8px' }}></div>
                <span style={{ color: '#4b5563' }}>Approved ({approvedPct}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ff9800', borderRadius: '2px', marginRight: '8px' }}></div>
                <span style={{ color: '#4b5563' }}>Pending ({pendingPct}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px', marginRight: '8px' }}></div>
                <span style={{ color: '#4b5563' }}>Rejected ({rejectedPct}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#d1d5db', borderRadius: '2px', marginRight: '8px' }}></div>
                <span style={{ color: '#4b5563' }}>Other ({otherPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', color: '#9ca3af', fontSize: '12px' }}>
          © 2026 Naipunnya Digital Requisition System · v2.4.0
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
