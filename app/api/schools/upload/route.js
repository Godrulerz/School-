import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

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

// Get file extension from mime type
const getFileExtension = (mimeType) => {
  return SUPPORTED_FORMATS[mimeType] || '.jpg';
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

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: 'File too large',
          message: `File size must be less than 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        }, { status: 400 });
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      await mkdir(uploadDir, { recursive: true });

      // Generate unique filename with proper extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = getFileExtension(file.type);
      const filename = `school-${uniqueSuffix}${extension}`;
      const filepath = path.join(uploadDir, filename);

      // Write the file
      await writeFile(filepath, buffer);

      // Set the public URL path
      imagePath = `/schoolImages/${filename}`;
      
      console.log(`✅ Image uploaded successfully: ${filename} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)`);
    }

    // Create school in database
    const newSchool = await db.school.create({
      data: {
        name, 
        address, 
        city, 
        state, 
        contact, 
        email, 
        imagePath
      }
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


