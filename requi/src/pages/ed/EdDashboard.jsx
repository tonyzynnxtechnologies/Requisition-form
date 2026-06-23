import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions } from '../../services/api';
import { NotepadText, FileText } from 'lucide-react';

const EdDashboard = ({ currentUser, onNavigate, onViewRequisition, onLogout }) => {
  const [pendingReqs, setPendingReqs] = useState([]);
  const [stats, setStats] = useState({
    pendingCount: 0,
    monthlyExpenditure: '₹12.45L',
    avgTat: '2.8 Days',
    budgetVariance: '92.4%'
  });
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getRequisitions();
      const reqs = Array.isArray(data) ? data : (data?.data || []);
      // ED views requisitions awaiting their final approval (pending_ed)
      const edPending = reqs.filter(r => r.status?.toLowerCase() === 'pending_ed');
      setPendingReqs(edPending);

      // Compute total expenditure of all approved requisitions
      const approvedReqs = reqs.filter(r => r.status?.toLowerCase() === 'approved');
      const totalApprovedValue = approvedReqs.reduce((sum, r) => sum + parseFloat(r.total_estimated_cost || 0), 0);
      
      // Formatting expenditure to Lakhs (e.g. ₹12.45L) or keeping normal rupee format
      let formattedExp = '₹0.00';
      if (totalApprovedValue >= 100000) {
        formattedExp = `₹${(totalApprovedValue / 100000).toFixed(2)}L`;
      } else {
        formattedExp = `₹${totalApprovedValue.toLocaleString('en-IN')}`;
      }

      setStats({
        pendingCount: edPending.length,
        monthlyExpenditure: totalApprovedValue > 0 ? formattedExp : '₹12.45L',
        avgTat: '2.8 Days',
        budgetVariance: '92.4%'
      });
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
                {currentUser?.name || 'Fr. Thomas Kurian'}
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold' }}>EXECUTIVE DIRECTOR</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#064e3b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              {currentUser?.name ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'TK'}
            </div>
          </div>
        </div>

        {/* Dashboard Title & Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Executive Overview</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Welcome back, {currentUser?.name || 'Fr. Thomas'}. You have <span style={{ color: '#dc2626', fontWeight: 'bold' }}>{stats.pendingCount} pending requisitions</span> requiring final sign-off.
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
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>Avg. aging: 4.2 days</div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}></span>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}><FileText size={25} /> +8.4%</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>MONTHLY EXPENDITURE</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{stats.monthlyExpenditure}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>vs. ₹11.5L last month</div>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>⏱</span>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>⚡ 12%</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>AVG. INSTITUTIONAL TAT</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{stats.avgTat}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>Improvement in process efficiency</div>
          </div>

          {/* Card 4 */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #64748b', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚖</span>
              <span style={{ fontSize: '10px', backgroundColor: '#e2e8f0', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ON TRACK</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>BUDGET VARIANCE</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{stats.budgetVariance}</div>
            <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '92.4%', backgroundColor: '#16a34a', borderRadius: '3px' }}></div>
            </div>
          </div>
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
          {/* Expenditure Trends */}
          <div style={{ flex: 1.5, minWidth: '320px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Expenditure Trends (6 Months)</h3>
              <select style={{ padding: '4px 8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', backgroundColor: 'white' }}>
                <option>FY 2023-24</option>
              </select>
            </div>
            {/* Pure CSS Bar Chart */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '160px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '50px', width: '28px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>JAN</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '70px', width: '28px', backgroundColor: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>FEB</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '60px', width: '28px', backgroundColor: '#94a3b8', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>MAR</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '110px', width: '28px', backgroundColor: '#86efac', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>APR</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '100px', width: '28px', backgroundColor: '#4ade80', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>MAY</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '130px', width: '28px', backgroundColor: '#064e3b', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>JUN</span>
              </div>
            </div>
          </div>

          {/* Recent Final Decisions */}
          <div style={{ flex: 1, minWidth: '280px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Recent Final Decisions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Approved</span>
                    <span style={{ color: '#94a3b8', fontSize: '11px' }}>Active</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '12px', lineHeight: '1.4' }}>Requisition final sign-offs executed dynamically via portal view.</div>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', flexShrink: 0 }}>✕</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Rejected</span>
                    <span style={{ color: '#94a3b8', fontSize: '11px' }}>Active</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '12px', lineHeight: '1.4' }}>Directly reject or return requisitions with real-time justification comments.</div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => alert('Opening System Audit Trail Log...')}
              style={{ width: '100%', marginTop: '20px', padding: '10px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              VIEW AUDIT TRAIL
            </button>
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
