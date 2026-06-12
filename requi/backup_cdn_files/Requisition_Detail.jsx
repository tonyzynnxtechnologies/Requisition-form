const Requisition_Detail = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
            {/* Sidebar */}
            <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
                <div style={{ padding: '24px 20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
                    <div style={{ color: '#4ade80', fontSize: '11px', marginTop: '2px', letterSpacing: '0.5px', fontWeight: '600' }}>USER CONSOLE</div>
                </div>
                
                <div style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⊞</span> Dashboard
                    </div>
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📄</span> Requisitions
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📊</span> Reports
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>👤</span> Profile
                    </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
                    <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
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

                <div style={{ marginBottom: '24px' }}>
                    <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                        <span style={{ cursor: 'pointer', hover: { textDecoration: 'underline' } }}>Requisitions</span> / <span style={{ fontWeight: '500', color: '#111827' }}>REQ-8241</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                REQ-8241: Annual Tech Symposium 2023
                                <span style={{ backgroundColor: '#1e1b4b', color: '#e0e7ff', padding: '6px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>● PENDING (HOD)</span>
                            </h1>
                            <div style={{ color: '#6b7280', fontSize: '14px' }}>Submitted on October 24, 2023 by John Mathew</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
                    <div style={{ padding: '12px 24px', color: '#16a34a', borderBottom: '2px solid #16a34a', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>Overview</div>
                    <div style={{ padding: '12px 24px', color: '#6b7280', fontWeight: '500', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Items
                        <span style={{ backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', color: '#4b5563' }}>3</span>
                    </div>
                    <div style={{ padding: '12px 24px', color: '#6b7280', fontWeight: '500', fontSize: '14px', cursor: 'pointer' }}>Documents</div>
                    <div style={{ padding: '12px 24px', color: '#6b7280', fontWeight: '500', fontSize: '14px', cursor: 'pointer' }}>Approval History</div>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Left Column (Main Details) */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Programme Details */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>Programme Details</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Department / Club</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>Computer Science Department</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Requisition Date</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>24 October 2023</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Programme Name</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>Annual Tech Symposium 2023</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Target Audience</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>All CS Students & Faculty</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Programme Date & Time</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>15 November 2023, 09:00 AM</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Venue</div>
                                    <div style={{ color: '#111827', fontSize: '15px', fontWeight: '500' }}>Main Auditorium, Block A</div>
                                </div>
                            </div>
                        </div>

                        {/* Resource Person Details */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>Resource Person Details</h2>
                            
                            <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <strong>Dr. Arvind Kumar</strong><br />
                                Chief Data Scientist, TechCorp India<br />
                                Contact: +91 98765 43210<br />
                                Email: arvind.k@techcorp.in<br /><br />
                                Topic: "Future of AI in Enterprise Architecture"<br />
                                Travel and accommodation needs to be arranged as per attached budget document.
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Quick Actions */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Quick Actions</h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <button style={{ width: '100%', padding: '10px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <span style={{ marginRight: '8px' }}>🖨️</span> Print PDF
                                </button>
                                <button style={{ width: '100%', padding: '10px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <span style={{ marginRight: '8px' }}>✏️</span> Edit Requisition
                                </button>
                                <button style={{ width: '100%', padding: '10px 16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#ef4444', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <span style={{ marginRight: '8px' }}>🚫</span> Withdraw Request
                                </button>
                            </div>
                        </div>

                        {/* Approval Timeline */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Approval Timeline</h2>
                            
                            <div style={{ position: 'relative' }}>
                                {/* Vertical line */}
                                <div style={{ position: 'absolute', left: '16px', top: '16px', bottom: '16px', width: '2px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
                                
                                {/* Step 1: Initiated */}
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Initiated</div>
                                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>John Mathew</div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Oct 24, 2023 - 10:15 AM</div>
                                    </div>
                                </div>
                                
                                {/* Step 2: HOD Approval */}
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', border: '2px solid #d97706', color: '#d97706', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0, boxSizing: 'border-box' }}>●</div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#d97706' }}>Pending HOD Approval</div>
                                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Dr. Smitha G. (CS Dept)</div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Current Step</div>
                                    </div>
                                </div>
                                
                                {/* Step 3: Final Approval */}
                                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #d1d5db', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, boxSizing: 'border-box' }}></div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#9ca3af' }}>Final Approval</div>
                                        <div style={{ fontSize: '13px', color: '#9ca3af' }}>Executive Director</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
