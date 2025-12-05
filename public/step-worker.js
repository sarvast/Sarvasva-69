// Background step counting service worker
let stepCount = 0;
let lastY = 0;
let lastStepTime = 0;

// Load existing step count
const today = new Date().toISOString().split('T')[0];
const STORAGE_KEY = `steps_${today}`;

// Listen for device motion events
self.addEventListener('devicemotion', (event) => {
    if (!event.accelerationIncludingGravity) return;

    const { x, y, z } = event.accelerationIncludingGravity;
    if (x === null || y === null || z === null) return;

    // Step detection algorithm
    const totalAcceleration = Math.sqrt(x*x + y*y + z*z);
    const yDiff = Math.abs(y - lastY);
    const now = Date.now();

    // Detect steps using vertical movement
    if (yDiff > 2 && totalAcceleration > 8 && totalAcceleration < 15) {
        if (now - lastStepTime > 300) {
            stepCount++;
            
            // Save to localStorage (accessible from main thread)
            try {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'STEP_UPDATE',
                            steps: stepCount,
                            storageKey: STORAGE_KEY
                        });
                    });
                });
            } catch (error) {
                console.error('Service worker step save error:', error);
            }
            
            lastStepTime = now;
        }
    }
    
    lastY = y;
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
    if (event.data.type === 'INIT_STEPS') {
        stepCount = event.data.steps || 0;
    }
});

// Install and activate service worker
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});