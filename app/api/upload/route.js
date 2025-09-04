import { NextResponse } from 'next/server';

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
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ 
        error: 'No file uploaded',
        message: 'Please select an image file to upload'
      }, { status: 400 });
    }

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
    
    // Generate data URL for immediate use
    const dataUrl = `data:${file.type};base64,${base64String}`;
    
    console.log(`✅ Image converted to base64: ${file.type}, ${(file.size / 1024).toFixed(2)}KB`);
    
    return NextResponse.json({ 
      success: true,
      imagePath: dataUrl,
      base64Data: base64String,
      mimeType: file.type,
      size: file.size,
      format: file.type.split('/')[1].toUpperCase(),
      message: 'Image processed successfully'
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process image', 
        message: 'An error occurred while processing the image',
        details: error.message 
      },
      { status: 500 }
    );
  }
}