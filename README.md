# 🌿 Baby McGee Journal - Enhanced Pregnancy Tracking App

A comprehensive pregnancy tracking application for monitoring medications, nutrition, blood pressure, and health data with cloud sync capabilities.

## ✨ Features

- **Daily Medication Tracking** - Track prenatal vitamins, supplements, and medications
- **Blood Pressure Monitoring** - Log readings with trend analysis and charts
- **Nutrition Tracking** - Monitor protein intake and meal planning
- **Mood & Symptom Logging** - Daily ratings and symptom notes
- **Exercise Tracking** - Log workouts and daily steps
- **Cloud Sync** - Secure GitHub-based data synchronization
- **Offline Support** - Works without internet connection
- **Mobile Optimized** - Responsive design for all devices

## 🚀 Quick Start

### Option 1: Local HTTP Server (Recommended)

To avoid CORS issues and enable all features, run the app through a local server:

```bash
# Using Python 3 (recommended)
python3 run-local-server.py

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js (if you have it installed)
npx http-server -p 8000 -c-1
```

Then open: **http://localhost:8000**

### Option 2: Direct File Access

You can also open `index.html` directly in your browser, but some features may be limited due to browser security restrictions:

1. Double-click `index.html` or
2. Right-click → "Open with" → Your preferred browser

**Note:** Service Worker and manifest features will be disabled in file:// mode, but all core functionality will work.

### Option 3: Web Hosting

Deploy to any web server or hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting provider

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
   - Your data will now sync to your private repository

### 3. Mobile Installation

The app can be installed as a PWA (Progressive Web App):

1. Open the app in Chrome/Safari on mobile
2. Look for "Add to Home Screen" option
3. The app will install like a native app

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

**1. CORS Errors when opening index.html directly**
- **Solution:** Use the local server script: `python3 run-local-server.py`

**2. Service Worker registration failed**
- **Solution:** This is normal for file:// protocol. Use local server for full PWA features.

**3. GitHub sync not working**
- **Solution:** Ensure your Personal Access Token has `repo` scope and the repository exists.

**4. App not loading**
- **Solution:** Check browser console for errors. Try clearing browser cache.

### Browser Console Errors

If you see these errors, they're normal for file:// protocol:
- `Service Worker registration failed`
- `Access to manifest blocked by CORS policy`
- `Failed to load resource`

These don't affect core functionality.

## 🔄 Updates

The app automatically checks for updates when running on a web server. For file:// usage, manually download the latest version.

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
2. Ensure you're using the latest version
3. Try running through the local server
4. Check browser console for specific error messages

## 📄 License

This is a personal pregnancy tracking application. All rights reserved.

---

**Made with 💚 for Baby McGee**
