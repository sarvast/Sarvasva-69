import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useStepTracker() {
    const [steps, setSteps] = useState<number>(0);
    const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    const [supported, setSupported] = useState(false);
    const [isTracking, setIsTracking] = useState(false);

    const today = format(new Date(), 'yyyy-MM-dd');
    const STORAGE_KEY = `steps_${today}`;
    const PERMISSION_KEY = 'step_tracker_permission';

    useEffect(() => {
        // Check device support
        if ('DeviceMotionEvent' in window) {
            setSupported(true);
        }

        // Load saved permission
        const savedPermission = localStorage.getItem(PERMISSION_KEY) as 'granted' | 'denied' | null;
        if (savedPermission) {
            setPermission(savedPermission);
        }

        // Load today's steps
        const savedSteps = localStorage.getItem(STORAGE_KEY);
        if (savedSteps) {
            setSteps(parseInt(savedSteps));
        }

        // Auto-start tracking if permission granted
        if (savedPermission === 'granted') {
            startStepTracking();
        }

        // Setup daily reset at midnight
        setupDailyReset();

        // Handle app visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const setupDailyReset = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            // Reset steps at midnight
            setSteps(0);
            localStorage.removeItem(STORAGE_KEY);
            // Setup next day's reset
            setupDailyReset();
        }, msUntilMidnight);
    };

    const handleVisibilityChange = () => {
        if (!document.hidden && permission === 'granted') {
            // App became visible, sync with any background counting
            const savedSteps = localStorage.getItem(STORAGE_KEY);
            if (savedSteps) {
                setSteps(parseInt(savedSteps));
            }
        }
    };

    const requestStepAccess = async () => {
        try {
            if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
                // iOS 13+
                const result = await (DeviceMotionEvent as any).requestPermission();
                setPermission(result);
                localStorage.setItem(PERMISSION_KEY, result);
                
                if (result === 'granted') {
                    startStepTracking();
                }
            } else {
                // Android Chrome
                setPermission('granted');
                localStorage.setItem(PERMISSION_KEY, 'granted');
                startStepTracking();
            }
        } catch (error) {
            console.error('Step permission error:', error);
            setPermission('denied');
            localStorage.setItem(PERMISSION_KEY, 'denied');
        }
    };

    const startStepTracking = () => {
        if (isTracking) return;
        
        setIsTracking(true);
        let lastY = 0;
        let lastStepTime = 0;
        let stepCount = steps;

        const handleMotion = (event: DeviceMotionEvent) => {
            if (!event.accelerationIncludingGravity) return;

            const { x, y, z } = event.accelerationIncludingGravity;
            if (x === null || y === null || z === null) return;

            // Improved step detection algorithm
            const totalAcceleration = Math.sqrt(x*x + y*y + z*z);
            const yDiff = Math.abs(y - lastY);
            const now = Date.now();

            // Step detection: vertical movement + reasonable acceleration + timing
            if (yDiff > 2 && totalAcceleration > 8 && totalAcceleration < 15) {
                if (now - lastStepTime > 300) { // Minimum 300ms between steps
                    stepCount++;
                    setSteps(stepCount);
                    
                    // Save immediately to localStorage
                    localStorage.setItem(STORAGE_KEY, stepCount.toString());
                    lastStepTime = now;
                }
            }
            
            lastY = y;
        };

        window.addEventListener('devicemotion', handleMotion);
        
        // Register service worker for background tracking
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/step-worker.js').catch(console.error);
        }
    };

    const syncSteps = () => {
        const savedSteps = localStorage.getItem(STORAGE_KEY);
        if (savedSteps) {
            setSteps(parseInt(savedSteps));
        }
    };

    const toggleTracking = () => {
        if (permission === 'granted') {
            if (isTracking) {
                // Stop tracking
                setIsTracking(false);
                window.removeEventListener('devicemotion', () => {});
            } else {
                // Start tracking
                startStepTracking();
            }
        } else {
            requestStepAccess();
        }
    };

    return {
        steps,
        permission,
        supported,
        isTracking,
        requestStepAccess,
        syncSteps,
        toggleTracking
    };
}