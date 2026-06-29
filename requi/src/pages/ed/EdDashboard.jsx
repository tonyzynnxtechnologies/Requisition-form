import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions, getAuditTrail } from '../../services/api';
import { getAcademicYear, getMonthlyTotals, getAYTotalExpenditure, formatRupee, AY_MONTH_LABELS, getAYMonthIndex } from '../../utils/academicYear';
import { NotepadText } from 'lucide-react';

const EdDashboard = ({ currentUser, onNavigate, onViewRequisition, onLogout }) => {
  const [pendingReqs, setPendingReqs] = useState([]);
  const [stats, setStats] = useState({
    pendingCount: 0,
    currentAYExpenditure: 0,
    prevAYExpenditure: 0,
    currentAYLabel: '',
    prevAYLabel: '',
  });
  const [loading, setLoading] = useState(true);
  const [auditTrail, setAuditTrail] = useState([]);
  const [showAllAudit, setShowAllAudit] = useState(false);
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0));
  const [prevMonthlyData, setPrevMonthlyData] = useState(new Array(12).fill(0));
  const [currentMonthStats, setCurrentMonthStats] = useState({ current: 0, previous: 0, monthLabel: '' });

  const loadDashboardData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getRequisitions();
      const reqs = Array.isArray(data) ? data : (data?.data || []);
      // ED views requisitions awaiting their final approval (pending_ed)
      const edPending = reqs.filter(r => r.status?.toLowerCase() === 'pending_ed');
      setPendingReqs(edPending);

      // Compute academic year expenditure
      const currentAY = getAcademicYear(new Date());
      const prevAYStartYear = currentAY.startYear - 1;

      const currentAYTotal = getAYTotalExpenditure(reqs, currentAY.startYear);
      const prevAYTotal = getAYTotalExpenditure(reqs, prevAYStartYear);

      // Compute monthly totals for the bar chart
      const monthTotals = getMonthlyTotals(reqs, currentAY.startYear);
      setMonthlyData(monthTotals);

      // Compute previous AY monthly totals for comparison
      const prevMonthTotals = getMonthlyTotals(reqs, prevAYStartYear);
      setPrevMonthlyData(prevMonthTotals);

      // Current month vs previous month comparison
      const now = new Date();
      const currentAYIdx = getAYMonthIndex(now);
      const currentMonthLabel = AY_MONTH_LABELS[currentAYIdx];
      const prevMonthIdx = currentAYIdx > 0 ? currentAYIdx - 1 : 11;
      const prevMonthLabel = AY_MONTH_LABELS[prevMonthIdx];
      // If prevMonthIdx wraps to previous AY (i.e. current is JUN), use prevAY data
      const prevMonthValue = currentAYIdx > 0 ? monthTotals[prevMonthIdx] : prevMonthTotals[prevMonthIdx];
      setCurrentMonthStats({
        current: monthTotals[currentAYIdx],
        previous: prevMonthValue,
        monthLabel: currentMonthLabel,
        prevMonthLabel: prevMonthLabel,
      });

      setStats({
        pendingCount: edPending.length,
        currentAYExpenditure: currentAYTotal,
        prevAYExpenditure: prevAYTotal,
        currentAYLabel: currentAY.label,
        prevAYLabel: `${prevAYStartYear}–${String(prevAYStartYear + 1).slice(-2)}`,
      });

      // Fetch audit trail
      try {
        const auditRes = await getAuditTrail(50);
        const auditData = Array.isArray(auditRes) ? auditRes : (auditRes?.data || []);
        setAuditTrail(auditData);
      } catch (auditErr) {
        console.error('Failed to load audit trail:', auditErr);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData(true);
    const interval = setInterval(() => {
      loadDashboardData(false);
    }, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar activePage="Dashboard" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#111827', fontSize: '14px', fontWeight: '600' }}>
                {currentUser?.name || 'Executive Director'}
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold' }}>EXECUTIVE DIRECTOR</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#064e3b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              {currentUser?.name ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'ED'}
            </div>
          </div>
        </div>

        {/* Dashboard Title & Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Executive Overview</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Welcome back, {currentUser?.name || 'Director'}. You have <span style={{ color: '#dc2626', fontWeight: 'bold' }}>{stats.pendingCount} pending requisitions</span> requiring final sign-off.
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #16a34a', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}><NotepadText size={25} /></span>
              <span style={{ fontSize: '10px', backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ACTION NEEDED</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>AWAITING FINAL APPROVAL</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{stats.pendingCount}</div>
          </div>

          {/* Card 2 — Academic Year Expenditure */}
          {(() => {
            const pctChange = stats.prevAYExpenditure > 0
              ? (((stats.currentAYExpenditure - stats.prevAYExpenditure) / stats.prevAYExpenditure) * 100).toFixed(1)
              : null;
            const isUp = pctChange !== null && parseFloat(pctChange) >= 0;
            return (
              <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '20px' }}>💰</span>
                  {pctChange !== null && (
                    <span style={{ fontSize: '11px', color: isUp ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                      {isUp ? '📈' : '📉'} {isUp ? '+' : ''}{pctChange}%
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>AY {stats.currentAYLabel} EXPENDITURE</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{formatRupee(stats.currentAYExpenditure)}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  vs. {formatRupee(stats.prevAYExpenditure)} in {stats.prevAYLabel}
                </div>
              </div>
            );
          })()}

          {/* Card 3 — This Month vs Previous Month */}
          {(() => {
            const mPctChange = currentMonthStats.previous > 0
              ? (((currentMonthStats.current - currentMonthStats.previous) / currentMonthStats.previous) * 100).toFixed(1)
              : null;
            const mIsUp = mPctChange !== null && parseFloat(mPctChange) >= 0;
            return (
              <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '20px' }}>📅</span>
                  {mPctChange !== null && (
                    <span style={{ fontSize: '11px', color: mIsUp ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                      {mIsUp ? '📈' : '📉'} {mIsUp ? '+' : ''}{mPctChange}%
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>{currentMonthStats.monthLabel} EXPENDITURE</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{formatRupee(currentMonthStats.current)}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  vs. {formatRupee(currentMonthStats.previous)} in {currentMonthStats.prevMonthLabel || 'prev month'}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Pending Requisitions Table Section */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a', margin: '0 0 4px 0' }}>Pending Requisitions</h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Review and action institutional requests awaiting final executive approval.</p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                <tr>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>REQ ID</th>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>INITIATOR</th>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>DEPT / CLUB</th>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>PROGRAMME</th>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>TOTAL VALUE</th>
                  <th style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center' }}>Loading requisitions...</td></tr>
                ) : pendingReqs.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No pending requisitions awaiting final approval.</td></tr>
                ) : (
                  pendingReqs.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#16a34a' }}>REQ-{req.id}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                            {req.created_by_name ? req.created_by_name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'U'}
                          </div>
                          <span>{req.created_by_name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#475569' }}>
                        {req.requisition_type === 'department' ? req.department_name : req.club_name}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#475569' }}>{req.programme_name}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#0f172a' }}>
                        ₹{parseFloat(req.total_estimated_cost || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => onViewRequisition(req.id)}
                          style={{ border: 'none', background: 'none', color: '#16a34a', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                        >
                          Review & Sign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
            <span
              onClick={() => onNavigate('Dashboard')}
              style={{ color: '#64748b', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              View All {stats.pendingCount} Pending Approvals
            </span>
          </div>
        </div>

        {/* Bottom Section (Trends and Recent Decisions) */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* Expenditure Trends — Academic Year */}
          <div style={{ flex: 1.5, minWidth: '320px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Expenditure Trends (Academic Year)</h3>
              <span style={{ padding: '4px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', backgroundColor: 'white', color: '#475569' }}>
                AY {stats.currentAYLabel || '—'}
              </span>
            </div>
            {/* Dynamic Dual-Bar Chart: Current AY vs Previous AY */}
            {(() => {
              const maxVal = Math.max(...monthlyData, ...prevMonthlyData, 1);
              const maxBarHeight = 130;
              return (
                <>
                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '11px', color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#16a34a' }}></div>
                      AY {stats.currentAYLabel || '—'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#cbd5e1' }}></div>
                      AY {stats.prevAYLabel || '—'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: `${maxBarHeight + 25}px`, borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '8px' }}>
                    {AY_MONTH_LABELS.map((label, idx) => {
                      const curVal = monthlyData[idx];
                      const prevVal = prevMonthlyData[idx];
                      const curH = maxVal > 0 ? Math.max(curVal > 0 ? 6 : 3, (curVal / maxVal) * maxBarHeight) : 3;
                      const prevH = maxVal > 0 ? Math.max(prevVal > 0 ? 6 : 3, (prevVal / maxVal) * maxBarHeight) : 3;
                      return (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
                          {curVal > 0 && (
                            <span style={{ fontSize: '7px', color: '#16a34a', whiteSpace: 'nowrap', fontWeight: '600' }}>
                              {curVal >= 100000 ? `${(curVal / 100000).toFixed(1)}L` : `${(curVal / 1000).toFixed(0)}K`}
                            </span>
                          )}
                          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                            <div style={{
                              height: `${prevH}px`, width: '10px',
                              backgroundColor: prevVal > 0 ? '#cbd5e1' : '#f1f5f9',
                              borderRadius: '2px', transition: 'height 0.5s ease'
                            }}></div>
                            <div style={{
                              height: `${curH}px`, width: '10px',
                              backgroundColor: curVal > 0 ? '#16a34a' : '#e2e8f0',
                              borderRadius: '2px', transition: 'height 0.5s ease'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '8px', color: '#64748b', fontWeight: '600' }}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Institutional Audit Trail */}
          <div style={{ flex: 1, minWidth: '280px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', maxHeight: '420px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Institutional Audit Trail</h3>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Recent actions across all departments & clubs</div>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {auditTrail.length === 0 ? (
                <div style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', padding: '24px 0' }}>No audit records found.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                  {(showAllAudit ? auditTrail : auditTrail.slice(0, 8)).map((entry, idx) => {
                    // Determine action styling
                    const isApprove = entry.action.includes('approved');
                    const isReject = entry.action.includes('rejected');
                    const isReturn = entry.action.includes('returned');
                    const isSubmit = entry.action === 'submitted' || entry.action === 'resubmitted';

                    const dotColor = isApprove ? '#16a34a' : isReject ? '#dc2626' : isReturn ? '#d97706' : '#2563eb';
                    const actionBg = isApprove ? '#f0fdf4' : isReject ? '#fef2f2' : isReturn ? '#fffbeb' : '#eff6ff';
                    const actionColor = isApprove ? '#16a34a' : isReject ? '#dc2626' : isReturn ? '#d97706' : '#2563eb';

                    // Role label for college context
                    const roleLabel = entry.acted_by_role === 'ed' ? 'Executive Director'
                      : entry.acted_by_role === 'hod' ? 'Head of Dept.'
                        : entry.acted_by_role === 'staff' ? 'Staff'
                          : entry.acted_by_role === 'admin' ? 'Administrator'
                            : '';

                    // Format action display text for college
                    const actionLabel = entry.action === 'submitted' ? 'Requisition Submitted'
                      : entry.action === 'resubmitted' ? 'Requisition Re-submitted'
                        : entry.action === 'approved_by_hod' ? 'HOD Recommended'
                          : entry.action === 'rejected_by_hod' ? 'HOD Rejected'
                            : entry.action === 'returned_by_hod' ? 'Returned to Staff'
                              : entry.action === 'approved_by_ed' ? 'ED Approved'
                                : entry.action === 'rejected_by_ed' ? 'ED Rejected'
                                  : entry.action === 'returned_by_ed' ? 'Returned to HOD'
                                    : entry.action_display || entry.action.replace(/_/g, ' ');

                    // Time ago
                    const actedDate = new Date(entry.acted_at);
                    const now = new Date();
                    const diffMs = now - actedDate;
                    const diffMins = Math.floor(diffMs / 60000);
                    const diffHours = Math.floor(diffMs / 3600000);
                    const diffDays = Math.floor(diffMs / 86400000);
                    const timeAgo = diffMins < 1 ? 'Just now'
                      : diffMins < 60 ? `${diffMins}m ago`
                        : diffHours < 24 ? `${diffHours}h ago`
                          : diffDays < 7 ? `${diffDays}d ago`
                            : actedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

                    const isLast = idx === (showAllAudit ? auditTrail.length - 1 : Math.min(7, auditTrail.length - 1));

                    return (
                      <div key={entry.id} style={{ display: 'flex', gap: '12px', minHeight: '52px' }}>
                        {/* Timeline line + dot */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12px', flexShrink: 0 }}>
                          <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: dotColor, marginTop: '4px', flexShrink: 0,
                            boxShadow: `0 0 0 3px ${actionBg}`
                          }}></div>
                          {!isLast && (
                            <div style={{ width: '2px', flex: 1, backgroundColor: '#e5e7eb', minHeight: '20px' }}></div>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, paddingBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{
                              fontSize: '11px', fontWeight: 'bold',
                              backgroundColor: actionBg, color: actionColor,
                              padding: '2px 8px', borderRadius: '4px'
                            }}>{actionLabel}</span>
                            <span style={{ fontSize: '10px', color: '#94a3b8', whiteSpace: 'nowrap', marginTop: '2px' }}>{timeAgo}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#374151', marginTop: '4px', lineHeight: '1.4' }}>
                            <span style={{ fontWeight: '600' }}>{entry.acted_by_name}</span>
                            <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: '4px' }}>({roleLabel})</span>
                          </div>
                          <div
                            style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', cursor: 'pointer' }}
                            onClick={() => onViewRequisition(entry.requisition_id)}
                          >
                            REQ-{entry.requisition_id} · {entry.programme_name}
                            {entry.entity_name && <span style={{ color: '#94a3b8' }}> · {entry.entity_name}</span>}
                          </div>
                          {entry.comment && (
                            <div style={{
                              fontSize: '11px', color: '#64748b', fontStyle: 'italic',
                              backgroundColor: '#f8fafc', borderLeft: '2px solid #cbd5e1',
                              padding: '4px 8px', borderRadius: '0 4px 4px 0', marginTop: '4px'
                            }}>
                              "{entry.comment}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {auditTrail.length > 8 && (
              <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', textAlign: 'center', flexShrink: 0 }}>
                <span
                  onClick={() => setShowAllAudit(!showAllAudit)}
                  style={{ color: '#064e3b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {showAllAudit ? 'Show Less' : `View All ${auditTrail.length} Records`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '40px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
          <div>© 2024 Naipunnya Digital Requisition System v2.4.0 · <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Security Policy</span></div>
          <div>🔒 Encrypted Enterprise Connection</div>
        </div>
      </div>
    </div>
  );
};

export default EdDashboard;