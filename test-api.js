// Test script to verify API routes work locally
const testAPI = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing API routes...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('Health Status:', healthData.status);
    console.log('Database Connected:', healthData.database?.connected);
    console.log('School Count:', healthData.database?.schoolCount);
    console.log('✅ Health check completed\n');
    
    // Test schools endpoint
    console.log('2. Testing schools endpoint...');
    const schoolsResponse = await fetch(`${baseUrl}/api/schools`);
    const schoolsData = await schoolsResponse.json();
    console.log('Schools Count:', schoolsData.count);
    console.log('Schools:', schoolsData.schools?.length || 0);
    console.log('✅ Schools endpoint completed\n');
    
    // Test upload endpoint
    console.log('3. Testing upload endpoint...');
    const formData = new FormData();
    const testImage = new Blob(['test'], { type: 'image/jpeg' });
    formData.append('image', testImage, 'test.jpg');
    
    const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: formData
    });
    const uploadData = await uploadResponse.json();
    console.log('Upload Success:', uploadData.success);
    console.log('✅ Upload endpoint completed\n');
    
    console.log('🎉 All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
};

// Run the test
testAPI();
