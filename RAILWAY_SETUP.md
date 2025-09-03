# Railway Deployment Setup Guide

## 🚀 Deploy to Railway with MySQL Database

### Prerequisites
- Railway account
- GitHub repository connected to Railway
- MySQL database provisioned on Railway

### Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your School Management repository

### Step 2: Add MySQL Database

1. In your Railway project, click "New"
2. Select "Database" → "MySQL"
3. Wait for the database to be provisioned

### Step 3: Configure Environment Variables

Add these environment variables in your Railway project:

```bash
RAILWAY_MYSQL_HOST=your-mysql-host.railway.app
RAILWAY_MYSQL_USER=root
RAILWAY_MYSQL_PASSWORD=EflojxKqSWNDCULGMJZuezzHSqkaBIQr
RAILWAY_MYSQL_DATABASE=railway
RAILWAY_MYSQL_PORT=3306
NODE_ENV=production
```

### Step 4: Get MySQL Connection Details

1. Click on your MySQL database in Railway
2. Go to "Connect" tab
3. Copy the connection details:
   - **Host**: `your-mysql-host.railway.app`
   - **Port**: `3306`
   - **Database**: `railway`
   - **Username**: `root`
   - **Password**: `EflojxKqSWNDCULGMJZuezzHSqkaBIQr`

### Step 5: Update Environment Variables

Replace `your-mysql-host.railway.app` with your actual MySQL host from Railway.

### Step 6: Deploy

1. Railway will automatically deploy your app
2. The database will be initialized automatically
3. Your app will be available at the provided URL

### Step 7: Verify Deployment

1. Visit your Railway app URL
2. Test adding a school
3. Check if data is stored in MySQL database

## 🔧 Local Development

For local development, you can use the SQLite database by changing the import in `app/api/schools/route.js`:

```javascript
// For local development (SQLite)
import db from '@/lib/database';

// For production (MySQL)
import db from '@/lib/database-mysql';
```

## 📊 Database Schema

The MySQL database will automatically create the `schools` table with:

- `id` - Auto-increment primary key
- `name` - School name (VARCHAR 255)
- `address` - School address (TEXT)
- `city` - City (VARCHAR 100)
- `state` - State (VARCHAR 100)
- `contact` - Contact number (VARCHAR 20)
- `email` - Email address (VARCHAR 255)
- `image_path` - Image file path (VARCHAR 500)
- `created_at` - Timestamp

## 🚨 Troubleshooting

### Connection Issues
- Verify environment variables are set correctly
- Check if MySQL database is running
- Ensure host and port are correct

### Deployment Issues
- Check Railway logs for errors
- Verify build process completes successfully
- Ensure all dependencies are installed

### Database Issues
- Check if database is initialized
- Verify table creation
- Test connection manually

## 📞 Support

If you encounter issues:
1. Check Railway logs
2. Verify environment variables
3. Test database connection
4. Contact Railway support if needed
