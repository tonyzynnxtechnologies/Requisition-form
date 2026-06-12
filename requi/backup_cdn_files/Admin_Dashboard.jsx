const Admin_Dashboard = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
            {/* Sidebar */}
            <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
                <div style={{ padding: '24px 20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>Digital Requisition</div>
                </div>
                
                <div style={{ flex: 1, padding: '20px 0' }}>
                    {/* Placeholder for other nav links that might appear */}
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer', hover: { backgroundColor: '#1f2937' } }}>
                        <span style={{ marginRight: '12px' }}>📊</span> Reports
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⚙️</span> Settings
                    </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>AD</div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>ADMINISTRATOR</div>
                        </div>
                    </div>
                    <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
                        <span style={{ marginRight: '8px' }}>🚪</span> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Admin Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ color: '#6b7280', cursor: 'pointer' }}>🔔</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#374151' }}>👤</div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL REQUISITIONS</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>1,284</div>
                            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '4px' }}>📈</span>+12%</div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>PENDING TODAY</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>24</div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', color: '#4b5563', fontWeight: 'bold' }}>JI</div>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', color: '#4b5563', fontWeight: 'bold' }}>AS</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVED THIS MONTH</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>412</div>
                            <div style={{ color: '#16a34a' }}>✅</div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>REJECTED THIS MONTH</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>18</div>
                            <div style={{ color: '#ef4444' }}>❌</div>
                        </div>
                    </div>
                </div>

                {/* Two Columns */}
                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Left: Recent Activity Feed */}
                    <div style={{ flex: 2, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', fontSize: '16px' }}>Recent Activity Feed</div>
                        
                        <div style={{ flex: 1 }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '16px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>✓</div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}><span style={{ fontWeight: '600' }}>Executive Director</span> approved requisition <span style={{ fontWeight: '500' }}>#REQ-4021</span></div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>2 minutes ago · Administration</div>
                                </div>
                            </div>
                            
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '16px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>⏱</div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}><span style={{ fontWeight: '600' }}>HOD CS Dept</span> requested revision for <span style={{ fontWeight: '500' }}>#REQ-3988</span></div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>45 minutes ago · Academic Affairs</div>
                                </div>
                            </div>
                            
                            <div style={{ padding: '20px 24px', display: 'flex', gap: '16px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f3f4f6', color: '#4b5563', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>👤</div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>New Staff Member (<span style={{ fontWeight: '500' }}>Maria Garcia</span>) was onboarded to the <span style={{ fontWeight: '500' }}>Finance Department</span></div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>2 hours ago · HR Management</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                            <a href="#" style={{ color: '#111827', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>View All Activities</a>
                        </div>
                    </div>

                    {/* Right: Requisition Status Donut Chart */}
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                        <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '32px' }}>Requisition Status</div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                            {/* CSS-only Donut Chart approximation */}
                            <div style={{ 
                                width: '200px', height: '200px', borderRadius: '50%', 
                                background: 'conic-gradient(#16a34a 0% 65%, #9333ea 65% 85%, #ef4444 85% 95%, #d1d5db 95% 100%)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                position: 'relative'
                            }}>
                                <div style={{ width: '130px', height: '130px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>1.2k</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>TOTAL</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', backgroundColor: '#16a34a', borderRadius: '2px', marginRight: '8px' }}></div>
                                <span style={{ color: '#4b5563' }}>Approved (65%)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', backgroundColor: '#9333ea', borderRadius: '2px', marginRight: '8px' }}></div>
                                <span style={{ color: '#4b5563' }}>Pending (20%)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px', marginRight: '8px' }}></div>
                                <span style={{ color: '#4b5563' }}>Rejected (10%)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', backgroundColor: '#d1d5db', borderRadius: '2px', marginRight: '8px' }}></div>
                                <span style={{ color: '#4b5563' }}>Other (5%)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#9ca3af', fontSize: '12px' }}>
                    © 2023 Naipunnya Digital Requisition System · v2.4.0
                </div>
            </div>
        </div>
    );
};
