import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { User, Scale, Ruler, Target, Activity } from 'lucide-react';
import { calculateBMR, calculateTDEE, calculateBMI } from '../lib/constants';

interface OnboardingProps {
    onComplete: (profile: {
        name: string;
        height: number;
        startingWeight: number;
        currentWeight: number;
        targetWeight: number;
        age: number;
        gender: 'male' | 'female';
        activityFactor: number;
        stepGoal: number;
        waterGoal: number;
        bmr: number;
        tdee: number;
        bmi: number;
    }) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
        name: '',
        height: 0,
        startingWeight: 0,
        targetWeight: 0,
        age: 0,
        gender: 'male' as 'male' | 'female',
        activityFactor: 1.375,
        stepGoal: 0,
        waterGoal: 0,
    });

    const calculateMetrics = () => {
        if (profile.startingWeight <= 0 || profile.height <= 0 || profile.age <= 0) {
            return { bmr: 0, tdee: 0, bmi: 0 };
        }
        const bmr = calculateBMR(profile.startingWeight, profile.height, profile.age, profile.gender);
        const tdee = calculateTDEE(bmr, profile.activityFactor);
        const bmi = parseFloat(calculateBMI(profile.startingWeight, profile.height));
        return { bmr, tdee, bmi };
    };

    const steps = [
        {
            title: 'Welcome to Sarvasva Fitness',
            subtitle: 'Let\'s create your personalized profile',
            icon: <User size={48} className="text-brand-primary" />,
            content: (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full glass-input text-white"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={profile.gender === 'male' ? 'primary' : 'secondary'}
                            onClick={() => setProfile({ ...profile, gender: 'male' })}
                        >
                            Male
                        </Button>
                        <Button
                            variant={profile.gender === 'female' ? 'primary' : 'secondary'}
                            onClick={() => setProfile({ ...profile, gender: 'female' })}
                        >
                            Female
                        </Button>
                    </div>
                </div>
            )
        },
        {
            title: 'Physical Stats',
            subtitle: 'For accurate BMR & TDEE calculation',
            icon: <Ruler size={48} className="text-brand-secondary" />,
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Height (cm)</label>
                        <input
                            type="number"
                            placeholder="Enter height in cm"
                            className="w-full glass-input text-white"
                            value={profile.height || ''}
                            onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">Age</label>
                        <input
                            type="number"
                            placeholder="Enter your age"
                            className="w-full glass-input text-white"
                            value={profile.age || ''}
                            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Weight Goals',
            subtitle: 'Set your transformation targets',
            icon: <Scale size={48} className="text-brand-accent" />,
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Current Weight (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Enter current weight"
                            className="w-full glass-input text-white"
                            value={profile.startingWeight || ''}
                            onChange={(e) => setProfile({ ...profile, startingWeight: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">Target Weight (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Enter target weight"
                            className="w-full glass-input text-white"
                            value={profile.targetWeight || ''}
                            onChange={(e) => setProfile({ ...profile, targetWeight: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Activity Level',
            subtitle: 'Select your daily activity level',
            icon: <Activity size={48} className="text-brand-accent" />,
            content: (
                <div className="space-y-3">
                    {[
                        { label: 'Sedentary (Office job)', value: 1.2 },
                        { label: 'Light Activity (1-3 days/week)', value: 1.375 },
                        { label: 'Moderate (3-5 days/week)', value: 1.55 },
                        { label: 'Very Active (6-7 days/week)', value: 1.725 },
                        { label: 'Extremely Active (2x/day)', value: 1.9 }
                    ].map((activity) => (
                        <Button
                            key={activity.value}
                            variant={profile.activityFactor === activity.value ? 'primary' : 'secondary'}
                            onClick={() => setProfile({ ...profile, activityFactor: activity.value })}
                            className="w-full text-left justify-start"
                        >
                            {activity.label}
                        </Button>
                    ))}
                </div>
            )
        },
        {
            title: 'Daily Goals',
            subtitle: 'Set your daily targets',
            icon: <Target size={48} className="text-success" />,
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Daily Steps Goal</label>
                        <input
                            type="number"
                            placeholder="Enter daily steps goal"
                            className="w-full glass-input text-white"
                            value={profile.stepGoal || ''}
                            onChange={(e) => setProfile({ ...profile, stepGoal: parseInt(e.target.value) || 0 })}
                        />
                        <p className="text-xs text-slate-500 mt-1">💡 Tip: Minimum 6,000 steps daily is good for health</p>
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">Daily Water Goal (ml)</label>
                        <input
                            type="number"
                            placeholder="Enter daily water goal"
                            className="w-full glass-input text-white"
                            value={profile.waterGoal || ''}
                            onChange={(e) => setProfile({ ...profile, waterGoal: parseInt(e.target.value) || 0 })}
                        />
                        <p className="text-xs text-slate-500 mt-1">💡 Tip: Humans need minimum 2,500ml (2.5L) water daily</p>
                    </div>
                </div>
            )
        }
    ];

    const currentStep = steps[step];
    const isLastStep = step === steps.length - 1;
    const canProceed = step === 0 ? profile.name.trim() : 
                       step === 1 ? profile.height > 0 && profile.age > 0 :
                       step === 2 ? profile.startingWeight > 0 && profile.targetWeight > 0 :
                       step === 4 ? profile.stepGoal > 0 && profile.waterGoal > 0 : true;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
            <div className="w-full max-w-md">
                <GlassCard className="p-8 text-center space-y-6">
                    {currentStep.icon}
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">{currentStep.title}</h1>
                        <p className="text-slate-400">{currentStep.subtitle}</p>
                    </div>
                    
                    {currentStep.content}
                    
                    <div className="flex gap-3 pt-4">
                        {step > 0 && (
                            <Button variant="ghost" onClick={() => setStep(step - 1)} className="flex-1">
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                if (isLastStep) {
                                    const metrics = calculateMetrics();
                                    onComplete({
                                        ...profile,
                                        currentWeight: profile.startingWeight,
                                        ...metrics
                                    });
                                } else {
                                    setStep(step + 1);
                                }
                            }}
                            disabled={!canProceed}
                            className="flex-1"
                        >
                            {isLastStep ? 'Calculate & Start' : 'Next'}
                        </Button>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i <= step ? 'bg-brand-primary' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}