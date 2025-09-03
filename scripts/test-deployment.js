import fetch from 'node-fetch';
import db from '../lib/database-mysql.js';

console.log('🧪 Testing Vercel + Railway MySQL Deployment Setup...\n');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function testDatabaseConnection() {
  console.log('1️⃣ Testing Database Connection...');
  try {
    const isConnected = await db.testConnection();
    if (isConnected) {
      console.log('✅ Database connection successful');
      
      // Test basic database operations
      const schools = await db.getAllSchools();
      console.log(`📊 Found ${schools.length} schools in database`);
      
      return true;
    } else {
      console.log('❌ Database connection failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Database connection error:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  console.log('\n2️⃣ Testing API Endpoints...');
  
  try {
    // Test GET /api/schools
    console.log('📋 Testing GET /api/schools...');
    const getResponse = await fetch(`${BASE_URL}/api/schools`);
    const getData = await getResponse.json();
    
    if (getResponse.ok) {
      console.log('✅ GET /api/schools successful');
      console.log(`📊 Response: ${getData.count || 0} schools found`);
    } else {
      console.log('❌ GET /api/schools failed:', getData.error);
      return false;
    }

    // Test POST /api/schools
    console.log('\n➕ Testing POST /api/schools...');
    const testSchool = {
      name: 'Test School - Deployment',
      address: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      contact: '1234567890',
      email: 'test@deployment.com',
      imagePath: null
    };

    const postResponse = await fetch(`${BASE_URL}/api/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testSchool)
    });

    const postData = await postResponse.json();
    
    if (postResponse.ok) {
      console.log('✅ POST /api/schools successful');
      console.log(`🆔 Created school with ID: ${postData.id}`);
    } else {
      console.log('❌ POST /api/schools failed:', postData.error);
      return false;
    }

    // Test error handling - invalid JSON
    console.log('\n❌ Testing error handling (invalid JSON)...');
    const invalidResponse = await fetch(`${BASE_URL}/api/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json'
    });

    const invalidData = await invalidResponse.json();
    
    if (invalidResponse.status === 400) {
      console.log('✅ Error handling working correctly');
    } else {
      console.log('⚠️  Error handling may need improvement');
    }

    return true;

  } catch (error) {
    console.log('❌ API testing failed:', error.message);
    return false;
  }
}

async function testEnvironmentVariables() {
  console.log('\n3️⃣ Testing Environment Variables...');
  
  const requiredVars = ['RAILWAY_MYSQL_URL'];
  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are set');
    console.log('🔗 Database URL configured');
    return true;
  } else {
    console.log('❌ Missing environment variables:', missingVars.join(', '));
    console.log('💡 Please set these variables in your .env.local file or Vercel dashboard');
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting deployment tests...\n');
  
  const results = {
    database: await testDatabaseConnection(),
    api: await testAPIEndpoints(),
    environment: await testEnvironmentVariables()
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`Database Connection: ${results.database ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API Endpoints: ${results.api ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Environment Variables: ${results.environment ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(result => result === true);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! Your deployment setup is ready.');
    console.log('🚀 You can now deploy to Vercel with confidence.');
  } else {
    console.log('\n⚠️  Some tests failed. Please fix the issues before deploying.');
    console.log('📖 Check the DEPLOYMENT_GUIDE.md for troubleshooting tips.');
  }
  
  return allPassed;
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export default runAllTests;
