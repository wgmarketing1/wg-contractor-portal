import React, { useState } from 'react';
import { Upload, Download, Eye, Mail, Plus, Trash2, Edit2, LogOut, Users, FileText, UserPlus } from 'lucide-react';

const PaymentPortal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });
  
  const initialUsers = [
    { 
      id: 'admin_1', 
      email: 'admin@portal.com', 
      password: 'admin123', 
      name: 'Administrator', 
      role: 'admin',
      notificationEmail: 'admin@portal.com',
      phone: '',
      location: 'Scottsdale',
      status: 'approved',
      w9Document: null,
      directDepositDocument: null,
      coiDocument: null,
      backgroundCheckDocument: null,
      profilePhoto: null
    },
    { 
      id: 'teamlead_1', 
      email: 'teamlead@portal.com', 
      password: 'team123', 
      name: 'Team Lead', 
      role: 'teamlead',
      notificationEmail: 'teamlead@portal.com',
      phone: '',
      location: 'Scottsdale',
      status: 'approved',
      w9Document: null,
      directDepositDocument: null,
      coiDocument: null,
      backgroundCheckDocument: null,
      profilePhoto: null
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
  const [pendingApprovals, setPendingApprovals] = useState([]);

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

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.location) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    
    if (registerData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === registerData.email)) {
      showToast('Email already registered', 'error');
      return;
    }
    
    // Create new user (pending approval)
    const newUserId = 'pending_' + Date.now();
    const newUser = {
      id: newUserId,
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      role: 'cleaner',
      notificationEmail: registerData.email,
      phone: registerData.phone || '',
      location: registerData.location,
      status: 'pending',
      w9Document: null,
      directDepositDocument: null,
      coiDocument: null,
      backgroundCheckDocument: null,
      profilePhoto: null,
      registrationDate: new Date().toISOString()
    };
    
    setPendingApprovals([...pendingApprovals, newUser]);
    setShowRegister(false);
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      location: ''
    });
    
    showToast('Registration submitted! An admin will review and approve your account.', 'success');
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    
    // Check approved users
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin' || user.role === 'teamlead');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      // Check if it's a pending user
      const pendingUser = pendingApprovals.find(u => u.email === loginEmail && u.password === loginPassword);
      if (pendingUser) {
        showToast('Your account is pending admin approval. Please check back later.', 'error');
      } else {
        showToast('Invalid email or password', 'error');
      }
    }
  };

  const handleApproveUser = (userId) => {
    const approvedUser = pendingApprovals.find(u => u.id === userId);
    if (approvedUser) {
      // Remove from pending and add to users
      const newUser = {
        ...approvedUser,
        id: 'cleaner_' + Date.now(),
        status: 'approved'
      };
      
      setUsers([...users, newUser]);
      setCleaners([...cleaners, newUser]);
      setPendingApprovals(pendingApprovals.filter(u => u.id !== userId));
      showToast(`${approvedUser.name} has been approved and can now log in.`);
    }
  };

  const handleRejectUser = (userId) => {
    const rejectedUser = pendingApprovals.find(u => u.id === userId);
    if (rejectedUser) {
      setPendingApprovals(pendingApprovals.filter(u => u.id !== userId));
      showToast(`${rejectedUser.name}'s registration has been rejected.`, 'error');
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
      status: 'approved',
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
      location: newCleaner.location,
      status: 'approved',
      w9Document: newCleaner.w9Document,
      directDepositDocument: newCleaner.directDepositDocument,
      coiDocument: newCleaner.coiDocument,
      backgroundCheckDocument: newCleaner.backgroundCheckDocument,
      profilePhoto: newCleaner.profilePhoto
    };
    
    setUsers([...users, newUserData]);
    if (newUserType === 'cleaner') {
      setCleaners([...cleaners, newUserData]);
    }
    setNewCleaner({ name: '', email: '', password: '', notificationEmail: '', phone: '', location: '', w9Document: null, directDepositDocument: null, coiDocument: null, backgroundCheckDocument: null, profilePhoto: null });
    setShowAddUser(false);
    showToast(`${newUserType.charAt(0).toUpperCase() + newUserType.slice(1)} ${newCleaner.name} added successfully!`);
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCleaner({...newCleaner, [docType]: { name: file.name, data: reader.result }});
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = async (e, cleanerId = null) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    
    if (pdfFiles.length === 0) {
      showToast('Please select PDF files only', 'error');
      return;
    }

    if (cleanerId) {
      const filePromises = pdfFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              id: Date.now() + Math.random(),
              fileName: file.name,
              cleanerId: cleanerId,
              uploadDate: new Date().toISOString(),
              data: reader.result,
              note: ''
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const newPdfs = await Promise.all(filePromises);
      setPendingUpload({ files: newPdfs, cleanerId });
      setShowNoteModal(true);
    } else {
      const filePromises = pdfFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              id: Date.now() + Math.random(),
              fileName: file.name,
              data: reader.result
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const newFiles = await Promise.all(filePromises);
      setBulkFiles([...bulkFiles, ...newFiles]);
      showToast(`${newFiles.length} file(s) added to bulk upload queue`);
    }
  };

  const handleBulkUpload = () => {
    const newPdfs = bulkFiles.map(file => ({
      ...file,
      cleanerId: bulkAssignments[file.id] || 'unassigned',
      uploadDate: new Date().toISOString(),
      note: ''
    }));
    
    setPdfs([...pdfs, ...newPdfs]);
    setBulkFiles([]);
    setBulkAssignments({});
    setShowBulkUpload(false);
    
    const assignedCleaners = new Set(Object.values(bulkAssignments).filter(id => id !== 'unassigned'));
    assignedCleaners.forEach(cleanerId => {
      const cleaner = cleaners.find(c => c.id === cleanerId);
      if (cleaner) {
        console.log(`Email notification sent to ${cleaner.notificationEmail}`);
      }
    });
    
    showToast(`${newPdfs.length} payment document(s) uploaded successfully!`);
  };

  const confirmNoteAndUpload = () => {
    const pdfsWithNote = pendingUpload.files.map(pdf => ({
      ...pdf,
      note: uploadNote
    }));
    
    setPdfs([...pdfs, ...pdfsWithNote]);
    
    const cleaner = cleaners.find(c => c.id === pendingUpload.cleanerId);
    if (cleaner) {
      console.log(`Email notification sent to ${cleaner.notificationEmail}`);
    }
    
    setShowNoteModal(false);
    setPendingUpload(null);
    setUploadNote('');
    setShowIndividualUpload(false);
    setSelectedCleanerId('');
    showToast(`${pdfsWithNote.length} payment document(s) uploaded successfully!`);
  };

  const handleDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.data;
    link.download = pdf.fileName;
    link.click();
  };

  const handleDeletePdf = (pdfId) => {
    setPdfs(pdfs.filter(p => p.id !== pdfId));
    showToast('Payment document deleted');
  };

  const handleDeleteCleaner = (cleanerId) => {
    setCleaners(cleaners.filter(c => c.id !== cleanerId));
    setUsers(users.filter(u => u.id !== cleanerId));
    setPdfs(pdfs.filter(p => p.cleanerId !== cleanerId));
    showToast('Cleaner removed from system');
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setShowEditUser(true);
  };

  const saveUserEdit = () => {
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    if (editingUser.role === 'cleaner') {
      setCleaners(cleaners.map(c => c.id === editingUser.id ? editingUser : c));
    }
    setShowEditUser(false);
    setEditingUser(null);
    showToast('User information updated successfully!');
  };

  const handleCleanerSelfEdit = (updates) => {
    const updatedUser = {...currentUser, ...updates};
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCleaners(cleaners.map(c => c.id === currentUser.id ? updatedUser : c));
    setShowEditOwnInfo(false);
    showToast('Contact information updated! Admin has been notified.');
  };

  const handleDocumentRequest = () => {
    if (!requestDocType) {
      showToast('Please select a document type', 'error');
      return;
    }
    console.log(`Document request sent to admin: ${currentUser.name} needs to update ${requestDocType}`);
    showToast(`Request sent! Admin will contact you about submitting your ${requestDocType}.`);
    setShowRequestDoc(false);
    setRequestDocType('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handlePdfUpload({ target: { files: e.dataTransfer.files } });
  };

  const getCleanerPayments = (cleanerId) => {
    return pdfs.filter(p => p.cleanerId === cleanerId);
  };

  const toggleCleanerExpanded = (cleanerId) => {
    setExpandedCleaners({
      ...expandedCleaners,
      [cleanerId]: !expandedCleaners[cleanerId]
    });
  };

  const filteredCleaners = cleaners.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || c.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = userTypeFilter === 'all' || u.role === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const allPayments = pdfs.filter(p => {
    if (!paymentSearchQuery) return true;
    const cleaner = cleaners.find(c => c.id === p.cleanerId);
    return p.fileName.toLowerCase().includes(paymentSearchQuery.toLowerCase()) ||
           (cleaner && cleaner.name.toLowerCase().includes(paymentSearchQuery.toLowerCase())) ||
           (p.note && p.note.toLowerCase().includes(paymentSearchQuery.toLowerCase()));
  });

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: colors.white, borderRadius: '12px', padding: '40px', maxWidth: '450px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: colors.primary, fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>W&G Cleaning</h1>
            <h2 style={{ color: colors.secondary, fontSize: '20px', fontWeight: '600' }}>Payment Portal</h2>
          </div>
          
          {!showRegister ? (
            <>
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ width: '100%', padding: '14px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', marginBottom: '15px' }}
                  onMouseOver={(e) => e.target.style.opacity = '0.9'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Sign In
                </button>
              </form>
              
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button
                  onClick={() => setShowRegister(true)}
                  style={{ background: 'none', border: 'none', color: colors.secondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Don't have an account? Register here
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Create Account</h3>
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Full Name *</label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email Address *</label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Location *</label>
                  <select
                    value={registerData.location}
                    onChange={(e) => setRegisterData({...registerData, location: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    required
                  >
                    <option value="">Select your location...</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Password *</label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Minimum 6 characters"
                    required
                    minLength="6"
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Confirm Password *</label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: '14px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    style={{ flex: 1, padding: '14px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          )}
          
          <div style={{ marginTop: '20px', padding: '12px', background: '#f0f9ff', borderRadius: '6px', border: `1px solid ${colors.secondary}`, fontSize: '12px', color: colors.primary }}>
            <strong>Demo Access:</strong> Use admin@portal.com / admin123
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <div style={{ background: colors.primary, color: colors.white, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>W&G Cleaning Payment Portal</h1>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Welcome back, {currentUser.name}</p>
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

        <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Pending Approvals Section */}
          {pendingApprovals.length > 0 && (
            <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: `2px solid ${colors.accent}` }}>
              <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={20} color={colors.accent} />
                Pending Approvals ({pendingApprovals.length})
              </h2>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                {pendingApprovals.map(user => (
                  <div key={user.id} style={{ background: '#fef3c7', border: `1px solid ${colors.accent}`, borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', color: colors.primary, fontSize: '16px', marginBottom: '8px' }}>{user.name}</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}><strong>Email:</strong> {user.email}</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}><strong>Location:</strong> {user.location}</div>
                        {user.phone && <div style={{ fontSize: '14px', color: '#6b7280' }}><strong>Phone:</strong> {user.phone}</div>}
                        <div style={{ fontSize: '13px', color: '#92400e', marginTop: '8px' }}>
                          Registered: {new Date(user.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 16px', background: '#059669', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 16px', background: '#dc2626', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAddUser(true)}
              style={{ flex: '1', minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: colors.accent, color: colors.white, border: 'none', padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
            >
              <Plus size={20} />
              Add New User
            </button>
            <button
              onClick={() => setShowIndividualUpload(true)}
              style={{ flex: '1', minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: colors.secondary, color: colors.white, border: 'none', padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
            >
              <Upload size={20} />
              Upload Payment
            </button>
            <button
              onClick={() => setShowBulkUpload(true)}
              style={{ flex: '1', minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: colors.primary, color: colors.white, border: 'none', padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
            >
              <Upload size={20} />
              Bulk Upload
            </button>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              style={{ padding: '10px 20px', background: showAllUsers ? colors.accent : colors.white, color: showAllUsers ? colors.white : colors.primary, border: `2px solid ${colors.accent}`, borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
            >
              <Users size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              {showAllUsers ? 'Show Cleaners' : 'Show All Users'}
            </button>
            <button
              onClick={() => setShowAllPayments(!showAllPayments)}
              style={{ padding: '10px 20px', background: showAllPayments ? colors.secondary : colors.white, color: showAllPayments ? colors.white : colors.primary, border: `2px solid ${colors.secondary}`, borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
            >
              <FileText size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              {showAllPayments ? 'Show by Cleaner' : 'Show All Payments'}
            </button>
          </div>

          {showAllPayments ? (
            <div>
              <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>All Payment Documents</h2>
                <input
                  type="text"
                  placeholder="Search payments by file name, cleaner, or note..."
                  value={paymentSearchQuery}
                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px', marginBottom: '20px' }}
                />
                
                {allPayments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <FileText size={48} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                    <p style={{ fontSize: '16px' }}>No payment documents found</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {allPayments.map(pdf => {
                      const cleaner = cleaners.find(c => c.id === pdf.cleanerId);
                      return (
                        <div key={pdf.id} style={{ background: '#f9fafb', border: `1px solid ${colors.secondary}`, borderRadius: '8px', padding: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                              <div style={{ fontWeight: '600', color: colors.primary, marginBottom: '6px', fontSize: '15px' }}>{pdf.fileName}</div>
                              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                                Cleaner: <strong>{cleaner ? cleaner.name : 'Unknown'}</strong> {cleaner && `(${cleaner.location})`}
                              </div>
                              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                                Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}
                              </div>
                              {pdf.note && (
                                <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '8px', padding: '8px', background: colors.white, borderRadius: '4px' }}>
                                  Note: {pdf.note}
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => setPreviewPdf(pdf)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', background: colors.secondary, color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                              >
                                <Eye size={14} />
                                View
                              </button>
                              <button
                                onClick={() => handleDownload(pdf)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                              >
                                <Download size={14} />
                                Download
                              </button>
                              <button
                                onClick={() => handleDeletePdf(pdf.id)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', background: '#ef4444', color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                              >
                                <Trash2 size={14} />
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
          ) : showAllUsers ? (
            <div>
              <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>All Users</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: '1', minWidth: '250px', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    style={{ padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="teamlead">Team Lead</option>
                    <option value="cleaner">Cleaner</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  {filteredUsers.map(user => (
                    <div key={user.id} style={{ background: '#f9fafb', border: `1px solid ${colors.secondary}`, borderRadius: '8px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{user.name}</h3>
                            <span style={{ 
                              padding: '4px 10px', 
                              background: user.role === 'admin' ? '#ef4444' : user.role === 'teamlead' ? colors.accent : colors.secondary, 
                              color: colors.white, 
                              borderRadius: '12px', 
                              fontSize: '11px', 
                              fontWeight: '600',
                              textTransform: 'uppercase'
                            }}>
                              {user.role}
                            </span>
                          </div>
                          <div style={{ display: 'grid', gap: '6px', fontSize: '14px', color: '#6b7280' }}>
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Notification Email:</strong> {user.notificationEmail}</div>
                            {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
                            {user.location && <div><strong>Location:</strong> {user.location}</div>}
                            {user.role === 'cleaner' && (
                              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                                <strong>Documents:</strong>
                                <div style={{ marginTop: '6px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {user.w9Document && <span style={{ padding: '3px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>W9</span>}
                                  {user.directDepositDocument && <span style={{ padding: '3px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>Direct Deposit</span>}
                                  {user.coiDocument && <span style={{ padding: '3px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>COI</span>}
                                  {user.backgroundCheckDocument && <span style={{ padding: '3px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>Background Check</span>}
                                  {user.profilePhoto && <span style={{ padding: '3px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>Photo</span>}
                                  {!user.w9Document && !user.directDepositDocument && !user.coiDocument && !user.backgroundCheckDocument && !user.profilePhoto && (
                                    <span style={{ color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>No documents uploaded</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEditUser(user)}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                                  if (user.role === 'cleaner') {
                                    handleDeleteCleaner(user.id);
                                  } else {
                                    setUsers(users.filter(u => u.id !== user.id));
                                    showToast('User deleted successfully');
                                  }
                                }
                              }}
                              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: '#ef4444', color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredUsers.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <Users size={48} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                    <p style={{ fontSize: '16px' }}>No users found</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Manage Cleaners</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: '1', minWidth: '250px', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                  />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{ padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    <option value="all">All Locations</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                {filteredCleaners.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <Users size={48} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                    <p style={{ fontSize: '16px' }}>No cleaners found. Add your first cleaner to get started!</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {filteredCleaners.map(cleaner => {
                      const payments = getCleanerPayments(cleaner.id);
                      const isExpanded = expandedCleaners[cleaner.id];
                      
                      return (
                        <div key={cleaner.id} style={{ background: '#f9fafb', border: `1px solid ${colors.secondary}`, borderRadius: '8px', padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                              <h3 style={{ color: colors.primary, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{cleaner.name}</h3>
                              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                <strong>Location:</strong> {cleaner.location}
                              </div>
                              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                <strong>Email:</strong> {cleaner.email}
                              </div>
                              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                <strong>Notification Email:</strong> {cleaner.notificationEmail}
                              </div>
                              {cleaner.phone && (
                                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                  <strong>Phone:</strong> {cleaner.phone}
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => handleEditUser(cleaner)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                              >
                                <Edit2 size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${cleaner.name}? This will also delete all their payment documents.`)) {
                                    handleDeleteCleaner(cleaner.id);
                                  }
                                }}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: '#ef4444', color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '12px' }}>
                            <button
                              onClick={() => toggleCleanerExpanded(cleaner.id)}
                              style={{ width: '100%', padding: '10px', background: colors.secondary, color: colors.white, border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                              <FileText size={16} />
                              {isExpanded ? 'Hide' : 'View'} Payment Documents ({payments.length})
                            </button>

                            {isExpanded && (
                              <div style={{ marginTop: '12px' }}>
                                {payments.length === 0 ? (
                                  <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '14px' }}>
                                    No payment documents yet
                                  </div>
                                ) : (
                                  <div style={{ display: 'grid', gap: '10px' }}>
                                    {payments.map(pdf => (
                                      <div key={pdf.id} style={{ background: colors.white, padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '10px' }}>
                                          <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: colors.primary, marginBottom: '4px', fontSize: '14px' }}>{pdf.fileName}</div>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                              Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}
                                            </div>
                                            {pdf.note && (
                                              <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', marginTop: '6px', padding: '6px', background: '#f9fafb', borderRadius: '4px' }}>
                                                Note: {pdf.note}
                                              </div>
                                            )}
                                          </div>
                                          <div style={{ display: 'flex', gap: '6px' }}>
                                            <button
                                              onClick={() => setPreviewPdf(pdf)}
                                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: colors.secondary, color: colors.white, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                                            >
                                              <Eye size={12} />
                                              View
                                            </button>
                                            <button
                                              onClick={() => handleDownload(pdf)}
                                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                                            >
                                              <Download size={12} />
                                            </button>
                                            <button
                                              onClick={() => handleDeletePdf(pdf.id)}
                                              style={{ padding: '6px 10px', background: '#ef4444', color: colors.white, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                                            >
                                              <Trash2 size={12} />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {showAddUser && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', overflow: 'auto' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Add New User</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>User Role *</label>
                <select
                  value={newUserType}
                  onChange={(e) => setNewUserType(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="cleaner">Cleaner</option>
                  <option value="teamlead">Team Lead</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Name *</label>
                <input
                  type="text"
                  value={newCleaner.name}
                  onChange={(e) => setNewCleaner({...newCleaner, name: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  placeholder="Enter full name"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Email (Login) *</label>
                <input
                  type="email"
                  value={newCleaner.email}
                  onChange={(e) => setNewCleaner({...newCleaner, email: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  placeholder="email@example.com"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Password *</label>
                <input
                  type="text"
                  value={newCleaner.password}
                  onChange={(e) => setNewCleaner({...newCleaner, password: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  placeholder="Create a password"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Notification Email</label>
                <input
                  type="email"
                  value={newCleaner.notificationEmail}
                  onChange={(e) => setNewCleaner({...newCleaner, notificationEmail: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  placeholder="If different from login email"
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

              {newUserType === 'cleaner' && (
                <>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Location *</label>
                    <select
                      value={newCleaner.location}
                      onChange={(e) => setNewCleaner({...newCleaner, location: e.target.value})}
                      style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    >
                      <option value="">Select location...</option>
                      {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
                    <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Optional Documents</h3>
                    
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', color: colors.primary, fontSize: '14px', marginBottom: '6px' }}>W9 Document</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'w9Document')}
                          style={{ width: '100%', fontSize: '13px' }}
                        />
                        {newCleaner.w9Document && <span style={{ fontSize: '12px', color: '#059669' }}>✓ {newCleaner.w9Document.name}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', color: colors.primary, fontSize: '14px', marginBottom: '6px' }}>Direct Deposit Info</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'directDepositDocument')}
                          style={{ width: '100%', fontSize: '13px' }}
                        />
                        {newCleaner.directDepositDocument && <span style={{ fontSize: '12px', color: '#059669' }}>✓ {newCleaner.directDepositDocument.name}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', color: colors.primary, fontSize: '14px', marginBottom: '6px' }}>COI/Liability Waiver</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'coiDocument')}
                          style={{ width: '100%', fontSize: '13px' }}
                        />
                        {newCleaner.coiDocument && <span style={{ fontSize: '12px', color: '#059669' }}>✓ {newCleaner.coiDocument.name}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', color: colors.primary, fontSize: '14px', marginBottom: '6px' }}>Background Check</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'backgroundCheckDocument')}
                          style={{ width: '100%', fontSize: '13px' }}
                        />
                        {newCleaner.backgroundCheckDocument && <span style={{ fontSize: '12px', color: '#059669' }}>✓ {newCleaner.backgroundCheckDocument.name}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', color: colors.primary, fontSize: '14px', marginBottom: '6px' }}>Profile Photo/ID</label>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'profilePhoto')}
                          style={{ width: '100%', fontSize: '13px' }}
                        />
                        {newCleaner.profilePhoto && <span style={{ fontSize: '12px', color: '#059669' }}>✓ {newCleaner.profilePhoto.name}</span>}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button
                  onClick={handleAddUser}
                  style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Add User
                </button>
                <button
                  onClick={() => {
                    setShowAddUser(false);
                    setNewCleaner({ name: '', email: '', password: '', notificationEmail: '', phone: '', location: '', w9Document: null, directDepositDocument: null, coiDocument: null, backgroundCheckDocument: null, profilePhoto: null });
                  }}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showIndividualUpload && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '100%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Upload Payment Document</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>Select Cleaner</label>
                <select
                  value={selectedCleanerId}
                  onChange={(e) => setSelectedCleanerId(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="">Choose a cleaner...</option>
                  {cleaners.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.location})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '8px' }}>Select PDF File(s)</label>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => selectedCleanerId && handlePdfUpload(e, selectedCleanerId)}
                  disabled={!selectedCleanerId}
                  style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                />
              </div>

              <button
                onClick={() => {
                  setShowIndividualUpload(false);
                  setSelectedCleanerId('');
                }}
                style={{ width: '100%', padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showBulkUpload && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Bulk Upload Payment Documents</h2>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ 
                  border: `3px dashed ${dragOver ? colors.accent : colors.secondary}`, 
                  borderRadius: '10px', 
                  padding: '40px', 
                  textAlign: 'center', 
                  marginBottom: '20px',
                  background: dragOver ? '#fef3c7' : '#f0f9ff',
                  transition: 'all 0.3s'
                }}
              >
                <Upload size={48} color={colors.secondary} style={{ margin: '0 auto 15px' }} />
                <p style={{ color: colors.primary, fontWeight: '600', marginBottom: '10px' }}>
                  Drag & drop PDF files here
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>or</p>
                <label style={{ 
                  display: 'inline-block',
                  padding: '12px 24px', 
                  background: colors.secondary, 
                  color: colors.white, 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handlePdfUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {bulkFiles.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                    Files to Upload ({bulkFiles.length})
                  </h3>
                  <div style={{ maxHeight: '300px', overflow: 'auto', border: `1px solid ${colors.secondary}`, borderRadius: '6px', padding: '10px' }}>
                    {bulkFiles.map(file => (
                      <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '6px', marginBottom: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', color: colors.primary, fontSize: '14px' }}>{file.fileName}</div>
                        </div>
                        <select
                          value={bulkAssignments[file.id] || ''}
                          onChange={(e) => setBulkAssignments({...bulkAssignments, [file.id]: e.target.value})}
                          style={{ padding: '8px', border: `2px solid ${colors.secondary}`, borderRadius: '4px', fontSize: '13px' }}
                        >
                          <option value="">Assign to cleaner...</option>
                          {cleaners.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({c.location})</option>
                          ))}
                        </select>
                        <button
                          onClick={() => setBulkFiles(bulkFiles.filter(f => f.id !== file.id))}
                          style={{ padding: '6px 10px', background: '#ef4444', color: colors.white, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleBulkUpload}
                  disabled={bulkFiles.length === 0}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    background: bulkFiles.length > 0 ? colors.accent : '#9ca3af', 
                    color: colors.white, 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: bulkFiles.length > 0 ? 'pointer' : 'not-allowed', 
                    fontWeight: 'bold' 
                  }}
                >
                  Upload All ({bulkFiles.length})
                </button>
                <button
                  onClick={() => {
                    setShowBulkUpload(false);
                    setBulkFiles([]);
                    setBulkAssignments({});
                  }}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditUser && editingUser && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
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
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Email (Login)</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
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
                  <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Phone</label>
                  <input
                    type="tel"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                  />
                </div>
                {editingUser.role === 'cleaner' && (
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: colors.primary, fontWeight: '600', marginBottom: '6px' }}>Location</label>
                    <select
                      value={editingUser.location || ''}
                      onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                      style={{ width: '100%', padding: '10px', border: `2px solid ${colors.secondary}`, borderRadius: '6px' }}
                    >
                      <option value="">Select location...</option>
                      {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={saveUserEdit}
                    style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setShowEditUser(false);
                      setEditingUser(null);
                    }}
                    style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showNoteModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '20px' }}>
            <div style={{ background: colors.white, borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '100%' }}>
              <h2 style={{ color: colors.primary, fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Add Note (Optional)</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
                Add a note about this payment that will be visible to the cleaner (e.g., "Q4 2024 Bonus" or "Week of Jan 15-21")
              </p>
              <textarea
                value={uploadNote}
                onChange={(e) => setUploadNote(e.target.value)}
                placeholder="Enter note about this payment..."
                rows="4"
                style={{ width: '100%', padding: '12px', border: `2px solid ${colors.secondary}`, borderRadius: '6px', fontSize: '14px', marginBottom: '20px', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={confirmNoteAndUpload}
                  style={{ flex: 1, padding: '12px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {uploadNote ? 'Upload with Note' : 'Upload without Note'}
                </button>
                <button
                  onClick={() => {
                    setShowNoteModal(false);
                    setPendingUpload(null);
                    setUploadNote('');
                  }}
                  style={{ flex: 1, padding: '12px', background: '#6b7280', color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const myPayments = pdfs.filter(p => p.cleanerId === currentUser.id);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <div style={{ background: colors.primary, color: colors.white, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>W&G Cleaning Payment Portal</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Welcome, {currentUser.name}</p>
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
        <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Your Information</h2>
          <div style={{ display: 'grid', gap: '10px', fontSize: '15px', color: '#4b5563' }}>
            <div><strong style={{ color: colors.primary }}>Name:</strong> {currentUser.name}</div>
            <div><strong style={{ color: colors.primary }}>Location:</strong> {currentUser.location}</div>
            <div><strong style={{ color: colors.primary }}>Email:</strong> {currentUser.email}</div>
            <div><strong style={{ color: colors.primary }}>Notification Email:</strong> {currentUser.notificationEmail}</div>
            {currentUser.phone && <div><strong style={{ color: colors.primary }}>Phone:</strong> {currentUser.phone}</div>}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowEditOwnInfo(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: colors.secondary, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              <Edit2 size={16} />
              Update Contact Info
            </button>
            <button
              onClick={() => setShowRequestDoc(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              <Upload size={16} />
              Request Document Update
            </button>
          </div>
        </div>

        <div style={{ background: colors.white, borderRadius: '10px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: colors.primary, fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Your Payment Documents ({myPayments.length})
          </h2>

          {myPayments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
              <FileText size={64} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>No payment documents yet</h3>
              <p style={{ fontSize: '14px' }}>Your payment documents will appear here when they're uploaded by the admin.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {myPayments.map(pdf => (
                <div key={pdf.id} style={{ background: '#f9fafb', border: `1px solid ${colors.secondary}`, borderRadius: '8px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h3 style={{ color: colors.primary, fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{pdf.fileName}</h3>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>
                        <strong>Uploaded:</strong> {new Date(pdf.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      {pdf.note && (
                        <div style={{ marginTop: '10px', padding: '12px', background: '#fef3c7', borderRadius: '6px', border: '1px solid #fbbf24' }}>
                          <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400e', marginBottom: '4px' }}>Note from Admin:</div>
                          <div style={{ fontSize: '14px', color: '#78350f' }}>{pdf.note}</div>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => setPreviewPdf(pdf)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: colors.secondary, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(pdf)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
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

          <div style={{ marginTop: '25px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: `1px solid ${colors.secondary}` }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
              <Mail size={20} color={colors.secondary} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                You'll receive an email at <strong>{currentUser.notificationEmail}</strong> whenever a new payout document is added to your portal.
              </div>
            </div>
          </div>
        </div>
      </div>

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
