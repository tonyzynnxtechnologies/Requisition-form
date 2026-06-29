# Digital Signature Feature — Changelog

**Date:** 29 June 2026  
**Project:** Naipunnya Material Requisition System  
**Feature:** Signature Upload & Auto-Attachment to Requisitions

---

## Overview

This update adds the ability for all users (Staff, HOD, Executive Director) to upload a digital signature image through their profile page. Signatures are automatically captured and attached to requisitions at each stage of the approval workflow:

| Workflow Step | Trigger | Signature Captured |
|---|---|---|
| Staff submits a requisition | Click "Submit" | Staff's signature |
| HOD approves a requisition | Click "Approve" | HOD's signature |
| ED approves a requisition | Click "Approve" | ED's signature |

Once attached, signatures are visible to anyone who opens the requisition — both on screen and in printed/PDF output.

> **Important:** Signatures are **snapshotted** (copied) onto the requisition at the moment of action. If a user later changes their signature, previously signed requisitions retain the original signature.

---

## Files Changed

### Backend

#### 1. `backend/admin_panel/models.py`
- **Added** `signature` field to the `User` model
  - Type: `ImageField`
  - Upload path: `media/signatures/`
  - Optional (blank/null allowed)

#### 2. `backend/user_module/models.py`
- **Added** 9 new fields to the `Requisition` model:

| Field | Type | Purpose |
|---|---|---|
| `staff_signature` | ImageField | Copy of staff's signature at submission |
| `staff_sign_name` | CharField | Name of the staff who signed |
| `staff_signed_at` | DateTimeField | Timestamp of staff signing |
| `hod_signature` | ImageField | Copy of HOD's signature at approval |
| `hod_sign_name` | CharField | Name of the HOD who signed |
| `hod_signed_at` | DateTimeField | Timestamp of HOD signing |
| `ed_signature` | ImageField | Copy of ED's signature at approval |
| `ed_sign_name` | CharField | Name of the ED who signed |
| `ed_signed_at` | DateTimeField | Timestamp of ED signing |

#### 3. `backend/admin_panel/serializers.py`
- **Added** `signature` field to `UserUpdateSerializer` — allows signature to be updated via admin API
- **Added** `signature` field to `UserSerializer` — exposes signature URL in user list responses

#### 4. `backend/user_module/serializers.py`
- **Added** all 9 signature fields (`staff_signature`, `staff_sign_name`, `staff_signed_at`, `hod_signature`, `hod_sign_name`, `hod_signed_at`, `ed_signature`, `ed_sign_name`, `ed_signed_at`) to `RequisitionDetailSerializer`

#### 5. `backend/admin_panel/views.py`
- **New:** `SignatureUploadView` class
  - `POST /api/signature/` — Upload a signature image (accepts `signature` or `file` in form data)
  - `DELETE /api/signature/` — Remove the current user's signature
- **Modified:** `LoginView` — Added `signature` URL to the login response payload
- **Modified:** `CurrentUserView` — Added `signature` URL to the current user response payload

#### 6. `backend/admin_panel/urls.py`
- **Added** URL route: `path('signature/', SignatureUploadView.as_view())`

#### 7. `backend/user_module/views.py`
- **Modified:** `RequisitionSubmitView.post()` — When a staff member submits a requisition:
  - Copies the staff's signature image file to `requisition.staff_signature`
  - Records `staff_sign_name` (staff's display name) and `staff_signed_at` (current timestamp)
- **Modified:** `RequisitionActionView.post()` — When HOD/ED approves:
  - On `approved_by_hod`: Copies HOD's signature to `requisition.hod_signature`, records name and timestamp
  - On `approved_by_ed`: Copies ED's signature to `requisition.ed_signature`, records name and timestamp
- **Added** import: `from django.core.files.base import ContentFile` (used to create independent file copies)

#### 8. Database Migrations (auto-generated)
- `admin_panel/migrations/0003_user_signature.py` — Adds `signature` field to User table
- `user_module/migrations/0004_requisition_ed_sign_name_requisition_ed_signature_and_more.py` — Adds all 9 signature fields to Requisition table

---

### Frontend

#### 9. `requi/src/services/api.js`
- **Added** `uploadSignature(file)` — Uploads a signature image via `POST /api/signature/`
- **Added** `deleteSignature()` — Removes signature via `DELETE /api/signature/`

#### 10. `requi/src/pages/staff/UserProfile.jsx`
- **Added** "Digital Signature" card in the right column (below Account Settings)
  - Shows a dashed-border preview area with the current signature image
  - "Upload Signature" / "Replace Signature" button
  - "Remove" link when a signature exists
  - Accepts PNG, JPG, JPEG images
- **Added** `handleSignatureUpload()` and `handleRemoveSignature()` handler functions
- **Updated** imports to include `uploadSignature`, `deleteSignature`, `FileSignature` icon

#### 11. `requi/src/pages/hod/HodProfile.jsx`
- **Added** "Digital Signature" card in the right column (below HOD Authority Settings)
  - Same upload/preview/delete functionality as staff profile
  - Description text: "This will be automatically attached to requisitions you approve"
- **Added** `handleSignatureUpload()` and `handleRemoveSignature()` handler functions
- **Updated** imports to include `uploadSignature`, `deleteSignature`, `FileSignature` icon

#### 12. `requi/src/pages/ed/EdProfile.jsx`
- **Replaced** the placeholder "Digital Authorization" section (which had a mock italic name and hardcoded "LAST UPDATED: 12 OCT 2023") with a real signature upload card
  - Shows actual uploaded signature image or a subtle placeholder
  - Upload/Replace/Remove functionality
  - Green info banner about secure storage
- **Added** `handleSignatureUpload()` and `handleRemoveSignature()` handler functions
- **Updated** imports to include `uploadSignature`, `deleteSignature`, `FileSignature` icon

#### 13. `requi/src/pages/shared/RequisitionDetail.jsx`

**Screen Layout:**
- **Added** a "Signatures" card below the "Supporting Documents" card (left column)
  - Shows up to 3 signature blocks in a responsive grid: Staff, HOD, ED
  - Each block displays: role label, signature image, signer name, date signed
  - Only appears when at least one signature exists on the requisition

**Print Layout:**
- **Updated** the signature blocks at the bottom of the print layout:
  - Now renders the actual signature image above each signature line
  - Shows the signer's name and date below the line
  - Falls back to "PENDING" text when a signature hasn't been captured yet
- **Added** `getMediaUrl` import to resolve signature image URLs

---

## New API Endpoints

| Method | URL | Description | Auth Required |
|---|---|---|---|
| POST | `/api/signature/` | Upload signature image | Yes |
| DELETE | `/api/signature/` | Remove signature image | Yes |

---

## How It Works

### 1. Uploading a Signature
- User navigates to their Profile page (Staff Profile, HOD Profile, or ED Profile)
- In the "Digital Signature" section, they click "Upload Signature"
- They select a PNG or JPG image of their signature
- The image is uploaded to the server and stored in `media/signatures/`
- The signature preview updates immediately

### 2. Automatic Attachment on Submission/Approval
- **When Staff clicks "Submit Requisition":** The backend reads the staff user's `signature` file, creates an independent copy, and saves it as `staff_signature` on the requisition record. The staff's name and current timestamp are also recorded.
- **When HOD clicks "Approve Request":** Same process — HOD's signature is copied to `hod_signature` on the requisition.
- **When ED clicks "Approve Requisition":** ED's signature is copied to `ed_signature`.

### 3. Viewing Signatures
- Anyone who opens the requisition detail page will see a "Signatures" card showing all captured signatures with names and dates.
- When printing or saving as PDF, the signatures appear at the bottom of the document in the three-column signature block area.

### 4. Signature Independence
- Each signature is a **physical copy** of the original file. If a user later changes or deletes their profile signature, previously signed requisitions are not affected.

---

## Database Schema Changes

### `admin_panel_user` table
```
+ signature VARCHAR(100) NULL
```

### `user_module_requisition` table
```
+ staff_signature   VARCHAR(100) NULL
+ staff_sign_name   VARCHAR(255) DEFAULT ''
+ staff_signed_at   DATETIME NULL
+ hod_signature     VARCHAR(100) NULL
+ hod_sign_name     VARCHAR(255) DEFAULT ''
+ hod_signed_at     DATETIME NULL
+ ed_signature      VARCHAR(100) NULL
+ ed_sign_name      VARCHAR(255) DEFAULT ''
+ ed_signed_at      DATETIME NULL
```

---

## Media Storage

Uploaded files are stored in the following directories under `backend/media/`:

| Directory | Contents |
|---|---|
| `signatures/` | User profile signature images |
| `req_signatures/` | Signature snapshots attached to requisitions |

---

## Testing Checklist

- [ ] Upload a signature on Staff profile → verify preview shows
- [ ] Replace the signature → verify new image replaces old
- [ ] Remove the signature → verify preview shows "No signature uploaded"
- [ ] Submit a requisition as Staff → open it → verify staff signature appears in Signatures card
- [ ] Approve as HOD → verify HOD signature appears alongside staff signature
- [ ] Approve as ED → verify all three signatures are visible
- [ ] Print / Save as PDF → verify all signatures render in the print footer
- [ ] Change signature on profile after signing → verify old requisition still shows original signature
