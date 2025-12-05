
export interface UserProfile {
    name: string;
    height: number; // cm
    startingWeight: number; // kg
    currentWeight: number; // kg
    targetWeight: number; // kg
    age: number;
    gender: 'male' | 'female';
    activityFactor: number;
    stepGoal: number;
    waterGoal: number; // ml
    bmr?: number;
    tdee?: number;
    bmi?: number;
}

export const DEFAULT_USER_DATA: UserProfile = {
    name: "",
    height: 170,
    startingWeight: 70,
    currentWeight: 70,
    targetWeight: 65,
    age: 25,
    gender: 'male',
    activityFactor: 1.375,
    stepGoal: 10000,
    waterGoal: 4000,
};

// Calculate BMR using Mifflin-St Jeor Equation
export const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female') => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return Math.round(gender === 'male' ? base + 5 : base - 161);
};

// Calculate TDEE
export const calculateTDEE = (bmr: number, activityFactor: number) => {
    return Math.round(bmr * activityFactor);
};

// Calculate BMI
export const calculateBMI = (weight: number, height: number) => {
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
};

// Calculate timeline weeks
export const calculateTimelineWeeks = (currentWeight: number, targetWeight: number) => {
    const weightDiff = currentWeight - targetWeight;
    return Math.ceil(weightDiff / 0.8); // 0.8kg per week
};

export const APP_CONFIG = {
    STEPS_GOAL_MIN: 6000,
    STEPS_GOAL_MAX: 10000,
    WATER_GOAL_ML: 4000,
    SLEEP_GOAL_HRS: 7,
    STUDY_GOAL_HRS: 4,
};

export const getGreetings = (name: string) => ({
    MORNING: `Good Morning, ${name} 🌅. Time to dominate.`,
    AFTERNOON: `Good Afternoon, ${name} ☀️. Stay focused.`,
    EVENING: `Good Evening, ${name} 🌆. Push harder.`,
    NIGHT: `Good Night, ${name} 🌙. Did you earn it?`,
});
