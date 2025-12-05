import { useState, useEffect } from 'react';
import { useSarvasva } from '../context/SarvasvaContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Dumbbell, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { getWorkoutForToday } from '../lib/workout-data';



export function Fitness() {
    const { 
        dailyLog, 
        toggleWorkout, 
        customExercises, 
        exerciseCompletions, 
        toggleExerciseCompletion, 
        addCustomExercise, 
        removeCustomExercise,
        initializeDefaultExercises 
    } = useSarvasva();
    
    const dayIndex = new Date().getDay();
    const todaysWorkout = getWorkoutForToday();
    const [isAddingExercise, setIsAddingExercise] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: '', sets: '' });
    const [viewMode, setViewMode] = useState<'today' | 'week'>('today');
    
    // Get today's exercises (default + custom)
    const todaysExercises = customExercises.filter(ex => ex.dayIndex === dayIndex);
    
    useEffect(() => {
        // Initialize default exercises if none exist
        if (customExercises.length === 0) {
            initializeDefaultExercises();
        }
    }, [customExercises.length, initializeDefaultExercises]);
    
    const isExerciseCompleted = (exerciseId: string) => {
        return exerciseCompletions.some(c => c.exerciseId === exerciseId && c.completed);
    };
    
    const handleAddExercise = async () => {
        if (newExercise.name.trim() && newExercise.sets.trim()) {
            try {
                await addCustomExercise({
                    name: newExercise.name.trim(),
                    sets: newExercise.sets.trim(),
                    dayIndex,
                    isDefault: false
                });
                setNewExercise({ name: '', sets: '' });
                setIsAddingExercise(false);
            } catch (error) {
                console.error('Failed to add exercise:', error);
                alert('Failed to add exercise. Please try again.');
            }
        }
    };

    if (!dailyLog) return <div>Loading...</div>;

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Fitness</h1>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant={viewMode === 'today' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('today')}
                    >
                        Today
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === 'week' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('week')}
                    >
                        Week
                    </Button>
                </div>
            </div>

            {viewMode === 'today' ? (
                /* Today's Workout */
                <GlassCard className="p-6 relative overflow-hidden">
                    <Dumbbell className="absolute -right-6 -top-6 text-white/5 rotate-[-15deg]" size={150} />
                    <div className="relative z-10">
                        <div className="mb-6">
                            <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Target Area</div>
                            <h2 className="text-3xl font-bold text-white leading-tight">{todaysWorkout.type}</h2>
                        </div>
                        {todaysExercises.length > 0 ? (
                            <div className="space-y-3">
                                {todaysExercises.map((ex) => {
                                    const isCompleted = isExerciseCompleted(ex.id);
                                    return (
                                        <div key={ex.id} className={clsx("flex items-center justify-between p-3 rounded-xl border transition-all", isCompleted ? "bg-brand-primary/20 border-brand-primary/50" : "bg-white/5 border-white/5 hover:bg-white/10")}>
                                            <div className="flex items-center gap-3 flex-1">
                                                <button onClick={() => toggleExerciseCompletion(ex.id)} className="flex-shrink-0">
                                                    {isCompleted ? <CheckCircle2 size={20} className="text-brand-primary" /> : <Circle size={20} className="text-slate-500" />}
                                                </button>
                                                <div className="flex-1">
                                                    <span className={clsx("font-medium block", isCompleted ? "text-white line-through opacity-50" : "text-slate-200")}>{ex.name}</span>
                                                    <span className="text-xs text-slate-400 font-mono">{ex.sets}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => removeCustomExercise(ex.id)} className="text-red-400 hover:text-red-300 p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    );
                                })}
                                <Button variant="ghost" onClick={() => setIsAddingExercise(true)} className="w-full border border-dashed border-white/20 hover:bg-white/5">
                                    <Plus size={20} /> Add Custom Exercise
                                </Button>
                            </div>
                        ) : (
                            <div className="py-8 text-center space-y-4">
                                <p className="text-slate-400 italic">No exercises for today. Add some!</p>
                                <Button onClick={() => setIsAddingExercise(true)}><Plus size={20} /> Add Exercise</Button>
                            </div>
                        )}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Button className="w-full" variant={dailyLog.workout_done ? "primary" : "secondary"} onClick={toggleWorkout}>
                                {dailyLog.workout_done ? "Workout Completed ✓" : "Mark as Done"}
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            ) : (
                /* Weekly View */
                <div className="space-y-3">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => {
                        const dayExercises = customExercises.filter(ex => ex.dayIndex === i);
                        const isToday = i === dayIndex;
                        return (
                            <GlassCard key={day} className={`p-4 ${isToday ? 'border-brand-primary/50' : ''}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className={`font-semibold ${isToday ? 'text-brand-primary' : 'text-white'}`}>
                                        {day} {isToday && '(Today)'}
                                    </h3>
                                    <span className="text-xs text-slate-400">{dayExercises.length} exercises</span>
                                </div>
                                {dayExercises.length > 0 ? (
                                    <div className="space-y-2">
                                        {dayExercises.map((ex) => {
                                            const isCompleted = isExerciseCompleted(ex.id);
                                            const canComplete = isToday;
                                            return (
                                                <div key={ex.id} className={clsx("flex items-center justify-between p-2 rounded-lg border transition-all", isCompleted && canComplete ? "bg-brand-primary/20 border-brand-primary/50" : "bg-white/5 border-white/5")}>
                                                    <div className="flex items-center gap-2 flex-1">
                                                        {canComplete ? (
                                                            <button onClick={() => toggleExerciseCompletion(ex.id)} className="flex-shrink-0">
                                                                {isCompleted ? <CheckCircle2 size={16} className="text-brand-primary" /> : <Circle size={16} className="text-slate-500" />}
                                                            </button>
                                                        ) : (
                                                            <div className="flex-shrink-0"><Circle size={16} className="text-slate-600" /></div>
                                                        )}
                                                        <div className="flex-1">
                                                            <span className={clsx("text-sm font-medium", isCompleted && canComplete ? "line-through opacity-50" : "", canComplete ? "text-white" : "text-slate-300")}>{ex.name}</span>
                                                            <div className="text-xs text-slate-400">{ex.sets}</div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeCustomExercise(ex.id)} className="text-red-400 hover:text-red-300 p-1 ml-2">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm italic">No exercises planned</p>
                                )}
            </GlassCard>
                        );
                    })}
                </div>
            )}

            {/* Add Exercise Form */}
            {isAddingExercise && (
                <GlassCard className="p-4 space-y-4 border-brand-primary/50">
                    <h3 className="font-semibold text-white">Add Exercise for {todaysWorkout.type}</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Exercise Name (e.g. Push-ups)"
                            className="w-full glass-input text-white"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Sets & Reps (e.g. 3 x 15)"
                            className="w-full glass-input text-white"
                            value={newExercise.sets}
                            onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={handleAddExercise}>
                                Add Exercise
                            </Button>
                            <Button variant="ghost" className="flex-1" onClick={() => setIsAddingExercise(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            )}

            {/* Weekly Schedule Preview */}
            <div className="grid grid-cols-7 gap-1 mt-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => {
                    const isToday = i === dayIndex;
                    const dayExercises = customExercises.filter(ex => ex.dayIndex === i);
                    
                    return (
                        <div
                            key={day}
                            className={clsx(
                                "aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] border",
                                isToday
                                    ? "bg-brand-primary text-white border-brand-primary"
                                    : "bg-white/5 text-slate-500 border-transparent"
                            )}
                        >
                            <span>{day}</span>
                            {dayExercises.length > 0 && (
                                <div className="text-[8px] mt-1">
                                    {dayExercises.length}
                                </div>
                            )}
                            {isToday && <div className="w-1 h-1 bg-white rounded-full mt-1" />}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
