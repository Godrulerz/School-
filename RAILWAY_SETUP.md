# 🚀 Railway Deployment Setup

## ✅ MySQL Connection Configured

Your School Management System is now configured to connect to Railway MySQL database using the connection URL:

```
mysql://root:EflojxKqSWNDCULGMJZuezzHSqkaBIQr@yamanote.proxy.rlwy.net:10297/railway
```

## 🚀 Deploy to Railway

### Step 1: Create Railway Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your School Management repository

### Step 2: Environment Variables
The following environment variable is already configured in `railway.json`:
- `RAILWAY_MYSQL_URL` - Your MySQL connection URL
- `NODE_ENV` - Set to production

### Step 3: Deploy
Railway will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Start the application (`npm start`)
- Initialize the MySQL database with the schools table

### Step 4: Verify Deployment
1. Visit your Railway app URL
2. Test adding a school
3. Check if data is stored in MySQL database

## 🗄️ Database Features

✅ **Automatic Table Creation** - Schools table created on first run  
✅ **Connection Pooling** - Optimized database performance  
✅ **SSL Support** - Secure connection to Railway MySQL  
✅ **Error Handling** - Comprehensive error management  
✅ **CRUD Operations** - Full database functionality

## 📸 Image Upload Features

✅ **JPEG & PNG Support** - Only JPEG and PNG images allowed  
✅ **File Size Validation** - 5MB maximum file size  
✅ **Automatic Format Detection** - Proper file extension handling  
✅ **Railway Compatible** - Optimized for Railway file system  
✅ **Error Handling** - Detailed validation messages  
✅ **Preview Support** - Image preview before upload  

## 📊 Database Schema

The `schools` table includes:
- `id` - Auto-increment primary key
- `name` - School name (VARCHAR 255)
- `address` - School address (TEXT)
- `city` - City (VARCHAR 100)
- `state` - State (VARCHAR 100)
- `contact` - Contact number (VARCHAR 20)
- `email` - Email address (VARCHAR 255)
- `image_path` - Image file path (VARCHAR 500)
- `created_at` - Timestamp

## 🔧 Local Development

For local development, you can switch back to SQLite by changing the import in `app/api/schools/route.js`:

```javascript
// For local development (SQLite)
import db from '@/lib/database';

// For production (MySQL)
import db from '@/lib/database-mysql';
```

## 🎉 Ready to Deploy!

Your School Management System is now ready for Railway deployment with MySQL database integration!
