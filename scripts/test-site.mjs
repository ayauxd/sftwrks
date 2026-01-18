import puppeteer from 'puppeteer';

const URL = 'https://softworkstrading.com';

async function testSite() {
  console.log('=== PUPPETEER SITE TEST ===\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Collect console messages and errors
  const consoleLogs = [];
  const errors = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    errors.push(err.toString());
  });

  page.on('requestfailed', request => {
    errors.push(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    console.log(`1. Loading ${URL}...`);
    const response = await page.goto(URL, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    console.log(`   Status: ${response.status()}`);

    // Wait for React to render
    console.log('\n2. Waiting for React to render...');
    await page.waitForSelector('body', { timeout: 10000 });

    // Check if page has content
    const bodyContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        rootExists: !!root,
        rootHasChildren: root ? root.children.length : 0,
        rootInnerHTML: root ? root.innerHTML.substring(0, 500) : 'NO ROOT',
        bodyClasses: document.body.className,
        htmlClasses: document.documentElement.className
      };
    });

    console.log('\n3. Page Content Check:');
    console.log(`   Root exists: ${bodyContent.rootExists}`);
    console.log(`   Root children: ${bodyContent.rootHasChildren}`);
    console.log(`   HTML classes: ${bodyContent.htmlClasses}`);
    console.log(`   Body classes: ${bodyContent.bodyClasses}`);

    if (bodyContent.rootHasChildren === 0) {
      console.log('\n   ⚠️  ROOT IS EMPTY - React failed to render!');
      console.log(`   Root innerHTML: ${bodyContent.rootInnerHTML}`);
    } else {
      console.log('\n   ✓ React rendered successfully');
      console.log(`   Preview: ${bodyContent.rootInnerHTML.substring(0, 200)}...`);
    }

    // Check for specific elements
    console.log('\n4. Element Check:');
    const elements = await page.evaluate(() => {
      return {
        navbar: !!document.querySelector('nav'),
        hero: !!document.querySelector('section'),
        footer: !!document.querySelector('footer'),
        darkMode: document.documentElement.classList.contains('dark')
      };
    });
    console.log(`   Navbar: ${elements.navbar ? '✓' : '✗'}`);
    console.log(`   Hero section: ${elements.hero ? '✓' : '✗'}`);
    console.log(`   Footer: ${elements.footer ? '✓' : '✗'}`);
    console.log(`   Dark mode: ${elements.darkMode ? 'ON' : 'OFF'}`);

    // Take screenshot
    await page.screenshot({ path: '/tmp/site-test.png', fullPage: false });
    console.log('\n5. Screenshot saved to /tmp/site-test.png');

    // Report errors
    console.log('\n6. Console Errors:');
    const consoleErrors = consoleLogs.filter(l => l.type === 'error');
    if (consoleErrors.length === 0 && errors.length === 0) {
      console.log('   ✓ No errors');
    } else {
      consoleErrors.forEach(e => console.log(`   ✗ ${e.text}`));
      errors.forEach(e => console.log(`   ✗ ${e}`));
    }

    // Test /privacy route
    console.log('\n7. Testing /privacy route...');
    await page.goto(`${URL}/privacy`, { waitUntil: 'networkidle0' });
    const privacyContent = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent : 'NO H1 FOUND';
    });
    console.log(`   H1: ${privacyContent}`);

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
  }

  await browser.close();
  console.log('\n=== TEST COMPLETE ===');
}

testSite();
