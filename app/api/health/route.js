import { NextResponse } from 'next/server';
import db from '@/lib/database-mysql';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection
    const dbConnected = await db.testConnection();
    
    // Get basic stats
    let schoolCount = 0;
    if (dbConnected) {
      const schools = await db.getAllSchools();
      schoolCount = schools.length;
    }

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        schoolCount: schoolCount
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasRailwayUrl: !!process.env.RAILWAY_MYSQL_URL
      }
    };

    return NextResponse.json(health, { 
      status: dbConnected ? 200 : 503 
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      database: {
        connected: false,
        schoolCount: 0
      }
    }, { status: 503 });
  }
}
