# 🏫 School Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-3+-003B57?style=for-the-badge&logo=sqlite)

*A modern, responsive school management application built with cutting-edge technologies*

[🚀 Live Demo](https://school-management-ruddy-one.vercel.app/) • [📖 Documentation](#getting-started) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏢 **School Management**
- ➕ **Add Schools**: Comprehensive form with validation
- 📋 **School Directory**: Beautiful grid layout
- 🖼️ **Image Upload**: Upload and preview school images
- 📱 **Responsive Design**: Works on all devices

</td>
<td width="50%">

### 🔧 **Technical Features**
- ✅ **Form Validation**: Real-time validation with react-hook-form & zod
- 🗄️ **Database Integration**: SQLite for reliable data storage
- 🎨 **Modern UI**: shadcn/ui components with TailwindCSS
- ⚡ **Performance**: Optimized for speed and efficiency

</td>
</tr>
</table>

---

## 🎬 Prototype Demo

<div align="center">

### 🏠 Landing Page
![Landing Page](https://drive.google.com/file/d/1D6Ee4F6V21zagkGpfQck8xYZlXj125UB/view?usp=drive_link)
*Modern dashboard with school management overview and key features*

### 📋 School Directory
![School Directory](https://drive.google.com/file/d/1vgsvkWhjGXbUUW8CJ9suSVSsbodnLKaA/view?usp=drive_link)
*Interactive grid layout showcasing registered schools with hover effects*

### ➕ School Registration Form
![Registration Form](https://drive.google.com/file/d/1odeG38B7dsdNBgaHtdxG5YQQnt-E9KmE/view?usp=drive_link)
*Comprehensive form with real-time validation and image upload*

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version |
|----------|------------|---------|
| **Frontend** | Next.js | 13+ |
| **UI Library** | React | 18+ |
| **Styling** | TailwindCSS | 3+ |
| **Database** | SQLite | 3+ |
| **Forms** | react-hook-form + zod | Latest |
| **UI Components** | shadcn/ui | Latest |
| **Icons** | Lucide React | Latest |

</div>

---

## 📁 Project Structure

```
🏫 school-management/
├── 📱 app/
│   ├── ➕ add-school/page.jsx      # School registration form
│   ├── 📋 schools/page.jsx         # School directory listing
│   ├── 🔌 api/
│   │   ├── 🏢 schools/route.js     # Schools CRUD API
│   │   └── 📤 upload/route.js      # Image upload API
│   ├── 🎨 layout.tsx               # Root layout
│   └── 🏠 page.tsx                 # Homepage
├── 🛠️ lib/
│   ├── 🗄️ database.js              # SQLite database setup
│   ├── ✅ validations.js           # Form validation schemas
│   └── 🔧 utils.ts                 # Utility functions
├── 🎨 components/
│   ├── 🎭 ui/                      # shadcn/ui components
│   ├── 🌙 theme-provider.tsx       # Theme management
│   └── 🎨 animated-background.tsx  # Background animations
├── 📁 public/schoolImages/         # Uploaded school images
├── 📦 package.json                 # Dependencies & scripts
└── 🗄️ schools.db                   # SQLite database file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **📥 Clone the Repository**
   ```bash
   git clone https://github.com/Godrulerz/School-.git
   cd school-management
   ```

2. **📦 Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **🗄️ Setup Database**
   ```bash
   # Copy environment file
   cp env.example .env.local
   
   # Edit .env.local with your DATABASE_URL
   # DATABASE_URL="mysql://username:password@host:port/database"
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   ```

4. **🏃‍♂️ Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **🌐 Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

1. **Build the Project**:
   ```bash
   npm run build
   ```




## License

MIT License - feel free to use this project for educational or commercial purposes.