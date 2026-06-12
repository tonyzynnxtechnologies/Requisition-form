const Users = () => {
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
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Manage Users</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Directory of all institutional user accounts, roles, and permissions</p>
                    </div>
                    <div>
                        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <span style={{ marginRight: '8px' }}>👤+</span> Add User
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL USERS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>124</div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>↗ +4 this month</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE SESSIONS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>42</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>ℹ Normal load</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>PENDING REQUISITIONS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>08</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>! Awaiting HR</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>SECURITY ALERTS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>02</div>
                        <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>⚠ Invalid logins</div>
                    </div>
                </div>

                {/* Filter Row */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                    <div style={{ flex: 2, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input type="text" placeholder="Search by name, email, or role..." style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>All Departments</option>
                    </select>
                    <select style={{ flex: 1, padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', color: '#374151', fontSize: '14px', outline: 'none' }}>
                        <option>All Statuses</option>
                    </select>
                    <a href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '4px' }}>⚙️</span> More Filters
                    </a>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>FULL NAME</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>USERNAME</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>ROLE</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>DEPARTMENT</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1 */}
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>AM</div>
                                    <div style={{ fontWeight: '500', color: '#111827' }}>Abraham Mathews</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>amathews_admin</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Admin</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Information Technology</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Active</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>⏱</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🚫</span>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>SK</div>
                                    <div style={{ fontWeight: '500', color: '#111827' }}>Sarah Kurien</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>skurien_hr</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>HOD</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Human Resources</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Active</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>⏱</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🚫</span>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', color: '#4b5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>JV</div>
                                    <div style={{ fontWeight: '500', color: '#6b7280' }}>Jacob Varghese</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>jvarghese_fin</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Staff</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>Finance & Accounts</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f3f4f6', color: '#6b7280', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9ca3af', marginRight: '6px' }}></span>Inactive</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#9ca3af' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#9ca3af' }}>⏱</span>
                                    <span style={{ cursor: 'pointer', color: '#9ca3af' }}>✓</span>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fce7f3', color: '#db2777', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>MP</div>
                                    <div style={{ fontWeight: '500', color: '#111827' }}>Meera Prabhu</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>mprabhu_ops</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Staff</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Operations</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Active</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>⏱</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🚫</span>
                                </td>
                            </tr>
                            {/* Row 5 */}
                            <tr>
                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginRight: '12px' }}>RK</div>
                                    <div style={{ fontWeight: '500', color: '#111827' }}>Rahul Krishnan</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>rkrishnan_it</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Staff</td>
                                <td style={{ padding: '16px 24px', color: '#374151' }}>Information Technology</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Active</span></td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>✏️</span>
                                    <span style={{ cursor: 'pointer', marginRight: '12px', color: '#6b7280' }}>⏱</span>
                                    <span style={{ cursor: 'pointer', color: '#6b7280' }}>🚫</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>Showing 1 to 5 of 124 entries</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&lt;</button>
                            <button style={{ padding: '6px 12px', border: 'none', backgroundColor: '#111827', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>1</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>2</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>3</button>
                            <span style={{ padding: '6px 4px', color: '#6b7280' }}>...</span>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>25</button>
                            <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
