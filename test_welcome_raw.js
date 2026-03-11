const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Test using the raw GitHub content to simulate what it will be like when cache clears
    console.log('Testing with raw GitHub content (simulating cache clear)...');

    // Go to main page - using local file but with corrected HTML
    await page.goto('file:///home/stephan/rubase-workshop-fletcher-2603/index.html');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'screenshots/local_01_main.png' });
    console.log('Screenshot 1: Local main hub page');

    // Click on Welcome & Setup - this should navigate directly now
    await page.click('text="Welcome & Setup"');
    await page.waitForTimeout(1000);

    const url = page.url();
    console.log('Current URL after click:', url);
    await page.screenshot({ path: 'screenshots/local_02_after_click.png' });

    if (url.includes('welcome/index.html')) {
        console.log('✅ Successfully navigated to welcome slides!');
    } else {
        console.log('❌ Did not navigate - still on:', url);
    }

    await browser.close();
})();