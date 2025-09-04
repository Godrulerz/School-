import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test basic API functionality
    const testData = {
      status: 'API Working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasRailwayUrl: !!process.env.RAILWAY_MYSQL_URL,
      message: 'API routes are functioning correctly'
    };

    return NextResponse.json(testData);
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'API Test Failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
