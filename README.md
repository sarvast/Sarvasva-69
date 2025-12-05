# 🔥 Sarvasva-69
**Personalized Lifestyle & Fitness Tracker**

> *"Transform your body, transform your life"* - A comprehensive fitness tracking PWA designed specifically for Sarthak Srivastava's weight loss journey from 115kg to 80kg.

## 🎯 Project Overview

Sarvasva-69 is an intelligent, mobile-first Progressive Web App that combines fitness tracking, nutrition monitoring, and smart notifications to create a complete lifestyle transformation system. Built with React and TypeScript, it features a stunning glass morphism UI and aggressive motivational notifications.

## ✨ Key Features

### 📊 **Smart Dashboard**
- Real-time transformation timeline calculator
- Dynamic calorie deficit tracking
- BMR-based nutrition goals
- Quick action buttons for steps and water intake
- Personalized greetings based on time of day

### 💪 **Intelligent Fitness Tracking**
- 7-day structured workout schedule
- Muscle group rotation system
- Exercise completion tracking with checkboxes
- Automatic calorie burn calculations
- Rest day recommendations

### 🍽️ **Nutrition Management**
- Custom food database with persistent storage
- Quick-add buttons for common Indian foods
- Real-time calorie tracking against BMR goals
- Visual progress indicators
- Deficit/surplus calculations

### 🎯 **Dynamic Goal System**
- BMI tracking and calculations
- Weight loss timeline projections
- Performance-based timeline adjustments
- Visual progress tracking

### 🔔 **Aggressive Notification System**
- Hourly reminders (2 PM - 8 PM) for incomplete tasks
- End-of-day impact reports (9 PM)
- Motivational/harsh messaging for accountability
- Timeline delay calculations for missed goals

### 📱 **Mobile-First Design**
- Fully responsive glass morphism UI
- PWA capabilities for app-like experience
- Offline functionality with IndexedDB
- Touch-optimized interactions

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom glass morphism
- **State Management:** React Context API
- **Database:** IndexedDB (via idb library)
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **PWA:** Vite PWA Plugin

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sarvast/Sarvasva-69.git

# Navigate to project directory
cd Sarvasva-69

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 User Profile Configuration

```typescript
const USER_DATA = {
    NAME: "Sarvasva",
    FULL_NAME: "Sarthak Srivastava",
    HEIGHT_CM: 183,
    STARTING_WEIGHT_KG: 115,
    TARGET_WEIGHT_KG: 80,
    BMR_ESTIMATE: 2200,
    STEP_GOAL: 10000,
    WATER_GOAL_ML: 4000,
};
```

## 🏗️ Project Structure

```
src/
├── components/ui/          # Reusable UI components
│   ├── BottomNav.tsx      # Mobile navigation
│   ├── Button.tsx         # Custom button component
│   ├── GlassCard.tsx      # Glass morphism cards
│   └── ProgressBar.tsx    # Progress indicators
├── context/               # React Context providers
│   └── SarvasvaContext.tsx # Main app state
├── hooks/                 # Custom React hooks
│   ├── useReminders.ts    # Notification system
│   └── ...
├── lib/                   # Utilities and constants
│   ├── db.ts             # IndexedDB operations
│   ├── constants.ts      # App configuration
│   └── ...
├── pages/                 # Main application pages
│   ├── Dashboard.tsx     # Home dashboard
│   ├── Fitness.tsx       # Workout tracking
│   ├── Nutrition.tsx     # Food logging
│   ├── Goals.tsx         # Progress tracking
│   └── Settings.tsx      # App settings
└── App.tsx               # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary:** `#6366f1` (Indigo 500)
- **Secondary:** `#8b5cf6` (Violet 500)
- **Accent:** `#ec4899` (Pink 500)
- **Success:** `#10b981` (Emerald 500)
- **Danger:** `#ef4444` (Red 500)

### Glass Morphism Theme
- Translucent cards with backdrop blur
- Subtle borders and shadows
- Dark theme with gradient backgrounds
- Smooth animations and transitions

## 🔔 Notification System

### Hourly Reminders (2 PM - 8 PM)
- Triggers only when tasks are incomplete
- Aggressive messaging for accountability
- Shows specific pending tasks

### End of Day Report (9 PM)
- **Success:** "🔥 Beast Mode Activated"
- **Failure:** "💔 You Failed Today" with delay calculations

## 📊 Timeline Calculation Logic

```typescript
// Base timeline: 35kg loss at 0.8kg/week = ~44 weeks
const baseWeeks = (STARTING_WEIGHT - TARGET_WEIGHT) / 0.8;

// Dynamic adjustments:
// - Missed workout: +0.2 weeks
// - Low steps (<8000): +0.1 weeks
// - Poor calorie deficit: Timeline extension
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Auto-deploy on push to main branch
3. PWA features work out of the box

### Manual Build
```bash
npm run build
# Deploy dist/ folder to any static hosting
```

## 📱 PWA Features

- **Offline Support:** Full functionality without internet
- **Install Prompt:** Add to home screen capability
- **Push Notifications:** Browser-based reminders
- **App-like Experience:** Full-screen mobile interface

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sarthak Srivastava (Sarvasva)**
- GitHub: [@sarvast](https://github.com/sarvast)
- Project: [Sarvasva-69](https://github.com/sarvast/Sarvasva-69)

---

*Built with 💪 for the ultimate transformation journey. No excuses, only results.*
