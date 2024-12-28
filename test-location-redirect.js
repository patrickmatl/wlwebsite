const fetch = require('node-fetch');

async function testLocationPages() {
  const baseUrl = 'http://localhost:3000';
  const testCases = [
    {
      url: '/pretoria/web-design',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    {
      url: '/pretoria/web-design',
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
  ];

  for (const test of testCases) {
    console.log(`Testing URL: ${test.url}`);
    console.log(`User Agent: ${test.userAgent}`);
    
    try {
      const response = await fetch(`${baseUrl}${test.url}`, {
        headers: {
          'User-Agent': test.userAgent
        },
        redirect: 'manual' // Don't automatically follow redirects
      });

      console.log('Status:', response.status);
      console.log('Location header:', response.headers.get('location'));
      if (response.status === 200) {
        const text = await response.text();
        console.log('Response length:', text.length);
      }
      console.log('-------------------');
    } catch (error) {
      console.error('Error:', error.message);
      console.log('-------------------');
    }
  }
}

testLocationPages();
