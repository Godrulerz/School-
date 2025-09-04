import { NextResponse } from 'next/server';
import db from '@/lib/database-mysql';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET - Fetch all schools
export async function GET() {
  try {
    const schools = await db.getAllSchools();
    
    return NextResponse.json({ 
      schools,
      count: schools.length,
      message: 'Schools fetched successfully'
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch schools',
        message: 'An error occurred while fetching schools from the database',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Add new school
export async function POST(request) {
  try {
    // Parse JSON with error handling
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          message: 'Please ensure your request contains valid JSON data'
        },
        { status: 400 }
      );
    }

    const { name, address, city, state, contact, email, imagePath } = body;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'All fields are required: name, address, city, state, contact, email',
          required: ['name', 'address', 'city', 'state', 'contact', 'email']
        },
        { status: 400 }
      );
    }

    const newSchool = await db.addSchool({
      name,
      address,
      city,
      state,
      contact,
      email,
      imagePath
    });
    
    return NextResponse.json(
      { 
        id: newSchool.id, 
        message: 'School added successfully',
        school: newSchool
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to add school',
        message: 'An error occurred while adding the school to the database',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}