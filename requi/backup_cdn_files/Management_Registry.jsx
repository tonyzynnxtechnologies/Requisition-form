const Management_Registry = () => {
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
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>⚙️</span> Settings
                    </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>AD</div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>LOGOUT</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Management Registry</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Review and manage all institutional requisition requests</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <span style={{ marginRight: '8px' }}>📥</span> Export CSV
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL REQUESTED</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>₹24,820</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +12% vs last month</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE QUEUE</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>42</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>⏱ Avg. 2.4 days delay</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>APPROVAL RATE</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>91.4%</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>✓ Institutional standard met</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.5px' }}>CRITICAL ALERTS</div>
                            <div style={{ color: '#f97316' }}>🔔</div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>03</div>
                        <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>⚠ Awaiting immediate action</div>
                    </div>
                </div>

                {/* Filter Row */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>Status: All</option>
                    </select>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>Type: All</option>
                    </select>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>Department: All</option>
                    </select>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>Priority: All</option>
                    </select>
                    <button style={{ padding: '10px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Apply Filters</button>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>TITLE & DESCRIPTION</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>TYPE</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>SUBMITTED BY</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DEPT/CLUB</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#RQ-8842</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Lab Equipment Maintenance</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Server room UPS battery...</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>DEPT</span></td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Dr. Saju Thomas</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Computer Science</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9ca3af', marginRight: '6px' }}></span>Pending</span></td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 24, 2023</td>
                                <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>View</a></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#RQ-8839</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Annual Sports Meet Refreshments</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Catering service for 500...</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>CLUB</span></td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Anjali Menon</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Sports Council</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Approved</span></td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 22, 2023</td>
                                <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>View</a></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#RQ-8835</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Library Archive Software</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>License renewal for Koha...</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>DEPT</span></td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Biju Jacob</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Library</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#fef2f2', color: '#ef4444', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '6px' }}></span>Rejected</span></td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 20, 2023</td>
                                <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>View</a></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#RQ-8831</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Guest Lecture Honorarium</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Payment for Dr. Vikram...</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>DEPT</span></td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Sarah Joseph</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Commerce</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Approved</span></td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 19, 2023</td>
                                <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>View</a></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>#RQ-8828</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Stationery for Exam Cell</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>A4 Paper bundles and toner...</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>DEPT</span></td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Vikas G.</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Admin Office</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9ca3af', marginRight: '6px' }}></span>Pending</span></td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Oct 18, 2023</td>
                                <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>View</a></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>Showing 1-5 of 248 results</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&lt;</button>
                            <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>2</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>3</button>
                            <span style={{ padding: '6px 4px', color: '#6b7280' }}>...</span>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>50</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
