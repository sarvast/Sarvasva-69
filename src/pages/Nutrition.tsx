import { useState } from 'react';
import { useSarvasva } from '../context/SarvasvaContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Plus } from 'lucide-react';

export function Nutrition() {
    const { dailyLog, metrics, foodDatabase, addFood, addFoodToDb } = useSarvasva();
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCalories, setNewItemCalories] = useState('');

    if (!dailyLog) return <div>Loading...</div>;

    const remaining = metrics.BMR - dailyLog.calories_eaten + dailyLog.calories_burned;
    const progress = (dailyLog.calories_eaten / metrics.BMR) * 100;

    const handleQuickAdd = (food: { name: string; calories: number }) => {
        addFood(food.calories);
    };

    const handleCreateFood = async () => {
        if (!newItemName || !newItemCalories) return;
        const cals = parseInt(newItemCalories);
        await addFoodToDb(newItemName, cals);
        setNewItemName('');
        setNewItemCalories('');
        setIsAddingNew(false);
    };

    return (
        <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
            {/* Header / Summary */}
            <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-white">Nutrition</h1>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-secondary">
                            {dailyLog.calories_eaten} / {metrics.BMR}
                        </div>
                    </div>
                </div>
                <ProgressBar progress={progress} color="bg-brand-accent h-3" />
                <div className="mt-4 flex justify-between text-sm text-slate-400">
                    <span>Remaining: <span className="text-white font-medium">{Math.round(remaining)}</span></span>
                    <span>Burned: <span className="text-success font-medium">{Math.round(dailyLog.calories_burned)}</span></span>
                </div>
            </GlassCard>

            {/* Quick Add Grid */}
            <div className="grid grid-cols-2 gap-2">
                {/* Common Presets (Hardcoded + Saved) */}


                {/* Default Indian Foods */}
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Roti/Chapati', calories: 70 })}>
                    <span className="font-semibold text-white">🫓 1 Roti/Chapati</span>
                    <span className="text-xs text-slate-400">1 medium = 70 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Bowl Rice', calories: 130 })}>
                    <span className="font-semibold text-white">🍚 1 Bowl Rice</span>
                    <span className="text-xs text-slate-400">1 bowl cooked = 130 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Boiled Egg', calories: 70 })}>
                    <span className="font-semibold text-white">🍳 1 Boiled Egg</span>
                    <span className="text-xs text-slate-400">1 egg = 70 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Omelette', calories: 100 })}>
                    <span className="font-semibold text-white">🍳 1 Omelette</span>
                    <span className="text-xs text-slate-400">1 egg + oil = 100 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Slice White Bread', calories: 60 })}>
                    <span className="font-semibold text-white">🍞 1 Slice White Bread</span>
                    <span className="text-xs text-slate-400">1 slice = 60 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Slice Brown Bread', calories: 45 })}>
                    <span className="font-semibold text-white">🍞 1 Slice Brown Bread</span>
                    <span className="text-xs text-slate-400">1 slice = 45 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Aloo Paratha', calories: 230 })}>
                    <span className="font-semibold text-white">🧈 1 Aloo Paratha</span>
                    <span className="text-xs text-slate-400">1 paratha + oil = 230 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Plain Paratha', calories: 190 })}>
                    <span className="font-semibold text-white">🧈 1 Plain Paratha</span>
                    <span className="text-xs text-slate-400">1 paratha = 190 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Katori Dal', calories: 130 })}>
                    <span className="font-semibold text-white">🍲 1 Katori Dal</span>
                    <span className="text-xs text-slate-400">1 katori = 130 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Katori Aloo Sabzi', calories: 150 })}>
                    <span className="font-semibold text-white">🥔 1 Katori Aloo Sabzi</span>
                    <span className="text-xs text-slate-400">1 katori = 150 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Bowl Chole', calories: 180 })}>
                    <span className="font-semibold text-white">🧆 1 Bowl Chole</span>
                    <span className="text-xs text-slate-400">1 small bowl = 180 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Bowl Rajma', calories: 200 })}>
                    <span className="font-semibold text-white">🍛 1 Bowl Rajma</span>
                    <span className="text-xs text-slate-400">1 bowl = 200 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '100g Chicken Curry', calories: 170 })}>
                    <span className="font-semibold text-white">🍗 100g Chicken Curry</span>
                    <span className="text-xs text-slate-400">100g = 170 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Gulab Jamun', calories: 150 })}>
                    <span className="font-semibold text-white">🧁 1 Gulab Jamun</span>
                    <span className="text-xs text-slate-400">1 piece = 150 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Banana', calories: 90 })}>
                    <span className="font-semibold text-white">🍌 1 Banana</span>
                    <span className="text-xs text-slate-400">1 medium = 90 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '1 Apple', calories: 52 })}>
                    <span className="font-semibold text-white">🍎 1 Apple</span>
                    <span className="text-xs text-slate-400">1 medium = 52 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '200ml Tea (Sweet)', calories: 100 })}>
                    <span className="font-semibold text-white">☕ 200ml Tea (Sweet)</span>
                    <span className="text-xs text-slate-400">200ml + sugar = 100 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '200ml Tea (No Sugar)', calories: 60 })}>
                    <span className="font-semibold text-white">☕ 200ml Tea (No Sugar)</span>
                    <span className="text-xs text-slate-400">200ml no sugar = 60 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '100ml Milk Coffee', calories: 80 })}>
                    <span className="font-semibold text-white">☕ 100ml Milk Coffee</span>
                    <span className="text-xs text-slate-400">100ml + sugar = 80 kcal</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex flex-col items-start gap-1" onClick={() => handleQuickAdd({ name: '200ml Milk', calories: 120 })}>
                    <span className="font-semibold text-white">🥛 200ml Milk</span>
                    <span className="text-xs text-slate-400">200ml glass = 120 kcal</span>
                </Button>

                {/* Render Database Items */}
                {foodDatabase.map((food, i) => (
                    <Button
                        key={i}
                        variant="secondary"
                        className="h-auto p-4 flex flex-col items-start gap-1"
                        onClick={() => handleQuickAdd(food)}
                    >
                        <span className="font-semibold text-white">{food.name}</span>
                        <span className="text-xs text-slate-400">{food.calories} kcal</span>
                    </Button>
                ))}

                {/* Add New Button */}
                <Button
                    variant="ghost"
                    className="h-auto p-4 border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-white/5"
                    onClick={() => setIsAddingNew(!isAddingNew)}
                >
                    <Plus size={24} className="text-brand-primary" />
                    <span className="text-sm">New Food</span>
                </Button>
            </div>

            {/* Add New Food Form */}
            {isAddingNew && (
                <GlassCard className="p-4 space-y-4 border-brand-primary/50">
                    <h3 className="font-semibold text-white">Add to Database</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Food Name (e.g. Chicken Breast)"
                            className="w-full glass-input text-white"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Calories"
                            className="w-full glass-input text-white"
                            value={newItemCalories}
                            onChange={(e) => setNewItemCalories(e.target.value)}
                        />
                        <div className="flex gap-2 pt-2">
                            <Button className="flex-1" onClick={handleCreateFood}>Save Item</Button>
                            <Button variant="ghost" className="flex-1" onClick={() => setIsAddingNew(false)}>Cancel</Button>
                        </div>
                    </div>
                </GlassCard>
            )}
        </div>
    );
}
