import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useSarvasva } from '../context/SarvasvaContext';
import { Trash2, Scale, Edit3, Target, Footprints, Droplets } from 'lucide-react';
import { clearDatabase } from '../lib/db';

export function Settings() {
    const { userProfile, metrics, updateWeight, updateTargetWeight, updateGoals } = useSarvasva();
    const [isEditingWeight, setIsEditingWeight] = useState(false);
    const [isEditingTarget, setIsEditingTarget] = useState(false);
    const [isEditingSteps, setIsEditingSteps] = useState(false);
    const [isEditingWater, setIsEditingWater] = useState(false);
    const [newWeight, setNewWeight] = useState(userProfile?.currentWeight?.toString() || '0');
    const [newTargetWeight, setNewTargetWeight] = useState(userProfile?.targetWeight?.toString() || '0');
    const [newStepGoal, setNewStepGoal] = useState(userProfile?.stepGoal?.toString() || '0');
    const [newWaterGoal, setNewWaterGoal] = useState(userProfile?.waterGoal?.toString() || '0');

    if (!userProfile) return <div className="p-8 text-white">Loading...</div>;

    const weightLoss = userProfile.startingWeight - userProfile.currentWeight;
    const weightLossText = weightLoss > 0 ? `${weightLoss.toFixed(1)}kg lost` : weightLoss < 0 ? `${Math.abs(weightLoss).toFixed(1)}kg gained` : 'No change';

    const handleWeightUpdate = async () => {
        const weight = parseFloat(newWeight);
        if (weight > 0 && weight !== userProfile.currentWeight) {
            await updateWeight(weight);
        }
        setIsEditingWeight(false);
    };

    const handleTargetUpdate = async () => {
        const weight = parseFloat(newTargetWeight);
        if (weight > 0 && weight !== userProfile.targetWeight) {
            await updateTargetWeight(weight);
        }
        setIsEditingTarget(false);
    };

    const handleStepsUpdate = async () => {
        const steps = parseInt(newStepGoal);
        if (steps > 0) {
            await updateGoals(steps, userProfile.waterGoal);
        }
        setIsEditingSteps(false);
    };

    const handleWaterUpdate = async () => {
        const water = parseInt(newWaterGoal);
        if (water > 0) {
            await updateGoals(userProfile.stepGoal, water);
        }
        setIsEditingWater(false);
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold text-white">Settings</h1>

            {/* Profile Summary */}
            <GlassCard className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-2xl font-bold text-white">
                        {userProfile.name[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">{userProfile.name}</h2>
                        <p className="text-sm text-slate-400">Target: {userProfile.targetWeight} kg</p>
                        <p className={`text-xs font-medium ${weightLoss > 0 ? 'text-success' : weightLoss < 0 ? 'text-danger' : 'text-slate-400'}`}>
                            {weightLossText}
                        </p>
                    </div>
                </div>
                
                {/* Current Weight Section */}
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Scale size={20} className="text-brand-primary" />
                            <div>
                                <div className="text-white font-medium">Current Weight</div>
                                <div className="text-xs text-slate-400">BMI: {metrics.BMI} | BMR: {metrics.BMR} kcal</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditingWeight ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={newWeight}
                                        onChange={(e) => setNewWeight(e.target.value)}
                                        className="w-20 glass-input text-white text-center py-1"
                                        step="0.1"
                                        min="30"
                                        max="200"
                                    />
                                    <span className="text-white text-sm">kg</span>
                                    <Button size="sm" onClick={handleWeightUpdate}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingWeight(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{userProfile.currentWeight}kg</span>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingWeight(true)}>
                                        <Edit3 size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Target Weight Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Target size={20} className="text-brand-accent" />
                            <div>
                                <div className="text-white font-medium">Target Weight</div>
                                <div className="text-xs text-slate-400">Goal weight to achieve</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditingTarget ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={newTargetWeight}
                                        onChange={(e) => setNewTargetWeight(e.target.value)}
                                        className="w-20 glass-input text-white text-center py-1"
                                        step="0.1"
                                    />
                                    <span className="text-white text-sm">kg</span>
                                    <Button size="sm" onClick={handleTargetUpdate}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingTarget(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{userProfile.targetWeight}kg</span>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingTarget(true)}>
                                        <Edit3 size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Steps Goal Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Footprints size={20} className="text-brand-secondary" />
                            <div>
                                <div className="text-white font-medium">Daily Steps Goal</div>
                                <div className="text-xs text-slate-400">Target steps per day</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditingSteps ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={newStepGoal}
                                        onChange={(e) => setNewStepGoal(e.target.value)}
                                        className="w-20 glass-input text-white text-center py-1"
                                    />
                                    <Button size="sm" onClick={handleStepsUpdate}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingSteps(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-white">{userProfile.stepGoal}</span>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingSteps(true)}>
                                        <Edit3 size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Water Goal Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Droplets size={20} className="text-brand-primary" />
                            <div>
                                <div className="text-white font-medium">Daily Water Goal</div>
                                <div className="text-xs text-slate-400">Target water intake in ml</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditingWater ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={newWaterGoal}
                                        onChange={(e) => setNewWaterGoal(e.target.value)}
                                        className="w-20 glass-input text-white text-center py-1"
                                    />
                                    <span className="text-white text-sm">ml</span>
                                    <Button size="sm" onClick={handleWaterUpdate}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingWater(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-white">{userProfile.waterGoal}ml</span>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingWater(true)}>
                                        <Edit3 size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </GlassCard>



            {/* Danger Zone */}
            <h3 className="text-sm font-medium text-danger uppercase tracking-widest pl-2">Danger Zone</h3>
            <GlassCard className="p-4 border-danger/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Trash2 size={20} className="text-danger" />
                        <div>
                            <div className="text-white font-medium">Reset All Data</div>
                            <div className="text-xs text-slate-400">Clears database & history</div>
                        </div>
                    </div>
                    <Button variant="ghost" className="text-danger hover:bg-danger/10" onClick={async () => {
                        if (confirm('Are you sure? This will wipe all logs and custom foods. This cannot be undone.')) {
                            try {
                                await clearDatabase();
                                window.location.reload();
                            } catch (e) {
                                alert("Failed to reset. Please clear browser data manually.");
                            }
                        }
                    }}>
                        Reset
                    </Button>
                </div>
            </GlassCard>

            <div className="text-center text-xs text-slate-600 pt-8">
                SARVASVA v69
            </div>
        </div>
    );
}
