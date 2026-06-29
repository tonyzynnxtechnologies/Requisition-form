import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  getRequisitionDetail,
  submitRequisition,
  performRequisitionAction,
  uploadDocument,
  deleteDocument,
  getMediaUrl
} from '../../services/api';

const RequisitionDetail = ({ currentUser, onNavigate, onLogout, requisitionId }) => {
  const [requisition, setRequisition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);
  const [actionPending, setActionPending] = useState(null);
  const [hodPriority, setHodPriority] = useState('medium');

  // Form states for HOD / ED decisions
  const [comment, setComment] = useState('');
  
  // Document upload state
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const loadRequisition = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await getRequisitionDetail(requisitionId);
      setRequisition(res.data);
      if (res.data.priority) {
        setHodPriority(res.data.priority);
      }
    } catch (err) {
      console.error(err);
      if (showLoading) setError('Failed to load requisition details.');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (requisitionId) {
      loadRequisition(true);
      const interval = setInterval(() => {
        if (!submittingAction && !uploading) {
          loadRequisition(false);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [requisitionId, submittingAction, uploading]);

  const handleAction = async (actionType) => {
    setError('');
    setSuccess('');
    
    // Validate comment if action is a rejection or return
    // Exception: HOD can return to staff without comment when ED returned it to HOD
    const isReturnByHodFromEdReturn = actionType === 'returned_by_hod' && requisition.status === 'returned_to_hod';
    if ((actionType.includes('reject') || actionType.includes('return')) && !comment.trim() && !isReturnByHodFromEdReturn) {
      setError('A comment is required when rejecting or returning a requisition.');
      return;
    }

    setSubmittingAction(true);
    setActionPending(actionType);
    try {
      const priorityToSend = actionType === 'approved_by_hod' ? hodPriority : null;
      await performRequisitionAction(requisitionId, actionType, comment.trim(), priorityToSend);
      setSuccess(`Action applied successfully.`);
      setComment('');
      await loadRequisition();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to apply decision.');
    } finally {
      setSubmittingAction(false);
      setActionPending(null);
    }
  };

  const handleSubmitDraft = async () => {
    setError('');
    setSuccess('');
    setSubmittingAction(true);
    setActionPending('submit_draft');
    try {
      await submitRequisition(requisitionId);
      setSuccess('Requisition submitted successfully.');
      await loadRequisition();
    } catch (err) {
      console.error(err);
      setError('Failed to submit requisition.');
    } finally {
      setSubmittingAction(false);
      setActionPending(null);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setError('');
    setSuccess('');
    setUploading(true);

    try {
      await uploadDocument(requisitionId, selectedFile);
      setSuccess('Document uploaded successfully.');
      setSelectedFile(null);
      // Reset input element
      const fileInput = document.getElementById('document-file-input');
      if (fileInput) fileInput.value = '';
      await loadRequisition();
    } catch (err) {
      console.error(err);
      setError('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (docId) => {
    if (!window.confirm('Delete this supporting document?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteDocument(requisitionId, docId);
      setSuccess('Document deleted.');
      await loadRequisition();
    } catch (err) {
      console.error(err);
      setError('Failed to delete document.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status) => {
    const map = {
      draft: { bg: '#f3f4f6', color: '#6b7280', label: 'Draft' },
      pending_hod: { bg: '#fef3c7', color: '#d97706', label: 'Pending HOD' },
      pending_ed: { bg: '#ffedd5', color: '#ea580c', label: 'Pending ED' },
      approved: { bg: '#dcfce7', color: '#16a34a', label: 'Approved' },
      rejected: { bg: '#fee2e2', color: '#dc2626', label: 'Rejected' },
      returned_to_staff: { bg: '#e0e7ff', color: '#4f46e5', label: 'Returned' },
      returned_to_hod: { bg: '#e0e7ff', color: '#4f46e5', label: 'Returned to HOD' },
    };
    const s = map[status] || { bg: '#f3f4f6', color: '#6b7280', label: status };
    return (
      <span style={{
        padding: '6px 12px', borderRadius: '9999px', fontSize: '13px',
        fontWeight: '600', backgroundColor: s.bg, color: s.color,
      }}>{s.label}</span>
    );
  };

  const getPriorityBadge = (priority) => {
    const map = {
      urgent: { bg: '#fef2f2', color: '#dc2626' },
      high: { bg: '#fff7ed', color: '#ea580c' },
      medium: { bg: '#fefce8', color: '#ca8a04' },
      low: { bg: '#f0fdf4', color: '#16a34a' },
    };
    const s = map[priority] || map.medium;
    return (
      <span style={{
        padding: '4px 10px', borderRadius: '6px', fontSize: '12px',
        fontWeight: '600', backgroundColor: s.bg, color: s.color,
        textTransform: 'capitalize',
      }}>{priority}</span>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar activePage="" onNavigate={onNavigate} currentUser={currentUser} />
        <div style={{ flex: 1, marginLeft: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280' }}>
          Loading Requisition Details...
        </div>
      </div>
    );
  }

  if (!requisition) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar activePage="" onNavigate={onNavigate} currentUser={currentUser} />
        <div style={{ flex: 1, marginLeft: '240px', padding: '40px', textAlign: 'center', color: '#ef4444' }}>
          <h3>Requisition not found or access denied.</h3>
          <button onClick={() => onNavigate('Dashboard')} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  // Check roles/permissions
  const isAuthor = requisition.created_by === currentUser?.id;
  const isEditable = isAuthor && ['draft', 'returned_to_staff'].includes(requisition.status);
  
  const isHOD = currentUser?.role === 'hod';
  const isRelevantHOD = isHOD && 
    ['pending_hod', 'returned_to_hod'].includes(requisition.status) && 
    requisition.requisition_type === 'department' && 
    requisition.department === currentUser?.department;

  const isED = currentUser?.role === 'ed';
  const isRelevantED = isED && requisition.status === 'pending_ed';

  const totalCost = requisition.items?.reduce((sum, item) => {
    const cost = parseFloat(item.estimated_cost) || 0;
    return sum + (cost * item.required_quantity);
  }, 0) || 0;

  const getBackRoute = () => {
    if (currentUser?.role === 'admin') return 'AllRequisitions';
    if (currentUser?.role === 'hod') return 'Dashboard';
    if (currentUser?.role === 'ed') return 'EdRequisitions';
    return 'MyRequisitions';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f6fa' }}>
      {/* Sidebar - hidden on print */}
      <div className="no-print" style={{ display: 'block' }}>
        <Sidebar activePage="" onNavigate={onNavigate} currentUser={currentUser} />
      </div>

      <div style={{ flex: 1, marginLeft: '240px', padding: '32px 40px' }} className="detail-container">
        
        {/* Style injection for printing and spinner */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            .no-print { display: none !important; }
            .detail-container { margin-left: 0 !important; padding: 0 !important; }
            body { background-color: white !important; }
            .print-layout { display: block !important; }
            .screen-layout { display: none !important; }
          }
          .print-layout { display: none; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .btn-spinner {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
          }
        `}} />

        {/* SCREEN LAYOUT */}
        <div className="screen-layout">
          {/* Back button & Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <button 
              onClick={() => onNavigate(getBackRoute())}
              style={{
                padding: '8px 16px', backgroundColor: 'transparent', color: '#4b5563',
                border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              ← Back to Requisitions
            </button>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handlePrint}
                style={{
                  padding: '8px 16px', backgroundColor: '#eff6ff', color: '#2563eb',
                  border: 'none', borderRadius: '8px', fontSize: '14px',
                  fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                🖨️ Print / Save PDF
              </button>
            </div>
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

          {/* Two Column details structure */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
            
            {/* Left Column (Main details & Items) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Event Details Card */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Programme Details</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>PROGRAMME / EVENT NAME</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{requisition.programme_name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>REQUISITION TYPE</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', textTransform: 'capitalize' }}>{requisition.requisition_type}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>PROGRAMME DATE & TIME</div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>
                      {requisition.programme_datetime 
                        ? requisition.programme_datetime.replace('T', ' ').substring(0, 16) 
                        : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>VENUE</div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>{requisition.venue || 'N/A'}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>TARGET AUDIENCE</div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>{requisition.target_audience || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>RESOURCE PERSON DETAILS</div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>{requisition.resource_person_details || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Items Requested</h2>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 8px', textAlign: 'left', width: '40px', color: '#6b7280' }}>#</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', color: '#6b7280' }}>Item Name</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left', color: '#6b7280' }}>Specification</th>
                      <th style={{ padding: '12px 8px', textAlign: 'center', width: '80px', color: '#6b7280' }}>Qty</th>
                      <th style={{ padding: '12px 8px', textAlign: 'right', width: '120px', color: '#6b7280' }}>Est. Cost</th>
                      <th style={{ padding: '12px 8px', textAlign: 'right', width: '120px', color: '#6b7280' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisition.items?.map((item, idx) => {
                      const cost = parseFloat(item.estimated_cost) || 0;
                      return (
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 8px', color: '#6b7280' }}>{idx + 1}</td>
                          <td style={{ padding: '12px 8px', fontWeight: '500', color: '#111827' }}>{item.item_name}</td>
                          <td style={{ padding: '12px 8px', color: '#4b5563' }}>{item.specification || 'N/A'}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'center' }}>{item.required_quantity}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>₹{cost.toFixed(2)}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '500' }}>₹{(cost * item.required_quantity).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#4b5563' }}>Grand Total:</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>₹{totalCost.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Documents Card */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Supporting Documents</h2>

                {/* File Upload Form for Staff */}
                {isEditable && (
                  <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                    <input 
                      type="file" 
                      id="document-file-input"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      style={{
                        padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px'
                      }}
                    />
                    <button 
                      type="submit" 
                      disabled={uploading || !selectedFile}
                      style={{
                        padding: '10px 16px', backgroundColor: '#111827', color: 'white',
                        border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                        opacity: (uploading || !selectedFile) ? 0.6 : 1
                      }}
                    >
                      {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                  </form>
                )}

                {requisition.documents?.length === 0 ? (
                  <div style={{ color: '#9ca3af', fontSize: '13px', padding: '12px 0' }}>No supporting documents uploaded.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {requisition.documents?.map(doc => (
                      <div key={doc.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>📎</span>
                          <a href={doc.file} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                            {doc.original_filename}
                          </a>
                        </div>
                        {isEditable && (
                          <button 
                            onClick={() => handleFileDelete(doc.id)}
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '15px' }}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Signatures Card */}
              {(requisition.staff_signature || requisition.hod_signature || requisition.ed_signature) && (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Signatures</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                    
                    {/* Staff Signature */}
                    {requisition.staff_sign_name && (
                      <div style={{ textAlign: 'center', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '10px', backgroundColor: '#fafafa' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prepared By</div>
                        {requisition.staff_signature ? (
                          <img src={getMediaUrl(requisition.staff_signature)} alt="Staff Signature" style={{ maxWidth: '150px', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                        ) : (
                          <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontStyle: 'italic', fontSize: '13px' }}>No image</div>
                        )}
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{requisition.staff_sign_name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                          {requisition.staff_signed_at ? new Date(requisition.staff_signed_at).toLocaleDateString() : ''}
                        </div>
                      </div>
                    )}

                    {/* HOD Signature — only for department requisitions */}
                    {requisition.requisition_type === 'department' && requisition.hod_sign_name && (
                      <div style={{ textAlign: 'center', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '10px', backgroundColor: '#fafafa' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HOD Recommendation</div>
                        {requisition.hod_signature ? (
                          <img src={getMediaUrl(requisition.hod_signature)} alt="HOD Signature" style={{ maxWidth: '150px', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                        ) : (
                          <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontStyle: 'italic', fontSize: '13px' }}>No image</div>
                        )}
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{requisition.hod_sign_name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                          {requisition.hod_signed_at ? new Date(requisition.hod_signed_at).toLocaleDateString() : ''}
                        </div>
                      </div>
                    )}

                    {/* ED Signature */}
                    {requisition.ed_sign_name && (
                      <div style={{ textAlign: 'center', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '10px', backgroundColor: '#fafafa' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ED Approval</div>
                        {requisition.ed_signature ? (
                          <img src={getMediaUrl(requisition.ed_signature)} alt="ED Signature" style={{ maxWidth: '150px', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                        ) : (
                          <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontStyle: 'italic', fontSize: '13px' }}>No image</div>
                        )}
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{requisition.ed_sign_name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                          {requisition.ed_signed_at ? new Date(requisition.ed_signed_at).toLocaleDateString() : ''}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Status details & Decision board) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Requisition Info card */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Requisition Info</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>REQ ID</span>
                    <span style={{ fontWeight: '600', color: '#111827' }}>{requisition.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>SUBMITTED BY</span>
                    <span style={{ fontWeight: '600', color: '#111827' }}>{requisition.created_by_name}</span>
                  </div>
                  {requisition.requisition_type === 'department' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>DEPARTMENT</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{requisition.department_name}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>CLUB</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{requisition.club_name}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>DATE SUBMITTED</span>
                    <span style={{ fontWeight: '600', color: '#111827' }}>{requisition.requisition_date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>PRIORITY</span>
                    {getPriorityBadge(requisition.priority)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>STATUS</span>
                    {getStatusBadge(requisition.status)}
                  </div>
                </div>
              </div>

              {/* Action Decision Panel */}
              {(isRelevantHOD || isRelevantED || isEditable) && (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Actions & Decision</h3>
                  
                  {/* HOD decisions */}
                  {isRelevantHOD && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add feedback, comments, or notes (mandatory if returning/rejecting)"
                        rows="3"
                        style={{
                          width: '100%', padding: '10px 12px', border: '1px solid #d1d5db',
                          borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box'
                        }}
                      />
                      {requisition.status === 'pending_hod' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Set Priority Level *</label>
                          <select 
                            value={hodPriority} 
                            onChange={(e) => setHodPriority(e.target.value)}
                            style={{
                              width: '100%', padding: '10px 12px', border: '1px solid #d1d5db',
                              borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box', backgroundColor: 'white'
                            }}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      )}
                      {requisition.status === 'pending_hod' && (
                        <button 
                          onClick={() => handleAction('approved_by_hod')} 
                          disabled={submittingAction}
                          style={{ padding: '10px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {actionPending === 'approved_by_hod' && <span className="btn-spinner" />}
                          {actionPending === 'approved_by_hod' ? 'Approving...' : 'Approve Request'}
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction('returned_by_hod')} 
                        disabled={submittingAction}
                        style={{ padding: '10px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {actionPending === 'returned_by_hod' && <span className="btn-spinner" />}
                        {actionPending === 'returned_by_hod' ? 'Returning...' : 'Return to Staff'}
                      </button>
                      {requisition.status === 'pending_hod' && (
                        <button 
                          onClick={() => handleAction('rejected_by_hod')} 
                          disabled={submittingAction}
                          style={{ padding: '10px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {actionPending === 'rejected_by_hod' && <span className="btn-spinner" />}
                          {actionPending === 'rejected_by_hod' ? 'Rejecting...' : 'Reject Request'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* ED decisions */}
                  {isRelevantED && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add approval comment or return/reject notes (mandatory if returning/rejecting)"
                        rows="3"
                        style={{
                          width: '100%', padding: '10px 12px', border: '1px solid #d1d5db',
                          borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box'
                        }}
                      />
                      <button 
                        onClick={() => handleAction('approved_by_ed')} 
                        disabled={submittingAction}
                        style={{ padding: '10px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {actionPending === 'approved_by_ed' && <span className="btn-spinner" />}
                        {actionPending === 'approved_by_ed' ? 'Approving...' : 'Approve Requisition'}
                      </button>
                      <button 
                        onClick={() => handleAction('returned_by_ed')} 
                        disabled={submittingAction}
                        style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {actionPending === 'returned_by_ed' && <span className="btn-spinner" />}
                        {actionPending === 'returned_by_ed' ? 'Returning...' : (requisition.requisition_type === 'club' ? 'Return to Staff' : 'Return to HOD')}
                      </button>
                      <button 
                        onClick={() => handleAction('rejected_by_ed')} 
                        disabled={submittingAction}
                        style={{ padding: '10px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {actionPending === 'rejected_by_ed' && <span className="btn-spinner" />}
                        {actionPending === 'rejected_by_ed' ? 'Rejecting...' : 'Reject Requisition'}
                      </button>
                    </div>
                  )}

                  {/* Staff actions (submit/edit) */}
                  {isEditable && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button 
                        onClick={handleSubmitDraft} 
                        disabled={submittingAction}
                        style={{ padding: '11px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: submittingAction ? 'not-allowed' : 'pointer', opacity: submittingAction ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {actionPending === 'submit_draft' && <span className="btn-spinner" />}
                        {actionPending === 'submit_draft' ? 'Submitting...' : 'Submit Requisition'}
                      </button>
                      <button 
                        onClick={() => {
                          onNavigate('CreateRequisition', requisition.id);
                        }} 
                        style={{ padding: '11px', backgroundColor: 'white', color: '#111827', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Edit Requisition details
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Action History / Timeline */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Workflow History</h3>

                {requisition.actions?.length === 0 ? (
                  <div style={{ color: '#9ca3af', fontSize: '13px' }}>No workflow actions recorded yet.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                    {requisition.actions?.map((act, index) => (
                      <div key={act.id || index} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                        
                        {/* Timeline dot */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: act.action.includes('approve') ? '#16a34a' : act.action.includes('return') ? '#d97706' : act.action.includes('reject') ? '#dc2626' : '#2563eb',
                            marginTop: '4px'
                          }}></div>
                          {index < requisition.actions.length - 1 && (
                            <div style={{ width: '2px', flex: 1, backgroundColor: '#e5e7eb', margin: '4px 0' }}></div>
                          )}
                        </div>

                        {/* Timeline details */}
                        <div style={{ flex: 1, fontSize: '13px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <span style={{ fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                              {act.action.replace(/_/g, ' ')}
                            </span>
                            <span style={{ color: '#9ca3af', fontSize: '11px' }}>
                              {new Date(act.acted_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>
                            by {act.acted_by_name || 'System'}
                          </div>
                          {act.comment && (
                            <div style={{
                              backgroundColor: '#f9fafb', borderLeft: '3px solid #d1d5db',
                              padding: '6px 10px', borderRadius: '0 6px 6px 0', color: '#4b5563',
                              fontStyle: 'italic', marginTop: '4px'
                            }}>
                              "{act.comment}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PRINT ONLY LAYOUT */}
        <div className="print-layout" style={{ color: '#111827' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #111827', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', margin: '0 0 6px 0', fontWeight: 'bold' }}>NAIPUNNYA SCHOOL OF MANAGEMENT</h1>
            <h2 style={{ fontSize: '18px', margin: '0 0 12px 0', fontWeight: '600', color: '#374151' }}>Material Requisition Form</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563', marginTop: '10px' }}>
              <span><strong>Requisition ID:</strong> {requisition.id}</span>
              <span><strong>Date:</strong> {requisition.requisition_date}</span>
              <span><strong>Status:</strong> {requisition.status?.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', fontSize: '13px' }}>
            <div>
              <p style={{ margin: '4px 0' }}><strong>Submitted By:</strong> {requisition.created_by_name}</p>
              {requisition.requisition_type === 'department' ? (
                <p style={{ margin: '4px 0' }}><strong>Department:</strong> {requisition.department_name}</p>
              ) : (
                <p style={{ margin: '4px 0' }}><strong>Club:</strong> {requisition.club_name}</p>
              )}
              <p style={{ margin: '4px 0' }}><strong>Priority:</strong> {requisition.priority?.toUpperCase()}</p>
            </div>
            <div>
              <p style={{ margin: '4px 0' }}><strong>Programme Name:</strong> {requisition.programme_name}</p>
              <p style={{ margin: '4px 0' }}><strong>Event Venue:</strong> {requisition.venue || 'N/A'}</p>
              <p style={{ margin: '4px 0' }}><strong>Event Date/Time:</strong> {requisition.programme_datetime ? requisition.programme_datetime.replace('T', ' ').substring(0, 16) : 'N/A'}</p>
            </div>
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #111827', paddingBottom: '6px', marginBottom: '12px' }}>Requested Items</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '40px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #111827', borderTop: '1px solid #111827' }}>
                <th style={{ padding: '8px 4px', textAlign: 'left', width: '30px' }}>#</th>
                <th style={{ padding: '8px 4px', textAlign: 'left' }}>Item Name</th>
                <th style={{ padding: '8px 4px', textAlign: 'left' }}>Specification</th>
                <th style={{ padding: '8px 4px', textAlign: 'center', width: '60px' }}>Qty</th>
                <th style={{ padding: '8px 4px', textAlign: 'right', width: '100px' }}>Est. Cost</th>
                <th style={{ padding: '8px 4px', textAlign: 'right', width: '100px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {requisition.items?.map((item, idx) => {
                const cost = parseFloat(item.estimated_cost) || 0;
                return (
                  <tr key={item.id || idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 4px' }}>{idx + 1}</td>
                    <td style={{ padding: '8px 4px', fontWeight: '600' }}>{item.item_name}</td>
                    <td style={{ padding: '8px 4px' }}>{item.specification || 'N/A'}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>{item.required_quantity}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right' }}>₹{cost.toFixed(2)}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: '600' }}>₹{(cost * item.required_quantity).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ padding: '12px 4px', textAlign: 'right', fontWeight: 'bold' }}>Grand Total:</td>
                <td style={{ padding: '12px 4px', textAlign: 'right', fontWeight: 'bold', fontSize: '14px' }}>₹{totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Workflow Signature blocks for print out */}
          <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: requisition.requisition_type === 'club' ? '1fr 1fr' : '1fr 1fr 1fr', gap: '30px', textAlign: 'center', fontSize: '12px' }}>
            <div>
              {requisition.staff_signature && (
                <div style={{ marginBottom: '8px' }}>
                  <img src={getMediaUrl(requisition.staff_signature)} alt="Staff Signature" style={{ maxWidth: '120px', maxHeight: '50px', objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ borderTop: '1px solid #4b5563', paddingTop: '8px', margin: '0 20px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Prepared By</p>
                <p style={{ margin: '4px 0 0 0', color: '#4b5563' }}>
                  {requisition.staff_sign_name || requisition.created_by_name} (Staff)
                </p>
                {requisition.staff_signed_at && (
                  <p style={{ margin: '2px 0 0 0', color: '#9ca3af', fontSize: '10px' }}>
                    {new Date(requisition.staff_signed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            {/* HOD block — only for department requisitions */}
            {requisition.requisition_type === 'department' && (
            <div>
              {requisition.hod_signature && (
                <div style={{ marginBottom: '8px' }}>
                  <img src={getMediaUrl(requisition.hod_signature)} alt="HOD Signature" style={{ maxWidth: '120px', maxHeight: '50px', objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ borderTop: '1px solid #4b5563', paddingTop: '8px', margin: '0 20px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>HOD Recommendation</p>
                <p style={{ margin: '4px 0 0 0', color: '#4b5563' }}>
                  {requisition.hod_sign_name
                    ? `${requisition.hod_sign_name} — RECOMMENDED`
                    : 'PENDING'}
                </p>
                {requisition.hod_signed_at && (
                  <p style={{ margin: '2px 0 0 0', color: '#9ca3af', fontSize: '10px' }}>
                    {new Date(requisition.hod_signed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            )}
            <div>
              {requisition.ed_signature && (
                <div style={{ marginBottom: '8px' }}>
                  <img src={getMediaUrl(requisition.ed_signature)} alt="ED Signature" style={{ maxWidth: '120px', maxHeight: '50px', objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ borderTop: '1px solid #4b5563', paddingTop: '8px', margin: '0 20px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Executive Director Approval</p>
                <p style={{ margin: '4px 0 0 0', color: '#4b5563' }}>
                  {requisition.ed_sign_name
                    ? `${requisition.ed_sign_name} — APPROVED`
                    : 'PENDING'}
                </p>
                {requisition.ed_signed_at && (
                  <p style={{ margin: '2px 0 0 0', color: '#9ca3af', fontSize: '10px' }}>
                    {new Date(requisition.ed_signed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequisitionDetail;
