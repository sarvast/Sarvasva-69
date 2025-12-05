import { useState, useEffect } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { Download, X, Smartphone } from 'lucide-react';

export function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Check if user is new (no previous visit)
        const hasVisited = localStorage.getItem('hasVisited');
        
        if (!hasVisited) {
            // Show prompt for new users
            setShowPrompt(true);
            localStorage.setItem('hasVisited', 'true');
        }

        // Listen for PWA install prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallApp = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowPrompt(false);
            }
            setDeferredPrompt(null);
        } else {
            // Fallback for iOS or browsers without install prompt
            alert('To install: Use browser menu → Install App (recommended over Add to Home Screen)');
        }
    };

    const handleUseWeb = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="p-6 max-w-sm w-full text-center space-y-4">
                <button 
                    onClick={handleUseWeb}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X size={20} />
                </button>
                
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center">
                    <Smartphone size={32} className="text-white" />
                </div>
                
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Welcome to Sarvasva Fitness!</h2>
                    <p className="text-slate-300 text-sm">
                        Get the best experience with our app or continue using the web version.
                    </p>
                </div>
                
                <div className="space-y-3">
                    <Button onClick={handleInstallApp} className="w-full">
                        <Download size={16} />
                        Install App (Recommended)
                    </Button>
                    <Button variant="ghost" onClick={handleUseWeb} className="w-full">
                        Continue in Browser
                    </Button>
                </div>
                
                <p className="text-xs text-slate-500">
                    📱 Install App (not just "Add to Home Screen") for full PWA features
                </p>
            </GlassCard>
        </div>
    );
}