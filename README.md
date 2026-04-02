# Baby McGee App

A private, secure web application for logging and tracking baby-related data. This Progressive Web App (PWA) can be accessed via web browser and installed on mobile devices for offline use.

## Features

- 🔐 **Secure Access**: Password-protected with session-based authentication
- 📱 **Mobile-First Design**: Optimized for iOS and mobile devices
- 💾 **Local Storage**: Data stored locally in browser for privacy
- 📊 **Data Categories**: Track feeding, diaper changes, sleep, milestones, health, and more
- 📈 **Export Functionality**: Export data to CSV for backup or analysis
- 🔄 **Auto-Save**: Draft entries are automatically saved as you type
- 📴 **Offline Support**: Works without internet connection once loaded
- 🏠 **PWA Installation**: Can be installed as a native-like app on devices

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Enter the access code: `babymcgee2024` (change this in `script.js`)

### Changing the Access Code

Edit the `accessCode` variable in [`script.js`](script.js:6):

```javascript
this.accessCode = 'your-new-password-here';
```

### File Structure

```
Baby McGee App/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker for PWA
├── manifest.json      # PWA manifest
├── icon-192.svg       # App icon (192x192)
└── README.md          # This file
```

## Deployment Options

### GitHub Pages (Recommended)
1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Access via: `https://username.github.io/repository-name`

### Other Hosting Services
- Netlify (drag and drop deployment)
- Vercel (GitHub integration)
- Firebase Hosting
- Any static file hosting service

## Security Notes

- **Access Code**: Change the default access code before deployment
- **HTTPS Required**: For PWA features and security, use HTTPS hosting
- **Private Repository**: Keep GitHub repository private for sensitive data
- **Local Storage**: Data is stored locally in browser, not on servers

## Data Management

### Categories Available
- 🍼 Feeding
- 👶 Diaper Change
- 😴 Sleep
- 🎉 Milestone
- 🏥 Health
- 📝 Other

### Export Data
Click "Export Data" to download a CSV file with all entries for backup or analysis.

### Data Storage
- All data is stored locally in the browser's localStorage
- No data is sent to external servers
- Clear browser data will remove all entries (export regularly for backup)

## Mobile Installation

### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will appear as a native app icon

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"

## Browser Compatibility

- ✅ Safari (iOS/macOS)
- ✅ Chrome (all platforms)
- ✅ Firefox (all platforms)
- ✅ Edge (Windows/macOS)

## Future Enhancements

- [ ] Cloud sync with GitHub integration
- [ ] Photo attachments for entries
- [ ] Data visualization charts
- [ ] Reminder notifications
- [ ] Multiple baby profiles
- [ ] Sharing with family members

## Support

For issues or questions, create an issue in the GitHub repository.

## License

This project is private and intended for personal use only.