import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'schools.db');
const db = new Database(dbPath);

// Initialize the database with schools table
const initDb = () => {
  const createTable = `
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      contact TEXT NOT NULL,
      email TEXT NOT NULL,
      image_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.exec(createTable);
};

// Initialize database on import
initDb();

export default db;