// Baby McGee App - JavaScript functionality
class BabyMcGeeApp {
    constructor() {
        this.accessCode = 'babymcgee2024'; // Change this to your desired access code
        this.storageKey = 'babyMcGeeData';
        this.isAuthenticated = false;
        this.entries = [];
        
        // Google Apps Script integration (optional)
        this.googleScriptUrl = ''; // Set this to your deployed Google Apps Script URL for cloud sync
        this.syncEnabled = false;
        
        this.init();
    }

    init() {
        // Check if already authenticated
        this.checkAuthentication();
        
        // Load existing data
        this.loadData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Set current timestamp as default
        this.setCurrentTimestamp();
        
        // Display entries
        this.displayEntries();
    }

    checkAuthentication() {
        const authStatus = sessionStorage.getItem('babyMcGeeAuth');
        if (authStatus === 'authenticated') {
            this.isAuthenticated = true;
            this.showAppContent();
        }
    }

    setupEventListeners() {
        // Authentication
        const accessCodeInput = document.getElementById('accessCode');
        if (accessCodeInput) {
            accessCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.authenticate();
                }
            });
        }

        // Form submission
        const dataForm = document.getElementById('dataForm');
        if (dataForm) {
            dataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addEntry();
            });
        }

        // Filter functionality
        const filterCategory = document.getElementById('filterCategory');
        if (filterCategory) {
            filterCategory.addEventListener('change', () => {
                this.displayEntries();
            });
        }

        // Auto-save on form changes
        const formInputs = document.querySelectorAll('#dataForm input, #dataForm select, #dataForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveDraftData();
            });
        });

        // Load draft data on page load
        this.loadDraftData();
    }

    authenticate() {
        const inputCode = document.getElementById('accessCode').value;
        const errorDiv = document.getElementById('authError');
        
        if (inputCode === this.accessCode) {
            this.isAuthenticated = true;
            sessionStorage.setItem('babyMcGeeAuth', 'authenticated');
            this.showAppContent();
            errorDiv.textContent = '';
        } else {
            errorDiv.textContent = 'Invalid access code. Please try again.';
            document.getElementById('accessCode').value = '';
        }
    }

    showAppContent() {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('appContent').style.display = 'block';
        this.setCurrentTimestamp();
    }

    setCurrentTimestamp() {
        const now = new Date();
        const timestamp = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
            .toISOString()
            .slice(0, 16);
        
        const timestampInput = document.getElementById('timestamp');
        if (timestampInput && !timestampInput.value) {
            timestampInput.value = timestamp;
        }
    }

    addEntry() {
        const timestamp = document.getElementById('timestamp').value;
        const category = document.getElementById('category').value;
        const notes = document.getElementById('notes').value;

        if (!timestamp || !category) {
            alert('Please fill in all required fields.');
            return;
        }

        const entry = {
            id: Date.now(),
            timestamp: timestamp,
            category: category,
            notes: notes,
            created: new Date().toISOString()
        };

        this.entries.unshift(entry); // Add to beginning of array
        this.saveData();
        this.displayEntries();
        this.clearForm();
        this.clearDraftData();
        
        // Show success message
        this.showNotification('Entry logged successfully!', 'success');
    }

    clearForm() {
        document.getElementById('dataForm').reset();
        this.setCurrentTimestamp();
    }

    loadData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            try {
                this.entries = JSON.parse(savedData);
            } catch (error) {
                console.error('Error loading data:', error);
                this.entries = [];
            }
        }
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data. Storage may be full.', 'error');
        }
    }

    saveDraftData() {
        const draftData = {
            timestamp: document.getElementById('timestamp').value,
            category: document.getElementById('category').value,
            notes: document.getElementById('notes').value
        };
        localStorage.setItem('babyMcGeeDraft', JSON.stringify(draftData));
    }

    loadDraftData() {
        const draftData = localStorage.getItem('babyMcGeeDraft');
        if (draftData) {
            try {
                const draft = JSON.parse(draftData);
                if (draft.timestamp) document.getElementById('timestamp').value = draft.timestamp;
                if (draft.category) document.getElementById('category').value = draft.category;
                if (draft.notes) document.getElementById('notes').value = draft.notes;
            } catch (error) {
                console.error('Error loading draft data:', error);
            }
        }
    }

    clearDraftData() {
        localStorage.removeItem('babyMcGeeDraft');
    }

    displayEntries() {
        const entriesList = document.getElementById('entriesList');
        const filterCategory = document.getElementById('filterCategory').value;
        
        let filteredEntries = this.entries;
        if (filterCategory) {
            filteredEntries = this.entries.filter(entry => entry.category === filterCategory);
        }

        if (filteredEntries.length === 0) {
            entriesList.innerHTML = '<div class="no-entries">No entries found.</div>';
            return;
        }

        const entriesHTML = filteredEntries.map(entry => {
            const date = new Date(entry.timestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return `
                <div class="entry-item" data-id="${entry.id}">
                    <div class="entry-header">
                        <span class="entry-category">${this.getCategoryIcon(entry.category)} ${this.getCategoryName(entry.category)}</span>
                        <span class="entry-timestamp">${formattedDate} ${formattedTime}</span>
                    </div>
                    ${entry.notes ? `<div class="entry-notes">${this.escapeHtml(entry.notes)}</div>` : ''}
                    <div class="entry-actions">
                        <button onclick="app.deleteEntry(${entry.id})" class="delete-btn">Delete</button>
                    </div>
                </div>
            `;
        }).join('');

        entriesList.innerHTML = entriesHTML;
    }

    getCategoryIcon(category) {
        const icons = {
            feeding: '🍼',
            diaper: '👶',
            sleep: '😴',
            milestone: '🎉',
            health: '🏥',
            other: '📝'
        };
        return icons[category] || '📝';
    }

    getCategoryName(category) {
        const names = {
            feeding: 'Feeding',
            diaper: 'Diaper Change',
            sleep: 'Sleep',
            milestone: 'Milestone',
            health: 'Health',
            other: 'Other'
        };
        return names[category] || 'Other';
    }

    deleteEntry(id) {
        if (confirm('Are you sure you want to delete this entry?')) {
            this.entries = this.entries.filter(entry => entry.id !== id);
            this.saveData();
            this.displayEntries();
            this.showNotification('Entry deleted successfully!', 'success');
        }
    }

    exportData() {
        if (this.entries.length === 0) {
            alert('No data to export.');
            return;
        }

        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `baby-mcgee-data-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    generateCSV() {
        const headers = ['Date', 'Time', 'Category', 'Notes'];
        const csvRows = [headers.join(',')];

        this.entries.forEach(entry => {
            const date = new Date(entry.timestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            const category = this.getCategoryName(entry.category);
            const notes = entry.notes ? `"${entry.notes.replace(/"/g, '""')}"` : '';
            
            csvRows.push([formattedDate, formattedTime, category, notes].join(','));
        });

        return csvRows.join('\n');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Backup and sync functionality (for future GitHub integration)
    async syncToGitHub() {
        // This will be implemented when we set up GitHub integration
        console.log('GitHub sync functionality will be added later');
    }

    // PWA functionality
    installPWA() {
        // This will be enhanced with service worker
        console.log('PWA installation will be added later');
    }
}

// Global functions for HTML onclick events
function authenticate() {
    app.authenticate();
}

function exportData() {
    app.exportData();
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BabyMcGeeApp();
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}