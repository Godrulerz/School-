import { NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Supported image formats for Railway deployment
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
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ 
        error: 'No file uploaded',
        message: 'Please select an image file to upload'
      }, { status: 400 });
    }

    // Validate file type - only JPEG and PNG for Railway
    if (!isValidImageFormat(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file format',
        message: 'Only JPEG (.jpg) and PNG (.png) images are allowed',
        supportedFormats: ['image/jpeg', 'image/png']
      }, { status: 400 });
    }

    // Validate file size (5MB limit for Railway)
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

    // Create upload directory if it doesn't exist (Railway compatible)
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename with proper extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = getFileExtension(file.type);
    const filename = `school-${uniqueSuffix}${extension}`;
    const filepath = path.join(uploadDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    // Return the public URL path
    const publicPath = `/schoolImages/${filename}`;
    
    console.log(`✅ Image uploaded successfully: ${filename} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)`);
    
    return NextResponse.json({ 
      success: true,
      imagePath: publicPath,
      filename: filename,
      size: file.size,
      type: file.type,
      format: file.type.split('/')[1].toUpperCase(),
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload image', 
        message: 'An error occurred while uploading the image',
        details: error.message 
      },
      { status: 500 }
    );
  }
}