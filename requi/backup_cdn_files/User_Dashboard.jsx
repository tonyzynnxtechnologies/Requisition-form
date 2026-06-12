const User_Dashboard = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
            {/* Sidebar */}
            <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
                <div style={{ padding: '24px 20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
                    <div style={{ color: '#4ade80', fontSize: '11px', marginTop: '2px', letterSpacing: '0.5px', fontWeight: '600' }}>USER CONSOLE</div>
                </div>
                
                <div style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⊞</span> Dashboard
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📄</span> Requisitions
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>👤</span> Profile
                    </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
                    <div style={{ color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
                        <span style={{ marginRight: '8px' }}>🚪</span> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                {/* Header elements if any (Top right bell icon etc) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', gap: '16px', color: '#6b7280', fontSize: '20px' }}>
                    <span style={{ cursor: 'pointer' }}>🔔</span>
                    <span style={{ cursor: 'pointer' }}>❓</span>
                    <span style={{ cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>👤</span>
                </div>

                {/* Hero Banner */}
                <div style={{ backgroundColor: '#1f2937', borderRadius: '16px', padding: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '12px' }}>JUNE 9, 2026</div>
                        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Good morning, John Mathew</h1>
                        <p style={{ color: '#d1d5db', margin: 0, fontSize: '15px', maxWidth: '600px', lineHeight: '1.5' }}>
                            You have 3 requisitions pending approval this week. Take a look at your recent activity.
                        </p>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <button style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> New Requisition
                        </button>
                    </div>
                    
                    {/* Abstract background shape */}
                    <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', backgroundColor: '#374151', borderRadius: '50%', opacity: 0.5 }}></div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>TOTAL SUBMITTED</div>
                            <div style={{ color: '#4b5563' }}>📊</div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>24</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +12% vs last month</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>PENDING APPROVAL</div>
                            <div style={{ color: '#f97316' }}>📅</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>08</div>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#fef3c7', borderRadius: '3px', marginBottom: '8px' }}>
                            <div style={{ width: '65%', height: '100%', backgroundColor: '#f97316', borderRadius: '3px' }}></div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>65%</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>APPROVED</div>
                            <div style={{ color: '#16a34a' }}>✅</div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>16</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Fully processed and fulfilled</div>
                    </div>
                </div>

                {/* Two Columns */}
                <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
                    {/* Left: Recent Requisitions */}
                    <div style={{ flex: 2, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Recent Requisitions</div>
                            <a href="#" style={{ color: '#111827', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>View All →</a>
                        </div>
                        
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                            <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                                <tr>
                                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DESCRIPTION</th>
                                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>REQ-8241</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>Office Supplies - Stationary</td>
                                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 24, 2023</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d97706', marginRight: '6px' }}></span>PENDING</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>REQ-8192</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>Dell Monitor P2422H (x2)</td>
                                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 21, 2023</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>APPROVED</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>REQ-8155</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>Projector Maintenance Fee</td>
                                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 18, 2023</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>APPROVED</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>REQ-8012</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>Conference Room Booking</td>
                                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 15, 2023</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#fef2f2', color: '#ef4444', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '6px' }}></span>REJECTED</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>REQ-7998</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>Software License Renewal</td>
                                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 12, 2023</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>APPROVED</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right: Notices */}
                    <div style={{ flex: 1, backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', fontSize: '18px' }}>📢</span>
                                <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Notices</div>
                            </div>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                        </div>
                        
                        <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderLeft: '4px solid #16a34a', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '12px' }}>✓</div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '4px' }}>REQ-8192 Approved</div>
                                        <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px', lineHeight: '1.4' }}>Your requisition for Dell Monitors has been successfully processed.</div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>10 minutes ago</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderLeft: '4px solid #9ca3af', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f3f4f6', color: '#6b7280', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '12px' }}>⏱</div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '4px' }}>System Maintenance</div>
                                        <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px', lineHeight: '1.4' }}>Digital portal will be unavailable tomorrow between 02:00 AM - 04:00 AM.</div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>2 hours ago</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderLeft: '4px solid #9333ea', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '12px' }}>!</div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '4px' }}>Pending Reviews</div>
                                        <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px', lineHeight: '1.4' }}>Please update the item specifications for REQ-8241 by EOD.</div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>5 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                            <a href="#" style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>Clear All Notifications</a>
                        </div>
                    </div>
                </div>
                
                <div style={{ padding: '32px 0 0 0', color: '#9ca3af', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>© 2023 Naipunnya Digital Requisition System</div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Help Center</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
