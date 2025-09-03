import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const connectionUrl = process.env.RAILWAY_MYSQL_URL || 'mysql://root:EflojxKqSWNDCULGMJZuezzHSqkaBIQr@yamanote.proxy.rlwy.net:10297/railway';

async function migrate() {
  let connection;
  
  try {
    console.log('🚀 Starting database migration...');
    
    // Parse connection URL
    const url = new URL(connectionUrl);
    
    // Create connection
    connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      port: parseInt(url.port),
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('✅ Connected to Railway MySQL database');

    // Create schools table
    const createSchoolsTable = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;

    await connection.execute(createSchoolsTable);
    console.log('✅ Created schools table');

    // Create indexes for better performance
    const createIndexes = [
      'CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name)',
      'CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city)',
      'CREATE INDEX IF NOT EXISTS idx_schools_state ON schools(state)',
      'CREATE INDEX IF NOT EXISTS idx_schools_created_at ON schools(created_at)'
    ];

    for (const indexQuery of createIndexes) {
      try {
        await connection.execute(indexQuery);
        console.log(`✅ Created index: ${indexQuery.split(' ')[5]}`);
      } catch (error) {
        if (error.code !== 'ER_DUP_KEYNAME') {
          console.warn(`⚠️  Index creation warning: ${error.message}`);
        }
      }
    }

    // Check if table has data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM schools');
    const schoolCount = rows[0].count;
    
    console.log(`📊 Schools table contains ${schoolCount} records`);

    if (schoolCount === 0) {
      console.log('💡 Table is empty. You can add schools through the application.');
    }

    console.log('🎉 Database migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}

export default migrate;
