import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { getMediaUrl, uploadProfilePic, deleteProfilePic } from '../../services/api';
import { Camera, UserRoundPen, Building2 } from 'lucide-react';

const HodProfile = ({ currentUser, onNavigate, onUpdateUser }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [approvalDigest, setApprovalDigest] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const handleEditProfile = () => {
    alert('HOD Profile editor is in review. Changes are currently disabled.');
  };

  const initials = currentUser?.name 
    ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() 
    : 'SJ';

  const hodDeptDisplay = currentUser?.departmant_name || currentUser?.department_name || currentUser?.club_name || 'Computer Science Department';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="HodProfile" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{currentUser?.name || 'Dr. Sarah Jacob'}</span>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: '#e5e7eb', color: '#111827', display: 'flex',
              justifyContent: 'center', alignItems: 'center', fontSize: '14px',
              fontWeight: 'bold', overflow: 'hidden'
            }}>
              {currentUser?.profile_pic ? (
                <img 
                  src={getMediaUrl(currentUser.profile_pic)} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                initials
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>HOD Profile</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Departmental credentials, security logs, and notification preferences.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleEditProfile}
              style={{ padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              <UserRoundPen size={20} /> Edit Profile
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Avatar Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#f3f4f6' }}></div>
              
              <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 16px auto', zIndex: 1 }}>
                <div style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '50%', 
                  backgroundColor: '#111827', 
                  color: 'white', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  border: '4px solid white', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
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
                    bottom: '0', 
                    right: '0', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: '#16a34a', 
                    border: '2px solid white', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    fontSize: '14px', 
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title="Upload Photo"
                >
                  <Camera size={20} color='white' background='#111827' />
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
                    marginTop: '-8px',
                    marginBottom: '16px',
                    textDecoration: 'underline'
                  }}
                >
                  Remove Photo
                </button>
              )}
              
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>{currentUser?.name || 'Dr. Sarah Jacob'}</h2>
              <div style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px' }}>HOD & Associate Professor</div>
              
              <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', color: '#4b5563', marginBottom: '24px' }}>
                <Building2 size={15} /> {hodDeptDisplay}
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '16px' }}>✉</div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Email Address</div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{currentUser?.email || 's.jacob@naipunnya.edu.in'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '16px' }}>🆔</div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Employee ID</div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>EMP-CS-HOD{currentUser?.id || '01'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Specs */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Department Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Primary Phone</label>
                  <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>+91 94956 71822</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Office Location</label>
                  <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>CS Block, HOD Cabin 104</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1.5, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Preferences */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>HOD Authority Settings</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Staff Submission Alerts</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Notify me immediately when staff submits a requisition</div>
                </div>
                <div 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  style={{ width: '40px', height: '20px', backgroundColor: emailAlerts ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: emailAlerts ? '2px' : 'auto', left: emailAlerts ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Approval / Rejection Digest</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive summaries of ED reviews on forwarded requisitions</div>
                </div>
                <div 
                  onClick={() => setApprovalDigest(!approvalDigest)}
                  style={{ width: '40px', height: '20px', backgroundColor: approvalDigest ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: approvalDigest ? '2px' : 'auto', left: approvalDigest ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Weekly Budget Reports</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive weekly reports on departmental spent vs budget limits</div>
                </div>
                <div 
                  onClick={() => setBudgetAlerts(!budgetAlerts)}
                  style={{ width: '40px', height: '20px', backgroundColor: budgetAlerts ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: budgetAlerts ? '2px' : 'auto', left: budgetAlerts ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodProfile;
