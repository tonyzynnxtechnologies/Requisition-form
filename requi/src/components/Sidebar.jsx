import React from 'react';

const Sidebar = ({ activePage, onNavigate, userRole }) => {
  // Define items. Management might only need Dashboard, Registry, Reports, and Settings.
  const menuItems = [
    { id: 'Admin_Dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'Management_Registry', label: 'Registry', icon: '📁' },
    ...(userRole === 'admin' ? [
      { id: 'Users', label: 'Users', icon: '👥' },
      { id: 'Departments', label: 'Departments', icon: '🏢' },
      { id: 'Clubs', label: 'Clubs', icon: '♣' }
    ] : []),
    { id: 'Reports', label: 'Reports', icon: '📊' },
    { id: 'Settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', cursor: 'pointer' }} onClick={() => onNavigate(userRole === 'admin' ? 'Admin_Dashboard' : 'Management_Registry')}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
        <div style={{ color: '#16a34a', fontSize: '11px', marginTop: '2px', letterSpacing: '0.5px', fontWeight: '600' }}>
          {userRole ? userRole.toUpperCase() : 'ADMIN'} PORTAL
        </div>
      </div>
      
      {/* Menu Navigation */}
      <div style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                padding: '12px 20px',
                backgroundColor: isActive ? '#1f2937' : 'transparent',
                color: isActive ? 'white' : '#9ca3af',
                borderLeft: isActive ? '3px solid #16a34a' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ marginRight: '12px' }}>{item.icon}</span> {item.label}
            </div>
          );
        })}
      </div>
      
      {/* Logout */}
      <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
        <div 
          onClick={() => onNavigate('Logout')}
          style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}
        >
          <span style={{ marginRight: '8px' }}>🚪</span> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
