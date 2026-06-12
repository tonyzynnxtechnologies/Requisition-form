const Settings = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
            {/* Sidebar */}
            <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
                <div style={{ padding: '24px 20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>Digital Requisition</div>
                </div>
                
                <div style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⊞</span> Dashboard
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📄</span> Requisitions
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>👥</span> Users
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>🏢</span> Departments
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>🎭</span> Clubs
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📊</span> Reports
                    </div>
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⚙️</span> Settings
                    </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>AD</div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>admin@naipunnya.edu</div>
                        </div>
                    </div>
                    <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
                        <span style={{ marginRight: '8px' }}>🚪</span> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                {/* Top header area */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                        <span style={{ fontWeight: '500', color: '#111827' }}>Digital Requisition</span> / System Settings
                    </div>
                    <div style={{ display: 'flex', gap: '16px', color: '#6b7280', fontSize: '20px', cursor: 'pointer' }}>
                        <span>🔔</span>
                        <span>❓</span>
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Settings</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Configure system-wide parameters, security protocols, and notification workflows.</p>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
                    
                    {/* Top Left: General Settings */}
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <span style={{ marginRight: '12px', fontSize: '20px' }}>🏢</span>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>General Settings</h2>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Organization Name</label>
                            <input type="text" value="Naipunnya" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: '#f9fafb' }} />
                        </div>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>System Email Address</label>
                            <input type="email" value="system@naipunnya.edu" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: '#f9fafb' }} />
                        </div>
                        
                        <div style={{ position: 'relative', width: '100%', height: '120px', backgroundColor: '#1f2937', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundImage: 'linear-gradient(45deg, #1f2937 25%, #374151 25%, #374151 50%, #1f2937 50%, #1f2937 75%, #374151 75%, #374151 100%)', backgroundSize: '20px 20px' }}></div>
                            <button style={{ position: 'relative', padding: '8px 16px', backgroundColor: 'white', color: '#111827', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                ✏️ Change Header Image
                            </button>
                        </div>
                    </div>

                    {/* Top Right: Notification Preferences */}
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
                            <div style={{ width: '40px', height: '20px', backgroundColor: '#16a34a', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div>
                                <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Status Change Alerts</div>
                                <div style={{ color: '#6b7280', fontSize: '13px' }}>Notify when a requisition status updates</div>
                            </div>
                            <div style={{ width: '40px', height: '20px', backgroundColor: '#16a34a', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Weekly Digests</div>
                                <div style={{ color: '#6b7280', fontSize: '13px' }}>Consolidated report of weekly activity</div>
                            </div>
                            <div style={{ width: '40px', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                            </div>
                        </div>
                        
                        <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', padding: '16px', borderRadius: '8px', fontSize: '13px', color: '#854d0e', fontStyle: 'italic', lineHeight: '1.5' }}>
                            Note: These settings apply globally to all Administrative users unless overridden in individual profiles.
                        </div>
                    </div>

                    {/* Bottom Left: System Configuration */}
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
                            <div style={{ width: '40px', height: '20px', backgroundColor: '#fca5a5', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
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

                    {/* Bottom Right: Security & Access */}
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <span style={{ marginRight: '12px', fontSize: '20px' }}>🔒</span>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Security & Access</h2>
                        </div>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Minimum Password Length</label>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>12 chars</span>
                            </div>
                            <input type="range" min="8" max="20" value="12" readOnly style={{ width: '100%', accentColor: '#111827' }} />
                        </div>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Session Timeout (Minutes)</label>
                            <input type="number" value="30" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }} />
                        </div>
                        
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer', hover: { backgroundColor: '#f9fafb' } }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px', fontSize: '18px' }}>🔑</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px', marginBottom: '2px' }}>Two-Factor Authentication (2FA)</div>
                                <div style={{ color: '#6b7280', fontSize: '13px' }}>Configure MFA for all administrator roles</div>
                            </div>
                            <div style={{ color: '#9ca3af' }}>➔</div>
                        </div>
                    </div>
                    
                </div>
                
                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <button style={{ padding: '10px 20px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        Discard Changes
                    </button>
                    <button style={{ padding: '10px 20px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>💾</span> Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};
