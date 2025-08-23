const http = require('http');

// Test configuration
const config = {
  hostname: 'localhost',
  port: 3001,
  timeout: 5000
};

// Test cases
const tests = [
  {
    name: 'Homepage Test',
    path: '/',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'API Health Check',
    path: '/api/health',
    method: 'GET',
    expectedStatus: 404 // This endpoint doesn't exist yet
  },
  {
    name: 'Uploads Directory Test',
    path: '/uploads',
    method: 'GET',
    expectedStatus: 200
  }
];

// Run tests
async function runTests() {
  console.log('🧪 Starting API tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await runTest(test);
      if (result.passed) {
        passed++;
        console.log(`✅ ${test.name}: PASSED`);
      } else {
        failed++;
        console.log(`❌ ${test.name}: FAILED - Expected ${test.expectedStatus}, got ${result.status}`);
      }
    } catch (error) {
      failed++;
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
  }
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('💥 Some tests failed!');
    process.exit(1);
  }
}

// Run individual test
function runTest(test) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: config.hostname,
      port: config.port,
      path: test.path,
      method: test.method,
      timeout: config.timeout
    };
    
    const req = http.request(options, (res) => {
      const passed = res.statusCode === test.expectedStatus;
      resolve({
        passed,
        status: res.statusCode,
        headers: res.headers
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('💥 Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { runTests, runTest };