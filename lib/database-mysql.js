import mysql from 'mysql2/promise';

// Railway MySQL connection configuration
const dbConfig = {
  host: process.env.RAILWAY_MYSQL_HOST || 'mysql.railway.internal',
  user: process.env.RAILWAY_MYSQL_USER || 'root',
  password: process.env.RAILWAY_MYSQL_PASSWORD || 'EflojxKqSWNDCULGMJZuezzHSqkaBIQr',
  database: process.env.RAILWAY_MYSQL_DATABASE || 'railway',
  port: process.env.RAILWAY_MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database with schools table
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create schools table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    connection.release();
    
    console.log('✅ MySQL database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

// Database operations
const db = {
  // Initialize database
  init: initDatabase,
  
  // Get all schools
  getAllSchools: async () => {
    try {
      const [rows] = await pool.execute('SELECT * FROM schools ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },
  
  // Add a new school
  addSchool: async (schoolData) => {
    try {
      const { name, address, city, state, contact, email, imagePath } = schoolData;
      
      const [result] = await pool.execute(
        'INSERT INTO schools (name, address, city, state, contact, email, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email, imagePath]
      );
      
      return {
        id: result.insertId,
        name,
        address,
        city,
        state,
        contact,
        email,
        imagePath,
        created_at: new Date()
      };
    } catch (error) {
      console.error('Error adding school:', error);
      throw error;
    }
  },
  
  // Get school by ID
  getSchoolById: async (id) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM schools WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error fetching school by ID:', error);
      throw error;
    }
  },
  
  // Update school
  updateSchool: async (id, schoolData) => {
    try {
      const { name, address, city, state, contact, email, imagePath } = schoolData;
      
      await pool.execute(
        'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, email = ?, image_path = ? WHERE id = ?',
        [name, address, city, state, contact, email, imagePath, id]
      );
      
      return await db.getSchoolById(id);
    } catch (error) {
      console.error('Error updating school:', error);
      throw error;
    }
  },
  
  // Delete school
  deleteSchool: async (id) => {
    try {
      const [result] = await pool.execute('DELETE FROM schools WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting school:', error);
      throw error;
    }
  },
  
  // Test connection
  testConnection: async () => {
    try {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
};

// Initialize database on import
initDatabase().catch(console.error);

export default db;
