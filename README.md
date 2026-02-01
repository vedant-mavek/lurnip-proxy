
# Lurnip | AI-First Education Operations

A minimal, trustworthy AI-first education platform for students, teachers, and admins. Focuses on core academic operations with a premium, low-latency UI.

## 🚀 Quick Start

### 1. Installation
Install the necessary dependencies:
```bash
npm install
```

### 2. Development
Launch the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 3. Build
Generate a production-ready build:
```bash
npm run build
```

## 🛠 Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **AI Integration**: Google Gemini API (@google/genai)

## 📁 Structure
This project uses a **flat directory structure** where the root serves as the source folder.
- `index.tsx`: Main entry point.
- `App.tsx`: Root application logic and routing.
- `/views`: Role-specific screens (Student, Teacher, Admin).
- `/components`: Shared UI elements and Layouts.
- `types.ts`: Centralized TypeScript interfaces.

## 🔐 Security & Privacy
Lurnip processes academic data with a privacy-first approach. Institutional records are restricted to authorized faculty and administrators, ensuring high academic integrity.
