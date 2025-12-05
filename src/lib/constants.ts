
export const USER_DATA = {
    NAME: "Sarvasva",
    FULL_NAME: "Sarthak Srivastava",
    HEIGHT_CM: 183,
    STARTING_WEIGHT_KG: 115,
    CURRENT_WEIGHT_KG: 115, // Will be updated from settings
    TARGET_WEIGHT_KG: 80,
    AGE: 25, // For BMR calculation
    ACTIVITY_FACTOR: 1.375, // Lightly active to start
    STEP_GOAL: 10000,
    WATER_GOAL_ML: 4000,
};

// Calculate BMR using Mifflin-St Jeor Equation
export const calculateBMR = (weight: number, height: number, age: number) => {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
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

export const GREETINGS = {
    MORNING: "Good Morning, Sarvasva 🌅. Time to dominate.",
    AFTERNOON: "Good Afternoon, Sarvasva ☀️. Stay focused.",
    EVENING: "Good Evening, Sarvasva 🌆. Push harder.",
    NIGHT: "Good Night, Sarvasva 🌙. Did you earn it?",
};

export interface UserSettings {
    currentWeight: number;
    activityLevel: number;
}
