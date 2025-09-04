import { NextResponse } from 'next/server';
import db from '@/lib/database-mysql';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Supported image formats
const SUPPORTED_FORMATS = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg', 
  'image/png': '.png',
  'image/webp': '.webp'
};

// Validate image format
const isValidImageFormat = (mimeType) => {
  return Object.keys(SUPPORTED_FORMATS).includes(mimeType);
};

export async function POST(request) {
  try {
    // Parse the form data
    const formData = await request.formData();
    
    // Extract school data
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email = formData.get('email');
    const file = formData.get('image');

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

    let imagePath = null;

    // Handle image upload if provided
    if (file && file.size > 0) {
      // Validate file type
      if (!isValidImageFormat(file.type)) {
        return NextResponse.json({ 
          error: 'Invalid file format',
          message: 'Only JPEG (.jpg) and PNG (.png) images are allowed',
          supportedFormats: ['image/jpeg', 'image/png']
        }, { status: 400 });
      }

      // Validate file size (2MB limit for base64 storage)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: 'File too large',
          message: `File size must be less than 2MB for base64 storage. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        }, { status: 400 });
      }

      // Convert file to base64 for storage in database
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = buffer.toString('base64');
      
      // Generate data URL for storage
      imagePath = `data:${file.type};base64,${base64String}`;
      
      console.log(`✅ Image converted to base64: ${file.type}, ${(file.size / 1024).toFixed(2)}KB`);
    }

    // Create school in database
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
        success: true,
        id: newSchool.id, 
        message: 'School added successfully',
        school: newSchool,
        imageUploaded: !!imagePath
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to add school', 
        message: 'An error occurred while adding the school',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


