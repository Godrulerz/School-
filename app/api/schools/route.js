import { NextResponse } from 'next/server';
import db from '@/lib/database-mysql';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET - Fetch all schools
export async function GET() {
  try {
    const schools = await db.getAllSchools();
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

    const newSchool = await db.addSchool({
      name, address, city, state, contact, email, imagePath
    });
    
    return NextResponse.json(
      { id: newSchool.id, message: 'School added successfully' },
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