import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDepartments, getUsers, getRequisitions } from '../../services/api';
import { Building2, Users2, BriefcaseBusiness } from 'lucide-react';

const EdDepartments = ({ currentUser, onNavigate }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [deptData, usersData, reqsResponse] = await Promise.all([
        getDepartments(),
        getUsers(),
        getRequisitions()
      ]);

      const reqsData = Array.isArray(reqsResponse) ? reqsResponse : (reqsResponse?.data || []);

      const processedDepts = deptData.map(dept => {
        // Find HOD for this department
        const deptHods = usersData.filter(u => u.role === 'hod' && u.department === dept.id);
        const hodName = deptHods.length > 0 ? deptHods[0].name : 'TBD';

        // Count staff
        const staffList = usersData.filter(u => u.role === 'staff' && u.department === dept.id);
        const staffCount = staffList.length;

        // Count active requisitions
        const deptReqs = reqsData.filter(r => r.requisition_type === 'department' && r.department === dept.id);
        const activeReqs = deptReqs.filter(r => ['pending_hod', 'pending_ed'].includes(r.status?.toLowerCase())).length;

        // Calculate approval rate
        const approvedCount = deptReqs.filter(r => r.status?.toLowerCase() === 'approved').length;
        const rejectedCount = deptReqs.filter(r => r.status?.toLowerCase() === 'rejected').length;
        const totalClosed = approvedCount + rejectedCount;
        const approvalRate = totalClosed > 0 ? Math.round((approvedCount / totalClosed) * 100) : null;

        // Determine administrative vs academic
        const lowerName = dept.name.toLowerCase();
        const type = (lowerName.includes('admin') || lowerName.includes('finance') || lowerName.includes('office') || lowerName.includes('hr')) 
          ? 'Administrative' 
          : 'Academic';

        // Budget status: ACTIVE only if dept has an ongoing requisition
        // (submitted/in-approval but programme date hasn't passed yet)
        const now = new Date();
        const hasOngoingReq = deptReqs.some(r => {
          const status = r.status?.toLowerCase();
          const isSubmitted = ['pending_hod', 'pending_ed', 'approved'].includes(status);
          if (!isSubmitted) return false;
          // Check if programme date hasn't passed yet
          if (r.programme_datetime) {
            return new Date(r.programme_datetime) >= now;
          }
          // Fallback to requisition_date if programme_datetime not set
          if (r.requisition_date) {
            return new Date(r.requisition_date) >= now;
          }
          return true; // If no date info, consider it ongoing
        });
        const budgetStatus = hasOngoingReq ? 'ACTIVE' : 'INACTIVE';

        // Faculty count
        const facultyCount = staffCount;

        return {
          id: dept.id,
          name: dept.name,
          hod: hodName,
          staffCount,
          activeReqs,
          approvalRate,
          type,
          budgetStatus,
          faculty: facultyCount
        };
      });

      setDepartments(processedDepts);
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
    }, 5000); // Poll every 5 seconds for real-time changes
    return () => clearInterval(interval);
  }, []);

  const totalDepts = departments.length;
  const activeHods = departments.filter(d => d.hod !== 'TBD').length;
  const totalStaff = departments.reduce((sum, d) => sum + d.staffCount, 0);
  const pendingBudgetCount = departments.filter(d => d.budgetStatus === 'ACTIVE').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar activePage="EdDepartments" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
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

        {/* Title 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Institutional Departments</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Governance and operational oversight of academic and administrative units.</p>
          </div>
          <button 
            onClick={() => alert('Creating new institutional department... (Functionality restricted to Administrator)')}
            style={{ backgroundColor: '#064e3b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            Add Department
          </button>
        </div>*/}

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><Building2 size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>TOTAL DEPARTMENTS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{totalDepts}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><Users2 size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>ACTIVE HODS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{activeHods}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}><BriefcaseBusiness size={30} /></div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>TOTAL STAFF COUNT</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{totalStaff}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>📊</div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>ACTIVE BUDGETS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{pendingBudgetCount}</div>
            </div>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {loading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px', color: '#64748b' }}>Loading departments data...</div>
          ) : departments.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px', color: '#64748b' }}>No departments registered in the system.</div>
          ) : (
            departments.map((dept) => (
              <div key={dept.id} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', backgroundColor: dept.type === 'Administrative' ? '#ffedd5' : '#e0e7ff', color: dept.type === 'Administrative' ? '#d97706' : '#4f46e5', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{dept.type.toUpperCase()}</span>
                  <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{dept.activeReqs} Active Req.</span>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{dept.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginTop: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#064e3b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '10px' }}>
                      {dept.hod !== 'TBD' ? dept.hod.split(' ').map(n => n.charAt(0)).join('').toUpperCase() : 'NA'}
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '11px' }}>Head of Department</div>
                      <div style={{ fontWeight: '500', color: '#0f172a' }}>{dept.hod}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', borderTop: '1px solid #f1f5f9', paddingTop: '12px', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>STAFF STRENGTH</div>
                    <div style={{ fontWeight: '600', color: '#0f172a', marginTop: '2px' }}>{dept.staffCount} Members</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>APPROVAL RATE</div>
                    <div style={{ fontWeight: '600', color: dept.approvalRate !== null ? '#16a34a' : '#94a3b8', marginTop: '2px' }}>{dept.approvalRate !== null ? `${dept.approvalRate}%` : 'N/A'}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', textAlign: 'right' }}>
                  <span style={{ color: '#064e3b', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => onNavigate('EdRequisitions', null, { deptFilter: dept.name })}>View Requisitions &gt;</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Staff Distribution Matrix */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>Staff Distribution Matrix</span>
            <span style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('Downloading Matrix Ledger...')}>📥</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11.5px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                <tr>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>DEPARTMENT</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>TYPE</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>HOD</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>FACULTY STAFF</th>
                  <th style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>BUDGET STATUS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ padding: '16px', textAlign: 'center' }}>Loading distribution matrix...</td></tr>
                ) : departments.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>No data available.</td></tr>
                ) : (
                  departments.map((dept) => (
                    <tr key={dept.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: '#0f172a' }}>{dept.name}</td>
                      <td style={{ padding: '16px 24px', color: '#475569' }}>{dept.type}</td>
                      <td style={{ padding: '16px 24px', color: '#475569' }}>{dept.hod}</td>
                      <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: '500' }}>{dept.faculty}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          backgroundColor: dept.budgetStatus === 'ACTIVE' ? '#dcfce7' : '#f1f5f9', 
                          color: dept.budgetStatus === 'ACTIVE' ? '#16a34a' : '#94a3b8', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '11px', 
                          fontWeight: 'bold' 
                        }}>
                          {dept.budgetStatus}
                        </span>
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

export default EdDepartments;
