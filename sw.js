// Enhanced Service Worker for Baby McGee App v4.0 - remove BP+Calendar tabs
const CACHE_NAME = 'baby-mcgee-v4.0';
const STATIC_CACHE = 'baby-mcgee-static-v4.0';
const DYNAMIC_CACHE = 'baby-mcgee-dynamic-v4.0';

const STATIC_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './icon-192.svg',
    './icon-512.svg'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    // Skip caching for file:// protocol
    if (location.protocol === 'file:') {
        console.log('File protocol detected, skipping cache setup');
        self.skipWaiting();
        return;
    }
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker installed successfully');
                return self.skipWaiting(); // Force activation
            })
            .catch((error) => {
                console.error('Service Worker installation failed:', error);
                // Continue anyway for file:// protocol
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Take control of all clients
            self.clients.claim()
        ]).then(() => {
            console.log('Service Worker activated successfully');
        })
    );
});

// Enhanced fetch event with cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip file:// protocol requests to avoid CORS issues
    if (url.protocol === 'file:') {
        return;
    }
    
    // Handle static assets with cache-first strategy
    if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset.replace('./', '')))) {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    return fetch(request)
                        .then((networkResponse) => {
                            // Cache the new response
                            if (networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(STATIC_CACHE)
                                    .then((cache) => {
                                        cache.put(request, responseClone);
                                    })
                                    .catch(() => {
                                        // Ignore cache errors for file:// protocol
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            // Return offline fallback if available
                            if (url.pathname.endsWith('.html') || url.pathname === '/') {
                                return caches.match('./index.html');
                            }
                        });
                })
                .catch(() => {
                    // If cache fails, try direct fetch
                    return fetch(request);
                })
        );
        return;
    }
    
    // Handle other requests with network-first strategy
    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                // Cache successful responses (skip for file:// protocol)
                if (networkResponse.status === 200 && url.protocol !== 'file:') {
                    const responseClone = networkResponse.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then((cache) => {
                            cache.put(request, responseClone);
                        })
                        .catch(() => {
                            // Ignore cache errors
                        });
                }
                return networkResponse;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        
                        // Return a basic offline response for other requests
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    })
                    .catch(() => {
                        // Final fallback
                        return new Response('Service Unavailable', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Handle background sync for data persistence
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync-data') {
        event.waitUntil(
            // Implement background data sync logic here
            syncOfflineData()
        );
    }
});

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'Baby McGee App notification',
        icon: './icon-192.svg',
        badge: './icon-192.svg',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Open App',
                icon: './icon-192.svg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: './icon-192.svg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Baby McGee', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Sync offline data function
async function syncOfflineData() {
    try {
        console.log('Syncing offline data...');
        // Implement actual sync logic here
        // This could sync with a backend API when available
        return Promise.resolve();
    } catch (error) {
        console.error('Failed to sync offline data:', error);
        throw error;
    }
}

// Send message to clients about updates
function notifyClients(message) {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage(message);
        });
    });
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});