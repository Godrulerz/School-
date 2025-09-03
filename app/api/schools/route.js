import { NextResponse } from 'next/server';
import db from '@/lib/database';

// GET - Fetch all schools
export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM schools ORDER BY created_at DESC');
    const schools = stmt.all();
    
    return NextResponse.json({ schools });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST - Add new school
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, city, state, contact, email, imagePath } = body;

    const stmt = db.prepare(`
      INSERT INTO schools (name, address, city, state, contact, email, image_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, address, city, state, contact, email, imagePath);
    
    return NextResponse.json(
      { id: result.lastInsertRowid, message: 'School added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    );
  }
}