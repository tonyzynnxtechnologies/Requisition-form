import React from 'react';

const Sidebar = ({ activePage, onNavigate, currentUser }) => {
  const role = currentUser?.role || 'admin';

  const adminMenu = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'Users', label: 'Users', icon: '👥' },
    { id: 'Departments', label: 'Departments', icon: '🏢' },
    { id: 'Clubs', label: 'Clubs', icon: '🎭' },
    { id: 'AllRequisitions', label: 'All Requisitions', icon: '📋' },
  ];

  const hodMenu = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
  ];

  const edMenu = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
  ];

  const staffMenu = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'CreateRequisition', label: 'New Requisition', icon: '✏️' },
    { id: 'MyRequisitions', label: 'My Requisitions', icon: '📄' },
  ];

  const menuMap = { admin: adminMenu, hod: hodMenu, ed: edMenu, staff: staffMenu };
  const menuItems = menuMap[role] || staffMenu;

  const portalLabels = {
    admin: 'ADMIN PORTAL',
    hod: 'HOD PORTAL',
    ed: 'ED PORTAL',
    staff: 'STAFF PORTAL',
  };

  return (
    <div style={{
      width: '240px', minHeight: '100vh', backgroundColor: '#111827',
      display: 'flex', flexDirection: 'column', color: 'white', flexShrink: 0,
      position: 'fixed', left: 0, top: 0, zIndex: 100,
    }}>
      {/* Brand Header */}
      <div
        style={{ padding: '24px 20px', borderBottom: '1px solid #1f2937', cursor: 'pointer' }}
        onClick={() => onNavigate('Dashboard')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', backgroundColor: '#16a34a',
            borderRadius: '8px', display: 'flex', justifyContent: 'center',
            alignItems: 'center', fontWeight: 'bold', fontSize: '18px',
          }}>N</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Naipunnya</div>
            <div style={{
              color: '#4ade80', fontSize: '10px', marginTop: '2px',
              letterSpacing: '1.5px', fontWeight: '600',
            }}>
              {portalLabels[role]}
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid #1f2937',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          backgroundColor: '#374151', display: 'flex', justifyContent: 'center',
          alignItems: 'center', fontWeight: 'bold', fontSize: '13px', color: '#4ade80',
        }}>
          {currentUser?.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{
            fontSize: '13px', fontWeight: '500', color: '#e5e7eb',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {currentUser?.name || 'User'}
          </div>
          <div style={{
            fontSize: '11px', color: '#6b7280',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {currentUser?.email || ''}
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div style={{ flex: 1, padding: '16px 0' }}>
        <div style={{
          fontSize: '10px', fontWeight: '600', color: '#6b7280',
          padding: '0 20px 8px', letterSpacing: '1px',
        }}>
          NAVIGATION
        </div>
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: isActive ? '#1f2937' : 'transparent',
                color: isActive ? 'white' : '#9ca3af',
                borderLeft: isActive ? '3px solid #16a34a' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', transition: 'all 0.15s ease',
                fontSize: '14px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1f2937' }}>
        <div
          onClick={() => onNavigate('Logout')}
          style={{
            color: '#ef4444', fontSize: '14px', display: 'flex',
            alignItems: 'center', gap: '12px', cursor: 'pointer',
            fontWeight: '500', padding: '8px 0',
          }}
        >
          <span style={{ fontSize: '16px' }}>🚪</span> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
