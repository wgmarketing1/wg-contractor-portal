import React, { useState } from 'react';
import { Upload, Download, Eye, Mail, Plus, Trash2, Edit2, LogOut, Users, FileText } from 'lucide-react';

const PaymentPortal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const initialUsers = [
    { 
      id: 'admin', 
      email: 'admin@portal.com', 
      password: 'admin123', 
      name: 'Administrator', 
      role: 'admin',
      notificationEmail: 'admin@portal.com'
    },
    { 
      id: 'teamlead_1', 
      email: 'teamlead@portal.com', 
      password: 'team123', 
      name: 'Team Lead', 
      role: 'teamlead',
      notificationEmail: 'teamlead@portal.com'
    }
  ];
  
  const [users, setUsers] = useState(initialUsers);
  const [cleaners, setCleaners] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [showAddCleaner, setShowAddCleaner] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [toast, setToast] = useState(null);
  
  const [newCleaner, setNewCleaner] = useState({
    name: '',
    email: '',
    password: '',
    notificationEmail: '',
    phone: '',
    location: '',
    w9Document: null,
    directDepositDocument: null,
    coiDocument: null,
    backgroundCheckDocument: null,
    profilePhoto: null
  });
  
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkAssignments, setBulkAssignments] = useState({});
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(null);
  const [uploadNote, setUploadNote] = useState('');
  const [showIndividualUpload, setShowIndividualUpload] = useState(false);
  const [selectedCleanerId, setSelectedCleanerId] = useState('');
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCleaners, setExpandedCleaners] = useState({});
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showEditOwnInfo, setShowEditOwnInfo] = useState(false);
  const [showRequestDoc, setShowRequestDoc] = useState(false);
  const [requestDocType, setRequestDocType] = useState('');
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserType, setNewUserType] = useState('cleaner');
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [userTypeFilter, setUserTypeFilter] = useState('all');

  const colors = {
    primary: '#214080',
    secondary: '#3B95D2',
    accent: '#D19742',
    white: '#FFFFFF'
  };

  const LOCATIONS = [
    'Scottsdale',
    'Central Valley',
    'Tempe',
    'Flagstaff',
    'Sedona',
    'Tucson',
    'Palm Springs',
    'San Diego',
    'Colorado Springs',
    'Denver',
    'Omaha',
    'Boise',
    'Sun Valley',
    'Ozarks',
    'Branson',
    'Chicago',
    'Dallas/Frisco',
    'Sarasota'
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin' || user.role === 'teamlead'); // Both see admin dashboard
      setLoginEmail('');
      setLoginPassword('');
    } else {
      showToast('Invalid credentials. Try: admin@portal.com / admin123 or teamlead@portal.com / team123', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const handleAddCleaner = () => {
    if (!newCleaner.name || !newCleaner.email || !newCleaner.password || !newCleaner.location) {
      showToast('Please fill in all required fields (Name, Email, Password, Location)', 'error');
      return;
    }
    const cleanerId = 'cleaner_' + Date.now();
    const newCleanerData = {
      id: cleanerId,
      email: newCleaner.email,
      password: newCleaner.password,
      name: newCleaner.name,
      role: 'cleaner',
      notificationEmail: newCleaner.notificationEmail || newCleaner.email,
      phone: newCleaner.phone,
      location: newCleaner.location,
      w9Document: newCleaner.w9Document,
      directDepositDocument: newCleaner.directDepositDocument,
      coiDocument: newCleaner.coiDocument,
      backgroundCheckDocument: newCleaner.backgroundCheckDocument,
      profilePhoto: newCleaner.profilePhoto
    };
    
    setUsers([...users, newCleanerData]);
    setCleaners([...cleaners, newCleanerData]);
    setNewCleaner({ name: '', email: '', password: '', notificationEmail: '', phone: '', location: '', w9Document: null, directDepositDocument: null, coiDocument: null, backgroundCheckDocument: null, profilePhoto: null });
    setShowAddCleaner(false);
    showToast(`Cleaner ${newCleaner.name} added successfully!`);
  };

  const handleAddUser = () => {
    if (!newCleaner.name || !newCleaner.email || !newCleaner.password) {
      showToast('Please fill in all required fields (Name, Email, Password)', 'error');
      return;
    }
    
    // For cleaner role, location is required
    if (newUserType === 'cleaner' && !newCleaner.location) {
      showToast('Location is required for cleaners', 'error');
      return;
    }
    
    const userId = newUserType + '_' + Date.now();
    const newUserData = {
      id: userId,
      email: newCleaner.email,
      password: newCleaner.password,
      name: newCleaner.name,
      role: newUserType,
      notificationEmail: newCleaner.notificationEmail || newCleaner.email,
      phone: newCleaner.phone,
      location: newUserType === 'cleaner' ? newCleaner.location : undefined,
      w9Document: newUserType === 'cleaner' ? newCleaner.w9Document : undefined,
      directDepositDocument: newUserType === 'cleaner' ? newCleaner.directDepositDocument : undefined,
      coiDocument: newUserType === 'cleaner' ? newCleaner.coiDocument : undefined,
      backgroundCheckDocument: newUserType === 'cleaner' ? newCleaner.backgroundCheckDocument : undefined,
      profilePhoto: newCleaner.profilePhoto // Available for all user types
    };
    
    setUsers([...users, newUserData]);
    if (newUserType === 'cleaner') {
      setCleaners([...cleaners, newUserData]);
    }
    setNewCleaner({ name: '', email: '', password: '', notificationEmail: '', phone: '', location: '', w9Document: null, directDepositDocument: null, coiDocument: null, backgroundCheckDocument: null, profilePhoto: null });
    setShowAddUser(false);
    const userTypeLabel = newUserType === 'admin' ? 'Admin' : newUserType === 'teamlead' ? 'Team Lead' : 'Cleaner';
    showToast(`${userTypeLabel} ${newCleaner.name} added successfully!`);
  };

  const handleDeleteCleaner = (cleanerId) => {
    const confirmed = window.confirm('Are you sure you want to delete this cleaner?');
    if (confirmed) {
      setUsers(users.filter(u => u.id !== cleanerId));
      setCleaners(cleaners.filter(c => c.id !== cleanerId));
      setPdfs(pdfs.filter(p => p.cleanerId !== cleanerId));
      showToast('Cleaner deleted successfully');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditUser(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.notificationEmail) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setCleaners(cleaners.map(c => c.id === editingUser.id ? editingUser : c));
    setShowEditUser(false);
    setEditingUser(null);
    showToast('User information updated successfully!');
  };

  const handleFileUpload = (e, cleanerId) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setPendingUpload({ file: files[0], cleanerId });
      setShowNoteModal(true);
    }
  };

  const confirmUploadWithNote = () => {
    if (!pendingUpload) return;
    
    const { file, cleanerId } = pendingUpload;
    const cleaner = cleaners.find(c => c.id === cleanerId);
    const uploadDate = new Date();
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const pdfData = {
        id: 'pdf_' + Date.now() + '_' + Math.random(),
        cleanerId: cleanerId,
        fileName: file.name, // Original filename
        displayName: file.name, // Use original filename for display
        uploadDate: uploadDate.toISOString(),
        data: event.target.result,
        note: uploadNote
      };
      setPdfs(prev => [...prev, pdfData]);
      
      if (cleaner && cleaner.notificationEmail) {
        sendNotification(cleaner.notificationEmail, cleaner.name, file.name);
      }
      
      showToast(`PDF uploaded successfully for ${cleaner.name}`);
    };
    reader.readAsDataURL(file);
    
    setShowNoteModal(false);
    setPendingUpload(null);
    setUploadNote('');
  };

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileAssignments = {};
    
    files.forEach(file => {
      if (file.type === 'application/pdf') {
        const matchedCleaner = cleaners.find(c => 
          file.name.toLowerCase().includes(c.name.toLowerCase().replace(/\s+/g, ''))
        );
        fileAssignments[file.name] = matchedCleaner ? matchedCleaner.id : '';
      }
    });
    
    setBulkFiles(files);
    setBulkAssignments(fileAssignments);
    setShowBulkUpload(true);
  };

  const confirmBulkUpload = () => {
    bulkFiles.forEach(file => {
      const cleanerId = bulkAssignments[file.name];
      if (cleanerId) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const pdfData = {
            id: 'pdf_' + Date.now() + '_' + Math.random(),
            cleanerId: cleanerId,
            fileName: file.name,
            uploadDate: new Date().toISOString(),
            data: event.target.result
          };
          setPdfs(prev => [...prev, pdfData]);
          
          const cleaner = cleaners.find(c => c.id === cleanerId);
          if (cleaner && cleaner.notificationEmail) {
            sendNotification(cleaner.notificationEmail, cleaner.name, file.name);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    setBulkFiles([]);
    setBulkAssignments({});
    setShowBulkUpload(false);
    showToast('Bulk upload completed!');
  };

  const sendNotification = (email, cleanerName, fileName) => {
    // NOTE: These are SIMULATED email notifications (console log + toast only)
    // To send real emails, you need a backend server with an email service like:
    // - SendGrid, Mailgun, AWS SES, or similar email API
    // - A server-side function to actually send the email
    console.log(`📧 Email sent to ${email}: New payout PDF "${fileName}" has been added to your portal.`);
    showToast(`📧 Notification sent to ${cleanerName} at ${email}`);
  };

  const handleDeletePdf = (pdfId) => {
    const confirmed = window.confirm('Are you sure you want to delete this PDF?');
    if (confirmed) {
      setPdfs(pdfs.filter(p => p.id !== pdfId));
      showToast('PDF deleted successfully');
    }
  };

  const handlePreview = (pdf) => {
    setPreviewPdf(pdf);
  };

  const handleDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.data;
    link.download = pdf.displayName || pdf.fileName;
    link.click();
  };

  const toggleCleanerExpand = (cleanerId) => {
    setExpandedCleaners(prev => ({
      ...prev,
      [cleanerId]: !prev[cleanerId]
    }));
  };

  const getFilteredCleaners = () => {
    let filtered = cleaners;
    
    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(c => c.location === selectedLocation);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        (c.phone && c.phone.includes(query))
      );
    }
    
    return filtered;
  };

  const getUniqueLocations = () => {
    const locations = cleaners.map(c => c.location).filter(Boolean);
    return [...new Set(locations)].sort();
  };

  const handleCleanerSelfEdit = (updatedInfo) => {
    // Update the user in the system
    setUsers(users.map(u => u.id === currentUser.id ? {...u, ...updatedInfo} : u));
    setCleaners(cleaners.map(c => c.id === currentUser.id ? {...c, ...updatedInfo} : c));
    setCurrentUser({...currentUser, ...updatedInfo});
    setShowEditOwnInfo(false);
    
    // Simulate sending notification to admin
    console.log(`📧 ADMIN NOTIFICATION: ${currentUser.name} has updated their contact information.`);
    showToast('Your information has been updated! Admin has been notified.');
  };

  const handleDocumentRequest = () => {
    if (!requestDocType) {
      showToast('Please select a document type', 'error');
      return;
    }
    
    // Simulate sending request to admin
    console.log(`📧 ADMIN NOTIFICATION: ${currentUser.name} has requested to submit a new ${requestDocType}`);
    showToast(`Request sent! Admin will be notified about your ${requestDocType} submission request.`);
    setShowRequestDoc(false);
    setRequestDocType('');
  };

  const getFilteredPayments = () => {
    if (!paymentSearchQuery) return userPdfs;
    
    const query = paymentSearchQuery.toLowerCase();
    return userPdfs.filter(pdf => 
      (pdf.displayName && pdf.displayName.toLowerCase().includes(query)) ||
      (pdf.fileName && pdf.fileName.toLowerCase().includes(query)) ||
      (pdf.note && pdf.note.toLowerCase().includes(query)) ||
      new Date(pdf.uploadDate).toLocaleDateString().includes(query)
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e, cleanerId) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setPendingUpload({ file: files[0], cleanerId });
      setShowNoteModal(true);
    } else {
      showToast('Please drop a PDF file', 'error');
    }
  };

  const handleIndividualUploadFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      if (!selectedCleanerId) {
        showToast('Please select a cleaner first', 'error');
        return;
      }
      setPendingUpload({ file: files[0], cleanerId: selectedCleanerId });
      setShowNoteModal(true);
    }
  };

  const handleW9Upload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCleaner({...newCleaner, w9Document: { name: file.name, data: event.target.result }});
        showToast('W9 document added');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDirectDepositUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCleaner({...newCleaner, directDepositDocument: { name: file.name, data: event.target.result }});
        showToast('Direct deposit document added');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditW9Upload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({...editingUser, w9Document: { name: file.name, data: event.target.result }});
        showToast('W9 document updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditDirectDepositUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({...editingUser, directDepositDocument: { name: file.name, data: event.target.result }});
        showToast('Direct deposit document updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCOIUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCleaner({...newCleaner, coiDocument: { name: file.name, data: event.target.result }});
        showToast('COI/Liability Waiver added');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundCheckUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCleaner({...newCleaner, backgroundCheckDocument: { name: file.name, data: event.target.result }});
        showToast('Background check added');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCleaner({...newCleaner, profilePhoto: { name: file.name, data: event.target.result, type: file.type }});
        showToast('Profile photo added');
      };
      reader.readAsDataURL(file);
    } else {
      showToast('Please upload an image or PDF file', 'error');
    }
  };

  const handleEditCOIUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({...editingUser, coiDocument: { name: file.name, data: event.target.result }});
        showToast('COI/Liability Waiver updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBackgroundCheckUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({...editingUser, backgroundCheckDocument: { name: file.name, data: event.target.result }});
        showToast('Background check updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({...editingUser, profilePhoto: { name: file.name, data: event.target.result, type: file.type }});
        showToast('Profile photo updated');
      };
      reader.readAsDataURL(file);
    } else {
      showToast('Please upload an image or PDF file', 'error');
    }
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '40px', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ color: colors.primary, fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>Payment Portal</h1>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '16px' }}
                placeholder="your.email@example.com"
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '16px' }}
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              style={{ width: '100%', padding: '14px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Login
            </button>
          </div>
          <div style={{ marginTop: '20px', padding: '15px', background: '#f0f4f8', borderRadius: '6px', fontSize: '13px', color: colors.primary }}>
            <strong>Demo Login:</strong><br/>
            Admin: admin@portal.com / admin123
          </div>
        </div>

        {toast && (
          <div style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            background: toast.type === 'error' ? '#ef4444' : colors.accent, 
            color: colors.white, 
            padding: '16px 24px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
            zIndex: 9999,
            minWidth: '300px'
          }}>
            <div style={{ fontWeight: '600', fontSize: '15px' }}>{toast.message}</div>
          </div>
        )}
      </div>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <div style={{ background: colors.primary, color: colors.white, padding: '20px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Admin Dashboard</h1>
              <span style={{ 
                background: currentUser.role === 'admin' ? colors.accent : '#8b5cf6', 
                color: colors.white, 
                padding: '4px 12px', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '600' 
              }}>
                {currentUser.role === 'admin' ? 'Admin' : 'Team Lead - View Only'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: colors.white, padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: colors.secondary, padding: '12px', borderRadius: '8px' }}>
                  <Users size={24} color={colors.white} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Cleaners</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary }}>{cleaners.length}</div>
                </div>
              </div>
            </div>
            <div style={{ background: colors.white, padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: colors.accent, padding: '12px', borderRadius: '8px' }}>
                  <FileText size={24} color={colors.white} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total PDFs</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary }}>{pdfs.length}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => { setNewUserType('cleaner'); setShowAddUser(true); }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                <Plus size={18} />
                Add User
              </button>
            )}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setShowIndividualUpload(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.primary, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                <Upload size={18} />
                Upload Payment
              </button>
            )}
            {currentUser.role === 'admin' && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.secondary, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                <Upload size={18} />
                Bulk Upload PDFs
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleBulkUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
            <button
              onClick={() => setShowAllPayments(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#10b981', color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              <FileText size={18} />
              View All Payments
            </button>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setShowAllUsers(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#8b5cf6', color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                <Users size={18} />
                View All Users
              </button>
            )}
          </div>

          <div style={{ background: colors.white, borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: `2px solid ${colors.secondary}` }}>
              <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Cleaners</h2>
              
              {/* Search and Filter Bar */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    flex: 1,
                    minWidth: '250px',
                    padding: '10px 15px', 
                    border: `2px solid ${colors.secondary}`, 
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{ 
                    padding: '10px 15px', 
                    border: `2px solid ${colors.secondary}`, 
                    borderRadius: '6px',
                    fontSize: '14px',
                    minWidth: '200px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Locations</option>
                  {getUniqueLocations().map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              {getFilteredCleaners().length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
                  {cleaners.length === 0 ? 'No cleaners added yet' : 'No cleaners found matching your search'}
                </p>
              ) : (
                getFilteredCleaners().map(cleaner => {
                  const cleanerPdfs = pdfs.filter(p => p.cleanerId === cleaner.id);
                  const isExpanded = expandedCleaners[cleaner.id];
                  
                  return (
                    <div key={cleaner.id} style={{ marginBottom: '15px', border: `1px solid #e5e7eb`, borderRadius: '8px', overflow: 'hidden', background: '#fafafa' }}>
                      {/* Thumbnail Header - Always Visible */}
                      <div 
                        onClick={() => toggleCleanerExpand(cleaner.id)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '15px 20px',
                          background: colors.white,
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                        onMouseOut={(e) => e.currentTarget.style.background = colors.white}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                          {/* Avatar Circle */}
                          {cleaner.profilePhoto && cleaner.profilePhoto.type?.startsWith('image/') ? (
                            <div style={{ 
                              width: '50px', 
                              height: '50px', 
                              borderRadius: '50%', 
                              overflow: 'hidden',
                              border: `3px solid ${colors.secondary}`,
                              flexShrink: 0
                            }}>
                              <img 
                                src={cleaner.profilePhoto.data} 
                                alt={cleaner.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                          ) : (
                            <div style={{ 
                              width: '50px', 
                              height: '50px', 
                              borderRadius: '50%', 
                              background: colors.secondary,
                              color: colors.white,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              flexShrink: 0
                            }}>
                              {cleaner.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          
                          <div style={{ flex: 1 }}>
                            <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                              {cleaner.name}
                            </h3>
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '13px', color: '#6b7280' }}>
                              <span>📍 {cleaner.location || 'No location'}</span>
                              <span>📧 {cleanerPdfs.length} payment{cleanerPdfs.length !== 1 ? 's' : ''}</span>
                              {cleaner.phone && <span>📞 {cleaner.phone}</span>}
                            </div>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Arrow */}
                        <div style={{ 
                          fontSize: '20px', 
                          color: colors.primary, 
                          transition: 'transform 0.3s', 
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          marginLeft: '10px'
                        }}>
                          ▼
                        </div>
                      </div>
                      
                      {/* Expanded Content - Only Visible When Expanded */}
                      {isExpanded && (
                        <div style={{ padding: '20px', background: colors.white, borderTop: `1px solid #e5e7eb` }}>
                          {/* Full Details */}
                          <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Contact Information</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', color: '#374151', fontSize: '14px' }}>
                              <div><strong>Email:</strong> {cleaner.email}</div>
                              <div><strong>Notification:</strong> {cleaner.notificationEmail}</div>
                              {cleaner.phone && <div><strong>Phone:</strong> {cleaner.phone}</div>}
                              {cleaner.location && <div><strong>Location:</strong> {cleaner.location}</div>}
                            </div>
                          </div>
                          
                          {/* Documents on File */}
                          {(cleaner.w9Document || cleaner.directDepositDocument || cleaner.coiDocument || cleaner.backgroundCheckDocument || cleaner.profilePhoto) && (
                            <div style={{ marginBottom: '20px' }}>
                              <h4 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Documents on File</h4>
                              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {cleaner.w9Document && (
                                  <button
                                    onClick={() => handlePreview(cleaner.w9Document)}
                                    style={{ background: '#10b981', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                  >
                                    <FileText size={16} /> View W9
                                  </button>
                                )}
                                {cleaner.directDepositDocument && (
                                  <button
                                    onClick={() => handlePreview(cleaner.directDepositDocument)}
                                    style={{ background: '#8b5cf6', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                  >
                                    <FileText size={16} /> View Direct Deposit
                                  </button>
                                )}
                                {cleaner.coiDocument && (
                                  <button
                                    onClick={() => handlePreview(cleaner.coiDocument)}
                                    style={{ background: '#f59e0b', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                  >
                                    <FileText size={16} /> View COI/Liability
                                  </button>
                                )}
                                {cleaner.backgroundCheckDocument && (
                                  <button
                                    onClick={() => handlePreview(cleaner.backgroundCheckDocument)}
                                    style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                  >
                                    <FileText size={16} /> View Background Check
                                  </button>
                                )}
                                {cleaner.profilePhoto && (
                                  <button
                                    onClick={() => handlePreview(cleaner.profilePhoto)}
                                    style={{ background: '#06b6d4', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                  >
                                    <Eye size={16} /> View Profile Photo
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Action Buttons - Admin Only */}
                          {currentUser.role === 'admin' && (
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => handleEditUser(cleaner)}
                                style={{ background: colors.secondary, color: colors.white, border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}
                              >
                                <Edit2 size={16} />
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleDeleteCleaner(cleaner.id)}
                                style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}
                              >
                                <Trash2 size={16} />
                                Delete Cleaner
                              </button>
                            </div>
                          )}
                          
                          {/* Upload Payment Records - Admin Only */}
                          {currentUser.role === 'admin' && (
                            <div style={{ marginBottom: '15px' }}>
                              <h4 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Upload Payment Record</h4>
                              <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, cleaner.id)}
                                style={{ 
                                padding: '20px', 
                                border: `2px dashed ${dragOver ? colors.accent : '#d1d5db'}`, 
                                borderRadius: '8px', 
                                background: dragOver ? '#fef3c7' : '#f9fafb',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                              }}
                            >
                              <Upload size={32} color={dragOver ? colors.accent : '#9ca3af'} style={{ margin: '0 auto 10px' }} />
                              <p style={{ color: dragOver ? colors.accent : '#6b7280', fontSize: '14px', margin: '0 0 10px 0', fontWeight: '600' }}>
                                {dragOver ? 'Drop PDF here!' : 'Drag & Drop PDF here'}
                              </p>
                              <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '10px' }}>or</p>
                              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                                <Upload size={16} />
                                Browse Files
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileUpload(e, cleaner.id)}
                                  style={{ display: 'none' }}
                                />
                              </label>
                            </div>
                          </div>
                          )}

                          {/* Payment Records List */}
                          {cleanerPdfs.length > 0 && (
                            <div>
                              <h4 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Payment Records ({cleanerPdfs.length})</h4>
                              {cleanerPdfs.map(pdf => (
                                <div key={pdf.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '6px', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: pdf.note ? '8px' : '0' }}>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: '14px', color: colors.primary, fontWeight: '600' }}>{pdf.displayName || pdf.fileName}</div>
                                      {pdf.note && (
                                        <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px', fontStyle: 'italic' }}>
                                          Note: {pdf.note}
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button
                                        onClick={() => handlePreview(pdf)}
                                        style={{ background: colors.secondary, color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                      >
                                        <Eye size={14} /> Preview
                                      </button>
                                      {currentUser.role === 'admin' && (
                                        <button
                                          onClick={() => handleDeletePdf(pdf.id)}
                                          style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                        >
                                          <Trash2 size={14} /> Delete
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {showAddUser && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Add New User</h2>
              
              {/* User Type Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>User Type *</label>
                <select
                  value={newUserType}
                  onChange={(e) => setNewUserType(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="cleaner">Cleaner</option>
                  <option value="teamlead">Team Lead (View Only)</option>
                  <option value="admin">Admin (Full Access)</option>
                </select>
              </div>

              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Name *</label>
                  <input
                    type="text"
                    value={newCleaner.name}
                    onChange={(e) => setNewCleaner({...newCleaner, name: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Login Email *</label>
                  <input
                    type="email"
                    value={newCleaner.email}
                    onChange={(e) => setNewCleaner({...newCleaner, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Password *</label>
                  <input
                    type="password"
                    value={newCleaner.password}
                    onChange={(e) => setNewCleaner({...newCleaner, password: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Notification Email (optional)</label>
                  <input
                    type="email"
                    value={newCleaner.notificationEmail}
                    onChange={(e) => setNewCleaner({...newCleaner, notificationEmail: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="Leave blank to use login email"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={newCleaner.phone}
                    onChange={(e) => setNewCleaner({...newCleaner, phone: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                {/* Cleaner-specific fields */}
                {newUserType === 'cleaner' && (
                  <>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Location *</label>
                      <select
                        value={newCleaner.location}
                        onChange={(e) => setNewCleaner({...newCleaner, location: e.target.value})}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      >
                        <option value="">Select a location...</option>
                        {LOCATIONS.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>W9 Document (optional)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleW9Upload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {newCleaner.w9Document && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.w9Document.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Direct Deposit Info (optional)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleDirectDepositUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {newCleaner.directDepositDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.directDepositDocument.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>COI/Liability Waiver (optional)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleCOIUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {newCleaner.coiDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.coiDocument.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Background Check (optional)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleBackgroundCheckUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {newCleaner.backgroundCheckDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.backgroundCheckDocument.name}</div>}
                    </div>
                  </>
                )}
                
                {/* Profile Photo - Available for all user types */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Profile Photo (optional)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleProfilePhotoUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.profilePhoto && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.profilePhoto.name}</div>}
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleAddUser} style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Add User
                  </button>
                  <button onClick={() => setShowAddUser(false)} style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddCleaner && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Add New Cleaner</h2>
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Name</label>
                  <input
                    type="text"
                    value={newCleaner.name}
                    onChange={(e) => setNewCleaner({...newCleaner, name: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Login Email</label>
                  <input
                    type="email"
                    value={newCleaner.email}
                    onChange={(e) => setNewCleaner({...newCleaner, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Password</label>
                  <input
                    type="password"
                    value={newCleaner.password}
                    onChange={(e) => setNewCleaner({...newCleaner, password: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Notification Email (optional)</label>
                  <input
                    type="email"
                    value={newCleaner.notificationEmail}
                    onChange={(e) => setNewCleaner({...newCleaner, notificationEmail: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="Leave blank to use login email"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={newCleaner.phone}
                    onChange={(e) => setNewCleaner({...newCleaner, phone: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Location *</label>
                  <select
                    value={newCleaner.location}
                    onChange={(e) => setNewCleaner({...newCleaner, location: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  >
                    <option value="">Select a location...</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>W9 Document (optional)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleW9Upload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.w9Document && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.w9Document.name}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Direct Deposit Info (optional)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleDirectDepositUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.directDepositDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.directDepositDocument.name}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>COI/Liability Waiver (optional)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCOIUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.coiDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.coiDocument.name}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Background Check (optional)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleBackgroundCheckUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.backgroundCheckDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.backgroundCheckDocument.name}</div>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Profile Photo/ID (optional)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleProfilePhotoUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {newCleaner.profilePhoto && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ {newCleaner.profilePhoto.name}</div>}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleAddCleaner} style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Add Cleaner
                  </button>
                  <button onClick={() => setShowAddCleaner(false)} style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditUser && editingUser && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Edit User Information</h2>
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Login Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={editingUser.tempPassword || ''}
                    onChange={(e) => setEditingUser({...editingUser, password: e.target.value || editingUser.password, tempPassword: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="••••••••"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Notification Email</label>
                  <input
                    type="email"
                    value={editingUser.notificationEmail}
                    onChange={(e) => setEditingUser({...editingUser, notificationEmail: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Location</label>
                  <select
                    value={editingUser.location || ''}
                    onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  >
                    <option value="">Select a location...</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                {editingUser.role === 'cleaner' && (
                  <>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>W9 Document</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleEditW9Upload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {editingUser.w9Document && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ Current: {editingUser.w9Document.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Direct Deposit Info</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleEditDirectDepositUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {editingUser.directDepositDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ Current: {editingUser.directDepositDocument.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>COI/Liability Waiver</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleEditCOIUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {editingUser.coiDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ Current: {editingUser.coiDocument.name}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Background Check</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleEditBackgroundCheckUpload}
                        style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                      />
                      {editingUser.backgroundCheckDocument && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ Current: {editingUser.backgroundCheckDocument.name}</div>}
                    </div>
                  </>
                )}
                {/* Profile Photo - Available for all user types */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleEditProfilePhotoUpload}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  {editingUser.profilePhoto && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '5px' }}>✓ Current: {editingUser.profilePhoto.name}</div>}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleUpdateUser} style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Update User
                  </button>
                  <button onClick={() => { setShowEditUser(false); setEditingUser(null); }} style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBulkUpload && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '700px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Assign PDFs to Cleaners</h2>
              {bulkFiles.map((file, index) => (
                <div key={index} style={{ marginBottom: '15px', padding: '15px', background: '#f9fafb', borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>{file.name}</div>
                  <select
                    value={bulkAssignments[file.name] || ''}
                    onChange={(e) => setBulkAssignments({...bulkAssignments, [file.name]: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  >
                    <option value="">Select a cleaner...</option>
                    {cleaners.map(cleaner => (
                      <option key={cleaner.id} value={cleaner.id}>{cleaner.name}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={confirmBulkUpload}
                  style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Confirm Upload
                </button>
                <button
                  onClick={() => { setShowBulkUpload(false); setBulkFiles([]); setBulkAssignments({}); }}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showNoteModal && pendingUpload && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>Add Note to PDF</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                Uploading: <strong>{pendingUpload.file.name}</strong>
              </p>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>
                  Note (optional)
                </label>
                <textarea
                  value={uploadNote}
                  onChange={(e) => setUploadNote(e.target.value)}
                  placeholder="Add a note about this payout (e.g., 'Payment for November services' or 'Bonus included')"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: `2px solid ${colors.secondary}`, 
                    borderRadius: '6px',
                    fontSize: '14px',
                    minHeight: '100px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={confirmUploadWithNote}
                  style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Upload PDF
                </button>
                <button 
                  onClick={() => { setShowNoteModal(false); setPendingUpload(null); setUploadNote(''); }}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showIndividualUpload && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Upload Payment Record</h2>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>
                  Select Cleaner
                </label>
                <select
                  value={selectedCleanerId}
                  onChange={(e) => setSelectedCleanerId(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="">Choose a cleaner...</option>
                  {cleaners.map(cleaner => (
                    <option key={cleaner.id} value={cleaner.id}>{cleaner.name}</option>
                  ))}
                </select>
              </div>
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  if (!selectedCleanerId) {
                    showToast('Please select a cleaner first', 'error');
                    return;
                  }
                  handleDrop(e, selectedCleanerId);
                }}
                style={{ 
                  padding: '30px', 
                  border: `2px dashed ${dragOver ? colors.accent : '#d1d5db'}`, 
                  borderRadius: '8px', 
                  background: dragOver ? '#fef3c7' : '#f9fafb',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}
              >
                <Upload size={48} color={dragOver ? colors.accent : '#9ca3af'} style={{ margin: '0 auto 15px' }} />
                <p style={{ color: dragOver ? colors.accent : '#6b7280', fontSize: '16px', margin: '0 0 10px 0', fontWeight: '600' }}>
                  {dragOver ? 'Drop PDF here!' : 'Drag & Drop PDF here'}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '15px' }}>or</p>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                  <Upload size={18} />
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleIndividualUploadFile}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <button 
                onClick={() => { setShowIndividualUpload(false); setSelectedCleanerId(''); }}
                style={{ width: '100%', padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showAllPayments && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', margin: 0 }}>All Payment Records</h2>
                <button
                  onClick={() => setShowAllPayments(false)}
                  style={{ background: '#6b7280', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  Close
                </button>
              </div>
              <div style={{ flex: 1, overflow: 'auto' }}>
                {pdfs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                    <FileText size={48} style={{ margin: '0 auto 15px', opacity: 0.3 }} />
                    <p style={{ fontSize: '16px', margin: 0 }}>No payment records uploaded yet</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {pdfs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).map(pdf => {
                      const cleaner = cleaners.find(c => c.id === pdf.cleanerId);
                      return (
                        <div key={pdf.id} style={{ border: `1px solid #e5e7eb`, borderRadius: '8px', padding: '15px', background: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{pdf.fileName}</h3>
                                <span style={{ background: colors.secondary, color: colors.white, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                                  {cleaner ? cleaner.name : 'Unknown'}
                                </span>
                              </div>
                              <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 8px 0' }}>
                                Uploaded: {new Date(pdf.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                              {pdf.note && (
                                <div style={{ fontSize: '13px', color: '#374151', fontStyle: 'italic', marginTop: '8px' }}>
                                  Note: {pdf.note}
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handlePreview(pdf)}
                                style={{ background: colors.secondary, color: colors.white, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Eye size={14} /> Preview
                              </button>
                              <button
                                onClick={() => handleDownload(pdf)}
                                style={{ background: colors.accent, color: colors.white, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Download size={14} /> Download
                              </button>
                              <button
                                onClick={() => handleDeletePdf(pdf.id)}
                                style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showAllUsers && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', margin: 0 }}>All Users</h2>
                <button
                  onClick={() => setShowAllUsers(false)}
                  style={{ background: '#6b7280', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  Close
                </button>
              </div>
              
              {/* Filter by user type */}
              <div style={{ marginBottom: '20px' }}>
                <select
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                  style={{ padding: '10px 15px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px', minWidth: '200px' }}
                >
                  <option value="all">All Users</option>
                  <option value="admin">Admins Only</option>
                  <option value="teamlead">Team Leads Only</option>
                  <option value="cleaner">Cleaners Only</option>
                </select>
              </div>
              
              <div style={{ flex: 1, overflow: 'auto' }}>
                {users.filter(u => userTypeFilter === 'all' || u.role === userTypeFilter).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                    <Users size={48} style={{ margin: '0 auto 15px', opacity: 0.3 }} />
                    <p style={{ fontSize: '16px', margin: 0 }}>No users found</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {users.filter(u => userTypeFilter === 'all' || u.role === userTypeFilter).map(user => (
                      <div key={user.id} style={{ border: `1px solid #e5e7eb`, borderRadius: '8px', padding: '15px', background: '#f9fafb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '15px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                            {/* Avatar */}
                            {user.profilePhoto && user.profilePhoto.type?.startsWith('image/') ? (
                              <div style={{ 
                                width: '45px', 
                                height: '45px', 
                                borderRadius: '50%', 
                                overflow: 'hidden',
                                border: `2px solid ${user.role === 'admin' ? colors.accent : user.role === 'teamlead' ? '#8b5cf6' : colors.secondary}`,
                                flexShrink: 0
                              }}>
                                <img 
                                  src={user.profilePhoto.data} 
                                  alt={user.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                            ) : (
                              <div style={{ 
                                width: '45px', 
                                height: '45px', 
                                borderRadius: '50%', 
                                background: user.role === 'admin' ? colors.accent : user.role === 'teamlead' ? '#8b5cf6' : colors.secondary,
                                color: colors.white,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                flexShrink: 0
                              }}>
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{user.name}</h3>
                                <span style={{ 
                                  background: user.role === 'admin' ? colors.accent : user.role === 'teamlead' ? '#8b5cf6' : colors.secondary, 
                                  color: colors.white, 
                                  padding: '4px 12px', 
                                  borderRadius: '12px', 
                                  fontSize: '12px', 
                                  fontWeight: '600' 
                                }}>
                                  {user.role === 'admin' ? 'Admin' : user.role === 'teamlead' ? 'Team Lead' : 'Cleaner'}
                                </span>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                                <div><strong>Email:</strong> {user.email}</div>
                              {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
                              {user.location && <div><strong>Location:</strong> {user.location}</div>}
                              {user.role === 'cleaner' && (
                                <div><strong>Payment Records:</strong> {pdfs.filter(p => p.cleanerId === user.id).length}</div>
                              )}
                            </div>
                            </div>
                          </div>
                          {user.role !== 'admin' || users.filter(u => u.role === 'admin').length > 1 ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleEditUser(user)}
                                style={{ background: colors.secondary, color: colors.white, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Edit2 size={14} /> Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (user.role === 'cleaner') {
                                    handleDeleteCleaner(user.id);
                                  } else {
                                    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                      setUsers(users.filter(u => u.id !== user.id));
                                      setShowAllUsers(false);
                                      showToast(`${user.name} deleted successfully`);
                                    }
                                  }
                                }}
                                style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          ) : (
                            <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>Primary Admin</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            background: toast.type === 'error' ? '#ef4444' : colors.accent, 
            color: colors.white, 
            padding: '16px 24px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
            zIndex: 9999,
            minWidth: '300px'
          }}>
            <div style={{ fontWeight: '600', fontSize: '15px' }}>{toast.message}</div>
          </div>
        )}

        {previewPdf && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setPreviewPdf(null)}>
            <div style={{ background: colors.white, borderRadius: '10px', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: '20px', borderBottom: `2px solid ${colors.secondary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{previewPdf.fileName}</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleDownload(previewPdf)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.accent, color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    style={{ background: '#6b7280', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'auto', padding: '20px', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                  <FileText size={64} color={colors.primary} style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ color: colors.primary, fontSize: '20px', marginBottom: '10px' }}>{previewPdf.fileName}</h3>
                  <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                    PDF preview is not available in this environment. Please download the file to view it.
                  </p>
                  <button
                    onClick={() => handleDownload(previewPdf)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
                  >
                    <Download size={20} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Cleaner Dashboard
  const userPdfs = pdfs.filter(p => p.cleanerId === currentUser.id);
  const filteredPayments = getFilteredPayments();
  
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <div style={{ background: colors.primary, color: colors.white, padding: '20px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Profile Avatar */}
            {currentUser.profilePhoto && currentUser.profilePhoto.type?.startsWith('image/') ? (
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                border: `3px solid ${colors.accent}`,
                flexShrink: 0
              }}>
                <img 
                  src={currentUser.profilePhoto.data} 
                  alt={currentUser.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: colors.accent,
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Welcome, {currentUser.name}</h1>
              <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>Your Well & Good Payment Portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Profile Information Card */}
        <div style={{ background: colors.white, padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>My Information</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowEditOwnInfo(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.secondary, color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                <Edit2 size={16} />
                Edit Contact Info
              </button>
              <button
                onClick={() => setShowRequestDoc(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.accent, color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                <Upload size={16} />
                Request Document Update
              </button>
            </div>
          </div>
          
          {/* Contact Information */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>Email</div>
              <div style={{ color: colors.primary }}>{currentUser.email}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>Notification Email</div>
              <div style={{ color: colors.primary }}>{currentUser.notificationEmail}</div>
            </div>
            {currentUser.phone && (
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>Phone</div>
                <div style={{ color: colors.primary }}>{currentUser.phone}</div>
              </div>
            )}
            {currentUser.location && (
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>Location</div>
                <div style={{ color: colors.primary }}>{currentUser.location}</div>
              </div>
            )}
          </div>
          
          {/* Documents on File */}
          {(currentUser.w9Document || currentUser.directDepositDocument || currentUser.coiDocument || currentUser.backgroundCheckDocument || currentUser.profilePhoto) && (
            <div>
              <div style={{ fontSize: '14px', color: colors.primary, marginBottom: '12px', fontWeight: '600' }}>Documents on File</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {currentUser.w9Document && (
                  <button
                    onClick={() => handlePreview(currentUser.w9Document)}
                    style={{ background: '#10b981', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={14} /> W9
                  </button>
                )}
                {currentUser.directDepositDocument && (
                  <button
                    onClick={() => handlePreview(currentUser.directDepositDocument)}
                    style={{ background: '#8b5cf6', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={14} /> Direct Deposit
                  </button>
                )}
                {currentUser.coiDocument && (
                  <button
                    onClick={() => handlePreview(currentUser.coiDocument)}
                    style={{ background: '#f59e0b', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={14} /> COI/Liability
                  </button>
                )}
                {currentUser.backgroundCheckDocument && (
                  <button
                    onClick={() => handlePreview(currentUser.backgroundCheckDocument)}
                    style={{ background: '#ef4444', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={14} /> Background Check
                  </button>
                )}
                {currentUser.profilePhoto && (
                  <button
                    onClick={() => handlePreview(currentUser.profilePhoto)}
                    style={{ background: '#06b6d4', color: colors.white, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Eye size={14} /> Profile Photo
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div style={{ background: colors.white, padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: colors.secondary, padding: '12px', borderRadius: '8px' }}>
              <FileText size={24} color={colors.white} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Payout Documents</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary }}>{userPdfs.length}</div>
            </div>
          </div>
        </div>

        {/* Payment Records Section */}
        <div style={{ background: colors.white, borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: `2px solid ${colors.secondary}` }}>
            <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Your Payout Breakdowns</h2>
            
            {/* Search Bar */}
            {userPdfs.length > 0 && (
              <input
                type="text"
                placeholder="Search by date, name, or notes..."
                value={paymentSearchQuery}
                onChange={(e) => setPaymentSearchQuery(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '10px 15px', 
                  border: `2px solid ${colors.secondary}`, 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            )}
          </div>
          <div style={{ padding: '20px' }}>
            {userPdfs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                <FileText size={48} style={{ margin: '0 auto 15px', opacity: 0.3 }} />
                <p style={{ fontSize: '16px', margin: 0 }}>No payout documents available yet</p>
                <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>You'll receive an email notification when new documents are added</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                <p style={{ fontSize: '16px', margin: 0 }}>No payments found matching "{paymentSearchQuery}"</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filteredPayments.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).map(pdf => (
                  <div key={pdf.id} style={{ border: `1px solid #e5e7eb`, borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{pdf.displayName || pdf.fileName}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>
                          Uploaded: {new Date(pdf.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        {pdf.note && (
                          <div style={{ padding: '10px', background: '#f0f4f8', borderRadius: '6px', borderLeft: `3px solid ${colors.accent}` }}>
                            <div style={{ fontSize: '12px', color: colors.primary, fontWeight: '600', marginBottom: '4px' }}>Admin Note:</div>
                            <div style={{ fontSize: '14px', color: '#374151' }}>{pdf.note}</div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handlePreview(pdf)}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.secondary, color: colors.white, border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDownload(pdf)}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.accent, color: colors.white, border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: colors.white, borderRadius: '8px', border: `2px solid ${colors.secondary}` }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
            <Mail size={20} color={colors.secondary} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ color: colors.primary, fontWeight: '600', marginBottom: '4px' }}>Email Notifications</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                You'll receive an email at <strong>{currentUser.notificationEmail}</strong> whenever a new payout document is added to your portal.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Own Info Modal */}
      {showEditOwnInfo && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Contact Information</h2>
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Login Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Notification Email</label>
                <input
                  type="email"
                  value={currentUser.notificationEmail}
                  onChange={(e) => setCurrentUser({...currentUser, notificationEmail: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="tel"
                  value={currentUser.phone || ''}
                  onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '6px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#92400e' }}>
                  <strong>Note:</strong> Changes to your contact information will be sent to the admin for approval.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleCleanerSelfEdit({ email: currentUser.email, notificationEmail: currentUser.notificationEmail, phone: currentUser.phone })}
                  style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setShowEditOwnInfo(false)}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Document Update Modal */}
      {showRequestDoc && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '100%' }}>
            <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Request Document Update</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>
                What document would you like to submit?
              </label>
              <select
                value={requestDocType}
                onChange={(e) => setRequestDocType(e.target.value)}
                style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
              >
                <option value="">Select a document type...</option>
                <option value="W9">W9</option>
                <option value="ACH/Direct Deposit Info">ACH/Direct Deposit Info</option>
                <option value="COI/Liability Waiver">COI/Liability Waiver</option>
                <option value="Background Check">Background Check</option>
                <option value="Profile Photo/ID">Profile Photo/ID</option>
              </select>
            </div>
            <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: '#1e40af' }}>
                <strong>Note:</strong> The admin will be notified of your request and will follow up with instructions for submitting the document.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={handleDocumentRequest}
                style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Send Request
              </button>
              <button 
                onClick={() => { setShowRequestDoc(false); setRequestDocType(''); }}
                style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          background: toast.type === 'error' ? '#ef4444' : colors.accent, 
          color: colors.white, 
          padding: '16px 24px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
          zIndex: 9999,
          minWidth: '300px'
        }}>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{toast.message}</div>
        </div>
      )}

      {previewPdf && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setPreviewPdf(null)}>
          <div style={{ background: colors.white, borderRadius: '10px', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px', borderBottom: `2px solid ${colors.secondary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{previewPdf.fileName}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleDownload(previewPdf)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.accent, color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={() => setPreviewPdf(null)}
                  style={{ background: '#6b7280', color: colors.white, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  Close
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '20px', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                <FileText size={64} color={colors.primary} style={{ margin: '0 auto 20px' }} />
                <h3 style={{ color: colors.primary, fontSize: '20px', marginBottom: '10px' }}>{previewPdf.fileName}</h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                  PDF preview is not available in this environment. Please download the file to view it.
                </p>
                <button
                  onClick={() => handleDownload(previewPdf)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPortal;
