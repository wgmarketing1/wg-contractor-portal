Conversation opened. 1 unread message.

Skip to content
Using wellandgood.pro Mail with screen readers
in:trash 
Enable desktop notifications for wellandgood.pro Mail.
   OK  No thanks

22 of 121
Portal Codes
Trash

Jason Felt
Attachments
Feb 18, 2026, 3:50 PM (7 days ago)
to me

Here are the codes for both the cleaner and the invoice generator portal. The larger one is the invoice creator and the smaller is the cleaner portal. let me know if you need me to send in any different formats.
--

Jason Felt
Company Administration
Well & Good Professional Services 
 (480) 781-2919

 www.wellandgood.pro

 jason.felt@wellandgood.pro 

Book a meeting with Jason

			You Tube Channel

Well & Good ranked #384 on the 2025 Inc 5000 fastest growing list! 
 3 Attachments
  •  Scanned by Gmail
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>W&G Invoice Generator - Baserow Edition</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --navy: #1a2e5a;
            --navy-light: #243b6e;
            --blue: #3478c6;
            --blue-light: #4a8fd9;
            --sky: #e8f1fb;
            --sky-deep: #d0e3f5;
            --surface: #f7f8fa;
            --surface-raised: #ffffff;
            --border: #e2e5ea;
            --border-focus: #3478c6;
            --text: #1a1f2e;
            --text-secondary: #5a6275;
            --text-muted: #8b92a5;
            --success: #0d7a3e;
            --success-bg: #ecf7f0;
            --success-border: #c8e6d3;
            --error: #c23a3a;
            --error-bg: #fdf0f0;
            --error-border: #f0cece;
            --warning: #8a6d1b;
            --warning-bg: #fdf8ec;
            --warning-border: #f0e3b8;
            --info-bg: #eef5fc;
            --info-border: #c8ddf2;
            --info: #1e5a8a;
            --radius-sm: 6px;
            --radius: 10px;
            --radius-lg: 16px;
            --shadow-sm: 0 1px 3px rgba(26, 46, 90, 0.06);
            --shadow: 0 2px 8px rgba(26, 46, 90, 0.08);
            --shadow-lg: 0 8px 30px rgba(26, 46, 90, 0.12);
            --shadow-xl: 0 16px 50px rgba(26, 46, 90, 0.16);
            --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--surface);
            min-height: 100vh;
            padding: 24px;
            color: var(--text);
            -webkit-font-smoothing: antialiased;
        }
        
        .container {
            max-width: 960px;
            margin: 0 auto;
            background: var(--surface-raised);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--border);
            overflow: hidden;
        }
        
        /* ── Header ── */
        .header {
            background: var(--navy);
            color: white;
            padding: 32px 40px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .header-logo {
            width: 44px;
            height: 44px;
            background: rgba(255,255,255,0.12);
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4em;
            flex-shrink: 0;
        }
        
        .header h1 {
            font-size: 1.5em;
            font-weight: 700;
            letter-spacing: -0.02em;
        }
        
        .header p {
            font-size: 0.85em;
            opacity: 0.6;
            font-weight: 400;
            margin-top: 2px;
        }
        
        /* ── Tabs ── */
        .tab-nav {
            display: flex;
            gap: 2px;
            padding: 16px 24px 0;
            background: var(--surface);
            border-bottom: 1px solid var(--border);
        }
        
        .tab-btn {
            padding: 10px 20px;
            font-family: inherit;
            font-size: 0.85em;
            font-weight: 600;
            border: none;
            background: transparent;
            color: var(--text-muted);
            cursor: pointer;
            border-radius: var(--radius-sm) var(--radius-sm) 0 0;
            transition: var(--transition);
            position: relative;
        }
        
        .tab-btn:hover {
            color: var(--text-secondary);
            background: rgba(52, 120, 198, 0.05);
        }
        
        .tab-btn.active {
            color: var(--blue);
            background: var(--surface-raised);
            border: 1px solid var(--border);
            border-bottom: 1px solid var(--surface-raised);
            margin-bottom: -1px;
        }
        
        /* ── Content Sections ── */
        .content {
            padding: 32px;
        }
        
        .upload-section {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 32px;
            margin-bottom: 24px;
        }
        
        .upload-section:hover {
            border-color: var(--sky-deep);
        }
        
        .upload-section.drag-over {
            border-color: var(--blue);
            background: var(--sky);
        }
        
        .upload-section h2 {
            color: var(--text);
            margin-bottom: 24px;
            font-size: 1.15em;
            font-weight: 700;
            letter-spacing: -0.01em;
        }
        
        /* ── Drop Zones ── */
        .file-input-wrapper {
            margin: 16px 0;
        }
        
        .file-input-wrapper > label {
            display: block;
            margin-bottom: 6px;
            color: var(--text-secondary);
            font-weight: 600;
            font-size: 0.85em;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        
        .drop-zone {
            border: 2px dashed var(--border);
            border-radius: var(--radius);
            padding: 24px 20px;
            margin: 0 auto;
            max-width: 420px;
            transition: var(--transition);
            cursor: pointer;
            text-align: center;
            background: var(--surface-raised);
        }
        
        .drop-zone:hover, .drop-zone.drag-over {
            border-color: var(--blue);
            background: var(--sky);
        }
        
        .drop-zone .drop-icon {
            font-size: 1.6em;
            margin-bottom: 6px;
            opacity: 0.7;
        }
        
        .drop-zone .drop-text {
            color: var(--text-muted);
            font-size: 0.85em;
        }
        
        .drop-zone .file-loaded {
            color: var(--success);
            font-weight: 600;
        }
        
        input[type="file"] {
            display: block;
            margin: 8px auto;
            padding: 10px;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            background: var(--surface-raised);
            cursor: pointer;
            max-width: 420px;
            width: 100%;
            font-family: inherit;
            font-size: 0.9em;
            color: var(--text-secondary);
        }
        
        input[type="file"]:hover {
            border-color: var(--blue);
        }
        
        input[type="date"], input[type="text"], input[type="number"], select {
            padding: 10px 14px;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            font-family: inherit;
            font-size: 0.9em;
            color: var(--text);
            background: var(--surface-raised);
            transition: var(--transition);
        }
        
        input[type="date"]:focus, input[type="text"]:focus, input[type="number"]:focus, select:focus {
            outline: none;
            border-color: var(--border-focus);
            box-shadow: 0 0 0 3px rgba(52, 120, 198, 0.12);
        }
        
        /* ── Progress Bar ── */
        .progress-bar-container {
            width: 100%;
            background: var(--surface);
            border-radius: 100px;
            overflow: hidden;
            margin: 16px 0;
            height: 28px;
            display: none;
            border: 1px solid var(--border);
        }
        
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--navy) 0%, var(--blue) 100%);
            border-radius: 100px;
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.75em;
            font-weight: 600;
            min-width: 44px;
            letter-spacing: 0.02em;
        }
        
        .unsaved-badge {
            display: inline-block;
            background: var(--warning-bg);
            color: var(--warning);
            font-size: 0.7em;
            padding: 2px 8px;
            border-radius: 100px;
            margin-left: 8px;
            font-weight: 600;
            vertical-align: middle;
            border: 1px solid var(--warning-border);
        }
        
        /* ── Buttons ── */
        .btn {
            background: var(--navy);
            color: white;
            border: none;
            padding: 12px 28px;
            font-family: inherit;
            font-size: 0.9em;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            margin: 6px;
            letter-spacing: 0.01em;
        }
        
        .btn:hover {
            background: var(--navy-light);
            box-shadow: var(--shadow);
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .btn:disabled {
            background: var(--border);
            color: var(--text-muted);
            cursor: not-allowed;
            box-shadow: none;
        }
        
        .btn-secondary {
            background: var(--surface);
            color: var(--text-secondary);
            border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
            background: var(--sky);
            border-color: var(--blue);
            color: var(--navy);
        }
        
        .btn-danger {
            background: var(--error-bg);
            color: var(--error);
            border: 1px solid var(--error-border);
        }
        
        .btn-danger:hover {
            background: var(--error);
            color: white;
            border-color: var(--error);
        }
        
        /* ── Status Messages ── */
        .status {
            margin: 16px 0;
            padding: 12px 16px;
            border-radius: var(--radius-sm);
            display: none;
            font-size: 0.9em;
            font-weight: 500;
        }
        
        .status.success {
            background: var(--success-bg);
            color: var(--success);
            border: 1px solid var(--success-border);
            display: block;
        }
        
        .status.error {
            background: var(--error-bg);
            color: var(--error);
            border: 1px solid var(--error-border);
            display: block;
        }
        
        .status.info {
            background: var(--info-bg);
            color: var(--info);
            border: 1px solid var(--info-border);
            display: block;
        }
        
        /* ── Results ── */
        .results {
            margin-top: 24px;
        }
        
        .invoice-link {
            display: inline-block;
            margin: 4px;
            padding: 10px 18px;
            background: var(--navy);
            color: white;
            text-decoration: none;
            border-radius: var(--radius-sm);
            transition: var(--transition);
            font-size: 0.85em;
            font-weight: 500;
        }
        
        .invoice-link:hover {
            background: var(--navy-light);
            box-shadow: var(--shadow);
        }
        
        .summary {
            background: var(--surface);
            padding: 20px 24px;
            border-radius: var(--radius);
            margin: 20px 0;
            border: 1px solid var(--border);
        }
        
        .summary h3 {
            color: var(--text);
            margin-bottom: 12px;
            font-size: 1em;
            font-weight: 700;
        }
        
        .summary-item {
            padding: 8px 0;
            border-bottom: 1px solid var(--border);
            font-size: 0.9em;
            color: var(--text-secondary);
        }
        
        .summary-item:last-child {
            border-bottom: none;
        }
        
        /* ── Modals ── */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(26, 46, 90, 0.5);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        
        .modal-content {
            background-color: var(--surface-raised);
            margin: 3% auto;
            padding: 0;
            border: 1px solid var(--border);
            width: 90%;
            max-width: 960px;
            border-radius: var(--radius-lg);
            max-height: 90vh;
            overflow: auto;
            box-shadow: var(--shadow-xl);
        }
        
        .modal-header {
            padding: 20px 24px;
            background: var(--navy);
            color: white;
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            font-size: 1.1em;
            font-weight: 600;
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .close {
            color: rgba(255,255,255,0.7);
            font-size: 28px;
            font-weight: 400;
            cursor: pointer;
            line-height: 1;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-sm);
            transition: var(--transition);
        }
        
        .close:hover {
            background: rgba(255,255,255,0.12);
            color: white;
        }
        
        /* ── Debug Panel ── */
        .debug {
            background: var(--warning-bg);
            padding: 16px;
            border-radius: var(--radius);
            margin: 20px 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8em;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid var(--warning-border);
            color: var(--warning);
            line-height: 1.6;
        }
        
        /* ── QBO Section Cards ── */
        .qbo-card {
            background: var(--surface-raised);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 24px;
            margin: 16px 0;
        }
        
        .qbo-card h3 {
            color: var(--navy);
            margin-bottom: 12px;
            font-size: 1em;
            font-weight: 700;
        }
        
        .qbo-card p {
            color: var(--text-secondary);
            font-size: 0.85em;
            margin-bottom: 12px;
        }
        
        .qbo-instructions {
            background: var(--sky);
            padding: 16px 20px;
            border-radius: var(--radius);
            margin-top: 16px;
            border: 1px solid var(--sky-deep);
        }
        
        .qbo-instructions h4 {
            color: var(--navy);
            margin-bottom: 10px;
            font-size: 0.9em;
        }
        
        .qbo-instructions ol {
            margin: 0;
            padding-left: 20px;
            color: var(--text-secondary);
            font-size: 0.85em;
            line-height: 2;
        }
        
        /* ── Responsive ── */
        @media (max-width: 640px) {
            body { padding: 12px; }
            .header { padding: 24px 20px; }
            .content { padding: 20px; }
            .upload-section { padding: 20px; }
            .tab-nav { padding: 12px 12px 0; }
            .tab-btn { padding: 8px 14px; font-size: 0.8em; }
            .btn { padding: 10px 20px; font-size: 0.85em; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-logo">📊</div>
            <div>
                <h1>W&G Invoice Generator</h1>
                <p>Baserow-Powered Edition</p>
            </div>
        </div>
        
        <!-- Tab Navigation -->
        <div class="tab-nav">
            <button class="tab-btn active" id="csvTab" onclick="switchTab('csv')">
                CSV Import
            </button>
            <button class="tab-btn" id="manualTab" onclick="switchTab('manual')">
                Manual Invoice
            </button>
            <button class="tab-btn" id="qboTab" onclick="switchTab('qbo')">
                QBO Export
            </button>
        </div>
        
        <!-- CSV Import Section -->
        <div id="csvSection" class="content">
            <div class="upload-section">
                <h2>📁 Step 1: Upload Files</h2>
                
                <div class="file-input-wrapper">
                    <label>Breezeway Export (CSV)</label>
                    <div class="drop-zone" id="breezewayDropZone" onclick="document.getElementById('breezewayFile').click()">
                        <div class="drop-icon">📄</div>
                        <div id="breezewayDropText" class="drop-text">Drag & drop or click to select</div>
                        <input type="file" id="breezewayFile" accept=".csv" style="display: none;">
                    </div>
                </div>
                
                <div class="file-input-wrapper">
                    <label>Baserow Service Pricing Export (CSV)</label>
                    <div class="drop-zone" id="baserowDropZone" onclick="document.getElementById('baserowFile').click()">
                        <div class="drop-icon">📊</div>
                        <div id="baserowDropText" class="drop-text">Drag & drop or click to select</div>
                        <input type="file" id="baserowFile" accept=".csv" style="display: none;">
                    </div>
                </div>
                
                <div class="file-input-wrapper">
                    <label>Invoice Period (Optional)</label>
                    <div style="display: flex; gap: 10px; align-items: center; justify-content: center;">
                        <input type="date" id="startDate" style="padding: 12px; border: 2px solid #dee2e6; border-radius: 8px;">
                        <span style="font-weight: 600;">to</span>
                        <input type="date" id="endDate" style="padding: 12px; border: 2px solid #dee2e6; border-radius: 8px;">
                    </div>
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" id="ignoreSavedEdits" style="width: 20px; height: 20px;">
                        <span style="font-weight: 600;">Generate fresh invoices (ignore any saved edits)</span>
                    </label>
                </div>
                
                <button class="btn" id="processBtn" disabled>Generate Invoices</button>
                
                <button class="btn btn-danger" onclick="clearSavedEdits()" style="margin-top: 10px;">
                    Clear All Saved Edits
                </button>
                
                <div class="progress-bar-container" id="progressContainer">
                    <div class="progress-bar" id="progressBar" style="width: 0%;">0%</div>
                </div>
            </div>
            
            <div id="status" class="status"></div>
            
            <div id="results" class="results"></div>
        </div>
        
        <!-- Manual Invoice Section -->
        <div id="manualSection" class="content" style="display: none;">
            <div class="upload-section">
                <h2>✏️ Create Manual Invoice</h2>
                
                <div class="file-input-wrapper">
                    <label>Client Name</label>
                    <input type="text" id="manualClientName" placeholder="e.g., AvantStay (AZ)" 
                           style="width: 100%; padding: 12px; border: 2px solid #dee2e6; border-radius: 8px;">
                </div>
                
                <div class="file-input-wrapper">
                    <label>Invoice Period (Optional)</label>
                    <div style="display: flex; gap: 10px; align-items: center; justify-content: center;">
                        <input type="date" id="manualStartDate" style="padding: 12px; border: 2px solid #dee2e6; border-radius: 8px;">
                        <span style="font-weight: 600;">to</span>
                        <input type="date" id="manualEndDate" style="padding: 12px; border: 2px solid #dee2e6; border-radius: 8px;">
                    </div>
                </div>
                
                <h3 style="margin-top: 30px;">Line Items</h3>
                <div id="manualLineItems">
                    <!-- Line items will be added here -->
                </div>
                
                <button class="btn" onclick="addManualLineItem()" style="margin-top: 20px;">
                    ➕ Add Line Item
                </button>
                
                <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <strong>Total: $<span id="manualTotal">0.00</span></strong>
                </div>
                
                <button class="btn" onclick="generateManualInvoice()" style="margin-top: 20px;">
                    📄 Generate Invoice
                </button>
            </div>
            
            <div id="manualStatus" class="status"></div>
            <div id="manualResults" class="results"></div>
        </div>
        
        <!-- QBO Export Section -->
        <div id="qboSection" class="content" style="display: none;">
            <div class="upload-section">
                <h2>📊 QuickBooks Export (Transaction Pro)</h2>
                <p style="color: #666; margin-bottom: 20px;">Generate invoices first using CSV Import, then use this tab to export for QuickBooks.</p>
                
                <!-- Step 1: Client Mapping -->
                <div class="qbo-card">
                    <h3>Step 1: Client Name Mapping (Optional)</h3>
                    <p>Upload a CSV mapping Baserow client names to QBO customer names. If not uploaded, Baserow names are used as-is.</p>
                    
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <input type="file" id="qboMappingFile" accept=".csv" style="max-width: 300px;">
                        <button class="btn btn-secondary" onclick="downloadMappingTemplate()">
                            Download Mapping Template
                        </button>
                    </div>
                    <div id="qboMappingStatus"></div>
                </div>
                
                <!-- Step 2: Invoice Date & Starting Number -->
                <div class="qbo-card">
                    <h3>Step 2: Invoice Settings</h3>
                    
                    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85em; color: var(--text-secondary);">Invoice Date</label>
                            <input type="date" id="qboInvoiceDate">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.85em; color: var(--text-secondary);">Starting Invoice # (blank = QBO auto)</label>
                            <input type="number" id="qboStartingInvoiceNum" placeholder="e.g., 32852" style="width: 200px;">
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Export -->
                <div class="qbo-card">
                    <h3>Step 3: Export</h3>
                    
                    <button class="btn" onclick="generateTransactionProExport()" style="margin-right: 8px;">
                        Transaction Pro Format
                    </button>
                    <button class="btn btn-secondary" onclick="generateQuickBooksCSV(AppState.clientInvoices)">
                        Generic QBO CSV
                    </button>
                    
                    <div id="qboMappingIssues" style="display: none; margin-top: 16px;"></div>
                    
                    <div class="qbo-instructions">
                        <h4>After Exporting:</h4>
                        <ol>
                            <li>Open <strong>Transaction Pro Importer</strong></li>
                            <li>Click <strong>Import → Invoices</strong></li>
                            <li>Upload the exported CSV file</li>
                            <li>Review the preview for accuracy</li>
                            <li>Click <strong>Import</strong> to push to QuickBooks</li>
                            <li>Review invoices in QBO before sending to clients</li>
                        </ol>
                    </div>
                </div>
            </div>
            
            <div id="qboStatus" class="status"></div>
        </div>
    </div>
    
    <!-- Modal for invoice preview -->
    <div id="invoiceModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Invoice Preview</h2>
                <span class="close" onclick="closePreview()">&times;</span>
            </div>
            <div class="modal-body">
                <iframe id="invoiceFrame" style="width: 100%; height: 70vh; border: none;"></iframe>
            </div>
        </div>
    </div>
    
    <!-- Modal for invoice editing -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Invoice</h2>
                <span class="close" onclick="closeEdit()">&times;</span>
            </div>
            <div class="modal-body">
                <div id="editContent" style="max-height: 70vh; overflow-y: auto; padding: 20px;">
                    <!-- Edit form will be inserted here -->
                </div>
                <div style="padding: 20px; border-top: 1px solid #dee2e6; text-align: right;">
                    <button class="btn" onclick="saveInvoiceEdits()" style="margin-right: 10px;">💾 Save Changes</button>
                    <button class="btn" onclick="closeEdit()" style="background: #6c757d;">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ╔══════════════════════════════════════════════════════════════╗
        // ║  W&G Invoice Generator — JavaScript                        ║
        // ║  Version 3.0 · February 2026                               ║
        // ╠══════════════════════════════════════════════════════════════╣
        // ║  TABLE OF CONTENTS                                         ║
        // ║                                                            ║
        // ║  §1  APP STATE & UTILITIES          — AppState, blob mgmt  ║
        // ║  §2  DRAG-DROP & PROGRESS UI        — drop zones, progress ║
        // ║  §3  FILE UPLOAD & CSV PARSING      — handlers, validation ║
        // ║  §4  DATA EXTRACTION HELPERS        — property ID, names   ║
        // ║  §5  CATEGORIZATION & PROCESSING    — core invoice engine  ║
        // ║  §6  INVOICE HTML GENERATION        — client invoice HTML  ║
        // ║  §7  PREVIEW & EDIT MODAL           — view, edit, save     ║
        // ║  §8  TAB NAVIGATION                 — CSV, Manual, QBO     ║
        // ║  §9  MANUAL INVOICE                 — one-off invoices     ║
        // ║  §10 STORAGE & PERSISTENCE          — localStorage mgmt   ║
        // ║  §11 EXPORT: EXCEL & CSV            — xlsx, generic CSV    ║
        // ║  §12 EXPORT: QBO / TRANSACTION PRO  — mapping, 55-col CSV ║
        // ╚══════════════════════════════════════════════════════════════╝
        //
        // DATA FLOW:
        //   Breezeway CSV ──┐
        //                   ├─→ parseCSV() ─→ validate ─→ AppState
        //   Baserow CSV ────┘                                │
        //                                                    ▼
        //   processInvoices() ← date filter ← pricing lookup
        //       │
        //       ├─→ AppState.clientInvoices  (line items grouped by client)
        //       │         │
        //       │         ├─→ generateInvoiceHTML()   → HTML invoices
        //       │         ├─→ generateExcelFile()     → XLSX workbook
        //       │         ├─→ generateQuickBooksCSV() → generic CSV
        //       │         └─→ generateTransactionProExport() → 55-col CSV
        //       │
        //       └─→ Edit modal ← localStorage (persisted edits)
        //
        // CONFIGURATION POINTS:
        //   • LOCATION_CLASS_MAP    (§12) — Property ID prefix → QBO class
        //   • SERVICE_ITEM_MAP      (§12) — Category → QBO service item
        //   • EXPECTED_BREEZEWAY_COLS (§3) — Required Breezeway columns
        //   • EXPECTED_BASEROW_COLS_VARIANTS (§3) — Required Baserow cols
        //   • categorizeLineItem()  (§5) — Service type classification
        //
        // ╔══════════════════════════════════════════════════════════════╗
        // ║  W&G INVOICE GENERATOR — JAVASCRIPT SECTION MAP            ║
        // ╠══════════════════════════════════════════════════════════════╣
        // ║                                                            ║
        // ║  §1  APP STATE & UTILITIES          (blob tracking, etc)   ║
        // ║  §2  DRAG-DROP & PROGRESS UI        (drop zones, bar)      ║
        // ║  §3  FILE UPLOAD & CSV PARSING      (readers, validators)  ║
        // ║  §4  DATA EXTRACTION HELPERS        (propID, clean type)   ║
        // ║  §5  CATEGORIZATION                 (single source)        ║
        // ║  §6  INVOICE PROCESSING ENGINE      (main pipeline)        ║
        // ║  §7  MULTIPLIER & SERVICE LOGIC     (tags, multipliers)    ║
        // ║  §8  HTML INVOICE GENERATION        (client-facing output) ║
        // ║  §9  INVOICE PREVIEW & EDIT         (modals, dirty state)  ║
        // ║  §10 TAB NAVIGATION                 (CSV/Manual/QBO tabs)  ║
        // ║  §11 MANUAL INVOICE                 (one-off creation)     ║
        // ║  §12 LOCALSTORAGE MANAGEMENT        (edits persistence)    ║
        // ║  §13 EXPORT: EXCEL & ZIP            (xlsx, zip downloads)  ║
        // ║  §14 EXPORT: QBO / TRANSACTION PRO  (55-col CSV, mapping)  ║
        // ║                                                            ║
        // ║  CONFIG: Location codes    → §14 LOCATION_CLASS_MAP        ║
        // ║  CONFIG: Service items     → §14 SERVICE_ITEM_MAP          ║
        // ║  CONFIG: Category rules    → §5  categorizeLineItem()      ║
        // ║  CONFIG: Clean types       → §4  extractCleanType()        ║
        // ║  CONFIG: Multiplier parse  → §7  extractMultipliers()      ║
        // ║                                                            ║
        // ╚══════════════════════════════════════════════════════════════╝

        // ============================================================
        // §1  APP STATE & UTILITIES
        // ============================================================
        const AppState = {
            breezewayData: null,
            baserowData: null,
            clientInvoices: {},
            invoiceBlobs: [],
            invoiceHTMLs: {},
            excelBlob: null,
            currentEdit: {
                client: null,
                items: null
            },
            // Track blob URLs for cleanup
            _blobURLs: []
        };
        
        // Helper to create and track blob URLs
        function createTrackedBlobURL(blob) {
            const url = URL.createObjectURL(blob);
            AppState._blobURLs.push(url);
            return url;
        }
        
        // Helper to clean up all tracked blob URLs
        function revokeAllBlobURLs() {
            AppState._blobURLs.forEach(url => {
                try { URL.revokeObjectURL(url); } catch(e) {}
            });
            AppState._blobURLs = [];
        }
        
        document.getElementById('breezewayFile').addEventListener('change', handleBreezewayUpload);
        document.getElementById('baserowFile').addEventListener('change', handleBaserowUpload);
        document.getElementById('processBtn').addEventListener('click', processInvoices);
        
        // ============================================================
        // §2  DRAG-DROP & PROGRESS UI
        // ============================================================
        function setupDropZone(dropZoneId, fileInputId) {
            const zone = document.getElementById(dropZoneId);
            if (!zone) return;
            
            ['dragenter', 'dragover'].forEach(evt => {
                zone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    zone.classList.add('drag-over');
                });
            });
            
            ['dragleave', 'drop'].forEach(evt => {
                zone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    zone.classList.remove('drag-over');
                });
            });
            
            zone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const input = document.getElementById(fileInputId);
                    // Create a DataTransfer to set files on the input
                    const dt = new DataTransfer();
                    dt.items.add(files[0]);
                    input.files = dt.files;
                    input.dispatchEvent(new Event('change'));
                }
            });
        }
        
        setupDropZone('breezewayDropZone', 'breezewayFile');
        setupDropZone('baserowDropZone', 'baserowFile');
        
        // §2b Progress bar
        function showProgress(percent, label) {
            const container = document.getElementById('progressContainer');
            const bar = document.getElementById('progressBar');
            container.style.display = 'block';
            bar.style.width = Math.min(100, Math.max(0, percent)) + '%';
            bar.textContent = label || Math.round(percent) + '%';
        }
        
        function hideProgress() {
            document.getElementById('progressContainer').style.display = 'none';
        }
        
        // ============================================================
        // §3  FILE UPLOAD & CSV PARSING
        //     Includes upload handlers, CSV parser, and column validation.
        //     Expected Breezeway columns: Property, Group, Task title,
        //       Task tags, Due date, Task report link
        //     Expected Baserow columns: Property_ID (or Property ID),
        //       Cleaning_Client_Price, LL_Client_Price,
        //       Morning_Coffee_Client_Price, Can_Monkey_Discount,
        //       Guest_Essentials_Client_Price, Location
        // ============================================================
        
        // Column validation — runs on upload to catch format issues early
        const EXPECTED_BREEZEWAY_COLS = ['Property', 'Group', 'Task title', 'Task tags', 'Due date'];
        const EXPECTED_BASEROW_COLS_VARIANTS = {
            'Property_ID': ['Property_ID', 'Property ID', 'id'],
            'Cleaning_Price': ['Cleaning_Client_Price', 'Cleaning Client Price'],
            'LL_Price': ['LL_Client_Price', 'LL Client Price'],
        };
        
        function validateBreezewayColumns(data) {
            if (!data || data.length === 0) return { valid: false, message: 'File is empty or could not be parsed.' };
            
            const columns = Object.keys(data[0]);
            const missing = EXPECTED_BREEZEWAY_COLS.filter(col => !columns.includes(col));
            
            if (missing.length > 0) {
                return {
                    valid: false,
                    message: `Missing expected columns: ${missing.join(', ')}. Found: ${columns.slice(0, 10).join(', ')}${columns.length > 10 ? '...' : ''}`
                };
            }
            return { valid: true };
        }
        
        function validateBaserowColumns(data) {
            if (!data || data.length === 0) return { valid: false, message: 'File is empty or could not be parsed.' };
            
            const columns = Object.keys(data[0]);
            const issues = [];
            
            // Check for Property ID column (any variant)
            const hasId = EXPECTED_BASEROW_COLS_VARIANTS['Property_ID'].some(v => columns.includes(v));
            if (!hasId) issues.push('Property ID');
            
            // Check for Cleaning Price (any variant)
            const hasCleaning = EXPECTED_BASEROW_COLS_VARIANTS['Cleaning_Price'].some(v => columns.includes(v));
            if (!hasCleaning) issues.push('Cleaning Client Price');
            
            if (issues.length > 0) {
                return {
                    valid: false,
                    message: `Missing expected columns: ${issues.join(', ')}. Found: ${columns.slice(0, 10).join(', ')}${columns.length > 10 ? '...' : ''}`
                };
            }
            
            // Check for currency symbols in first data row (common issue)
            const firstRow = data[0];
            const priceCol = EXPECTED_BASEROW_COLS_VARIANTS['Cleaning_Price'].find(v => columns.includes(v));
            if (priceCol && firstRow[priceCol]) {
                const val = String(firstRow[priceCol]);
                if (val.includes('$') || val.includes(',')) {
                    // Not an error — parseCurrency handles this — but log for awareness
                    console.log('Note: Baserow prices contain currency symbols (handled automatically)');
                }
            }
            
            return { valid: true };
        }
        
        function handleBreezewayUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const parsed = parseCSV(e.target.result);
                
                // Validate columns before accepting
                const validation = validateBreezewayColumns(parsed);
                if (!validation.valid) {
                    showStatus(`⚠️ Breezeway CSV issue: ${validation.message}`, 'error');
                    document.getElementById('breezewayDropText').innerHTML = `<span style="color: #dc3545;">❌ ${file.name} — ${validation.message}</span>`;
                    AppState.breezewayData = null;
                    checkReadyToProcess();
                    return;
                }
                
                AppState.breezewayData = parsed;
                showStatus(`✓ Breezeway file loaded: ${AppState.breezewayData.length} tasks`, 'success');
                document.getElementById('breezewayDropText').innerHTML = `<span class="file-loaded">✅ ${file.name} (${AppState.breezewayData.length} tasks)</span>`;
                checkReadyToProcess();
            };
            reader.readAsText(file);
        }
        
        function handleBaserowUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const parsed = parseCSV(e.target.result);
                
                // Validate columns before accepting
                const validation = validateBaserowColumns(parsed);
                if (!validation.valid) {
                    showStatus(`⚠️ Baserow CSV issue: ${validation.message}`, 'error');
                    document.getElementById('baserowDropText').innerHTML = `<span style="color: #dc3545;">❌ ${file.name} — ${validation.message}</span>`;
                    AppState.baserowData = null;
                    checkReadyToProcess();
                    return;
                }
                
                AppState.baserowData = parsed;
                showStatus(`✓ Baserow file loaded: ${AppState.baserowData.length} properties`, 'success');
                document.getElementById('baserowDropText').innerHTML = `<span class="file-loaded">✅ ${file.name} (${AppState.baserowData.length} properties)</span>`;
                checkReadyToProcess();
            };
            reader.readAsText(file);
        }
        
        function parseCSV(text) {
            // Remove BOM if present
            text = text.replace(/^\ufeff/, '');
            
            const lines = text.split('\n');
            const headers = parseCSVLine(lines[0]).map(h => h.trim());
            const data = [];
            
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const values = parseCSVLine(lines[i]);
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] ? values[index].trim() : '';
                });
                data.push(row);
            }
            
            return data;
        }
        
        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current);
            
            return result;
        }
        
        function checkReadyToProcess() {
            const btn = document.getElementById('processBtn');
            btn.disabled = !(AppState.breezewayData && AppState.baserowData);
        }
        
        function showStatus(message, type) {
            const statusDiv = document.getElementById('status');
            statusDiv.textContent = message;
            statusDiv.className = `status ${type}`;
        }
        
        // ============================================================
        // §4  DATA EXTRACTION HELPERS
        //     Functions to parse property IDs, names, clean types,
        //     and client names from Breezeway's Property column format:
        //     "Client - Property Name | PROP_ID - Address"
        // ============================================================
        
        function extractPropertyID(propertyString) {
            // Extract Property ID from format: "Client - Property Name | PROP_ID - Address"
            const match = propertyString.match(/\|\s*([A-Z]{2}\d{4})\s*-/);
            return match ? match[1] : null;
        }
        
        function extractPropertyName(propertyString) {
            // Extract Property Name from format: "Client - Property Name | PROP_ID - Address"
            const match = propertyString.match(/-\s*([^|]+)\s*\|/);
            return match ? match[1].trim() : '';
        }
        
        function extractCleanType(taskTitle) {
            // Extract the type of clean from the task title
            // Examples: "Arrival Clean by 4pm" -> "Arrival"
            //          "Mid-Stay Clean" -> "Mid-Stay"
            //          "Clean + Checklist A by 4pm" -> "Standard"
            //          "After 4pm Arrival VIP Clean" -> "Arrival VIP"
            //          "Clean After LTS" -> "After LTS"
            
            const title = taskTitle.toLowerCase();
            
            // Check for specific clean types
            if (title.includes('arrival') && title.includes('vip')) return 'Arrival VIP';
            if (title.includes('arrival')) return 'Arrival';
            if (title.includes('mid-stay')) return 'Mid-Stay';
            if (title.includes('departure')) return 'Departure';
            if (title.includes('turnover')) return 'Turnover';
            if (title.includes('deep clean')) return 'Deep Clean';
            if (title.includes('post owner stay')) return 'Post Owner Stay';
            if (title.includes('owner prep')) return 'Owner Prep';
            if (title.includes('after lts')) return 'After LTS';
            if (title.includes('before lts')) return 'Before LTS';
            
            // Default to Standard if just "clean"
            if (title.includes('clean')) return 'Standard';
            
            return '';
        }
        
        function extractClientName(propertyString) {
            // Extract client name from beginning of string before the dash
            const match = propertyString.match(/^([^-]+)/);
            return match ? match[1].trim() : 'Unknown Client';
        }
        
        // ============================================================
        // §5  CATEGORIZATION & PROCESSING
        //     categorizeLineItem() is the SINGLE SOURCE OF TRUTH for
        //     classifying line items across all outputs (HTML, Excel,
        //     QBO). processInvoices() is the main engine: reads
        //     Breezeway tasks, looks up Baserow pricing, applies
        //     multipliers, and populates AppState.clientInvoices.
        // ============================================================
        function categorizeLineItem(description) {
            const desc = description.toLowerCase();
            if (desc.includes('cleaning')) return 'cleaning';
            if (desc.includes('laundry') || desc.includes('l&l')) return 'll';
            if (desc.includes('morning coffee') || desc.includes('coffee')) return 'coffee';
            if (desc.includes('guest essential')) return 'guestEssentials';
            if (desc.includes('can discount') || desc.includes('&can')) return 'canDiscount';
            if (desc.includes('processing fee')) return 'processingFees';
            if (desc.includes('tbs') || desc.includes('specialty') || desc.includes('offboarding') 
                || desc.includes('unused property') || desc.includes('return visit') 
                || desc.includes('canceled') || desc.includes('cancelled')) return 'tbs';
            return 'other';
        }
        
        async function processInvoices() {
            showStatus('🔄 Processing invoices...', 'info');
            showProgress(0, 'Starting...');
            
            // Disable button during processing
            document.getElementById('processBtn').disabled = true;
            
            try {
                // Debug info
                console.log('Breezeway columns:', Object.keys(AppState.breezewayData[0] || {}));
                console.log('Baserow columns:', Object.keys(AppState.baserowData[0] || {}));
                
                // ============================================================
                // DATE FILTERING - Only include tasks within the invoice period
                // ============================================================
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                let filteredBreezewayData = AppState.breezewayData;
                let filteredOutCount = 0;
                
                if (startDate || endDate) {
                    const startFilter = startDate ? new Date(startDate + 'T00:00:00') : null;
                    const endFilter = endDate ? new Date(endDate + 'T23:59:59') : null;
                    
                    filteredBreezewayData = breezewayData.filter(task => {
                        const dueDateStr = task['Due date'] || '';
                        if (!dueDateStr) return true; // Keep tasks with no date
                        
                        // Parse the date - handle various formats
                        const taskDate = new Date(dueDateStr);
                        if (isNaN(taskDate.getTime())) return true; // Keep tasks with unparseable dates
                        
                        if (startFilter && taskDate < startFilter) { filteredOutCount++; return false; }
                        if (endFilter && taskDate > endFilter) { filteredOutCount++; return false; }
                        return true;
                    });
                    
                    console.log(`Date filter: ${filteredOutCount} tasks excluded (outside ${startDate || 'start'} to ${endDate || 'end'})`);
                }
                
                // Create pricing lookup from Baserow data
                const pricingLookup = {};
                AppState.baserowData.forEach(row => {
                    // Try multiple possible column names for Property ID
                    const propId = row['Property_ID'] || row['Property ID'] || row['id'];
                    if (propId) {
                        // Helper function to parse currency (removes $, commas)
                        const parseCurrency = (value) => {
                            if (!value) return 0;
                            const cleaned = String(value).replace(/[$,]/g, '').trim();
                            return parseFloat(cleaned) || 0;
                        };
                        
                        pricingLookup[propId.trim()] = {
                            cleaning: parseCurrency(row['Cleaning_Client_Price'] || row['Cleaning Client Price']),
                            ll: parseCurrency(row['LL_Client_Price'] || row['LL Client Price']),
                            coffee: parseCurrency(row['Morning_Coffee_Client_Price'] || row['Morning Coffee Client Price']),
                            canDiscount: parseCurrency(row['Can_Monkey_Discount'] || row['Can Monkey Discount']),
                            guestEssentials: parseCurrency(row['Guest_Essentials_Client_Price'] || row['Guest Essentials Client Price']),
                            location: row['Location'] || ''
                        };
                    }
                });
                
                console.log('Pricing lookup created for', Object.keys(pricingLookup).length, 'properties');
                console.log('Sample property IDs:', Object.keys(pricingLookup).slice(0, 5));
                
                // Group tasks by client
                const clientInvoices = {};
                AppState.clientInvoices = clientInvoices; // Make globally accessible for editing
                let matchedCount = 0;
                let unmatchedCount = 0;
                const unmatchedProperties = new Set();
                const extractionErrors = [];
                
                const taskErrors = [];
                const totalTasks = filteredBreezewayData.length;
                
                for (let taskIndex = 0; taskIndex < totalTasks; taskIndex++) {
                    const task = filteredBreezewayData[taskIndex];
                    
                    // Update progress every 50 tasks (avoids DOM thrashing)
                    if (taskIndex % 50 === 0) {
                        const pct = Math.round((taskIndex / totalTasks) * 80); // 0-80% for processing
                        showProgress(pct, `Processing task ${taskIndex + 1} of ${totalTasks}...`);
                        // Yield to browser to keep UI responsive
                        await new Promise(r => setTimeout(r, 0));
                    }
                    
                  try {
                    const propertyString = task['Property'] || '';
                    const propId = extractPropertyID(propertyString);
                    const propName = extractPropertyName(propertyString);
                    const clientName = task['Group'] || 'Unknown Client';
                    const taskTitle = task['Task title'] || '';
                    const taskTags = task['Task tags'] || '';
                    const dueDate = task['Due date'] || '';
                    const taskReportLink = task['Task report link'] || '';
                    
                    // Check if this is a processing fee (doesn't need Property ID)
                    const isProcessingFee = taskTitle.toLowerCase().includes('processing fee');
                    
                    if (isProcessingFee) {
                        // Extract amount from task title (e.g., "Processing Fees - $38.01")
                        const titleAmountMatch = taskTitle.match(/\$(\d+(?:\.\d{2})?)/);
                        const processingFeeAmount = titleAmountMatch ? parseFloat(titleAmountMatch[1]) : 0;
                        
                        if (processingFeeAmount > 0) {
                            if (!clientInvoices[clientName]) {
                                clientInvoices[clientName] = [];
                            }
                            
                            clientInvoices[clientName].push({
                                description: taskTitle,
                                amount: processingFeeAmount,
                                category: 'processingFees',
                                location: '',
                                date: dueDate,
                                propertyId: 'N/A',
                                notes: taskTags,
                                reportLink: taskReportLink
                            });
                            
                            matchedCount++;
                        }
                        return; // Skip normal processing
                    }
                    
                    if (!propId) {
                        extractionErrors.push(propertyString);
                        
                        // Still create a line item if there's a custom charge in tags
                        const dollarMatchesNoProp = taskTags.matchAll(/\$(\d+(?:\.\d{2})?)/g);
                        let customAmountNoProp = 0;
                        for (const match of dollarMatchesNoProp) {
                            customAmountNoProp += parseFloat(match[1]);
                        }
                        
                        if (customAmountNoProp > 0) {
                            if (!clientInvoices[clientName]) {
                                clientInvoices[clientName] = [];
                            }
                            clientInvoices[clientName].push({
                                description: `${taskTitle}`,
                                amount: customAmountNoProp,
                                category: categorizeLineItem(taskTitle),
                                location: '',
                                date: dueDate,
                                propertyId: 'N/A',
                                notes: taskTags,
                                reportLink: taskReportLink
                            });
                            matchedCount++;
                        } else {
                            // No dollar amount and no property ID — add as $0 flagged item
                            if (!clientInvoices[clientName]) {
                                clientInvoices[clientName] = [];
                            }
                            clientInvoices[clientName].push({
                                description: `⚠️ NEEDS PRICING: ${taskTitle}`,
                                amount: 0,
                                category: categorizeLineItem(taskTitle),
                                location: '',
                                date: dueDate,
                                propertyId: 'N/A',
                                notes: `NO PROPERTY ID - ${taskTags}`,
                                reportLink: taskReportLink
                            });
                            unmatchedCount++;
                        }
                        return;
                    }
                    
                    // Check if this is an INACTIVE property (won't be in Baserow)
                    const isInactive = propertyString.toLowerCase().includes('**inactive');
                    
                    // Check if this is a cleaning task (contains "clean" in title)
                    const isCleaningTask = taskTitle.toLowerCase().includes('clean');
                    
                    // Check if this is a specialty deep clean (custom charge only, no standard rates)
                    const isSpecialtyDeepClean = taskTitle.toLowerCase().includes('specialty deep clean') || 
                                                taskTitle.toLowerCase().includes('specialty clean');
                    
                    // Check if this is a TBS (Task Based Service) - custom charge only
                    const isTBS = taskTitle.toLowerCase().includes('tbs');
                    
                    // Check if this is an offboarding visit - custom charge only
                    const isOffboardingVisit = taskTitle.toLowerCase().includes('offboarding visit');
                    
                    // Check if this is a return visit - custom charge only
                    const isReturnVisit = taskTitle.toLowerCase().includes('return visit');
                    
                    // Check if this is a cancelled task - only charge the cancellation/rescheduling fee
                    const isCancelled = taskTitle.toLowerCase().includes('cancelled') || 
                                       taskTitle.toLowerCase().includes('canceled');
                    
                    // Check if there's a custom charge in tags
                    // Handle both "$50 description" and just "$50" formats
                    // Also handle multiple amounts like "$143 + $95.19"
                    const dollarMatches = taskTags.matchAll(/\$(\d+(?:\.\d{2})?)/g);
                    let customAmount = 0;
                    let foundDollarAmounts = [];
                    
                    for (const match of dollarMatches) {
                        const amount = parseFloat(match[1]);
                        customAmount += amount;
                        foundDollarAmounts.push(`$${amount}`);
                    }
                    
                    // Extract description from tags (everything after the dollar amounts)
                    const customChargeMatch = taskTags.match(/\$[\d\.\s+]+\s*([^;,\n]*)/);
                    const customDescription = customChargeMatch && customChargeMatch[1].trim() 
                        ? customChargeMatch[1].trim() 
                        : taskTitle; // Use task title if no description in tags
                    
                    // If NOT a cleaning task OR is a specialty deep clean OR is TBS OR is offboarding visit OR is return visit OR is cancelled OR is INACTIVE, and has custom charge, it's custom-only
                    if ((!isCleaningTask || isSpecialtyDeepClean || isTBS || isOffboardingVisit || isReturnVisit || isCancelled || isInactive) && customAmount > 0) {
                        if (!clientInvoices[clientName]) {
                            clientInvoices[clientName] = [];
                        }
                        
                        clientInvoices[clientName].push({
                            description: `${taskTitle} - ${propName} (${propId})`,
                            amount: customAmount,
                            category: categorizeLineItem(`${taskTitle} - ${propName} (${propId})`),
                            location: '',
                            date: dueDate,
                            propertyId: propId,
                            notes: taskTags, // Add task tags as notes
                            reportLink: taskReportLink
                        });
                        
                        matchedCount++;
                        return; // Skip normal processing
                    }
                    
                    // For cleaning tasks (non-INACTIVE), process normal charges
                    // INACTIVE properties without custom charges will be skipped
                    if (isInactive && customAmount === 0) {
                        unmatchedCount++;
                        unmatchedProperties.add(propId + ' (INACTIVE - no charges in tags)');
                        return;
                    }
                    
                    const pricing = pricingLookup[propId];
                    if (!pricing) {
                        // Property ID not in Baserow — check if there's a custom charge we can use
                        if (customAmount > 0) {
                            if (!clientInvoices[clientName]) {
                                clientInvoices[clientName] = [];
                            }
                            clientInvoices[clientName].push({
                                description: `${taskTitle} - ${propName} (${propId})`,
                                amount: customAmount,
                                category: categorizeLineItem(taskTitle),
                                location: '',
                                date: dueDate,
                                propertyId: propId,
                                notes: `NOT IN BASEROW - ${taskTags}`,
                                reportLink: taskReportLink
                            });
                            matchedCount++;
                        } else {
                            // No custom charge and not in Baserow — create $0 flagged item
                            if (!clientInvoices[clientName]) {
                                clientInvoices[clientName] = [];
                            }
                            clientInvoices[clientName].push({
                                description: `⚠️ NEEDS PRICING: ${taskTitle} - ${propName} (${propId})`,
                                amount: 0,
                                category: categorizeLineItem(taskTitle),
                                location: '',
                                date: dueDate,
                                propertyId: propId,
                                notes: `NOT IN BASEROW - ${taskTags}`,
                                reportLink: taskReportLink
                            });
                            unmatchedCount++;
                        }
                        unmatchedProperties.add(propId);
                        return;
                    }
                    
                    matchedCount++;
                    
                    // Detect service type from task title
                    const serviceType = detectServiceType(taskTitle);
                    
                    // Extract clean type for description
                    const cleanType = extractCleanType(taskTitle);
                    const cleanTypePrefix = cleanType ? `${cleanType} ` : '';
                    
                    // Check if L&L should be skipped (tags say "no charge for L&L" or similar)
                    const skipLL = taskTags.toLowerCase().includes('no charge for l&l') || 
                                   taskTags.toLowerCase().includes('no l&l') ||
                                   taskTags.toLowerCase().includes('no laundry') ||
                                   taskTags.toLowerCase().includes('no charge for laundry');
                    
                    // Extract all multipliers from tags
                    const multipliers = extractMultipliers(taskTags);
                    
                    // Calculate amounts
                    let lineItems = [];
                    
                    // Apply each multiplier and create line items
                    multipliers.forEach((mult, index) => {
                        const suffix = multipliers.length > 1 ? ` (${mult.value}x)` : '';
                        
                        if ((serviceType === 'cleaning' || serviceType === 'both') && 
                            (mult.appliesTo === 'cleaning' || mult.appliesTo === 'both')) {
                            const cleaningAmount = pricing.cleaning * mult.value;
                            if (cleaningAmount > 0) {
                                lineItems.push({
                                    description: `${cleanTypePrefix}Cleaning${suffix} - ${propName} (${propId})`,
                                    amount: cleaningAmount,
                                    category: 'cleaning',
                                    location: pricing.location,
                                    notes: taskTags,
                                    reportLink: taskReportLink
                                });
                            }
                        }
                        
                        if ((serviceType === 'll' || serviceType === 'both') && 
                            (mult.appliesTo === 'll' || mult.appliesTo === 'both') &&
                            !skipLL) { // Skip L&L if tags say no charge
                            const llAmount = pricing.ll * mult.value;
                            if (llAmount > 0) {
                                lineItems.push({
                                    description: `Laundry & Linens${suffix} - ${propName} (${propId})`,
                                    amount: llAmount,
                                    category: 'll',
                                    location: pricing.location,
                                    notes: taskTags,
                                    reportLink: taskReportLink
                                });
                            }
                        }
                    });
                    
                    // Add-on services (no multiplier)
                    if (pricing.coffee > 0) {
                        lineItems.push({
                            description: `Morning Coffee - ${propName} (${propId})`,
                            amount: pricing.coffee,
                            category: 'coffee',
                            location: pricing.location,
                            notes: taskTags,
                            reportLink: taskReportLink
                        });
                    }
                    
                    if (pricing.guestEssentials > 0) {
                        lineItems.push({
                            description: `Guest Essentials - ${propName} (${propId})`,
                            amount: pricing.guestEssentials,
                            category: 'guestEssentials',
                            location: pricing.location,
                            notes: taskTags,
                            reportLink: taskReportLink
                        });
                    }
                    
                    if (pricing.canDiscount < 0) {
                        lineItems.push({
                            description: `&Can Discount - ${propName} (${propId})`,
                            amount: pricing.canDiscount,
                            category: 'canDiscount',
                            location: pricing.location,
                            notes: taskTags,
                            reportLink: taskReportLink
                        });
                    }
                    
                    // Add custom charges from tags (like pet cleaning fee)
                    if (customAmount > 0) {
                        lineItems.push({
                            description: `${customDescription} - ${propName} (${propId})`,
                            amount: customAmount,
                            category: categorizeLineItem(`${customDescription} - ${propName} (${propId})`),
                            location: pricing.location,
                            notes: taskTags,
                            reportLink: taskReportLink
                        });
                    }
                    
                    // Add to client invoice
                    if (!clientInvoices[clientName]) {
                        clientInvoices[clientName] = [];
                    }
                    
                    lineItems.forEach(item => {
                        clientInvoices[clientName].push({
                            ...item,
                            date: dueDate,
                            propertyId: propId
                        });
                    });
                  } catch (taskError) {
                    // Log error but continue processing remaining tasks
                    const taskDesc = task['Task title'] || task['Property'] || `Task #${taskIndex + 1}`;
                    taskErrors.push(`Row ${taskIndex + 1}: ${taskDesc} — ${taskError.message}`);
                  }
                }
                
                showProgress(85, 'Generating outputs...');
                
                // Generate results
                let resultsHTML = '<div class="summary"><h3>📊 Processing Summary</h3>';
                if (filteredOutCount > 0) {
                    resultsHTML += `<div class="summary-item">📅 Date filter applied: ${filteredOutCount} tasks outside period excluded</div>`;
                }
                resultsHTML += `<div class="summary-item">✅ Tasks matched: ${matchedCount}</div>`;
                resultsHTML += `<div class="summary-item">❌ Tasks unmatched: ${unmatchedCount}</div>`;
                resultsHTML += `<div class="summary-item">📄 Invoices generated: ${Object.keys(clientInvoices).length}</div>`;
                
                if (unmatchedProperties.size > 0) {
                    resultsHTML += `<div class="summary-item">⚠️ Unmatched Property IDs (included as flagged items): ${Array.from(unmatchedProperties).join(', ')}</div>`;
                }
                
                if (extractionErrors.length > 0) {
                    resultsHTML += `<div class="summary-item">⚠️ Could not extract Property ID from ${extractionErrors.length} tasks</div>`;
                }
                
                resultsHTML += '</div>';
                
                // Add detailed error information if there are issues
                if (unmatchedProperties.size > 0 || extractionErrors.length > 0 || taskErrors.length > 0) {
                    resultsHTML += '<div class="debug"><strong>⚠️ Error Details:</strong><br><br>';
                    
                    if (taskErrors.length > 0) {
                        resultsHTML += `<strong>Tasks that failed to process (${taskErrors.length}):</strong><br>`;
                        taskErrors.slice(0, 10).forEach(err => {
                            resultsHTML += `- ${err}<br>`;
                        });
                        if (taskErrors.length > 10) {
                            resultsHTML += `... and ${taskErrors.length - 10} more<br>`;
                        }
                        resultsHTML += '<br>';
                    }
                    
                    if (unmatchedProperties.size > 0) {
                        resultsHTML += '<strong>Properties not found in Baserow:</strong><br>';
                        Array.from(unmatchedProperties).forEach(propId => {
                            resultsHTML += `- ${propId}<br>`;
                        });
                        resultsHTML += '<br>';
                    }
                    
                    if (extractionErrors.length > 0) {
                        resultsHTML += '<strong>Tasks where Property ID could not be extracted:</strong><br>';
                        extractionErrors.slice(0, 20).forEach((propString, index) => {
                            resultsHTML += `${index + 1}. "${propString}"<br>`;
                        });
                        if (extractionErrors.length > 20) {
                            resultsHTML += `... and ${extractionErrors.length - 20} more<br>`;
                        }
                    }
                    
                    resultsHTML += '</div>';
                }
                
                if (Object.keys(clientInvoices).length === 0) {
                    resultsHTML += '<div class="status error">❌ No invoices were generated. Check that Property IDs match between Breezeway and Baserow.</div>';
                    resultsHTML += '<div class="debug"><strong>Debug Info:</strong><br>';
                    resultsHTML += `Baserow properties found: ${Object.keys(pricingLookup).length}<br>`;
                    resultsHTML += `Sample Baserow IDs: ${Object.keys(pricingLookup).slice(0, 10).join(', ')}<br>`;
                    resultsHTML += `Breezeway tasks: ${AppState.breezewayData.length}<br>`;
                    resultsHTML += `Sample extracted IDs: ${AppState.breezewayData.slice(0, 5).map(t => extractPropertyID(t['Property'])).join(', ')}</div>`;
                    
                    document.getElementById('results').innerHTML = resultsHTML;
                    showStatus('⚠️ No matches found - check debug info', 'error');
                    hideProgress();
                    document.getElementById('processBtn').disabled = false;
                    return;
                }
                
                resultsHTML += '<h3>📥 Download Invoices</h3>';
                
                // Check if user wants to ignore saved edits
                const ignoreSavedEdits = document.getElementById('ignoreSavedEdits').checked;
                
                // Load any saved edits from localStorage (unless checkbox is checked)
                let editedCount = 0;
                if (!ignoreSavedEdits) {
                    Object.keys(clientInvoices).forEach(clientName => {
                        const saved = localStorage.getItem(`invoice_${clientName}`);
                        if (saved) {
                            clientInvoices[clientName] = JSON.parse(saved);
                            editedCount++;
                        }
                    });
                }
                
                // Show notification based on state
                if (ignoreSavedEdits && editedCount === 0) {
                    // Check if there ARE saved edits being ignored
                    let ignoredCount = 0;
                    Object.keys(clientInvoices).forEach(clientName => {
                        if (localStorage.getItem(`invoice_${clientName}`)) {
                            ignoredCount++;
                        }
                    });
                    if (ignoredCount > 0) {
                        resultsHTML += `<div style="background: #d1ecf1; border: 2px solid #0c5460; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <strong>✅ Fresh invoices generated!</strong> Ignored ${ignoredCount} saved edit(s).
                        </div>`;
                    }
                } else if (editedCount > 0) {
                    resultsHTML += `<div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <strong>ℹ️ Note:</strong> ${editedCount} invoice(s) loaded with previously saved edits. 
                        <button onclick="clearSavedEdits()" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                            Clear All Edits
                        </button>
                    </div>`;
                }
                
                // startDate and endDate already captured at top of processInvoices for filtering
                
                // Store invoice blobs for ZIP and preview
                // Clean up all previously tracked blob URLs
                revokeAllBlobURLs();
                const invoiceBlobs = [];
                AppState.invoiceBlobs = invoiceBlobs;
                const invoiceHTMLs = {}; // Store HTML for preview
                
                // Sort clients alphabetically
                const sortedClientInvoices = Object.entries(clientInvoices)
                    .sort(([a], [b]) => a.localeCompare(b));
                
                // Generate invoice files
                sortedClientInvoices.forEach(([clientName, lineItems]) => {
                    const invoiceHTML = generateInvoiceHTML(clientName, lineItems, startDate, endDate);
                    const blob = new Blob([invoiceHTML], { type: 'text/html' });
                    const url = createTrackedBlobURL(blob);
                    
                    const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
                    
                    // Create filename with date range if provided
                    let zipFilename = `Invoice_${sanitizeFilename(clientName)}.html`;
                    if (startDate && endDate) {
                        const startFormatted = startDate.replace(/-/g, '');
                        const endFormatted = endDate.replace(/-/g, '');
                        zipFilename = `Invoice_${sanitizeFilename(clientName)}_${startFormatted}-${endFormatted}.html`;
                    }
                    
                    // Store for ZIP
                    invoiceBlobs.push({
                        name: zipFilename,
                        blob: blob
                    });
                    
                    // Store for preview
                    invoiceHTMLs[clientName] = invoiceHTML;
                    
                    // Create filename with date range if provided
                    let filename = `Invoice_${sanitizeFilename(clientName)}`;
                    if (startDate && endDate) {
                        const startFormatted = startDate.replace(/-/g, '');
                        const endFormatted = endDate.replace(/-/g, '');
                        filename = `Invoice_${sanitizeFilename(clientName)}_${startFormatted}-${endFormatted}`;
                    }
                    
                    resultsHTML += `
                        <div style="display: inline-block; margin: 10px;">
                            <a href="${url}" download="${filename}.html" class="invoice-link">
                                💼 ${clientName} - $${total.toFixed(2)}
                            </a>
                            <button class="btn" style="margin-left: 5px; padding: 8px 16px;" onclick="previewInvoice('${clientName.replace(/'/g, "\\'")}')">
                                👁️ Preview
                            </button>
                            <button class="btn" style="margin-left: 5px; padding: 8px 16px;" onclick="editInvoice('${clientName.replace(/'/g, "\\'")}')">
                                ✏️ Edit
                            </button>
                        </div>
                    `;
                });
                
                // Store invoice HTMLs globally for preview
                AppState.invoiceHTMLs = invoiceHTMLs;
                
                // Generate ZIP of all HTML invoices
                resultsHTML += `<br><br>`;
                resultsHTML += `
                    <div style="margin: 20px 0;">
                        <label style="display: block; margin-bottom: 10px; font-weight: 600;">Customize ZIP filename:</label>
                        <input type="text" id="zipFilename" placeholder="W&G_Invoices" value="W&G_Invoices" 
                               style="padding: 10px; border: 2px solid #dee2e6; border-radius: 8px; width: 300px; margin-right: 10px;">
                        <button class="btn" onclick="downloadAllInvoicesZip()">📦 Download All Invoices (ZIP)</button>
                    </div>
                `;
                
                // Store invoice blobs globally for ZIP download
                AppState.invoiceBlobs = invoiceBlobs;
                
                // Generate Excel file with tabs
                const excelBlob = generateExcelFile(clientInvoices);
                const excelUrl = createTrackedBlobURL(excelBlob);
                
                resultsHTML += `
                    <div style="margin: 20px 0;">
                        <label style="display: block; margin-bottom: 10px; font-weight: 600;">Customize Excel filename:</label>
                        <input type="text" id="excelFilename" placeholder="W&G_Invoices" value="W&G_Invoices" 
                               style="padding: 10px; border: 2px solid #dee2e6; border-radius: 8px; width: 300px; margin-right: 10px;">
                        <button class="btn" onclick="downloadExcel()">📊 Download Excel (All Clients as Tabs)</button>
                    </div>
                `;
                
                // Store Excel blob in AppState
                AppState.excelBlob = excelBlob;
                
                // Generate QuickBooks export
                const qbCSV = generateQuickBooksCSV(clientInvoices);
                const qbBlob = new Blob([qbCSV], { type: 'text/csv' });
                const qbUrl = createTrackedBlobURL(qbBlob);
                
                resultsHTML += `
                    <a href="${qbUrl}" download="QuickBooks_Import.csv" class="invoice-link">
                        📊 Download QuickBooks Import
                    </a>
                `;
                
                document.getElementById('results').innerHTML = resultsHTML;
                showProgress(100, 'Done!');
                setTimeout(hideProgress, 1500);
                showStatus('✅ Invoices generated successfully!', 'success');
                document.getElementById('processBtn').disabled = false;
                
            } catch (error) {
                showStatus(`❌ Error: ${error.message}`, 'error');
                console.error(error);
                hideProgress();
                document.getElementById('processBtn').disabled = false;
            }
        }
        
        // Service type detection - currently all tasks include both cleaning and L&L
        // If this needs to change in the future, update the return logic here
        function detectServiceType(taskTitle) {
            return 'both';
        }
        
        function extractMultipliers(tags) {
            // Extract all multipliers from tags
            const multipliers = [];
            
            // Find all "X" format multipliers (2.5x, .75x, etc.)
            const xMatches = tags.matchAll(/(\d*\.?\d+)\s*x/gi);
            for (const match of xMatches) {
                const value = parseFloat(match[1]);
                const fullMatch = match[0];
                const context = tags.substring(Math.max(0, match.index - 20), match.index + fullMatch.length + 30).toLowerCase();
                
                // Determine what this multiplier applies to based on surrounding text
                let appliesTo = 'both'; // Default to both cleaning and L&L
                if (context.includes('cleaning cost') || context.includes('clean cost')) {
                    appliesTo = 'cleaning';
                } else if (context.includes('l&l') || context.includes('laundry')) {
                    appliesTo = 'll';
                } else if (context.includes('total') || context.includes('turn')) {
                    appliesTo = 'both';
                }
                
                multipliers.push({ value, appliesTo });
            }
            
            // Find percentage format (75%, 50%, etc.)
            const percentMatches = tags.matchAll(/(\d+(?:\.\d+)?)\s*%/gi);
            for (const match of percentMatches) {
                const value = parseFloat(match[1]) / 100;
                const context = tags.substring(Math.max(0, match.index - 20), match.index + match[0].length + 30).toLowerCase();
                
                // Default to both (since percentages usually refer to the full service)
                let appliesTo = 'both';
                
                // Only apply to specific service if explicitly mentioned (not "standard clean")
                if (context.includes('l&l only') || context.includes('laundry only')) {
                    appliesTo = 'll';
                } else if (context.includes('cleaning only') && !context.includes('standard')) {
                    appliesTo = 'cleaning';
                }
                // "standard clean" or just "clean" = applies to both
                
                multipliers.push({ value, appliesTo });
            }
            
            // If no multipliers found, return default
            if (multipliers.length === 0) {
                return [{ value: 1.0, appliesTo: 'both' }];
            }
            
            return multipliers;
        }
        
        // extractMultiplier legacy function removed — use extractMultipliers() instead
        
        
        // ============================================================
        // §6  INVOICE HTML GENERATION
        //     Builds standalone HTML invoices for each client with
        //     W&G branding, property grouping, and category subtotals.
        //     Output is a complete HTML document (for iframe preview
        //     and individual download).
        // ============================================================
        
        function sanitizeFilename(name) {
            return name.replace(/[^a-z0-9]/gi, '_');
        }
        
        function generateInvoiceHTML(clientName, lineItems, startDate = '', endDate = '') {
            const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
            const today = new Date().toLocaleDateString();
            
            // Format date range for display (use local date without timezone conversion)
            let dateRangeHTML = '';
            if (startDate && endDate) {
                // Parse dates as local dates (YYYY-MM-DD format)
                const [startYear, startMonth, startDay] = startDate.split('-');
                const [endYear, endMonth, endDay] = endDate.split('-');
                const start = new Date(startYear, startMonth - 1, startDay).toLocaleDateString();
                const end = new Date(endYear, endMonth - 1, endDay).toLocaleDateString();
                dateRangeHTML = `<p>Service Period: ${start} - ${end}</p>`;
            }
            
            // Group line items by property
            const propertyGroups = {};
            
            lineItems.forEach(item => {
                // Extract property ID from description
                // Format: "Description - PropertyName (PROPID)"
                const propMatch = item.propertyId || 'N/A';
                
                if (!propertyGroups[propMatch]) {
                    propertyGroups[propMatch] = {
                        items: [],
                        total: 0,
                        name: ''
                    };
                }
                
                // Try to extract property name from this item's description if we don't have it yet
                if (!propertyGroups[propMatch].name && propMatch !== 'N/A') {
                    // Match everything between the last dash and the property ID in parentheses
                    // Handles names like "33rd - 2407 (Sandbar #1) (PL1013)"
                    const nameMatch = item.description.match(/-\s*(.+?)\s*\([A-Z]{2}\d{4}\)\s*$/);
                    if (nameMatch) {
                        propertyGroups[propMatch].name = nameMatch[1].trim();
                    }
                }
                
                propertyGroups[propMatch].items.push(item);
                propertyGroups[propMatch].total += item.amount;
            });
            
            // Calculate subtotals by category (for bottom section)
            const subtotals = {
                cleaning: 0,
                ll: 0,
                coffee: 0,
                guestEssentials: 0,
                canDiscount: 0,
                tbs: 0,
                processingFees: 0,
                other: 0
            };
            
            let itemsHTML = '';
            
            // Generate HTML for each property group
            Object.entries(propertyGroups).forEach(([propId, group]) => {
                // Property header row
                const propertyLabel = propId === 'N/A' 
                    ? 'General Charges' 
                    : group.name 
                        ? `${group.name} (${propId})` 
                        : propId;
                
                itemsHTML += `
                    <tr style="background-color: #3B95D2;">
                        <td colspan="4" style="padding: 12px; font-weight: bold; border-bottom: 1px solid #dee2e6; color: white;">
                            Property: ${propertyLabel}
                        </td>
                    </tr>
                `;
                
                // Items for this property
                group.items.forEach(item => {
                    // Use stored category, fall back to categorization function
                    const category = item.category || categorizeLineItem(item.description);
                    
                    // Accumulate subtotals by category
                    if (category === 'cleaning') subtotals.cleaning += item.amount;
                    else if (category === 'll') subtotals.ll += item.amount;
                    else if (category === 'coffee') subtotals.coffee += item.amount;
                    else if (category === 'guestEssentials') subtotals.guestEssentials += item.amount;
                    else if (category === 'canDiscount') subtotals.canDiscount += item.amount;
                    else if (category === 'processingFees') subtotals.processingFees += item.amount;
                    else if (category === 'tbs') subtotals.tbs += item.amount;
                    else subtotals.other += item.amount;
                    
                    const notes = item.notes ? item.notes.replace(/Exported;?\s*/g, '').trim() : '';
                    const notesWithLink = item.reportLink 
                        ? `${notes} <a href="${item.reportLink}" target="_blank" style="color: #214080; text-decoration: none;">[View Report]</a>`
                        : notes;
                    
                    // Remove property ID from description since it's in the header
                    let shortDesc = item.description;
                    // Remove " - PropertyName (PROPID)" from the end
                    // Handles names with parentheses like "33rd - 2407 (Sandbar #1) (PL1013)"
                    shortDesc = shortDesc.replace(/\s*-\s*.+?\s*\([A-Z]{2}\d{4}\)\s*$/, '');
                        
                    itemsHTML += `
                        <tr>
                            <td style="padding: 12px; padding-left: 24px; border-bottom: 1px solid #dee2e6;">${item.date}</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${shortDesc}</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6; font-size: 0.85em; color: #666;">${notesWithLink}</td>
                            <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right;">$${item.amount.toFixed(2)}</td>
                        </tr>
                    `;
                });
                
                // Property subtotal row
                const subtotalLabel = propId === 'N/A' 
                    ? 'General Charges Subtotal:' 
                    : group.name 
                        ? `${group.name} (${propId}) Subtotal:` 
                        : `${propId} Subtotal:`;
                
                itemsHTML += `
                    <tr style="background-color: #FFF8ED;">
                        <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border-bottom: 2px solid #D19742; color: #D19742;">
                            ${subtotalLabel}
                        </td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; border-bottom: 2px solid #D19742; color: #D19742;">
                            $${group.total.toFixed(2)}
                        </td>
                    </tr>
                `;
            });
            
            // Generate subtotals HTML
            let subtotalsHTML = '';
            if (subtotals.cleaning > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Cleaning Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.cleaning.toFixed(2)}</td></tr>`;
            if (subtotals.ll > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Laundry & Linens Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.ll.toFixed(2)}</td></tr>`;
            if (subtotals.coffee > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Morning Coffee Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.coffee.toFixed(2)}</td></tr>`;
            if (subtotals.guestEssentials > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Guest Essentials Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.guestEssentials.toFixed(2)}</td></tr>`;
            if (subtotals.canDiscount < 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">&Can Discount Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.canDiscount.toFixed(2)}</td></tr>`;
            if (subtotals.tbs > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">TBS/Custom Charges Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.tbs.toFixed(2)}</td></tr>`;
            if (subtotals.processingFees > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Processing Fees Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.processingFees.toFixed(2)}</td></tr>`;
            if (subtotals.other > 0) subtotalsHTML += `<tr><td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Other Charges Subtotal:</td><td style="text-align: right; padding: 8px;">$${subtotals.other.toFixed(2)}</td></tr>`;
            
            return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice - ${clientName}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #214080; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #214080; color: white; padding: 12px; text-align: left; }
        .total { font-size: 1.5em; text-align: right; margin-top: 20px; font-weight: bold; color: #214080; }
        .subtotal-section { background: #f8f9fa; border-top: 2px solid #214080; }
        
        /* Prevent footer from repeating on each page when printing/converting to PDF */
        @media print {
            thead { display: table-header-group; }
            tfoot { display: table-footer-group; }
            tr { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Well & Good Property Services</h1>
        <p>Invoice Date: ${today}</p>
        ${dateRangeHTML}
    </div>
    
    <h2>Bill To: ${clientName}</h2>
    
    <table>
        <thead>
            <tr>
                <th style="width: 100px;">Date</th>
                <th>Description</th>
                <th style="width: 200px;">Notes</th>
                <th style="text-align: right; width: 100px;">Amount</th>
            </tr>
        </thead>
        <tbody>
            ${itemsHTML}
        </tbody>
    </table>
    
    <!-- Category Breakdown outside table to prevent PDF page repetition -->
    <div style="margin-top: 30px; page-break-before: avoid;">
        <table style="width: 100%; border-collapse: collapse;">
            <tbody class="subtotal-section">
                ${subtotalsHTML}
                <tr style="border-top: 3px solid #214080;">
                    <td colspan="3" style="text-align: right; padding: 12px; font-size: 1.2em; font-weight: bold;">Invoice Total:</td>
                    <td style="text-align: right; padding: 12px; font-size: 1.2em; font-weight: bold; color: #214080; width: 100px;">$${total.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
            `;
        }
        
        // ============================================================
        // §7  PREVIEW & EDIT MODAL
        //     Invoice preview (iframe), edit modal with category
        //     dropdown, unsaved changes tracking (_dirty flag),
        //     and save-to-localStorage persistence.
        // ============================================================
        
        function previewInvoice(clientName) {
            const modal = document.getElementById('invoiceModal');
            const iframe = document.getElementById('invoiceFrame');
            
            // Get the invoice HTML
            const invoiceHTML = AppState.invoiceHTMLs[clientName];
            
            // Set iframe content
            iframe.srcdoc = invoiceHTML;
            
            // Show modal
            modal.style.display = 'block';
        }
        
        function closePreview() {
            document.getElementById('invoiceModal').style.display = 'none';
        }
        
        function closeEdit() {
            // Check for unsaved changes
            if (AppState.currentEdit._dirty) {
                if (!confirm('You have unsaved changes. Close without saving?')) {
                    return;
                }
            }
            AppState.currentEdit._dirty = false;
            document.getElementById('editModal').style.display = 'none';
        }
        
        function editInvoice(clientName) {
            AppState.currentEdit.client = clientName;
            
            // If we just generated with "ignore saved edits" checked, use the fresh data
            // Otherwise check for saved edits
            const ignoreSavedEdits = document.getElementById('ignoreSavedEdits')?.checked;
            let lineItems;
            
            if (ignoreSavedEdits) {
                // Use the fresh data from the current generation
                lineItems = AppState.clientInvoices[clientName];
            } else {
                // Check if there are saved edits in localStorage
                const savedEdits = localStorage.getItem(`invoice_${clientName}`);
                lineItems = savedEdits ? JSON.parse(savedEdits) : AppState.clientInvoices[clientName];
            }
            
            // Store current line items for editing
            AppState.currentEdit.items = JSON.parse(JSON.stringify(lineItems));
            
            // Generate and display the edit form
            regenerateEditForm();
            document.getElementById('editModal').style.display = 'block';
        }
        
        function updateLineItem(index, field, value) {
            AppState.currentEdit.items[index][field] = value;
            AppState.currentEdit._dirty = true;
            updateEditTotal();
        }
        
        function deleteLineItem(index) {
            if (!AppState.currentEdit.items || !AppState.currentEdit.items[index]) {
                alert('Error: Cannot find item to delete');
                return;
            }
            
            AppState.currentEdit.items.splice(index, 1);
            AppState.currentEdit._dirty = true;
            regenerateEditForm();
        }
        
        function addNewLineItem() {
            if (!AppState.currentEdit.items) {
                alert('Error: No items to edit');
                return;
            }
            
            const today = new Date().toISOString().split('T')[0];
            const newItem = {
                date: today,
                description: 'New Item',
                amount: 0,
                category: 'other',
                location: '',
                propertyId: 'N/A',
                notes: '',
                reportLink: ''
            };
            
            AppState.currentEdit.items.push(newItem);
            AppState.currentEdit._dirty = true;
            regenerateEditForm();
        }
        
        function regenerateEditForm() {
            const lineItems = AppState.currentEdit.items;
            const clientName = AppState.currentEdit.client;
            
            // Generate edit form
            let editHTML = `
                <h3>Editing Invoice for: ${clientName}</h3>
                <p style="color: #666; margin-bottom: 20px;">Add, remove, or modify line items below. Changes are saved automatically.</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #214080; color: white;">
                            <th style="padding: 8px;">Date</th>
                            <th style="padding: 8px;">Description</th>
                            <th style="padding: 8px;">Category</th>
                            <th style="padding: 8px;">Amount</th>
                            <th style="padding: 8px; width: 80px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="editTableBody">
            `;
            
            const categoryOptions = [
                { value: 'cleaning', label: 'Cleaning' },
                { value: 'll', label: 'Laundry & Linens' },
                { value: 'coffee', label: 'Morning Coffee' },
                { value: 'guestEssentials', label: 'Guest Essentials' },
                { value: 'canDiscount', label: '&Can Discount' },
                { value: 'tbs', label: 'TBS/Custom' },
                { value: 'processingFees', label: 'Processing Fees' },
                { value: 'other', label: 'Other' }
            ];
            
            lineItems.forEach((item, index) => {
                const itemCategory = item.category || categorizeLineItem(item.description);
                const categorySelect = categoryOptions.map(opt => 
                    `<option value="${opt.value}" ${opt.value === itemCategory ? 'selected' : ''}>${opt.label}</option>`
                ).join('');
                
                editHTML += `
                    <tr id="row-${index}" style="border-bottom: 1px solid #dee2e6;">
                        <td style="padding: 8px;">
                            <input type="date" value="${item.date}" 
                                   onchange="updateLineItem(${index}, 'date', this.value)"
                                   style="width: 100%; padding: 4px;">
                        </td>
                        <td style="padding: 8px;">
                            <input type="text" value="${item.description.replace(/"/g, '&quot;')}" 
                                   onchange="updateLineItem(${index}, 'description', this.value)"
                                   style="width: 100%; padding: 4px;">
                        </td>
                        <td style="padding: 8px;">
                            <select onchange="updateLineItem(${index}, 'category', this.value)"
                                    style="width: 100%; padding: 4px;">
                                ${categorySelect}
                            </select>
                        </td>
                        <td style="padding: 8px;">
                            <input type="number" step="0.01" value="${item.amount}" 
                                   onchange="updateLineItem(${index}, 'amount', parseFloat(this.value))"
                                   style="width: 100%; padding: 4px;">
                        </td>
                        <td style="padding: 8px; text-align: center;">
                            <button type="button" onclick="deleteLineItem(${index})" 
                                    style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
                                🗑️
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            editHTML += `
                    </tbody>
                </table>
                <button onclick="addNewLineItem()" class="btn" style="margin-top: 20px;">
                    ➕ Add Line Item
                </button>
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <strong>Total: $<span id="editTotal">${lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span></strong>
                </div>
            `;
            
            document.getElementById('editContent').innerHTML = editHTML;
        }
        
        function updateEditTotal() {
            const total = AppState.currentEdit.items.reduce((sum, item) => sum + item.amount, 0);
            const totalElement = document.getElementById('editTotal');
            if (totalElement) {
                totalElement.textContent = total.toFixed(2);
            }
        }
        
        function saveInvoiceEdits() {
            // Save to localStorage
            localStorage.setItem(`invoice_${AppState.currentEdit.client}`, JSON.stringify(AppState.currentEdit.items));
            
            // Update the in-memory invoice
            AppState.clientInvoices[AppState.currentEdit.client] = AppState.currentEdit.items;
            
            // Regenerate the HTML for this invoice
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const invoiceHTML = generateInvoiceHTML(AppState.currentEdit.client, AppState.currentEdit.items, startDate, endDate);
            AppState.invoiceHTMLs[AppState.currentEdit.client] = invoiceHTML;
            
            // Update the download link for this invoice
            const blob = new Blob([invoiceHTML], { type: 'text/html' });
            const url = createTrackedBlobURL(blob);
            
            // Find and update the download link
            const links = document.querySelectorAll('a.invoice-link');
            links.forEach(link => {
                if (link.textContent.includes(AppState.currentEdit.client)) {
                    link.href = url;
                    const total = AppState.currentEdit.items.reduce((sum, item) => sum + item.amount, 0);
                    const clientNamePart = link.textContent.split(' - $')[0];
                    link.textContent = `${clientNamePart} - $${total.toFixed(2)}`;
                }
            });
            
            // Update the invoice blob for ZIP downloads
            if (AppState.invoiceBlobs) {
                const index = AppState.invoiceBlobs.findIndex(item => item.name.includes(AppState.currentEdit.client.replace(/[^a-z0-9]/gi, '_')));
                if (index !== -1) {
                    AppState.invoiceBlobs[index].blob = blob;
                }
            }
            
            // Clear dirty flag and close
            AppState.currentEdit._dirty = false;
            showStatus('✅ Invoice saved! Download link updated.', 'success');
            closeEdit();
        }
        
        // Utility: view what's in localStorage (for debugging in console)
        window.viewStorageContents = function() {
            const invoiceKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('invoice_')) {
                    invoiceKeys.push(key);
                }
            }
            console.log(`Invoice edits in storage: ${invoiceKeys.length}`, invoiceKeys);
            return invoiceKeys;
        }
        
        // Tab switching
        // ============================================================
        // §8  TAB NAVIGATION
        //     Switches between CSV Import, Manual Invoice, and
        //     QBO Export tabs. QBO tab shows invoice count status.
        // ============================================================
        
        function switchTab(tab) {
            // Hide all sections
            document.getElementById('csvSection').style.display = 'none';
            document.getElementById('manualSection').style.display = 'none';
            document.getElementById('qboSection').style.display = 'none';
            
            // Reset all tab buttons
            document.getElementById('csvTab').className = 'tab-btn';
            document.getElementById('manualTab').className = 'tab-btn';
            document.getElementById('qboTab').className = 'tab-btn';
            
            // Show selected section and highlight tab
            if (tab === 'csv') {
                document.getElementById('csvSection').style.display = 'block';
                document.getElementById('csvTab').className = 'tab-btn active';
            } else if (tab === 'manual') {
                document.getElementById('manualSection').style.display = 'block';
                document.getElementById('manualTab').className = 'tab-btn active';
            } else if (tab === 'qbo') {
                document.getElementById('qboSection').style.display = 'block';
                document.getElementById('qboTab').className = 'tab-btn active';
                
                // Show warning if no invoices generated yet
                if (!AppState.clientInvoices || Object.keys(AppState.clientInvoices).length === 0) {
                    document.getElementById('qboStatus').className = 'status info';
                    document.getElementById('qboStatus').textContent = 'Generate invoices first using the CSV Import tab, then return here to export for QuickBooks.';
                    document.getElementById('qboStatus').style.display = 'block';
                } else {
                    document.getElementById('qboStatus').className = 'status success';
                    document.getElementById('qboStatus').textContent = `${Object.keys(AppState.clientInvoices).length} invoices ready for QBO export.`;
                    document.getElementById('qboStatus').style.display = 'block';
                }
            }
        }
        
        // Manual Invoice Functions
        // ============================================================
        // §9  MANUAL INVOICE
        //     One-off invoice creation for properties not in the
        //     regular Breezeway/Baserow workflow. Separate line item
        //     management with its own add/delete/render cycle.
        // ============================================================
        
        let manualLineItemsArray = [];
        let manualLineItemCounter = 0;
        
        function addManualLineItem() {
            const id = manualLineItemCounter++;
            const today = new Date().toISOString().split('T')[0];
            
            const item = {
                id: id,
                date: today,
                description: '',
                amount: 0
            };
            
            manualLineItemsArray.push(item);
            renderManualLineItems();
        }
        
        function renderManualLineItems() {
            const container = document.getElementById('manualLineItems');
            let html = '';
            
            manualLineItemsArray.forEach((item, index) => {
                html += `
                    <div style="border: 1px solid #dee2e6; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: white;">
                        <div style="display: grid; grid-template-columns: 150px 1fr 150px 50px; gap: 10px; align-items: center;">
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Date</label>
                                <input type="date" value="${item.date}" 
                                       onchange="updateManualItem(${index}, 'date', this.value)"
                                       style="width: 100%; padding: 8px; border: 1px solid #dee2e6; border-radius: 4px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description</label>
                                <input type="text" value="${item.description}" 
                                       onchange="updateManualItem(${index}, 'description', this.value)"
                                       placeholder="e.g., Arrival Cleaning - Property Name"
                                       style="width: 100%; padding: 8px; border: 1px solid #dee2e6; border-radius: 4px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Amount</label>
                                <input type="number" step="0.01" value="${item.amount}" 
                                       onchange="updateManualItem(${index}, 'amount', parseFloat(this.value))"
                                       style="width: 100%; padding: 8px; border: 1px solid #dee2e6; border-radius: 4px;">
                            </div>
                            <div style="padding-top: 25px;">
                                <button onclick="deleteManualItem(${index})" 
                                        style="background: #dc3545; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer; width: 100%;">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = html || '<p style="color: #666; text-align: center; padding: 20px;">No line items yet. Click "Add Line Item" to get started.</p>';
            updateManualTotal();
        }
        
        function updateManualItem(index, field, value) {
            manualLineItemsArray[index][field] = value;
            updateManualTotal();
        }
        
        function deleteManualItem(index) {
            manualLineItemsArray.splice(index, 1);
            renderManualLineItems();
        }
        
        function updateManualTotal() {
            const total = manualLineItemsArray.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            document.getElementById('manualTotal').textContent = total.toFixed(2);
        }
        
        function generateManualInvoice() {
            const clientName = document.getElementById('manualClientName').value.trim();
            
            if (!clientName) {
                alert('Please enter a client name');
                return;
            }
            
            if (manualLineItemsArray.length === 0) {
                alert('Please add at least one line item');
                return;
            }
            
            // Format line items for invoice generation
            const lineItems = manualLineItemsArray.map(item => ({
                date: item.date,
                description: item.description || 'No description',
                amount: parseFloat(item.amount) || 0,
                location: '',
                propertyId: 'N/A',
                notes: 'Manual entry',
                reportLink: ''
            }));
            
            const startDate = document.getElementById('manualStartDate').value;
            const endDate = document.getElementById('manualEndDate').value;
            
            // Generate invoice HTML
            const invoiceHTML = generateInvoiceHTML(clientName, lineItems, startDate, endDate);
            const blob = new Blob([invoiceHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
            
            // Create filename with date range if provided
            let filename = `Invoice_${sanitizeFilename(clientName)}`;
            if (startDate && endDate) {
                const startFormatted = startDate.replace(/-/g, '');
                const endFormatted = endDate.replace(/-/g, '');
                filename = `Invoice_${sanitizeFilename(clientName)}_${startFormatted}-${endFormatted}`;
            }
            
            // Display result
            const resultsHTML = `
                <h3>📥 Download Invoice</h3>
                <div style="display: inline-block; margin: 10px;">
                    <a href="${url}" download="${filename}.html" class="invoice-link">
                        💼 ${clientName} - $${total.toFixed(2)}
                    </a>
                    <button class="btn" style="margin-left: 5px; padding: 8px 16px;" onclick="previewManualInvoice('${url}')">
                        👁️ Preview
                    </button>
                </div>
            `;
            
            document.getElementById('manualResults').innerHTML = resultsHTML;
            document.getElementById('manualStatus').innerHTML = '<div class="status" style="background: #d4edda; color: #155724;">✅ Manual invoice generated successfully!</div>';
        }
        
        function previewManualInvoice(url) {
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('invoiceFrame').srcdoc = html;
                    document.getElementById('invoiceModal').style.display = 'block';
                });
        }
        
        // ============================================================
        // §10 STORAGE & PERSISTENCE
        //     localStorage-based edit persistence. Keys are formatted
        //     as "invoice_{clientName}". clearSavedEdits() removes all;
        //     loadSavedEdits() restores during processInvoices().
        //     viewStorageContents() is a console debugging utility.
        // ============================================================
        
        function clearSavedEdits() {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('invoice_')) {
                    keysToRemove.push(key);
                }
            }
            
            if (keysToRemove.length === 0) {
                alert('No saved edits found in browser storage.');
                return;
            }
            
            const confirmMsg = `Found ${keysToRemove.length} saved invoice edit(s).\n\nClear them and reload the page?`;
            
            if (confirm(confirmMsg)) {
                keysToRemove.forEach(key => localStorage.removeItem(key));
                alert(`Cleared ${keysToRemove.length} saved invoice edit(s)!\n\nThe page will now reload.`);
                location.reload();
            }
        }
        
        function loadSavedEdits() {
            if (!AppState.clientInvoices) return;
            
            Object.keys(AppState.clientInvoices).forEach(clientName => {
                const saved = localStorage.getItem(`invoice_${clientName}`);
                if (saved) {
                    AppState.clientInvoices[clientName] = JSON.parse(saved);
                }
            });
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const invoiceModal = document.getElementById('invoiceModal');
            const editModal = document.getElementById('editModal');
            if (event.target == invoiceModal) {
                invoiceModal.style.display = 'none';
            }
            if (event.target == editModal) {
                closeEdit(); // Uses the unsaved changes check
            }
        }
        
        // ============================================================
        // §11 EXPORT: EXCEL & CSV
        //     generateExcelFile() creates a multi-tab XLSX workbook
        //     (one sheet per client + summary sheet with category
        //     subtotals). generateQuickBooksCSV() produces a simple
        //     5-column CSV. downloadAllInvoicesZip() bundles all HTML
        //     invoices into a ZIP file.
        // ============================================================
        
        function generateQuickBooksCSV(clientInvoices) {
            let csv = 'Date,Client,Description,Amount,Location\n';
            
            // Sort clients alphabetically
            const sortedEntries = Object.entries(clientInvoices).sort(([a], [b]) => a.localeCompare(b));
            
            sortedEntries.forEach(([clientName, lineItems]) => {
                lineItems.forEach(item => {
                    csv += `${item.date},"${clientName}","${item.description}",${item.amount},"${item.location}"\n`;
                });
            });
            
            return csv;
        }
        
        function generateExcelFile(clientInvoices) {
            // Create a fresh workbook
            const workbook = XLSX.utils.book_new();
            
            // Track used sheet names to ensure uniqueness
            const usedSheetNames = new Set();
            
            // Create summary data structure
            const summaryData = [
                ['Well & Good Property Services - Invoice Summary by Category'],
                [],
                ['Client', 'Cleaning', 'Laundry & Linens', 'Morning Coffee', 'Guest Essentials', '&Can Discount', 'TBS/Custom Charges', 'Processing Fees', 'Other', 'Total']
            ];
            
            // Sort clients alphabetically
            const sortedEntries = Object.entries(clientInvoices).sort(([a], [b]) => a.localeCompare(b));
            
            sortedEntries.forEach(([clientName, lineItems]) => {
                // Categorize and sum line items
                const categories = {
                    cleaning: 0,
                    ll: 0,
                    coffee: 0,
                    guestEssentials: 0,
                    canDiscount: 0,
                    tbs: 0,
                    processingFees: 0,
                    other: 0
                };
                
                lineItems.forEach(item => {
                    // Use stored category, fall back to categorization function
                    const category = item.category || categorizeLineItem(item.description);
                    
                    if (category === 'cleaning') categories.cleaning += item.amount;
                    else if (category === 'll') categories.ll += item.amount;
                    else if (category === 'coffee') categories.coffee += item.amount;
                    else if (category === 'guestEssentials') categories.guestEssentials += item.amount;
                    else if (category === 'canDiscount') categories.canDiscount += item.amount;
                    else if (category === 'processingFees') categories.processingFees += item.amount;
                    else if (category === 'tbs') categories.tbs += item.amount;
                    else categories.other += item.amount;
                });
                
                const clientTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
                
                // Add row to summary
                summaryData.push([
                    clientName,
                    categories.cleaning,
                    categories.ll,
                    categories.coffee,
                    categories.guestEssentials,
                    categories.canDiscount,
                    categories.tbs,
                    categories.processingFees,
                    categories.other,
                    clientTotal
                ]);
                
                // Prepare data for this client's detailed sheet with property grouping
                const data = [
                    ['Well & Good Property Services'],
                    [`Invoice for: ${clientName}`],
                    [`Date: ${new Date().toLocaleDateString()}`],
                    [], // Empty row
                    ['Date', 'Description', 'Notes', 'Amount'] // Header row
                ];
                
                // Group line items by property
                const propertyGroups = {};
                
                lineItems.forEach(item => {
                    const propId = item.propertyId || 'N/A';
                    
                    if (!propertyGroups[propId]) {
                        // Extract property name from description
                        let propName = '';
                        if (propId !== 'N/A') {
                            const nameMatch = item.description.match(/-\s*(.+?)\s*\([A-Z]{2}\d{4}\)\s*$/);
                            propName = nameMatch ? nameMatch[1].trim() : '';
                        }
                        
                        propertyGroups[propId] = {
                            items: [],
                            total: 0,
                            name: propName
                        };
                    }
                    
                    // Try to get property name from this item if we don't have it
                    if (!propertyGroups[propId].name && propId !== 'N/A') {
                        const nameMatch = item.description.match(/-\s*(.+?)\s*\([A-Z]{2}\d{4}\)\s*$/);
                        if (nameMatch) {
                            propertyGroups[propId].name = nameMatch[1].trim();
                        }
                    }
                    
                    propertyGroups[propId].items.push(item);
                    propertyGroups[propId].total += item.amount;
                });
                
                // Add line items grouped by property
                Object.entries(propertyGroups).forEach(([propId, group]) => {
                    // Property header
                    const propertyLabel = propId === 'N/A' 
                        ? 'General Charges' 
                        : group.name 
                            ? `${group.name} (${propId})` 
                            : propId;
                    
                    data.push([`Property: ${propertyLabel}`, '', '', '']);
                    
                    // Items for this property
                    group.items.forEach(item => {
                        const notes = item.notes ? item.notes.replace(/Exported;?\s*/g, '').trim() : '';
                        // Remove property info from description
                        let shortDesc = item.description.replace(/\s*-\s*.+?\s*\([A-Z]{2}\d{4}\)\s*$/, '');
                        
                        data.push([
                            item.date,
                            shortDesc,
                            notes,
                            item.amount
                        ]);
                    });
                    
                    // Property subtotal
                    const subtotalLabel = propId === 'N/A' 
                        ? 'General Charges Subtotal' 
                        : group.name 
                            ? `${group.name} (${propId}) Subtotal` 
                            : `${propId} Subtotal`;
                    
                    data.push(['', '', subtotalLabel, group.total]);
                    data.push([]); // Empty row between properties
                });
                
                // Add category breakdown
                data.push(['Category Breakdown:', '', '', '']);
                if (categories.cleaning > 0) data.push(['', 'Cleaning Subtotal:', '', categories.cleaning]);
                if (categories.ll > 0) data.push(['', 'Laundry & Linens Subtotal:', '', categories.ll]);
                if (categories.coffee > 0) data.push(['', 'Morning Coffee Subtotal:', '', categories.coffee]);
                if (categories.guestEssentials > 0) data.push(['', 'Guest Essentials Subtotal:', '', categories.guestEssentials]);
                if (categories.canDiscount < 0) data.push(['', '&Can Discount Subtotal:', '', categories.canDiscount]);
                if (categories.tbs > 0) data.push(['', 'TBS/Custom Charges Subtotal:', '', categories.tbs]);
                if (categories.processingFees > 0) data.push(['', 'Processing Fees Subtotal:', '', categories.processingFees]);
                if (categories.other > 0) data.push(['', 'Other Charges Subtotal:', '', categories.other]);
                
                // Add total row
                const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
                data.push(
                    [], // Empty row
                    ['', '', 'Invoice Total:', total]
                );
                
                // Create worksheet
                const worksheet = XLSX.utils.aoa_to_sheet(data);
                
                // Set column widths
                worksheet['!cols'] = [
                    { wch: 12 }, // Date
                    { wch: 40 }, // Description
                    { wch: 30 }, // Notes
                    { wch: 12 }  // Amount
                ];
                
                // Sanitize sheet name (max 31 chars, no special characters)
                let sheetName = sanitizeFilename(clientName).substring(0, 31);
                
                // Ensure uniqueness by adding a number if needed
                let uniqueSheetName = sheetName;
                let counter = 1;
                while (usedSheetNames.has(uniqueSheetName)) {
                    const suffix = `_${counter}`;
                    uniqueSheetName = sheetName.substring(0, 31 - suffix.length) + suffix;
                    counter++;
                }
                usedSheetNames.add(uniqueSheetName);
                
                // Add worksheet to workbook
                XLSX.utils.book_append_sheet(workbook, worksheet, uniqueSheetName);
            });
            
            // Create summary worksheet (add as first sheet)
            const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
            
            // Set column widths for summary
            summaryWorksheet['!cols'] = [
                { wch: 30 }, // Client
                { wch: 12 }, // Cleaning
                { wch: 15 }, // L&L
                { wch: 15 }, // Coffee
                { wch: 15 }, // Guest Essentials
                { wch: 12 }, // Can Discount
                { wch: 18 }, // TBS
                { wch: 15 }, // Processing Fees
                { wch: 12 }, // Other
                { wch: 12 }  // Total
            ];
            
            // Insert summary as first sheet
            XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary by Category');
            
            // Move summary to be the first sheet
            const sheets = workbook.SheetNames;
            const summaryIndex = sheets.indexOf('Summary by Category');
            if (summaryIndex > 0) {
                sheets.splice(summaryIndex, 1);
                sheets.unshift('Summary by Category');
            }
            
            // Generate Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        }
        
        async function downloadAllInvoicesZip() {
            const zip = new JSZip();
            
            // Add each invoice HTML to the ZIP
            AppState.invoiceBlobs.forEach(({ name, blob }) => {
                zip.file(name, blob);
            });
            
            // Generate ZIP file
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            // Get custom filename from input
            let filename = document.getElementById('zipFilename').value.trim();
            if (!filename) {
                filename = 'W&G_Invoices';
            }
            // Remove any existing .zip extension
            filename = filename.replace(/\.zip$/i, '');
            
            // Create download link
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        function downloadExcel() {
            // Get custom filename from input
            let filename = document.getElementById('excelFilename').value.trim();
            if (!filename) {
                filename = 'W&G_Invoices';
            }
            // Remove any existing .xlsx extension
            filename = filename.replace(/\.xlsx$/i, '');
            
            // Create download link
            const url = URL.createObjectURL(AppState.excelBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // ============================================================
        // §12 EXPORT: QBO / TRANSACTION PRO
        //     Full Transaction Pro 55-column CSV export for bulk
        //     QuickBooks import. Includes:
        //     • LOCATION_CLASS_MAP — Property ID prefix → QBO class
        //     • SERVICE_ITEM_MAP   — Category → QBO service item name
        //     • Client name mapping CSV upload/download
        //     • Automatic client grouping (multiple Baserow clients
        //       → single QBO invoice when mapped to same name)
        //     • Mapping issues panel for unmapped clients/locations
        // ============================================================
        
        // Property ID prefix → QBO Class mapping
        const LOCATION_CLASS_MAP = {
            'ID': 'Boise',
            'BR': 'Branson',
            'CV': 'Central Valley',
            'CH': 'Chicago',
            'CS': 'Colorado Springs',
            'DF': 'Dallas/Frisco',
            'DV': 'Denver',
            'FS': 'Flagstaff',
            'GL': 'Galveston',
            'HO': 'Houston',
            'NV': 'Nashville',
            'OM': 'Omaha',
            'OZ': 'Ozarks',
            'PB': 'Palm Beach',
            'PL': 'Palm Beach',
            'PS': 'Palm Springs',
            'AZ': 'Phoenix/Scottsdale',
            'SD': 'San Diego',
            'SR': 'Sarasota',
            'SN': 'Sedona',
            'SV': 'Sun Valley',
            'EV': 'Tempe',
            'TC': 'Tucson',
            'WP': 'Woodland Park'
        };
        
        // Category → QBO service item mapping
        const SERVICE_ITEM_MAP = {
            'cleaning': 'Cleaning Cost',
            'll': 'Laundering & Linens',
            'coffee': 'Coffee Service',
            'guestEssentials': 'Guest Essential Restock Fee',
            'canDiscount': 'Can Monkey Discount',
            'processingFees': 'Processing Fee',
            'tbs': 'Cleaning Cost',
            'other': 'Cleaning Cost'
        };
        
        // Client name mapping (populated by CSV upload)
        let qboClientNameMapping = {};
        
        // Set up QBO mapping file listener
        document.addEventListener('DOMContentLoaded', function() {
            const mappingInput = document.getElementById('qboMappingFile');
            if (mappingInput) {
                mappingInput.addEventListener('change', handleQBOMappingUpload);
            }
            
            // Default invoice date to today
            const qboDateInput = document.getElementById('qboInvoiceDate');
            if (qboDateInput) {
                qboDateInput.value = new Date().toISOString().split('T')[0];
            }
        });
        
        function handleQBOMappingUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const csvContent = e.target.result;
                const lines = csvContent.split('\n').slice(1); // Skip header
                
                qboClientNameMapping = {};
                lines.forEach(line => {
                    if (line.trim()) {
                        const parts = parseCSVLine(line);
                        const baserowName = parts[0] ? parts[0].trim() : '';
                        const qboName = parts[1] ? parts[1].trim() : '';
                        if (baserowName && qboName) {
                            qboClientNameMapping[baserowName] = qboName;
                        }
                    }
                });
                
                document.getElementById('qboMappingStatus').innerHTML = `
                    <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 12px; border-radius: 6px; margin: 12px 0;">
                        ✅ Client mapping loaded: ${Object.keys(qboClientNameMapping).length} mappings
                    </div>
                `;
            };
            reader.readAsText(file);
        }
        
        function downloadMappingTemplate() {
            if (!AppState.clientInvoices || Object.keys(AppState.clientInvoices).length === 0) {
                alert('Generate invoices first, then download the mapping template.');
                return;
            }
            
            const clientNames = Object.keys(AppState.clientInvoices).sort();
            const lines = ['Baserow_Client_Name,QBO_Customer_Name'];
            
            clientNames.forEach(name => {
                // Pre-fill QBO name with Baserow name as starting point
                lines.push(`"${name}","${name}"`);
            });
            
            downloadCSVFile(lines.join('\n'), 'client-mapping-template.csv');
        }
        
        function extractLocationCodeFromPropId(propertyId) {
            if (!propertyId || propertyId === 'N/A') return null;
            const match = propertyId.match(/^([A-Z]{2})/);
            return match ? match[1] : null;
        }
        
        function getQBOClass(propertyId) {
            const code = extractLocationCodeFromPropId(propertyId);
            return code ? (LOCATION_CLASS_MAP[code] || null) : null;
        }
        
        function getQBOServiceItem(item) {
            // Use stored category if available, otherwise derive from description
            const category = item.category || categorizeLineItem(item.description);
            return SERVICE_ITEM_MAP[category] || 'Cleaning Cost';
        }
        
        function escapeCSVField(value) {
            if (value === null || value === undefined) return '';
            const str = String(value);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
        }
        
        function downloadCSVFile(content, filename) {
            const blob = new Blob([content], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        function generateTransactionProExport() {
            if (!AppState.clientInvoices || Object.keys(AppState.clientInvoices).length === 0) {
                alert('Please generate invoices first using the CSV Import tab.');
                return;
            }
            
            const invoiceDate = document.getElementById('qboInvoiceDate').value;
            if (!invoiceDate) {
                alert('Please select an invoice date.');
                return;
            }
            
            const startingNumInput = document.getElementById('qboStartingInvoiceNum').value;
            
            // Group invoices by QBO customer name (combining multiple Baserow clients)
            const groupedInvoices = {};
            const mappingIssues = [];
            
            Object.keys(AppState.clientInvoices).forEach(baserowClientName => {
                const qboCustomerName = qboClientNameMapping[baserowClientName] || baserowClientName;
                
                // Track unmapped clients
                if (!qboClientNameMapping[baserowClientName] && Object.keys(qboClientNameMapping).length > 0) {
                    mappingIssues.push({
                        baserowName: baserowClientName,
                        qboName: qboCustomerName,
                        status: 'unmapped'
                    });
                }
                
                // Group line items by QBO customer name
                if (!groupedInvoices[qboCustomerName]) {
                    groupedInvoices[qboCustomerName] = [];
                }
                groupedInvoices[qboCustomerName].push(...AppState.clientInvoices[baserowClientName]);
            });
            
            const lines = [];
            
            // Transaction Pro Invoice Headers (55 columns)
            const headers = [
                'RefNumber', 'Customer', 'TxnDate', 'DueDate', 'ShipDate', 'ShipMethodName', 
                'TrackingNum', 'SalesTerm', 'Location', 'Class', 'BillAddrLine1', 'BillAddrLine2',
                'BillAddrLine3', 'BillAddrLine4', 'BillAddrCity', 'BillAddrState', 
                'BillAddrPostalCode', 'BillAddrCountry', 'ShipAddrLine1', 'ShipAddrLine2',
                'ShipAddrLine3', 'ShipAddrLine4', 'ShipAddrCity', 'ShipAddrState',
                'ShipAddrPostalCode', 'ShipAddrCountry', 'PrivateNote', 'Msg', 'BillEmail',
                'BillEmailCc', 'BillEmailBcc', 'Currency', 'ExchangeRate', 'Deposit',
                'ToBePrinted', 'ToBeEmailed', 'AllowIPNPayment', 'AllowOnlineCreditCardPayment',
                'AllowOnlineACHPayment', 'ShipAmt', 'ShipItem', 'DiscountAmt', 'DiscountRate',
                'TaxRate', 'TaxAmt', 'DiscountTaxable', 'LineServiceDate', 'LineItem',
                'LineDesc', 'LineQty', 'LineUnitPrice', 'LineAmount', 'LineClass',
                'LineTaxable', 'Crew #'
            ];
            
            lines.push(headers.join(','));
            
            let invoiceNumber = startingNumInput ? parseInt(startingNumInput) : null;
            const unknownLocations = [];
            
            // Sort by QBO customer name
            const sortedEntries = Object.entries(groupedInvoices).sort(([a], [b]) => a.localeCompare(b));
            
            sortedEntries.forEach(([qboCustomerName, lineItems]) => {
                // Format dates
                const [year, month, day] = invoiceDate.split('-');
                const formattedDate = `${month}/${day}/${year}`;
                
                lineItems.forEach(item => {
                    const qboServiceItem = getQBOServiceItem(item);
                    const qboClass = getQBOClass(item.propertyId);
                    
                    // Track unknown locations
                    if (!qboClass && item.propertyId && item.propertyId !== 'N/A') {
                        const code = extractLocationCodeFromPropId(item.propertyId);
                        if (code && !unknownLocations.find(u => u.code === code)) {
                            unknownLocations.push({ code: code, propertyId: item.propertyId });
                        }
                    }
                    
                    // Remove property info from description for cleaner QBO display
                    let lineDesc = item.description.replace(/\s*-\s*.+?\s*\([A-Z]{2}\d{4}\)\s*$/, '');
                    // Add property name back in a cleaner format
                    const propNameMatch = item.description.match(/-\s*(.+?)\s*\([A-Z]{2}\d{4}\)\s*$/);
                    if (propNameMatch) {
                        lineDesc = `${lineDesc} - ${propNameMatch[1].trim()} (${item.propertyId})`;
                    }
                    
                    // Build the 55-column row
                    const row = [
                        invoiceNumber || '',                    // RefNumber (blank = QBO auto-generates)
                        escapeCSVField(qboCustomerName),        // Customer
                        formattedDate,                          // TxnDate
                        formattedDate,                          // DueDate (same as TxnDate for Due on receipt)
                        '', '', '',                             // ShipDate, ShipMethodName, TrackingNum
                        'Due on receipt',                       // SalesTerm
                        '', '',                                 // Location, Class (header-level)
                        '', '', '', '', '', '', '', '',         // BillAddr (8 fields)
                        '', '', '', '', '', '', '', '',         // ShipAddr (8 fields)
                        '', '', '', '', '',                     // PrivateNote, Msg, BillEmail, BillEmailCc, BillEmailBcc
                        '', '',                                 // Currency, ExchangeRate
                        '',                                     // Deposit
                        '', '', '', '', '',                     // ToBePrinted, ToBeEmailed, AllowIPN, AllowCC, AllowACH
                        '', '',                                 // ShipAmt, ShipItem
                        '', '',                                 // DiscountAmt, DiscountRate
                        '', '',                                 // TaxRate, TaxAmt
                        '',                                     // DiscountTaxable
                        item.date || formattedDate,             // LineServiceDate
                        escapeCSVField(qboServiceItem),         // LineItem
                        escapeCSVField(lineDesc),               // LineDesc
                        '1',                                    // LineQty
                        item.amount.toFixed(2),                 // LineUnitPrice
                        item.amount.toFixed(2),                 // LineAmount
                        qboClass ? escapeCSVField(qboClass) : '', // LineClass
                        'NON',                                  // LineTaxable
                        ''                                      // Crew #
                    ];
                    
                    lines.push(row.join(','));
                });
                
                if (invoiceNumber) invoiceNumber++; // Increment for next customer
            });
            
            // Show mapping issues
            displayQBOMappingIssues(mappingIssues, unknownLocations);
            
            // Download CSV file
            const filename = `W&G_TransactionPro_${invoiceDate}.csv`;
            downloadCSVFile(lines.join('\n'), filename);
            
            // Show summary
            const baserowClientCount = Object.keys(AppState.clientInvoices).length;
            const qboInvoiceCount = sortedEntries.length;
            const totalLineItems = sortedEntries.reduce((sum, [, items]) => sum + items.length, 0);
            
            let message = `Transaction Pro file generated!\n\n`;
            message += `Baserow Clients: ${baserowClientCount}\n`;
            message += `QBO Invoices: ${qboInvoiceCount}\n`;
            if (baserowClientCount !== qboInvoiceCount) {
                message += `(Some clients were combined based on mapping)\n`;
            }
            message += `Line Items: ${totalLineItems}\n`;
            message += `File: ${filename}\n`;
            if (startingNumInput) {
                message += `Starting Invoice #: ${startingNumInput}\n`;
            } else {
                message += `Invoice #: QBO will auto-generate\n`;
            }
            message += `\nUpload this file to Transaction Pro Importer.`;
            
            if (unknownLocations.length > 0) {
                message += `\n\n⚠️ ${unknownLocations.length} unknown location code(s) - check the issues panel.`;
            }
            
            alert(message);
        }
        
        function displayQBOMappingIssues(mappingIssues, unknownLocations) {
            const container = document.getElementById('qboMappingIssues');
            
            if (mappingIssues.length === 0 && (!unknownLocations || unknownLocations.length === 0)) {
                container.style.display = 'none';
                return;
            }
            
            let html = '<div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px;">';
            html += '<h4 style="margin: 0 0 12px 0; color: #856404;">⚠️ Mapping Issues</h4>';
            
            if (mappingIssues.length > 0) {
                html += '<p style="margin: 0 0 8px 0;"><strong>Unmapped Clients:</strong> These Baserow names were used as-is (no QBO mapping found).</p>';
                html += '<ul style="margin: 8px 0; padding-left: 20px;">';
                mappingIssues.forEach(issue => {
                    html += `<li>📋 <strong>${issue.baserowName}</strong></li>`;
                });
                html += '</ul>';
                html += '<p style="margin: 12px 0 0 0;"><em>To fix: Upload a mapping CSV with the correct QBO customer names.</em></p>';
            }
            
            if (unknownLocations && unknownLocations.length > 0) {
                html += '<p style="margin: 16px 0 8px 0;"><strong>Unknown Location Codes:</strong> These property ID prefixes don\'t match any QBO class.</p>';
                html += '<ul style="margin: 8px 0; padding-left: 20px;">';
                unknownLocations.forEach(loc => {
                    html += `<li>📍 Code "<strong>${loc.code}</strong>" (from ${loc.propertyId}) - No QBO class assigned</li>`;
                });
                html += '</ul>';
            }
            
            html += '</div>';
            
            container.innerHTML = html;
            container.style.display = 'block';
        }
        
    </script>
</body>
</html>
index.html
Displaying index.html.
