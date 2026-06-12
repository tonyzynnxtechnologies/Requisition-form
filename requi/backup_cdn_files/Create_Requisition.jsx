const Create_Requisition = () => {
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
                    <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500', marginBottom: '24px' }}>
                        <span style={{ marginRight: '8px' }}>🚪</span> Logout
                    </div>
                    <div style={{ fontSize: '9px', color: '#6b7280', lineHeight: '1.4', letterSpacing: '0.5px' }}>
                        NAIPUNNYA SCHOOL OF MANAGEMENT, CHERTHALA · DIGITAL REQUISITION SYSTEM
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
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Create New Requisition</h1>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Digitize your institutional requests. Please fill out all required fields carefully.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Acting as HOD?</span>
                            <div style={{ width: '40px', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid #bbf7d0' }}>
                            <span>ℹ</span> Approval typically takes 24-48 hours.
                        </div>
                    </div>
                </div>

                {/* Stepper */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600' }}>
                        Auto-calculated
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#111827', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '24px' }}>DYNAMIC APPROVAL FLOW</div>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', marginBottom: '16px' }}>
                        {/* Connecting lines */}
                        <div style={{ position: 'absolute', top: '16px', left: '40px', right: '40px', height: '2px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
                        
                        {/* Step 1 */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1, backgroundColor: 'white', paddingRight: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>✓</div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Initiator</div>
                                <div style={{ fontSize: '13px', color: '#6b7280' }}>Current User</div>
                            </div>
                        </div>
                        
                        {/* Step 2 */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1, backgroundColor: 'white', padding: '0 16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #6b7280', color: '#6b7280', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>...</div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Department Head</div>
                                <div style={{ fontSize: '13px', color: '#6b7280' }}>Based on Dept.</div>
                            </div>
                        </div>
                        
                        {/* Step 3 */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1, backgroundColor: 'white', paddingLeft: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #d1d5db', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#9ca3af' }}>Final Approval</div>
                                <div style={{ fontSize: '13px', color: '#9ca3af' }}>Director</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                        * The approval path updates automatically when you select a Department or Club below.
                    </div>
                </div>

                {/* Section 1: Programme Details */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>📅</span>
                        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Programme Details</h2>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Dept. / Club Name</label>
                            <select style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#6b7280', backgroundColor: 'white', outline: 'none' }}>
                                <option>Select Department or Club</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Requisition Date</label>
                            <input type="date" style={{ width: '100%', padding: '9px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Programme Name</label>
                            <input type="text" placeholder="e.g. Annual Symposium 2024" style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none' }} />
                        </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Programme Date & Time</label>
                            <input type="datetime-local" style={{ width: '100%', padding: '9px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Venue</label>
                            <input type="text" placeholder="e.g. Auditorium A, Block 2" style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Target Audience</label>
                            <input type="text" placeholder="e.g. Final Year Students" style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', outline: 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Section 2: Material Requisition Slip */}
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', marginRight: '8px' }}>📋</span>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Material Requisition Slip</h2>
                        </div>
                        <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                            + Add New Item Row
                        </button>
                    </div>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>
                            <tr>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', width: '80px' }}>SL.NO</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>NAME OF THE ITEM</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>SPECIFICATIONS (IF ANY)</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', width: '150px' }}>REQUIRED QUANTITY</th>
                                <th style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', width: '80px', textAlign: 'center' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '16px 24px', color: '#374151', fontWeight: '500' }}>01</td>
                                <td style={{ padding: '16px 24px' }}><input type="text" placeholder="Enter item name" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px' }}><input type="text" placeholder="Enter specifications" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px' }}><input type="number" placeholder="0" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px', textAlign: 'center', color: '#ef4444', cursor: 'pointer' }}>🗑️</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px 24px', color: '#374151', fontWeight: '500' }}>02</td>
                                <td style={{ padding: '16px 24px' }}><input type="text" placeholder="Enter item name" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px' }}><input type="text" placeholder="Enter specifications" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px' }}><input type="number" placeholder="0" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#6b7280' }} /></td>
                                <td style={{ padding: '16px 24px', textAlign: 'center', color: '#ef4444', cursor: 'pointer' }}>🗑️</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section 3: Two Columns */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                    {/* Left: Resource Person */}
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '18px', marginRight: '8px' }}>👥</span>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Resource Person Details (If any)</h2>
                        </div>
                        <textarea 
                            placeholder="List external speakers, guests, or specialized resource persons and their contact details..." 
                            style={{ flex: 1, width: '100%', minHeight: '120px', padding: '14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#111827', outline: 'none', resize: 'vertical', marginBottom: '12px' }}
                        ></textarea>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                            As per PTO requirements on official requisition slip...
                        </div>
                    </div>

                    {/* Right: Supporting Documents */}
                    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '18px', marginRight: '8px' }}>📎</span>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Supporting Documents</h2>
                        </div>
                        
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '32px', textAlign: 'center', backgroundColor: '#f9fafb', marginBottom: '16px', cursor: 'pointer' }}>
                            <div style={{ fontSize: '24px', color: '#9ca3af', marginBottom: '8px' }}>☁️</div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>Click to upload or drag and drop</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>PDF, DOCX, or Images (Max 10MB)</div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', fontSize: '16px' }}>📄</span>
                                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Event_Budget_Draft.pdf</span>
                            </div>
                            <span style={{ color: '#ef4444', cursor: 'pointer' }}>🗑️</span>
                        </div>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', padding: '24px 0', borderTop: '1px solid #e5e7eb' }}>
                    <button style={{ padding: '12px 24px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        Save as Draft
                    </button>
                    <button style={{ padding: '12px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                        Submit Requisition
                    </button>
                </div>
            </div>
        </div>
    );
};
