const Departments = () => {
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
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                {/* Top header area for right-aligned items shown in prompt "Top right: Administrator label with avatar" */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>Administrator</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>👤</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Departments</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage departments that can submit requisitions</p>
                    </div>
                    <div>
                        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> Add Department
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL DEPARTMENTS</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>12</div>
                        </div>
                        <div style={{ fontSize: '24px', color: '#16a34a' }}>🏢</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL STAFF</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>84</div>
                        </div>
                        <div style={{ fontSize: '24px', color: '#4b5563' }}>👤</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>DEPARTMENTS WITHOUT HOD</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>02</div>
                        </div>
                        <div style={{ fontSize: '24px', color: '#ef4444' }}>⚠️</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input type="text" placeholder="Search departments..." style={{ width: '100%', padding: '12px 16px 12px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <button style={{ padding: '0 24px', display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        <span style={{ marginRight: '8px' }}>≡</span> Filters
                    </button>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '30%' }}>DEPARTMENT NAME</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '35%' }}>HOD ASSIGNED</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '20%' }}>STAFF COUNT</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', width: '15%', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>Computer Science</td>
                                <td style={{ padding: '20px 24px', color: '#374151', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span> Dr. Saju Thomas
                                </td>
                                <td style={{ padding: '20px 24px', color: '#374151' }}>18</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>Commerce</td>
                                <td style={{ padding: '20px 24px', color: '#374151', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span> Sarah Joseph
                                </td>
                                <td style={{ padding: '20px 24px', color: '#374151' }}>14</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#fef2f2' }}>
                                <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>Physics</td>
                                <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#ef4444', marginRight: '8px', fontSize: '10px' }}>●</span> 
                                    <span style={{ color: '#ef4444', fontStyle: 'italic' }}>— Not assigned</span>
                                </td>
                                <td style={{ padding: '20px 24px', color: '#374151' }}>08</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>English</td>
                                <td style={{ padding: '20px 24px', color: '#374151', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span> Anjali Menon
                                </td>
                                <td style={{ padding: '20px 24px', color: '#374151' }}>12</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px 24px', fontWeight: '500', color: '#111827' }}>Mathematics</td>
                                <td style={{ padding: '20px 24px', color: '#374151', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#16a34a', marginRight: '8px', fontSize: '10px' }}>●</span> Vikas G.
                                </td>
                                <td style={{ padding: '20px 24px', color: '#374151' }}>10</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
