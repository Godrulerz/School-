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

## 🚀 Deployment to Vercel with Railway MySQL

### Step 1: Create MySQL Database on Railway

1. Go to [Railway](https://railway.app/) and sign in
2. Create a new project
3. Add a MySQL database service
4. Copy the connection string from the database service

### Step 2: Deploy to Vercel

1. **Connect your repository to Vercel**:
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Configure the project settings

2. **Add Environment Variables**:
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add `DATABASE_URL` with your Railway MySQL connection string
   - Format: `mysql://username:password@host:port/database`

3. **Deploy and Run Migrations**:
   ```bash
   # After deployment, run migrations to sync your schema
   npx prisma migrate deploy
   ```

4. **Redeploy the App**:
   - Trigger a new deployment in Vercel to ensure all changes are applied

### Step 3: Verify Deployment

- Check that your API endpoints are working:
  - `GET /api/users` - Should return an empty array initially
  - `POST /api/users` - Should create new users

## 🗄️ Database Schema

This project now uses **Prisma ORM** with **MySQL** for production deployment:

- **User Model**: `id`, `name`, `email` (unique)
- **Prisma Client**: Singleton pattern for Vercel serverless compatibility
- **Migrations**: Managed through Prisma migrate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for educational or commercial purposes.