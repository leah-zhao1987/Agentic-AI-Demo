const { pathToRegexp } = require('path-to-regexp');

try {
  console.log('Testing valid path:');
  const testRegexp = pathToRegexp('/home');
  console.log('Success!');
  
  console.log('\nTesting parameter path:');
  const paramRegexp = pathToRegexp('/detail/:id');
  console.log('Success!');
  
  // 测试可能导致错误的URL
  console.log('\nTesting problematic URL:');
  const problematicRegexp = pathToRegexp('https://git.new/pathToRegexpError');
  console.log('No error with direct URL!');
} catch (error) {
  console.error('Error occurred:', error.message);
}