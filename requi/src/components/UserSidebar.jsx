import React from 'react';

const UserSidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'User_Dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'My_Requisitions', label: 'My Requisitions', icon: '📄' },
    { id: 'Create_Requisition', label: 'New Requisition', icon: '✏️' },
    { id: 'User_Profile', label: 'My Profile', icon: '👤' },
  ];

  return (
    <div style={{ width: '210px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0 }}>
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', cursor: 'pointer' }} onClick={() => onNavigate('User_Dashboard')}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Naipunnya</div>
        <div style={{ color: '#4ade80', fontSize: '11px', marginTop: '2px', letterSpacing: '0.5px', fontWeight: '600' }}>USER CONSOLE</div>
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
          style={{ color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}
        >
          <span style={{ marginRight: '8px' }}>🚪</span> Logout
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
