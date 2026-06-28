import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  createRequisition,
  updateRequisition,
  submitRequisition,
  getRequisitionDetail,
  getDepartments
} from '../../services/api';

const CreateRequisition = ({ currentUser, onNavigate, onLogout, editId }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const todayStr = new Date().toISOString().split('T')[0];

  // Requisition form state
  const [requisitionType, setRequisitionType] = useState('department');
  const [priority, setPriority] = useState('medium');
  const [programmeName, setProgrammeName] = useState('');
  const [requisitionDate, setRequisitionDate] = useState(new Date().toISOString().split('T')[0]);
  const [programmeDatetime, setProgrammeDatetime] = useState('');
  const [venue, setVenue] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [resourcePersonDetails, setResourcePersonDetails] = useState('');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [club, setClub] = useState('');

  // Items list state
  const [items, setItems] = useState([
    { item_name: '', specification: '', required_quantity: 1, estimated_cost: '' }
  ]);

  // Load departments
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const depts = await getDepartments();
        setDepartments(depts);
      } catch (err) {
        console.error('Failed to load lookup data', err);
      }
    };
    loadLookups();
  }, []);

  // Load existing requisition data if editing
  useEffect(() => {
    if (editId) {
      const loadRequisition = async () => {
        setFetching(true);
        try {
          const res = await getRequisitionDetail(editId);
          const req = res.data;
          setRequisitionType(req.requisition_type);
          setPriority(req.priority);
          setProgrammeName(req.programme_name);
          setRequisitionDate(req.requisition_date);
          setProgrammeDatetime(req.programme_datetime ? req.programme_datetime.slice(0, 16) : '');
          setVenue(req.venue || '');
          setTargetAudience(req.target_audience || '');
          setResourcePersonDetails(req.resource_person_details || '');
          setDepartment(req.department || '');
          setClub(req.requisition_type === 'club' ? req.club_name : req.club || '');
          if (req.items && req.items.length > 0) {
            setItems(req.items.map(item => ({
              item_name: item.item_name,
              specification: item.specification || '',
              required_quantity: item.required_quantity,
              estimated_cost: item.estimated_cost || ''
            })));
          }
        } catch (err) {
          setError('Failed to load requisition for editing.');
        } finally {
          setFetching(false);
        }
      };
      loadRequisition();
    }
  }, [editId]);

  // Sync department with currentUser if not editing and type is department
  useEffect(() => {
    if (!editId && requisitionType === 'department' && currentUser?.department) {
      setDepartment(currentUser.department);
    }
  }, [requisitionType, currentUser, editId]);

  const handleAddItemRow = () => {
    setItems([...items, { item_name: '', specification: '', required_quantity: 1, estimated_cost: '' }]);
  };

  const handleRemoveItemRow = (index) => {
    if (items.length === 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const validateForm = () => {
    const errs = {};
    if (!programmeName.trim()) {
      errs.programmeName = 'Programme/Event name is required.';
    }
    if (!programmeDatetime) {
      errs.programmeDatetime = 'Programme Date & Time is required.';
    }
    if (!editId && requisitionDate < todayStr) {
      errs.requisitionDate = 'Requisition date cannot be in the past.';
    }
    if (!venue.trim()) {
      errs.venue = 'Venue is required.';
    }
    if (requisitionType === 'department' && !department) {
      errs.department = 'Department selection is required.';
    }
    if (requisitionType === 'club' && !club.trim()) {
      errs.club = 'Club name/selection is required.';
    }

    const itemErrs = {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const singleItemErr = {};
      if (!item.item_name.trim()) {
        singleItemErr.item_name = 'Name is required.';
      }
      if (!item.required_quantity || parseInt(item.required_quantity) < 1) {
        singleItemErr.required_quantity = 'Quantity must be at least 1.';
      }
      if (Object.keys(singleItemErr).length > 0) {
        itemErrs[i] = singleItemErr;
      }
    }
    if (Object.keys(itemErrs).length > 0) {
      errs.items = itemErrs;
    }

    return errs;
  };

  const handleSave = async (submitAfterSave = false) => {
    setError('');
    setSuccess('');
    setFieldErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setLoading(true);
    const payload = {
      requisition_type: requisitionType,
      priority,
      programme_name: programmeName.trim(),
      requisition_date: requisitionDate,
      programme_datetime: programmeDatetime ? (programmeDatetime.includes('Z') || programmeDatetime.includes('+') ? programmeDatetime : `${programmeDatetime}:00Z`) : null,
      venue: venue.trim() || null,
      target_audience: targetAudience.trim(),
      resource_person_details: resourcePersonDetails.trim(),
      department: requisitionType === 'department' ? parseInt(department) : null,
      club: requisitionType === 'club' ? club : null,
      items: items.map((item, idx) => ({
        sl_no: idx + 1,
        item_name: item.item_name.trim(),
        specification: item.specification.trim() || null,
        required_quantity: parseInt(item.required_quantity),
        estimated_cost: item.estimated_cost ? parseFloat(item.estimated_cost) : null
      }))
    };

    try {
      let reqId = editId;
      if (editId) {
        await updateRequisition(editId, payload);
        if (!submitAfterSave) {
          setSuccess('Requisition updated successfully.');
        }
      } else {
        const res = await createRequisition(payload);
        reqId = res.data.id;
        if (!submitAfterSave) {
          setSuccess('Requisition created as draft.');
        }
      }

      if (submitAfterSave && reqId) {
        setSuccess('Submitting requisition...');
        await submitRequisition(reqId);
        setSuccess('Requisition submitted successfully!');
        setTimeout(() => onNavigate('MyRequisitions'), 1500);
      } else if (!editId) {
        // Reset if it was a new draft creation
        setProgrammeName('');
        setProgrammeDatetime('');
        setVenue('');
        setTargetAudience('');
        setResourcePersonDetails('');
        setClub('');
        setItems([{ item_name: '', specification: '', required_quantity: 1, estimated_cost: '' }]);
      }
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.errors) {
        setError(Object.values(errData.errors).flat().join(', '));
      } else {
        setError(errData?.message || 'Failed to save requisition.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1px solid #d1d5db',
    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    backgroundColor: '#ffffff'
  };
  const labelStyle = {
    display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#374151'
  };

  if (fetching) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar activePage="CreateRequisition" onNavigate={onNavigate} currentUser={currentUser} />
        <div style={{ flex: 1, marginLeft: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280' }}>
          Loading requisition details...
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      <Sidebar activePage="CreateRequisition" onNavigate={onNavigate} currentUser={currentUser} />

      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827', margin: '0 0 6px' }}>
              {editId ? 'Edit Requisition' : 'New Requisition'}
            </h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              {editId ? 'Modify your draft or returned request' : 'Create a new request for items'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('MyRequisitions')}
            style={{
              padding: '8px 16px', backgroundColor: 'transparent', color: '#4b5563',
              border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px',
              fontWeight: '500', cursor: 'pointer'
            }}
          >
            ← Back to List
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
            {success}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card 1: Requisition Details */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Event & Requisition Details</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: requisitionType === 'club' ? '1fr 1fr' : '1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Requisition Type</label>
                <select 
                  value={requisitionType} 
                  onChange={(e) => {
                    setRequisitionType(e.target.value);
                    if (e.target.value === 'department') {
                      setPriority('medium');
                    }
                  }}
                  style={inputStyle}
                  disabled={!!editId}
                >
                  <option value="department">Departmental Request</option>
                  <option value="club">Club Request</option>
                </select>
              </div>
              {requisitionType === 'club' && (
                <div>
                  <label style={labelStyle}>Priority Level</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Programme/Event Name *</label>
                <input 
                  type="text" 
                  value={programmeName} 
                  onChange={(e) => setProgrammeName(e.target.value)}
                  placeholder="e.g. Annual Tech Fest 2026"
                  style={inputStyle} 
                />
                {fieldErrors.programmeName && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {fieldErrors.programmeName}
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Date of Requisition</label>
                <input 
                  type="date" 
                  value={requisitionDate} 
                  onChange={(e) => setRequisitionDate(e.target.value)}
                  min={editId ? undefined : todayStr}
                  style={inputStyle} 
                />
                {fieldErrors.requisitionDate && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {fieldErrors.requisitionDate}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Programme Date & Time *</label>
                <input 
                  type="datetime-local" 
                  value={programmeDatetime} 
                  onChange={(e) => setProgrammeDatetime(e.target.value)}
                  style={inputStyle} 
                />
                {fieldErrors.programmeDatetime && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {fieldErrors.programmeDatetime}
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Venue *</label>
                <input 
                  type="text" 
                  value={venue} 
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Seminar Hall III"
                  style={inputStyle} 
                />
                {fieldErrors.venue && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {fieldErrors.venue}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Target Audience</label>
                <input 
                  type="text" 
                  value={targetAudience} 
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. 120 CS Students"
                  style={inputStyle} 
                />
              </div>
              <div>
                {requisitionType === 'department' ? (
                  <>
                    <label style={labelStyle}>Department *</label>
                    <select 
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                    {fieldErrors.department && (
                      <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                        {fieldErrors.department}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <label style={labelStyle}>Club *</label>
                    <input 
                      type="text"
                      value={club} 
                      onChange={(e) => setClub(e.target.value)}
                      placeholder="e.g. Fine Arts Club"
                      style={inputStyle}
                    />
                    {fieldErrors.club && (
                      <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                        {fieldErrors.club}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '0px' }}>
              <label style={labelStyle}>Resource Person Details (Optional)</label>
              <textarea 
                value={resourcePersonDetails} 
                onChange={(e) => setResourcePersonDetails(e.target.value)}
                placeholder="e.g. Dr. Jane Smith, Senior Scientist, ISRO"
                rows="3"
                style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Card 2: Items Requested */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Items Requested</h2>
              <button 
                type="button" 
                onClick={handleAddItemRow}
                style={{
                  padding: '8px 16px', backgroundColor: '#eff6ff', color: '#2563eb',
                  border: 'none', borderRadius: '8px', fontSize: '13px',
                  fontWeight: '600', cursor: 'pointer'
                }}
              >
                + Add Item Row
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', width: '40px', color: '#6b7280', fontWeight: '500' }}>#</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', color: '#6b7280', fontWeight: '500' }}>Item Name *</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', color: '#6b7280', fontWeight: '500' }}>Specification / Details</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', width: '100px', color: '#6b7280', fontWeight: '500' }}>Qty *</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', width: '150px', color: '#6b7280', fontWeight: '500' }}>Est. Cost (₹)</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', width: '50px', color: '#6b7280', fontWeight: '500' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 8px', color: '#6b7280', fontWeight: '500' }}>{idx + 1}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <input 
                          type="text" 
                          value={item.item_name} 
                          onChange={(e) => handleItemChange(idx, 'item_name', e.target.value)}
                          placeholder="e.g. HDMI Cable"
                          style={inputStyle}
                        />
                        {fieldErrors.items?.[idx]?.item_name && (
                          <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                            {fieldErrors.items[idx].item_name}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <input 
                          type="text" 
                          value={item.specification} 
                          onChange={(e) => handleItemChange(idx, 'specification', e.target.value)}
                          placeholder="e.g. 15 meters, gold-plated"
                          style={inputStyle}
                        />
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <input 
                          type="number" 
                          value={item.required_quantity} 
                          onChange={(e) => handleItemChange(idx, 'required_quantity', parseInt(e.target.value) || 0)}
                          style={inputStyle}
                          min="1"
                        />
                        {fieldErrors.items?.[idx]?.required_quantity && (
                          <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                            {fieldErrors.items[idx].required_quantity}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <input 
                          type="number" 
                          value={item.estimated_cost} 
                          onChange={(e) => handleItemChange(idx, 'estimated_cost', e.target.value)}
                          placeholder="e.g. 850"
                          style={inputStyle}
                          min="0"
                        />
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItemRow(idx)}
                          style={{
                            border: 'none', background: 'none', color: '#ef4444',
                            cursor: items.length === 1 ? 'not-allowed' : 'pointer',
                            opacity: items.length === 1 ? 0.4 : 1,
                            fontSize: '16px'
                          }}
                          disabled={items.length === 1}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '12px' }}>
            <button 
              type="button" 
              onClick={() => onNavigate('MyRequisitions')}
              style={{
                padding: '12px 24px', backgroundColor: 'white', color: '#4b5563',
                border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={() => handleSave(true)}
              disabled={loading}
              style={{
                padding: '12px 24px', backgroundColor: '#16a34a', color: 'white',
                border: 'none', borderRadius: '8px', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer', opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Submitting...' : 'Submit Requisition'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequisition;
