# 🌿 Baby McGee Journal - Enhanced Pregnancy Tracking App

A comprehensive pregnancy tracking application for monitoring medications, nutrition, blood pressure, and health data with cloud sync capabilities.

## ✨ Features

- **Daily Medication Tracking** - Track prenatal vitamins, supplements, and medications
- **Blood Pressure Monitoring** - Log readings with trend analysis and charts
- **Nutrition Tracking** - Monitor protein intake and meal planning
- **Mood & Symptom Logging** - Daily ratings and symptom notes
- **Exercise Tracking** - Log workouts and daily steps
- **Smart Cloud Sync** - Automatic GitHub-based data synchronization across devices
- **Real-time Sync Status** - Visual indicators showing sync progress and status
- **Auto-sync on Changes** - Data automatically syncs 30 seconds after modifications
- **Manual Sync Control** - Prominent sync button with instant feedback
- **Offline Support** - Works without internet connection with local storage fallback
- **Mobile Optimized** - Responsive design for all devices

## 🚀 Quick Start

### Option 1: Use the Live Website (Recommended)

Access the app directly through GitHub Pages:

**🌐 [https://mcgee162010.github.io/Baby-McGee-App/](https://mcgee162010.github.io/Baby-McGee-App/)**

- Full PWA functionality
- All features enabled
- No setup required
- Works on all devices
- Automatic updates

### Option 2: Local Development

For development or offline use, run the app locally:

```bash
# Using Python 3 (recommended)
python3 run-local-server.py

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js (if you have it installed)
npx http-server -p 8000 -c-1
```

Then open: **http://localhost:8000**

### Option 3: Direct File Access

You can also open [`index.html`](index.html) directly in your browser, but some features may be limited due to browser security restrictions:

1. Double-click [`index.html`](index.html) or
2. Right-click → "Open with" → Your preferred browser

**Note:** Service Worker and manifest features will be disabled in file:// mode, but all core functionality will work.

## 🔧 Setup Instructions

### 1. Basic Usage
The app works immediately with local storage. No setup required for basic functionality.

### 2. Cloud Sync Setup (Optional)

To enable cloud synchronization:

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Copy the generated token

2. **Configure in App:**
   - Open the app and go to "Setup" tab
   - Paste your token in the "GitHub Personal Access Token" field
   - Click "Connect to GitHub"
   - Your data will now sync automatically to your private repository

### 3. Using the Sync Features

Once connected to GitHub, the app provides multiple sync options:

**🔄 Automatic Sync:**
- Data automatically syncs 30 seconds after any changes
- No manual intervention required
- Works seamlessly in the background

**📤 Manual Sync:**
- Click the "Sync" button in the top-right header
- Use the "Save & Sync to Cloud" button on the main page
- Instant feedback with visual status indicators

**📊 Sync Status Indicators:**
- **Blue spinning icon** - Currently syncing
- **Green checkmark** - Sync successful
- **Red warning** - Sync failed (click to retry)
- **Gray arrow** - Ready to sync

**🔔 Smart Notifications:**
- Real-time sync progress updates
- Success and error notifications
- Guidance when GitHub setup is needed

### 4. Mobile Installation

The app can be installed as a PWA (Progressive Web App):

1. Open the app in Chrome/Safari on mobile
2. Look for "Add to Home Screen" option
3. The app will install like a native app
4. **Sync across devices:** Data automatically syncs between your phone, tablet, and computer when connected to GitHub

## 📱 Browser Compatibility

- **Chrome/Chromium** - Full support
- **Safari** - Full support
- **Firefox** - Full support
- **Edge** - Full support

## 🔒 Privacy & Security

- **Local Storage:** All data is stored locally in your browser by default
- **Cloud Sync:** Optional GitHub sync uses your private repository
- **No Tracking:** No analytics, tracking, or data collection
- **Offline First:** Works completely offline

## 📊 Data Management

### Export Data
- Go to Setup → Data Management → "Export All Data"
- Downloads a complete JSON backup of your data

### Import Data
- Go to Setup → Data Management → "Import Historical Data"
- Upload a previously exported JSON file

### Clear Data
- Go to Setup → Data Management → "Clear All Data"
- Removes all stored data (use with caution)

## 🛠️ Troubleshooting

### Common Issues

**1. App not loading on the website**
- **Solution:** Check browser console for errors. Try clearing browser cache and refreshing.

**2. Sync button shows red warning icon**
- **Solution:** Check your GitHub connection in Settings. Ensure your Personal Access Token is valid and has `repo` scope.

**3. Data not syncing across devices**
- **Solution:** Verify GitHub setup on all devices. Check that you're using the same GitHub token and repository.

**4. Auto-sync not working**
- **Solution:** Ensure you're connected to GitHub and not in offline mode. Check Settings > Sync Status for pending changes.

**5. GitHub sync not working**
- **Solution:** Ensure your Personal Access Token has `repo` scope and the repository exists. Try the "Test Connection" button in Settings.

**6. PWA installation issues**
- **Solution:** Use Chrome or Safari for best PWA support. Look for "Add to Home Screen" option.

**7. CORS Errors when running locally**
- **Solution:** Use the local server script: `python3 run-local-server.py` instead of opening [`index.html`](index.html) directly.

**8. Service Worker registration failed (local development)**
- **Solution:** This is normal for file:// protocol. Use local server for full PWA features.

### Browser Console Errors (Local Development Only)

If you see these errors when opening [`index.html`](index.html) directly, they're normal for file:// protocol:
- `Service Worker registration failed`
- `Access to manifest blocked by CORS policy`
- `Failed to load resource`

These don't affect core functionality but limit PWA features.

## 🔄 Updates

The app automatically updates when accessed through the GitHub Pages website. For local development, pull the latest changes from the repository.

## 📁 File Structure

```
Baby McGee App/
├── index.html              # Main application file
├── script.js               # Application logic
├── styles.css              # Styling and design
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── icon-192.svg           # App icon (192px)
├── icon-512.svg           # App icon (512px)
├── run-local-server.py    # Local server script
└── README.md              # This file
```

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Try refreshing the website or clearing browser cache
3. For local development issues, use the local server script
4. Check browser console for specific error messages
5. Visit the [GitHub repository](https://github.com/mcgee162010/Baby-McGee-App) for the latest updates

## 📄 License

This is a personal pregnancy tracking application. All rights reserved.

---

**Made with 💚 for Baby McGee**
