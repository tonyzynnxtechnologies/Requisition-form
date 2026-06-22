import { PenBox } from "lucide-react";


const User_Profile = () => {
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
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📄</span> Requisitions
                    </div>
                    <div style={{ padding: '12px 20px', color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: '12px' }}>📊</span> Reports
                    </div>
                    <div style={{ padding: '12px 20px', backgroundColor: '#1f2937', color: 'white', borderLeft: '3px solid #16a34a', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
                    <span style={{ cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', color: '#111827', fontWeight: 'bold' }}>JM</span>
                </div>

                <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                    <span style={{ cursor: 'pointer', hover: { textDecoration: 'underline' } }}>Digital Requisition</span> / <span style={{ fontWeight: '500', color: '#111827' }}>My Profile</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>My Profile</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage your personal information, department details, and account preferences.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ padding: '10px 16px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            🔑 Change Password
                        </button>
                        <button style={{ padding: '10px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                            <PenBox size={20} /> Edit Profile
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Left Column */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Profile Card */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#f3f4f6' }}></div>

                            <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#111827', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 16px auto', position: 'relative', zIndex: 1, border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                JM
                                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>✓</div>
                            </div>

                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>John Mathew</h2>
                            <div style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px' }}>Assistant Professor</div>

                            <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', color: '#4b5563', marginBottom: '24px' }}>
                                💻 Computer Science Department
                            </div>

                            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: '#9ca3af', fontSize: '16px' }}>✉</div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Email Address</div>
                                        <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>john.m@naipunnya.edu</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: '#9ca3af', fontSize: '16px' }}>🆔</div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Employee ID</div>
                                        <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>NSM-2041</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: '#9ca3af', fontSize: '16px' }}>📅</div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Joined Date</div>
                                        <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>August 2019</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Additional Contact Details</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Mobile Number</label>
                                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>+91 98765 43210</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Intercom Extension</label>
                                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>EXT-412</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Office Location</label>
                                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>Block B, Room 204 (CS Faculty Room)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Account Settings */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Account Settings</h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Email Notifications</div>
                                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive emails when your requisitions are updated</div>
                                </div>
                                <div style={{ width: '40px', height: '20px', backgroundColor: '#16a34a', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Browser Notifications</div>
                                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Show push notifications in your web browser</div>
                                </div>
                                <div style={{ width: '40px', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>Monthly Digest</div>
                                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Receive a monthly summary of your requisition history</div>
                                </div>
                                <div style={{ width: '40px', height: '20px', backgroundColor: '#16a34a', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Recent Activity</h2>
                                <span style={{ color: '#6b7280', fontSize: '13px', cursor: 'pointer', hover: { textDecoration: 'underline' } }}>View All</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '14px' }}>📝</div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '600' }}>Submitted Requisition</span> REQ-8241: Annual Tech Symposium 2023
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Oct 24, 2023 · 10:15 AM</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '14px' }}>💬</div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '600' }}>Added comment</span> to REQ-8192: Dell Monitor P2422H
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Oct 21, 2023 · 02:30 PM</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '14px' }}>📝</div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '600' }}>Submitted Requisition</span> REQ-8192: Dell Monitor P2422H
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Oct 20, 2023 · 09:45 AM</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, fontSize: '14px' }}>🚫</div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '600' }}>Withdrew Requisition</span> REQ-8188: Printer Ink
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Oct 18, 2023 · 11:20 AM</div>
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
