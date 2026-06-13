import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getSettings, updateSettings } from '../../services/api';

const Settings = ({ currentUser, onNavigate, onLogout }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [statusAlerts, setStatusAlerts] = useState(true);
  const [weeklyDigests, setWeeklyDigests] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [minPasswordLength, setMinPasswordLength] = useState(12);
  
  // Email Template States
  const [emailSubjectTemplate, setEmailSubjectTemplate] = useState("Requisition #{requisition_id} Update: {status}");
  const [emailBodyTemplate, setEmailBodyTemplate] = useState("Dear {recipient_name},\n\nRequisition #{requisition_id} for '{programme_name}' has been updated to: {status}.\n\nComment: {comment}\n\nBest regards,\nAdministration");
  const [systemEmail, setSystemEmail] = useState("system@naipunnya.edu");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setEmailAlerts(data.emailAlerts === 'true');
          setStatusAlerts(data.statusAlerts === 'true');
          setWeeklyDigests(data.weeklyDigests === 'true');
          setMaintenanceMode(data.maintenanceMode === 'true');
          setSessionTimeout(parseInt(data.sessionTimeout) || 30);
          setMinPasswordLength(parseInt(data.minPasswordLength) || 12);
          
          if (data.email_subject_template) setEmailSubjectTemplate(data.email_subject_template);
          if (data.email_body_template) setEmailBodyTemplate(data.email_body_template);
          if (data.systemEmail) setSystemEmail(data.systemEmail);
        }
      } catch (err) {
        console.error('Error loading settings from API, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        emailAlerts: String(emailAlerts),
        statusAlerts: String(statusAlerts),
        weeklyDigests: String(weeklyDigests),
        maintenanceMode: String(maintenanceMode),
        sessionTimeout: String(sessionTimeout),
        minPasswordLength: String(minPasswordLength),
        email_subject_template: emailSubjectTemplate,
        email_body_template: emailBodyTemplate,
      };
      await updateSettings(payload);
      alert('System settings updated and saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  const getDashboardPage = () => {
    return currentUser?.role === 'admin' ? 'Dashboard' : 'Dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Shared Sidebar */}
      <Sidebar activePage="Settings" onNavigate={onNavigate} currentUser={currentUser} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Top header area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            <span style={{ fontWeight: '500', color: '#111827' }}>Digital Requisition</span> / System Settings
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#6b7280', fontSize: '14px', cursor: 'pointer' }}>
            <span 
              onClick={() => onNavigate(getDashboardPage())}
              style={{ fontWeight: '500', color: '#16a34a', cursor: 'pointer' }}
            >
              ➔ Go to Dashboard
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Settings</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Configure system-wide parameters, security protocols, and notification workflows.</p>
        </div>

        {loading ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280' }}>
            Loading system settings...
          </div>
        ) : (
          /* Grid */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, marginBottom: '32px' }}>
            
            {/* Top row - two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* General Settings */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>🏢</span>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>General Settings</h2>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Organization Name</label>
                  <input type="text" value="Naipunnya School of Management" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: '#f9fafb' }} />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>System Email Address</label>
                  <input type="email" value={systemEmail} readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: '#f9fafb' }} />
                </div>
                
                <div style={{ position: 'relative', width: '100%', height: '120px', backgroundColor: '#1f2937', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundImage: 'linear-gradient(45deg, #1f2937 25%, #374151 25%, #374151 50%, #1f2937 50%, #1f2937 75%, #374151 75%, #374151 100%)', backgroundSize: '20px 20px' }}></div>
                  <button type="button" style={{ position: 'relative', padding: '8px 16px', backgroundColor: 'white', color: '#111827', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    ✏️ Change Header Image
                  </button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>🔔</span>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Notification Preferences</h2>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Email Alerts</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Send system notifications via email</div>
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
                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Status Change Alerts</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Notify when a requisition status updates</div>
                  </div>
                  <div 
                    onClick={() => setStatusAlerts(!statusAlerts)}
                    style={{ width: '40px', height: '20px', backgroundColor: statusAlerts ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: statusAlerts ? '2px' : 'auto', left: statusAlerts ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Weekly Digests</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Consolidated report of weekly activity</div>
                  </div>
                  <div 
                    onClick={() => setWeeklyDigests(!weeklyDigests)}
                    style={{ width: '40px', height: '20px', backgroundColor: weeklyDigests ? '#16a34a' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: weeklyDigests ? '2px' : 'auto', left: weeklyDigests ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Templates Customization Card (Full Width) */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>✉️</span>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Email Notification Templates</h2>
              </div>
              <p style={{ margin: '0 0 20px 0', color: '#6b7280', fontSize: '13px' }}>
                Customize the email subject and body sent to users upon status changes. Use these dynamic tokens in your template: 
                <span style={{ fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', margin: '0 4px', fontSize: '12px', color: '#111827' }}>{`{requisition_id}`}</span>,
                <span style={{ fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', margin: '0 4px', fontSize: '12px', color: '#111827' }}>{`{programme_name}`}</span>,
                <span style={{ fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', margin: '0 4px', fontSize: '12px', color: '#111827' }}>{`{status}`}</span>,
                <span style={{ fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', margin: '0 4px', fontSize: '12px', color: '#111827' }}>{`{comment}`}</span>,
                <span style={{ fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', margin: '0 4px', fontSize: '12px', color: '#111827' }}>{`{recipient_name}`}</span>
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Subject Template</label>
                <input 
                  type="text" 
                  value={emailSubjectTemplate} 
                  onChange={(e) => setEmailSubjectTemplate(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Body Template</label>
                <textarea 
                  rows="6"
                  value={emailBodyTemplate} 
                  onChange={(e) => setEmailBodyTemplate(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }} 
                />
              </div>
            </div>

            {/* Bottom row - two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* System Configuration */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>⚙️</span>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>System Configuration</h2>
                </div>
                
                <div style={{ border: '1px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#ef4444', fontSize: '14px', marginBottom: '4px' }}>Maintenance Mode</div>
                    <div style={{ color: '#b91c1c', fontSize: '13px' }}>Disable user access for system updates</div>
                  </div>
                  <div 
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    style={{ width: '40px', height: '20px', backgroundColor: maintenanceMode ? '#ef4444' : '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: maintenanceMode ? '2px' : 'auto', left: maintenanceMode ? 'auto' : '2px', transition: 'all 0.2s' }}></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Currency Format</label>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: 'white' }}>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Date Format</label>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: 'white' }}>
                      <option>DD/MM/YYYY</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security & Access */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>🔒</span>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Security & Access</h2>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Minimum Password Length</label>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{minPasswordLength} chars</span>
                  </div>
                  <input 
                    type="range" 
                    min="8" 
                    max="20" 
                    value={minPasswordLength} 
                    onChange={(e) => setMinPasswordLength(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#111827' }} 
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Session Timeout (Minutes)</label>
                  <input 
                    type="number" 
                    value={sessionTimeout} 
                    onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 0)} 
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px', fontSize: '18px' }}>🔑</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px', marginBottom: '2px' }}>Two-Factor Authentication (2FA)</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Configure MFA for all administrator roles</div>
                  </div>
                  <div style={{ color: '#9ca3af' }}>➔</div>
                </div>
              </div>
            </div>
            
          </div>
        )}
        
        {/* Footer Actions */}
        {!loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <button 
              type="button"
              onClick={() => onNavigate(getDashboardPage())} 
              style={{ padding: '10px 20px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              Discard Changes
            </button>
            <button 
              type="button"
              onClick={handleSave} 
              style={{ padding: '10px 20px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span style={{ marginRight: '8px' }}>💾</span> Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
