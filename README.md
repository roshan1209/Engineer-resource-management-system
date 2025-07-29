# ⚡ Engineering Resource Management System

A complete full-stack application to manage engineers, projects, assignments, and team capacity with modern UI and AI-assisted development process.

---

## 🚀 Features

- Role-based Login (Manager & Engineer)
- Engineer Management with Skills, Department, Max Capacity
- Project Creation with Required Skills & Status (Planned, Active, Completed)
- Assignment System with Capacity Validation (% Allocation)
- Manager Dashboard with Team Utilization, Overload & Underutilized Indicators
- Engineer Dashboard showing Current and Upcoming Assignments
- Search Engineers by Skill
- Filter Projects by Status
- Visual Progress Bars for Capacity Tracking
- Responsive UI with TailwindCSS & Shadcn UI
- AI Tools used for faster, cleaner code generation

---

## 🏗️ Tech Stack

**Frontend:**

- React + TypeScript
- Vite
- Tailwind CSS + Shadcn UI
- Zustand State Management
- Axios for API Requests
- React Hook Form

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for Password Encryption
- RESTful APIs

---

## ⚙️ Setup & Installation

### 1️⃣ Prerequisites

- Node.js v18+
- MongoDB running locally or via Atlas

---

### 2️⃣ Installation Process

```bash
# Backend Setup
cd backend
npm install

# Frontend Setup
cd ../frontend
npm install
```

---

### 3️⃣ Environment Configuration

**Backend **``** Example**

```env
PORT=8181
MONGO_URI=mongodb://localhost:27017/resource_management
JWT_SECRET_KEY=your_secret_key
```

**Frontend **``** Example**

```env
VITE_API_BASE_URL="http://localhost:8181/api/v1"
```

```

---

### 4️⃣ Database Seeding

Run the seeder to populate test data:

```bash
cd backend
node seed.js
```

Seeder Adds:

- 1 Manager: [admin@example.com](mailto\:admin@example.com) / admin123
- 10 Engineers: [engineer1@example.com](mailto\:engineer1@example.com) → [engineer10@example.com](mailto\:engineer10@example.com) (password123)
- 5 Projects with Required Skills
- 5 Assignments respecting Capacity Limits

---

### 5️⃣ Run the Application

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Frontend URL: [http://localhost:5173](http://localhost:5173)\
Backend API URL: [http://localhost:8181/api/v1](http://localhost:8181/api/v1)

---

## 👤 Default Credentials

| Role      | Email                                                                                                             | Password    |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| Manager   | [admin@example.com](mailto\:admin@example.com)                                                                    | admin123    |
| Engineers | [engineer1@example.com](mailto\:engineer1@example.com) → [engineer10@example.com](mailto\:engineer10@example.com) | password123 |

---

## 🧐 AI Tools Used in Development

The project utilized AI tools to boost development speed and maintain code consistency:

💪 **ChatGPT by OpenAI**

- Suggested React component structures and API route patterns
- Assisted with form logic, validation, and tricky backend calculations
- Proposed optimized REST API designs

💪 **GitHub Copilot**

- Provided boilerplate suggestions for repetitive UI code
- Helped structure Zustand state management
- Streamlined form handling patterns

💪 **Manual Validation & Enhancements**

- AI-generated code reviewed, cleaned, and refined
- Capacity validation and filtering logic adjusted by hand
- AI leveraged for scaffolding, core logic handled manually

🔥 **End Result:** Faster development with scalable, production-grade code using AI assistance.

---

## 📊 Core Functionalities

- Secure JWT Authentication with Role Separation
- Engineer Management (Skills, Department, Max Capacity)
- Project Creation with Required Skills & Status Management
- Assignment System with % Allocation Validation
- Team Utilization Dashboard for Managers
- Visual Capacity Indicators with Overload & Underutilization Warnings
- Engineer Dashboard for Current & Upcoming Assignments
- Search Engineers by Skill
- Filter Projects by Status
- Fully Responsive Design with TailwindCSS

---

## 📂 Project Structure

```
engineering-resource-management/
├── backend/
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   ├── controllers/    # Business Logic Handlers
│   ├── seed.js         # Seeder Script for Demo Data
│   └── server.js       # Express Server Setup
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # Dashboards, Lists, Add/Edit Forms
│   │   ├── components/ # UI Elements & Reusable Components
│   │   ├── store/      # Zustand State Management
│   │   ├── services/   # Axios API Calls
│   │   └── App.tsx     # Main React Entry Point
└── README.md
```

---

## 📌 Final Notes

- Fully Responsive UI
- Visual Team Capacity Management
- Debounced Search & Filters for Smooth UX
- AI Tools Accelerated Development without compromising logic integrity
- Clean, Scalable, Maintainable Codebase

