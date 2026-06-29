import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import { getAnnualReportData, getMediaUrl } from '../../services/api';
import { getAcademicYear, AY_MONTH_LABELS, getAYMonthIndex, isInAcademicYear } from '../../utils/academicYear';
import { ArrowLeft, Printer, FileText } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const pct = (num, den) => den > 0 ? `${((num / den) * 100).toFixed(1)}%` : '0%';

const statusLabel = (s) => {
  const map = {
    draft: 'Draft', pending_hod: 'Pending HOD', pending_ed: 'Pending ED',
    approved: 'Approved', rejected: 'Rejected',
    returned_to_staff: 'Returned', returned_to_hod: 'Returned',
  };
  return map[s] || s;
};

const priorityLabel = (p) => {
  const map = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };
  return map[p] || p || 'Not Set';
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const diffHours = (a, b) => {
  if (!a || !b) return null;
  const diff = Math.abs(new Date(b) - new Date(a));
  return diff / 3600000; // ms → hours
};

const formatDuration = (hours) => {
  if (hours === null || hours === undefined) return '—';
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${hours.toFixed(1)}h`;
  return `${(hours / 24).toFixed(1)}d`;
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionStyle = {
  marginBottom: '40px',
  pageBreakInside: 'avoid',
};

const sectionTitle = {
  fontSize: '20px', fontWeight: '700', color: '#064e3b', margin: '0 0 16px 0',
  borderBottom: '2px solid #059669', paddingBottom: '8px',
};

const tableStyle = {
  width: '100%', borderCollapse: 'collapse', fontSize: '12px',
};

const thStyle = {
  padding: '10px 12px', backgroundColor: '#f0fdf4', color: '#064e3b',
  fontWeight: '700', borderBottom: '2px solid #059669', textAlign: 'left',
  fontSize: '11px', letterSpacing: '0.3px',
};

const tdStyle = {
  padding: '8px 12px', borderBottom: '1px solid #e5e7eb', color: '#374151',
  fontSize: '12px',
};

const tdRight = { ...tdStyle, textAlign: 'right', fontWeight: '600' };

const statCard = {
  padding: '16px 20px', backgroundColor: '#f0fdf4', borderRadius: '8px',
  border: '1px solid #dcfce7',
};

const statLabel = { fontSize: '11px', color: '#6b7280', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const statValue = { fontSize: '22px', fontWeight: '700', color: '#064e3b' };

// ─── Component ────────────────────────────────────────────────────────────────

const AnnualReport = ({ currentUser, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [requisitions, setRequisitions] = useState([]);
  const [academicYearLabel, setAcademicYearLabel] = useState('');
  const [startYear, setStartYear] = useState(() => {
    const ay = getAcademicYear(new Date());
    return ay.startYear;
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getAnnualReportData(startYear);
        if (res.success) {
          setRequisitions(res.data || []);
          setAcademicYearLabel(res.academic_year || `${startYear}–${String(startYear + 1).slice(-2)}`);
        }
      } catch (e) {
        console.error('Failed to load report data:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [startYear]);

  // ─── Computed data ────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const reqs = requisitions;
    const total = reqs.length;
    const approved = reqs.filter(r => r.status === 'approved').length;
    const rejected = reqs.filter(r => r.status === 'rejected').length;
    const returned = reqs.filter(r => r.status?.startsWith('returned')).length;
    const pending = reqs.filter(r => r.status === 'pending_hod' || r.status === 'pending_ed').length;
    const deptReqs = reqs.filter(r => r.requisition_type === 'department').length;
    const clubReqs = reqs.filter(r => r.requisition_type === 'club').length;
    const totalCost = reqs.reduce((s, r) => s + (r.total_estimated_cost || 0), 0);
    const approvedCost = reqs.filter(r => r.status === 'approved').reduce((s, r) => s + (r.total_estimated_cost || 0), 0);
    const departments = new Set(reqs.filter(r => r.department_name).map(r => r.department_name));
    const clubs = new Set(reqs.filter(r => r.club_name).map(r => r.club_name));

    // Approval times
    const hodTimes = [];
    const edTimes = [];
    reqs.forEach(r => {
      const submitAction = r.actions?.find(a => a.action === 'submitted' || a.action === 'resubmitted');
      const hodAction = r.actions?.find(a => a.action === 'approved_by_hod');
      const edAction = r.actions?.find(a => a.action === 'approved_by_ed');
      if (submitAction && hodAction) {
        const h = diffHours(submitAction.acted_at, hodAction.acted_at);
        if (h !== null) hodTimes.push(h);
      }
      if (hodAction && edAction) {
        const h = diffHours(hodAction.acted_at, edAction.acted_at);
        if (h !== null) edTimes.push(h);
      } else if (submitAction && edAction && !hodAction) {
        const h = diffHours(submitAction.acted_at, edAction.acted_at);
        if (h !== null) edTimes.push(h);
      }
    });

    const avgHod = hodTimes.length > 0 ? hodTimes.reduce((a, b) => a + b, 0) / hodTimes.length : null;
    const avgEd = edTimes.length > 0 ? edTimes.reduce((a, b) => a + b, 0) / edTimes.length : null;
    const fastestHod = hodTimes.length > 0 ? Math.min(...hodTimes) : null;
    const slowestHod = hodTimes.length > 0 ? Math.max(...hodTimes) : null;

    // Audit summary
    let totalApprovalActions = 0, totalRejectActions = 0, totalReturnActions = 0, totalResubmissions = 0, totalDocs = 0;
    reqs.forEach(r => {
      r.actions?.forEach(a => {
        if (a.action.includes('approved')) totalApprovalActions++;
        if (a.action.includes('rejected')) totalRejectActions++;
        if (a.action.includes('returned')) totalReturnActions++;
        if (a.action === 'resubmitted') totalResubmissions++;
      });
      totalDocs += r.document_count || 0;
    });

    return {
      total, approved, rejected, returned, pending, deptReqs, clubReqs,
      totalCost, approvedCost, departments: departments.size, clubs: clubs.size,
      avgHod, avgEd, fastestHod, slowestHod, hodTimes, edTimes,
      totalApprovalActions, totalRejectActions, totalReturnActions, totalResubmissions, totalDocs,
      returnedForCorrection: returned,
    };
  }, [requisitions]);

  // Department-wise summary
  const deptSummary = useMemo(() => {
    const map = {};
    requisitions.filter(r => r.requisition_type === 'department' && r.department_name).forEach(r => {
      if (!map[r.department_name]) map[r.department_name] = { submitted: 0, approved: 0, rejected: 0, pending: 0, cost: 0 };
      map[r.department_name].submitted++;
      if (r.status === 'approved') map[r.department_name].approved++;
      if (r.status === 'rejected') map[r.department_name].rejected++;
      if (r.status === 'pending_hod' || r.status === 'pending_ed') map[r.department_name].pending++;
      map[r.department_name].cost += r.total_estimated_cost || 0;
    });
    return Object.entries(map).sort((a, b) => b[1].submitted - a[1].submitted);
  }, [requisitions]);

  // Club-wise summary
  const clubSummary = useMemo(() => {
    const map = {};
    requisitions.filter(r => r.requisition_type === 'club' && r.club_name).forEach(r => {
      if (!map[r.club_name]) map[r.club_name] = { submitted: 0, approved: 0, rejected: 0, pending: 0, cost: 0 };
      map[r.club_name].submitted++;
      if (r.status === 'approved') map[r.club_name].approved++;
      if (r.status === 'rejected') map[r.club_name].rejected++;
      if (r.status === 'pending_hod' || r.status === 'pending_ed') map[r.club_name].pending++;
      map[r.club_name].cost += r.total_estimated_cost || 0;
    });
    return Object.entries(map).sort((a, b) => b[1].submitted - a[1].submitted);
  }, [requisitions]);

  // Priority analysis
  const priorityData = useMemo(() => {
    const map = { low: 0, medium: 0, high: 0, urgent: 0 };
    requisitions.forEach(r => {
      const p = r.priority?.toLowerCase() || 'medium';
      if (map.hasOwnProperty(p)) map[p]++;
      else map['medium']++;
    });
    return map;
  }, [requisitions]);

  // Monthly analysis
  const monthlyData = useMemo(() => {
    const months = AY_MONTH_LABELS.map(label => ({ label, submitted: 0, approved: 0, cost: 0 }));
    requisitions.forEach(r => {
      const d = new Date(r.requisition_date || r.created_at);
      if (isNaN(d.getTime())) return;
      const idx = getAYMonthIndex(d);
      months[idx].submitted++;
      if (r.status === 'approved') {
        months[idx].approved++;
        months[idx].cost += r.total_estimated_cost || 0;
      }
    });
    return months;
  }, [requisitions]);

  // Top requested items
  const topItems = useMemo(() => {
    const map = {};
    requisitions.forEach(r => {
      r.items?.forEach(item => {
        const name = (item.item_name || '').trim().toLowerCase();
        if (!name) return;
        if (!map[name]) map[name] = { name: item.item_name, count: 0, qty: 0 };
        map[name].count++;
        map[name].qty += item.required_quantity || 0;
      });
    });
    return Object.values(map).sort((a, b) => b.count - a.count).slice(0, 15);
  }, [requisitions]);

  // Financial summary
  const financial = useMemo(() => {
    const costs = requisitions.map(r => r.total_estimated_cost || 0);
    const highest = costs.length > 0 ? Math.max(...costs) : 0;
    const lowest = costs.length > 0 ? Math.min(...costs.filter(c => c > 0)) : 0;
    const avg = costs.length > 0 ? costs.reduce((a, b) => a + b, 0) / costs.length : 0;
    const highestReq = requisitions.find(r => (r.total_estimated_cost || 0) === highest);
    const lowestReq = requisitions.find(r => (r.total_estimated_cost || 0) === lowest && lowest > 0);
    return { highest, lowest: lowest || 0, avg, highestReq, lowestReq };
  }, [requisitions]);

  const handlePrint = () => window.print();

  const generatedDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { margin: 0; padding: 0; font-size: 11px; }
          .report-container {
            margin: 0 !important; padding: 20px 30px !important;
            max-width: 100% !important; box-shadow: none !important;
            border: none !important;
          }
          .page-break { page-break-before: always; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
        {/* Sidebar — hidden on print */}
        <div className="no-print">
          <Sidebar activePage="EdRequisitions" onNavigate={onNavigate} currentUser={currentUser} />
        </div>

        {/* Main */}
        <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }} className="report-main">
          <style>{`@media print { .report-main { margin-left: 0 !important; padding: 0 !important; } }`}</style>

          {/* Screen-only toolbar */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <button onClick={() => onNavigate('EdRequisitions')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#064e3b', fontWeight: '600', cursor: 'pointer' }}>
              <ArrowLeft size={18} /> Back to Requisitions
            </button>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Academic Year:</label>
              <select
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', backgroundColor: 'white' }}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const y = new Date().getFullYear() - i;
                  return <option key={y} value={y}>{y}–{String(y + 1).slice(-2)}</option>;
                })}
              </select>
              <button
                onClick={handlePrint}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#064e3b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                <Printer size={16} /> Print / Save PDF
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTop: '3px solid #059669', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>Loading report data...</span>
            </div>
          ) : (
            <div
              className="report-container"
              style={{
                maxWidth: '900px', margin: '0 auto', padding: '40px 48px',
                backgroundColor: 'white', borderRadius: '12px',
                border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 1 — COVER PAGE
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={{ textAlign: 'center', padding: '60px 0 40px', borderBottom: '3px solid #059669', marginBottom: '40px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px' }}>
                  NAIPUNNYA SCHOOL OF MANAGEMENT
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', margin: '0 0 8px 0', lineHeight: '1.2' }}>
                  Annual Requisition Report
                </h1>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#059669', marginBottom: '32px' }}>
                  Academic Year {academicYearLabel}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '13px', color: '#6b7280' }}>
                  <div><span style={{ fontWeight: '600' }}>Generated On:</span> {generatedDate}</div>
                  <div><span style={{ fontWeight: '600' }}>Generated By:</span> {currentUser?.name || 'Executive Director'}</div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 2 — EXECUTIVE SUMMARY
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>1. Executive Summary</h2>
                <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.8', margin: '0 0 20px 0' }}>
                  During the academic year {academicYearLabel}, the institution processed a total of <strong>{stats.total}</strong> requisitions
                  across <strong>{stats.departments}</strong> department{stats.departments !== 1 ? 's' : ''} and <strong>{stats.clubs}</strong> club{stats.clubs !== 1 ? 's' : ''}.
                  Of these, <strong>{stats.approved}</strong> were approved ({pct(stats.approved, stats.total)}),
                  <strong> {stats.rejected}</strong> were rejected, and <strong>{stats.returned}</strong> were returned for revision.
                  The overall approval rate stands at <strong>{pct(stats.approved, stats.total)}</strong> with
                  a total estimated expenditure of <strong>{fmt(stats.totalCost)}</strong>.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                  <div style={statCard}><div style={statLabel}>Total Submitted</div><div style={statValue}>{stats.total}</div></div>
                  <div style={statCard}><div style={statLabel}>Approved</div><div style={statValue}>{stats.approved}</div></div>
                  <div style={statCard}><div style={statLabel}>Rejected</div><div style={statValue}>{stats.rejected}</div></div>
                  <div style={statCard}><div style={statLabel}>Returned</div><div style={statValue}>{stats.returned}</div></div>
                  <div style={statCard}><div style={statLabel}>Approval Rate</div><div style={statValue}>{pct(stats.approved, stats.total)}</div></div>
                  <div style={statCard}><div style={statLabel}>Total Expenditure</div><div style={statValue}>{fmt(stats.totalCost)}</div></div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 3 — REQUISITION STATISTICS
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>2. Requisition Statistics</h2>
                <table style={tableStyle}>
                  <tbody>
                    {[
                      ['Total Requisitions Submitted', stats.total],
                      ['Department Requisitions', stats.deptReqs],
                      ['Club Requisitions', stats.clubReqs],
                      ['Approved Requisitions', stats.approved],
                      ['Pending Requisitions', stats.pending],
                      ['Rejected Requisitions', stats.rejected],
                      ['Returned Requisitions', stats.returned],
                      ['Average HOD Approval Time', formatDuration(stats.avgHod)],
                      ['Average ED Approval Time', formatDuration(stats.avgEd)],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                        <td style={{ ...tdStyle, fontWeight: '500' }}>{label}</td>
                        <td style={tdRight}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 4 — DEPARTMENT-WISE SUMMARY
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle} className="page-break">
                <h2 style={sectionTitle}>3. Department-wise Summary</h2>
                {deptSummary.length === 0 ? (
                  <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '13px' }}>No department requisitions in this academic year.</p>
                ) : (
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Department</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Submitted</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Approved</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Rejected</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Pending</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Estimated Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptSummary.map(([name, d], i) => (
                        <tr key={name} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={{ ...tdStyle, fontWeight: '600' }}>{name}</td>
                          <td style={tdRight}>{d.submitted}</td>
                          <td style={tdRight}>{d.approved}</td>
                          <td style={tdRight}>{d.rejected}</td>
                          <td style={tdRight}>{d.pending}</td>
                          <td style={tdRight}>{fmt(d.cost)}</td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f0fdf4', fontWeight: '700' }}>
                        <td style={{ ...tdStyle, fontWeight: '700' }}>Total</td>
                        <td style={tdRight}>{deptSummary.reduce((s, [, d]) => s + d.submitted, 0)}</td>
                        <td style={tdRight}>{deptSummary.reduce((s, [, d]) => s + d.approved, 0)}</td>
                        <td style={tdRight}>{deptSummary.reduce((s, [, d]) => s + d.rejected, 0)}</td>
                        <td style={tdRight}>{deptSummary.reduce((s, [, d]) => s + d.pending, 0)}</td>
                        <td style={tdRight}>{fmt(deptSummary.reduce((s, [, d]) => s + d.cost, 0))}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 5 — CLUB-WISE SUMMARY
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>4. Club-wise Summary</h2>
                {clubSummary.length === 0 ? (
                  <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '13px' }}>No club requisitions in this academic year.</p>
                ) : (
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Club</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Submitted</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Approved</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Rejected</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Pending</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Estimated Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clubSummary.map(([name, d], i) => (
                        <tr key={name} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={{ ...tdStyle, fontWeight: '600' }}>{name}</td>
                          <td style={tdRight}>{d.submitted}</td>
                          <td style={tdRight}>{d.approved}</td>
                          <td style={tdRight}>{d.rejected}</td>
                          <td style={tdRight}>{d.pending}</td>
                          <td style={tdRight}>{fmt(d.cost)}</td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f0fdf4', fontWeight: '700' }}>
                        <td style={{ ...tdStyle, fontWeight: '700' }}>Total</td>
                        <td style={tdRight}>{clubSummary.reduce((s, [, d]) => s + d.submitted, 0)}</td>
                        <td style={tdRight}>{clubSummary.reduce((s, [, d]) => s + d.approved, 0)}</td>
                        <td style={tdRight}>{clubSummary.reduce((s, [, d]) => s + d.rejected, 0)}</td>
                        <td style={tdRight}>{clubSummary.reduce((s, [, d]) => s + d.pending, 0)}</td>
                        <td style={tdRight}>{fmt(clubSummary.reduce((s, [, d]) => s + d.cost, 0))}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 6 — PRIORITY ANALYSIS
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>5. Priority Analysis</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {Object.entries(priorityData).map(([key, count]) => {
                    const colors = {
                      low: { bg: '#f0fdf4', border: '#dcfce7', text: '#16a34a' },
                      medium: { bg: '#eff6ff', border: '#dbeafe', text: '#2563eb' },
                      high: { bg: '#fffbeb', border: '#fef3c7', text: '#d97706' },
                      urgent: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
                    };
                    const c = colors[key] || colors.medium;
                    return (
                      <div key={key} style={{ padding: '20px', backgroundColor: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: c.text }}>{count}</div>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: c.text, textTransform: 'uppercase', marginTop: '4px' }}>{priorityLabel(key)}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{pct(count, stats.total)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 7 — MONTHLY REQUISITION ANALYSIS
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle} className="page-break">
                <h2 style={sectionTitle}>6. Monthly Requisition Analysis</h2>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Month</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Submitted</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Approved</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((m, i) => (
                      <tr key={m.label} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                        <td style={{ ...tdStyle, fontWeight: '600' }}>{m.label}</td>
                        <td style={tdRight}>{m.submitted}</td>
                        <td style={tdRight}>{m.approved}</td>
                        <td style={tdRight}>{m.cost > 0 ? fmt(m.cost) : '—'}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#f0fdf4', fontWeight: '700' }}>
                      <td style={{ ...tdStyle, fontWeight: '700' }}>Total</td>
                      <td style={tdRight}>{monthlyData.reduce((s, m) => s + m.submitted, 0)}</td>
                      <td style={tdRight}>{monthlyData.reduce((s, m) => s + m.approved, 0)}</td>
                      <td style={tdRight}>{fmt(monthlyData.reduce((s, m) => s + m.cost, 0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 8 — FINANCIAL SUMMARY
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>7. Financial Summary</h2>
                <table style={tableStyle}>
                  <tbody>
                    {[
                      ['Total Estimated Cost (All Requisitions)', fmt(stats.totalCost)],
                      ['Total Approved Expenditure', fmt(stats.approvedCost)],
                      ['Highest Value Requisition', financial.highestReq ? `${fmt(financial.highest)} — ${financial.highestReq.programme_name}` : '—'],
                      ['Lowest Value Requisition', financial.lowestReq ? `${fmt(financial.lowest)} — ${financial.lowestReq.programme_name}` : '—'],
                      ['Average Requisition Value', stats.total > 0 ? fmt(financial.avg) : '—'],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                        <td style={{ ...tdStyle, fontWeight: '500' }}>{label}</td>
                        <td style={tdRight}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Dept-wise expenditure sub-table */}
                {deptSummary.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Department-wise Expenditure</h3>
                    <table style={tableStyle}>
                      <thead><tr><th style={thStyle}>Department</th><th style={{ ...thStyle, textAlign: 'right' }}>Estimated Cost</th></tr></thead>
                      <tbody>
                        {deptSummary.map(([name, d], i) => (
                          <tr key={name} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                            <td style={tdStyle}>{name}</td>
                            <td style={tdRight}>{fmt(d.cost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Club-wise expenditure sub-table */}
                {clubSummary.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Club-wise Expenditure</h3>
                    <table style={tableStyle}>
                      <thead><tr><th style={thStyle}>Club</th><th style={{ ...thStyle, textAlign: 'right' }}>Estimated Cost</th></tr></thead>
                      <tbody>
                        {clubSummary.map(([name, d], i) => (
                          <tr key={name} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                            <td style={tdStyle}>{name}</td>
                            <td style={tdRight}>{fmt(d.cost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 9 — TOP REQUESTED ITEMS
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle} className="page-break">
                <h2 style={sectionTitle}>8. Top Requested Items</h2>
                {topItems.length === 0 ? (
                  <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '13px' }}>No item data available.</p>
                ) : (
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>Item</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Times Requested</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Total Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topItems.map((item, i) => (
                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={tdStyle}>{i + 1}</td>
                          <td style={{ ...tdStyle, fontWeight: '500', textTransform: 'capitalize' }}>{item.name}</td>
                          <td style={tdRight}>{item.count}</td>
                          <td style={tdRight}>{item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 10 — APPROVAL PERFORMANCE
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>9. Approval Performance</h2>
                <table style={tableStyle}>
                  <tbody>
                    {[
                      ['Fastest HOD Approval', formatDuration(stats.fastestHod)],
                      ['Slowest HOD Approval', formatDuration(stats.slowestHod)],
                      ['Average HOD Approval Time', formatDuration(stats.avgHod)],
                      ['Average ED Approval Time', formatDuration(stats.avgEd)],
                      ['Requisitions Returned for Correction', stats.returnedForCorrection],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                        <td style={{ ...tdStyle, fontWeight: '500' }}>{label}</td>
                        <td style={tdRight}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 11 — AUDIT SUMMARY
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>10. Audit Summary</h2>
                <table style={tableStyle}>
                  <tbody>
                    {[
                      ['Total Approval Actions', stats.totalApprovalActions],
                      ['Total Rejection Actions', stats.totalRejectActions],
                      ['Total Return Actions', stats.totalReturnActions],
                      ['Total Resubmissions', stats.totalResubmissions],
                      ['Total Documents Uploaded', stats.totalDocs],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                        <td style={{ ...tdStyle, fontWeight: '500' }}>{label}</td>
                        <td style={tdRight}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 12 — DETAILED REQUISITION REGISTER
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle} className="page-break">
                <h2 style={sectionTitle}>11. Detailed Requisition Register</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ ...tableStyle, fontSize: '11px' }}>
                    <thead>
                      <tr>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Req ID</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Date</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Programme Name</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Dept / Club</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Requested By</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Priority</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>Status</th>
                        <th style={{ ...thStyle, fontSize: '10px', textAlign: 'right' }}>Est. Cost</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>HOD</th>
                        <th style={{ ...thStyle, fontSize: '10px' }}>ED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requisitions.map((r, i) => {
                        const hodAction = r.actions?.find(a => a.action === 'approved_by_hod');
                        const edAction = r.actions?.find(a => a.action === 'approved_by_ed');
                        return (
                          <tr key={r.id} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                            <td style={{ ...tdStyle, fontWeight: '600', color: '#059669', fontSize: '10px' }}>{r.requisition_id}</td>
                            <td style={{ ...tdStyle, fontSize: '10px', whiteSpace: 'nowrap' }}>{formatDate(r.requisition_date || r.created_at)}</td>
                            <td style={{ ...tdStyle, fontSize: '10px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.programme_name}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>{r.department_name || r.club_name}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>{r.created_by_name}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>{priorityLabel(r.priority)}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>
                              <span style={{
                                padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '700',
                                backgroundColor: r.status === 'approved' ? '#dcfce7' : r.status === 'rejected' ? '#fecaca' : r.status?.startsWith('returned') ? '#dbeafe' : '#fef3c7',
                                color: r.status === 'approved' ? '#16a34a' : r.status === 'rejected' ? '#dc2626' : r.status?.startsWith('returned') ? '#2563eb' : '#d97706',
                              }}>
                                {statusLabel(r.status)}
                              </span>
                            </td>
                            <td style={{ ...tdRight, fontSize: '10px' }}>{fmt(r.total_estimated_cost || 0)}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>{r.hod_sign_name || (hodAction ? hodAction.acted_by_name : '—')}</td>
                            <td style={{ ...tdStyle, fontSize: '10px' }}>{r.ed_sign_name || (edAction ? edAction.acted_by_name : '—')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 13 — CONCLUSION
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={sectionStyle}>
                <h2 style={sectionTitle}>12. Conclusion</h2>
                <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                  The academic year {academicYearLabel} demonstrated a {stats.approved > stats.rejected ? 'positive' : 'challenging'} trajectory
                  in the institution's requisition management process. With an approval rate of <strong>{pct(stats.approved, stats.total)}</strong> across
                  <strong> {stats.total}</strong> total requisitions, the system ensured transparency and accountability in resource allocation.
                  {stats.avgHod !== null && (
                    <> The average HOD approval time of <strong>{formatDuration(stats.avgHod)}</strong> reflects the efficiency of departmental review processes.</>
                  )}
                  {stats.avgEd !== null && (
                    <> Executive-level approvals averaged <strong>{formatDuration(stats.avgEd)}</strong>, demonstrating swift decision-making at the institutional level.</>
                  )}
                  {' '}The digital requisition system continues to enhance workflow efficiency, reduce paperwork,
                  and maintain comprehensive audit trails for institutional governance.
                </p>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 14 — SIGNATURE SECTION
                  ═══════════════════════════════════════════════════════════════ */}
              <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', textAlign: 'center', fontSize: '13px', pageBreakInside: 'avoid' }}>
                <div>
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '8px' }}>
                    {/* System Admin placeholder */}
                  </div>
                  <div style={{ borderTop: '1px solid #374151', paddingTop: '8px', margin: '0 20px' }}>
                    <p style={{ margin: 0, fontWeight: '700', color: '#111827' }}>Prepared By</p>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '12px' }}>System Administrator</p>
                  </div>
                </div>
                <div>
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '8px' }}>
                    {currentUser?.signature && (
                      <img
                        src={getMediaUrl(currentUser.signature)}
                        alt="ED Signature"
                        style={{ maxWidth: '150px', maxHeight: '50px', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  <div style={{ borderTop: '1px solid #374151', paddingTop: '8px', margin: '0 20px' }}>
                    <p style={{ margin: 0, fontWeight: '700', color: '#111827' }}>Reviewed By</p>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '12px' }}>{currentUser?.name || 'Executive Director'}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '11px' }}>Executive Director</p>
                  </div>
                </div>
              </div>

              {/* Date line */}
              <div style={{ marginTop: '40px', textAlign: 'right', fontSize: '12px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                Date: {generatedDate}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnnualReport;
