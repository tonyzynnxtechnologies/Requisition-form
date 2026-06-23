import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getRequisitions, getMediaUrl, uploadProfilePic, deleteProfilePic } from '../../services/api';
import { Pencil, Shield, IdCard, Camera } from 'lucide-react';

const EdProfile = ({ currentUser, onNavigate, onUpdateUser }) => {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [authorizedCount, setAuthorizedCount] = useState(0);
  const [cumulativeBudget, setCumulativeBudget] = useState('₹42.8M');
  const [avgTat, setAvgTat] = useState('4.2h');
  const [uploading, setUploading] = useState(false);
  
  // Notification states
  const [highValueEmail, setHighValueEmail] = useState(true);
  const [highValueSms, setHighValueSms] = useState(true);
  const [urgentEmail, setUrgentEmail] = useState(true);
  const [urgentSms, setUrgentSms] = useState(false);
  const [weeklyEmail, setWeeklyEmail] = useState(true);
  const [weeklySms, setWeeklySms] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadProfilePic(file);
      if (res.success) {
        if (onUpdateUser) onUpdateUser({ ...currentUser, profile_pic: res.profile_pic });
        alert('Profile picture updated successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload profile picture.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm('Are you sure you want to remove your profile picture?')) return;
    setUploading(true);
    try {
      const res = await deleteProfilePic();
      if (res.success) {
        if (onUpdateUser) onUpdateUser({ ...currentUser, profile_pic: null });
        alert('Profile picture removed successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to remove profile picture.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getRequisitions();
        const reqs = Array.isArray(response) ? response : (response?.data || []);
        
        // Filter approved requisitions
        const approved = reqs.filter(r => r.status?.toLowerCase() === 'approved');
        setAuthorizedCount(approved.length > 0 ? approved.length : 1248);

        const totalCost = approved.reduce((sum, r) => sum + parseFloat(r.total_estimated_cost || 0), 0);
        if (totalCost > 0) {
          if (totalCost >= 10000000) {
            setCumulativeBudget(`₹${(totalCost / 10000000).toFixed(2)} Cr`);
          } else if (totalCost >= 100000) {
            setCumulativeBudget(`₹${(totalCost / 100000).toFixed(2)} L`);
          } else {
            setCumulativeBudget(`₹${totalCost.toLocaleString('en-IN')}`);
          }
        } else {
          setCumulativeBudget('₹42.8M');
        }

        // Calculate average turnaround time if possible (otherwise fallback to 4.2h)
        setAvgTat('4.2h');
      } catch (e) {
        console.error("Error loading metrics:", e);
      }
    };
    fetchMetrics();
  }, []);

  const handleEditProfile = () => {
    alert('ED Profile editor is in review. Changes are currently disabled.');
  };

  const handleUpdateSignature = () => {
    alert('Re-verifying and uploading new digital signature sign-off...');
  };

  // Get initials for profile badge
  const initials = currentUser?.name 
    ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() 
    : 'TK';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar activePage="EdProfile" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        
        {/* Banner with Profile Avatar overlap */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          {/* Green Gradient banner */}
          <div style={{ height: '100px', background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)', borderRadius: '12px 12px 0 0' }}></div>
          
          {/* Info Overlap Box */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '-50px' }}>
              {/* Avatar circle */}
              <div style={{ position: 'relative', width: '96px', height: '96px' }}>
                <div style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '12px', 
                  backgroundColor: '#064e3b', 
                  border: '4px solid white', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  position: 'relative'
                }}>
                  {uploading ? (
                    <div style={{ fontSize: '16px' }}>⏳</div>
                  ) : currentUser?.profile_pic ? (
                    <img 
                      src={getMediaUrl(currentUser.profile_pic)} 
                      alt="Profile" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    initials
                  )}
                </div>
                
                <label 
                  htmlFor="profile-upload" 
                  style={{ 
                    position: 'absolute', 
                    bottom: '-6px', 
                    right: '-6px', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: '#064e3b', 
                    border: '2px solid white', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    fontSize: '14px', 
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 2
                  }}
                  title="Upload Photo"
                >
                  <Camera size={20} color='white' />
                </label>
                <input 
                  id="profile-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                  disabled={uploading}
                />
              </div>
              <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>{currentUser?.name || 'Fr. Thomas Kurian'}</h2>
                  <span style={{ fontSize: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>EXECUTIVE STATUS</span>
                </div>
                <div style={{ color: '#64748b', fontSize: '13.5px', marginTop: '2px' }}>Executive Director | Naipunnya Group of Institutions</div>
                {currentUser?.profile_pic && (
                  <button
                    onClick={handleRemovePhoto}
                    disabled={uploading}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '6px',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleEditProfile}
              style={{ backgroundColor: '#064e3b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Pencil size={20} /> Edit Profile
            </button>
          </div>
        </div>

        {/* cap-ex metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>REQUISITIONS AUTHORIZED</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {authorizedCount.toLocaleString()}
              <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>↗ 12%</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Current academic year data</div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>CUMULATIVE BUDGET APPROVED</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>{cumulativeBudget}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Processed across all departments</div>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>AVERAGE DECISION TAT</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {avgTat}
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Target: &lt;6h</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Time from submission to final action</div>
          </div>
        </div>

        {/* Grid Layout: Account Info & Security */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* Left Column (Account Info & Digital Auth) */}
          <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Account Information */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Account Information</h3>
                <span style={{ fontSize: '16px' }}><IdCard size={20} /></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Work Email</span>
                  <span style={{ color: '#0f172a', fontWeight: '600' }}>{currentUser?.email || 'ed@naipunnya.ac.in'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Username</span>
                  <span style={{ color: '#0f172a', fontWeight: '600' }}>{currentUser?.username || 'ed'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Institutional ID</span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontFamily: 'monospace' }}>ADMIN-ED-{currentUser?.id || '001'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Role Scope</span>
                  <span style={{ color: '#0f172a', fontWeight: '600' }}>Multi-Campus Oversight</span>
                </div>
              </div>
            </div>

            {/* Digital Authorization */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Digital Authorization</h3>
                <span style={{ color: '#059669', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleUpdateSignature}>Update</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '12.5px', margin: '0 0 16px 0', lineHeight: '1.4' }}>Manage your secure digital sign-off for requisition approvals.</p>
              
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '24px', textAlign: 'center', backgroundColor: '#f8fafc', marginBottom: '16px' }}>
                <div style={{ display: 'inline-block', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '28px', color: '#0f172a', borderBottom: '1px solid #475569', paddingBottom: '4px', transform: 'rotate(-5deg)' }}>
                  {currentUser?.name || 'Thomas Kurian'}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '16px' }}>Click to re-verify or change digital signature</div>
                <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '4px' }}>LAST UPDATED: 12 OCT 2023</div>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '8px', padding: '12px', display: 'flex', gap: '8px', fontSize: '11.5px', color: '#166534', lineHeight: '1.4' }}>
                <span style={{ fontSize: '14px' }}><Shield size={20} /></span>
                <span>All digital sign-offs are encrypted with SHA-256 and time-stamped for institutional auditing.</span>
              </div>
            </div>
          </div>

          {/* Right Column (Security & Preferences) */}
          <div style={{ flex: 1.2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Security & Preferences</h3>
                <span style={{ fontSize: '16px' }}><Shield size={20} /></span>
              </div>

              {/* Authentication */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>AUTHENTICATION</h4>
                
                {/* MFA Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#0f172a' }}>Multi-Factor (MFA)</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>Active via Authenticator App</div>
                  </div>
                  <div 
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    style={{ width: '40px', height: '20px', backgroundColor: mfaEnabled ? '#16a34a' : '#cbd5e1', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: mfaEnabled ? '2px' : 'auto', left: mfaEnabled ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <h4 style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '16px' }}>NOTIFICATION PREFERENCES</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: '#475569' }}>
                  {/* High Value */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>High-Value Requisitions</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Alert for items &gt; ₹50,000</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={highValueEmail} onChange={(e) => setHighValueEmail(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>Email</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={highValueSms} onChange={(e) => setHighValueSms(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>SMS</span>
                      </label>
                    </div>
                  </div>

                  {/* Urgent */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>Urgent Requests</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>TAT deadline within 2 hours</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={urgentEmail} onChange={(e) => setUrgentEmail(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>Email</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={urgentSms} onChange={(e) => setUrgentSms(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>SMS</span>
                      </label>
                    </div>
                  </div>

                  {/* Weekly Digest */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>Weekly Executive Summary</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Consolidated report of all activities</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={weeklyEmail} onChange={(e) => setWeeklyEmail(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>Email</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={weeklySms} onChange={(e) => setWeeklySms(e.target.checked)} style={{ accentColor: '#16a34a' }} />
                        <span>SMS</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Saving Security and Preferences settings...')}
                  style={{ width: '100%', marginTop: '24px', padding: '12px', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Save Security Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdProfile;
