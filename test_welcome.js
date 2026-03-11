const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Go to main page
    await page.goto('https://sdspieg.github.io/rubase-workshop-fletcher-2603/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'screenshots/01_main_hub.png' });
    console.log('Screenshot 1: Main hub page');

    // Click on Welcome & Setup in sidebar
    await page.click('text="Welcome & Setup"');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/02_after_welcome_click.png' });
    console.log('Screenshot 2: After clicking Welcome & Setup');

    // Check if we're on the welcome slides page
    const url = page.url();
    console.log('Current URL:', url);

    if (url.includes('welcome/index.html')) {
        console.log('✅ Successfully navigated to welcome slides!');

        // Test navigation through slides
        await page.click('#nextBtn');
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'screenshots/03_slide_2.png' });
        console.log('Screenshot 3: Slide 2 of welcome presentation');

        // Go to Dropbox slide
        await page.click('#nextBtn');
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'screenshots/04_dropbox_slide.png' });
        console.log('Screenshot 4: Critical Dropbox setup slide');
    } else {
        console.log('❌ Did not navigate to welcome slides');
        console.log('Still on:', url);
    }

    await browser.close();
})();