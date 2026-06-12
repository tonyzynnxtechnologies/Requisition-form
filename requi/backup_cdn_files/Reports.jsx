const Reports = () => {
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
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>LOGOUT</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                {/* Top header area for right-aligned items */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>Admin User</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e7eb', color: '#4b5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>AU</div>
                    </div>
                </div>

                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 24px 0' }}>Reports</h1>

                {/* Filter Bar */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>From</span>
                        <input type="text" value="01/01/2024" readOnly style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', width: '120px' }} />
                        <span style={{ color: '#9ca3af' }}>📅</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>To</span>
                        <input type="text" value="03/31/2024" readOnly style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', width: '120px' }} />
                        <span style={{ color: '#9ca3af' }}>📅</span>
                    </div>
                    <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', width: '140px', backgroundColor: 'white' }}>
                        <option>All Types</option>
                    </select>
                    
                    <div style={{ flex: 1 }}></div>
                    
                    <button style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        <span style={{ marginRight: '8px' }}>📊</span> Generate Report
                    </button>
                    <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>PDF</button>
                    <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>CSV</button>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL REQUISITIONS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>1,284</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +12% vs last quarter</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVAL RATE</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>91.4%</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>✓ Stable efficiency</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>AVG. PROCESSING TIME</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>2.4d</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>⏱ -0.6 days improvement</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>REJECTED COUNT</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>18</div>
                        <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>⚠ Manual review required</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                    {/* Left Chart */}
                    <div style={{ flex: 1.5, border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ fontWeight: '600', fontSize: '16px' }}>Requisitions by Department/Club</div>
                            <span style={{ color: '#9ca3af', cursor: 'pointer' }}>⋮</span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                                    <span>Computer Science</span>
                                    <span>412</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '100%', backgroundColor: '#111827', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                                    <span>Finance Department</span>
                                    <span>285</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '69%', backgroundColor: '#4b5563', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                                    <span>Robotics Club</span>
                                    <span>198</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '48%', backgroundColor: '#6b7280', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                                    <span>Admin Office</span>
                                    <span>145</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '35%', backgroundColor: '#9ca3af', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Chart Placeholder */}
                    <div style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ fontWeight: '600', fontSize: '16px' }}>Requisitions by Month</div>
                            <span style={{ color: '#9ca3af', cursor: 'pointer' }}>📈</span>
                        </div>
                        
                        <div style={{ flex: 1, borderBottom: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '8px', paddingTop: '40px' }}>
                            {/* Empty line chart area placeholder */}
                            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,80 L50,40 L100,20" fill="none" stroke="#16a34a" strokeWidth="2" />
                                <path d="M0,80 L50,40 L100,20 L100,100 L0,100 Z" fill="rgba(22, 163, 74, 0.1)" stroke="none" />
                            </svg>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>JAN</div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>FEB</div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>MAR</div>
                        </div>
                        
                        <div style={{ marginTop: '16px', textAlign: 'center', fontStyle: 'italic', color: '#6b7280', fontSize: '13px' }}>
                            Current trend shows 15% upward trajectory
                        </div>
                    </div>
                </div>

                {/* Activity Log */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: 'white', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>Activity Log</div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <span style={{ marginRight: '6px' }}>≡</span> All Actions
                            </button>
                            <span style={{ color: '#6b7280', cursor: 'pointer' }}>🔄</span>
                        </div>
                    </div>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>TIMESTAMP</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>ACTION</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>ACTOR</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>ROLE</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>REQUISITION ID</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', color: '#4b5563', fontSize: '13px' }}>2024-03-24 14:32:01</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>● APPROVAL</span></td>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>Dr. Abraham Jose</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Dept. Head</td>
                                <td style={{ padding: '16px 24px', fontWeight: '500' }}>#RQ-88219</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Validated Lab Equipment Funds</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', color: '#4b5563', fontSize: '13px' }}>2024-03-24 12:15:44</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>● REJECTION</span></td>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>Finance Office</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Auditor</td>
                                <td style={{ padding: '16px 24px', fontWeight: '500' }}>#RQ-88215</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Insufficient Budgetary Allocation</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', color: '#4b5563', fontSize: '13px' }}>2024-03-24 11:02:12</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>● RETURNED</span></td>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>Mary Philip</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Approver</td>
                                <td style={{ padding: '16px 24px', fontWeight: '500' }}>#RQ-88190</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Requested Quotation Update</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px 24px', color: '#4b5563', fontSize: '13px' }}>2024-03-24 09:45:30</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>● APPROVAL</span></td>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>Admin Office</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Super Admin</td>
                                <td style={{ padding: '16px 24px', fontWeight: '500' }}>#RQ-88188</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Final Verification Completed</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>Showing 1 to 4 of 28 transactions</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&lt;</button>
                            <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>2</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>3</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&gt;</button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '32px', color: '#9ca3af', fontSize: '13px' }}>
                    🛡️ System Data Integrity Verified · Next sync in 14m
                </div>
            </div>
        </div>
    );
};
