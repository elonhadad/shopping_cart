const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the registration page
    await page.goto('http://localhost:4200/registration');
    await page.screenshot({ path: 'registration_page.png' });

    // Fill out the registration form
    const email = `test${Math.random()}@example.com`; // Unique email for every test run
    await page.fill('#email', email);
    await page.fill('#password', 'Password123');
    await page.fill('#confirmPassword', 'Password123');
    await page.click('button[type="submit"]');

    // Navigate to the login page and login
    await page.goto('http://localhost:4200/login');
    await page.fill('#email', email);
    await page.fill('#password', 'Password123');
    await page.click('button[type="submit"]');

    // Assert successful login
    await page.waitForSelector('app-application');

    // Navigate to products and add a product to cart
    await page.click('a[href="/application/cart"]');
    await page.waitForSelector('app-cart');
    if (await page.$$('table tbody tr') != 0) {
        await page.click('button.btn-warning');
    }
    const rowsBefore = await page.$$('table tbody tr');
    await page.click('a[href="/application/products"]');
    await page.waitForSelector('app-products');
    await page.click('button.btn');


    // Navigate to cart and check the product is there
    await page.click('a[href="/application/cart"]');
    await page.waitForSelector('app-cart');
    const rowsAfter = await page.$$('table tbody tr');
    if (rowsAfter.length !== rowsBefore.length + 1) {
        console.error('Expected one more item in the cart, but found ' + (rowsAfter.length - rowsBefore.length));
    }

    await browser.close();
})();
