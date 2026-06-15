import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const UserProfile = ({ currentUser, onNavigate }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserAlerts, setBrowserAlerts] = useState(false);
  const [monthlyDigest, setMonthlyDigest] = useState(true);

  const handleEditProfile = () => {
    alert('Profile editor is in review. Field changes are currently disabled.');
  };

  const initials = currentUser?.name 
    ? currentUser.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase() 
    : 'JM';

  const userRoleDisplay = currentUser?.role 
    ? (currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)) 
    : 'Assistant Professor';

  const userAffiliation = currentUser?.departmant_name || currentUser?.department_name || currentUser?.club_name || 'General Faculty';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="UserProfile" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', gap: '16px', color: '#6b7280', fontSize: '20px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('UserProfile')}>👤</span>
        </div>

        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('Dashboard')}>Digital Requisition</span> / <span style={{ fontWeight: '500', color: '#111827' }}>My Profile</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>My Profile</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage your personal information, department details, and account preferences.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleEditProfile}
              style={{ padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#f3f4f6' }}></div>
              
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#111827', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 16px auto', position: 'relative', zIndex: 1, border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                {initials}
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>✓</div>
              </div>
              
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>
                {currentUser?.name || 'John Mathew'}
              </h2>
              <div style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px' }}>
                {userRoleDisplay}
              </div>
              
              <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', color: '#4b5563', marginBottom: '24px' }}>
                🏫 {userAffiliation}
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '16px' }}>✉</div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Email Address</div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                      {currentUser?.email || 'staff@naipunnya.edu'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '16px' }}>🆔</div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Employee ID</div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>NSM-2026-{currentUser?.id || '02'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Additional Contact Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Mobile Number</label>
                  <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>+91 94472 10325</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Office Location</label>
                  <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>Main Block, Room 102</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1.5, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Account Settings */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Account Settings</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Email Notifications</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive emails when your requisitions are updated</div>
                </div>
                <div 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  style={{ width: '40px', height: '20px', backgroundColor: emailAlerts ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: emailAlerts ? '2px' : 'auto', left: emailAlerts ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Browser Notifications</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Show push notifications in your web browser</div>
                </div>
                <div 
                  onClick={() => setBrowserAlerts(!browserAlerts)}
                  style={{ width: '40px', height: '20px', backgroundColor: browserAlerts ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: browserAlerts ? '2px' : 'auto', left: browserAlerts ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Monthly Digest</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive a monthly summary of your requisition history</div>
                </div>
                <div 
                  onClick={() => setMonthlyDigest(!monthlyDigest)}
                  style={{ width: '40px', height: '20px', backgroundColor: monthlyDigest ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: monthlyDigest ? '2px' : 'auto', left: monthlyDigest ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
