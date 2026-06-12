const My_Requisitions = () => {
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', gap: '16px', color: '#6b7280', fontSize: '20px' }}>
                    <span style={{ cursor: 'pointer' }}>🔔</span>
                    <span style={{ cursor: 'pointer' }}>❓</span>
                    <span style={{ cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>👤</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>My Requisitions</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Track and manage your submitted institutional requisition requests.</p>
                    </div>
                    <div>
                        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> New Requisition
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>YOUR TOTAL REQUISITIONS</div>
                            <div style={{ color: '#4b5563' }}>📂</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>1,284</div>
                            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +12%</div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>YOUR PENDING APPROVAL</div>
                            <div style={{ color: '#9333ea' }}>📋</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>42</div>
                            <div style={{ fontSize: '13px', color: '#f97316', fontWeight: '500' }}>↗ +5%</div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>APPROVED TODAY</div>
                            <div style={{ color: '#16a34a' }}>✅</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>18</div>
                            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +8%</div>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>RECENTLY REJECTED</div>
                            <div style={{ color: '#ef4444' }}>❌</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>04</div>
                            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>—0%</div>
                        </div>
                    </div>
                </div>

                {/* Filter Row */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 2, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input type="text" placeholder="REQ ID or Staff Name" style={{ width: '100%', padding: '10px 16px 10px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>All Statuses</option>
                    </select>
                    <div style={{ flex: 1.5, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>📅</span>
                        <input type="text" placeholder="Oct 01, 2023 - Oct 31, 2023" style={{ width: '100%', padding: '10px 16px 10px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <button style={{ padding: '0 24px', display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        <span style={{ marginRight: '8px' }}>📥</span> Export
                    </button>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>REQ ID</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DATE SUBMITTED</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>PROGRAMME / DESCRIPTION</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8241</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>24 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Annual Tech Symposium 2023</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#1e1b4b', color: '#e0e7ff', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● PENDING (HOD)</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8238</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>23 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Office Stationery Restock</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● APPROVED</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8235</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>22 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Camera Equipment Upgrade</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● REJECTED</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8230</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>21 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Literary Fest Refreshments</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● RETURNED</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8224</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>20 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>New Research Journals Subscription</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#1e1b4b', color: '#e0e7ff', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● PENDING (ED)</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>REQ-8220</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>19 Oct 2023</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>IT Infrastructure Maintenance</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#064e3b', color: '#d1fae5', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>● COMPLETED</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', cursor: 'pointer' }}>👁</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>Showing 1 - 5 of 1,284 entries</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&lt;</button>
                            <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>2</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>3</button>
                            <span style={{ padding: '6px 4px', color: '#6b7280' }}>...</span>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>257</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
