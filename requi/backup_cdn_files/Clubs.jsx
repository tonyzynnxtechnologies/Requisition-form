const Clubs = () => {
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
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>SUPER ADMIN</div>
                        </div>
                    </div>
                    <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
                        <span style={{ marginRight: '8px' }}>🚪</span> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#111827', fontSize: '14px', fontWeight: '500' }}>Aravind Sharma</div>
                            <div style={{ color: '#6b7280', fontSize: '12px' }}>System Controller</div>
                        </div>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>AS</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Manage Clubs</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Directory of institutional clubs and organizations</p>
                    </div>
                    <div>
                        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <span style={{ marginRight: '8px', fontSize: '18px' }}>+</span> Add Club
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>TOTAL CLUBS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>08</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE REQUISITIONS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>12</div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', borderLeft: '4px solid #16a34a', padding: '24px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '12px' }}>RECENT SUBMISSIONS</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>04</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input type="text" placeholder="Search clubs..." style={{ width: '100%', padding: '12px 16px 12px 44px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
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
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>CLUB NAME</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>COORDINATOR</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STAFF COUNT</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Nature Club', coordinator: 'Dr. Matthew Varghese', count: '14' },
                                { name: 'Boys Club', coordinator: 'Prof. Rajith Kumar', count: '08' },
                                { name: 'Incubation Club', coordinator: 'Ms. Meera Nair', count: '12' },
                                { name: 'Sargavedi', coordinator: 'Rev. Fr. Jacob', count: '22' },
                                { name: 'Saheli', coordinator: 'Dr. Deepa George', count: '06' },
                                { name: 'NSS', coordinator: 'Prof. Santhosh P.', count: '18' },
                                { name: 'NCC', coordinator: 'Lt. Col. David', count: '10' },
                                { name: 'Sports Club', coordinator: 'Mr. Siju Paul', count: '34' }
                            ].map((club, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#111827' }}>{club.name}</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>{club.coordinator}</td>
                                    <td style={{ padding: '16px 24px', color: '#374151' }}>{club.count}</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '6px' }}></span>Active</span></td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <span style={{ cursor: 'pointer', marginRight: '16px', color: '#6b7280' }}>✏️</span>
                                        <span style={{ cursor: 'pointer', color: '#6b7280' }}>🗑️</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ padding: '16px 24px', color: '#6b7280', fontSize: '14px' }}>
                        Showing 8 of 8 clubs
                    </div>
                </div>
            </div>
        </div>
    );
};
