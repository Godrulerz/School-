import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create schoolImages directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    // Return the public URL path
    const publicPath = `/schoolImages/${filename}`;
    
    return NextResponse.json({ imagePath: publicPath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}