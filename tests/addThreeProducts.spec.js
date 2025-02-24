import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Add multiple products from different pages to cart', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');

    page.on('console', msg => console.log(msg.text()));
    page.on('pageerror', error => console.log(`Page error: ${error}`));

    await page.getByPlaceholder('Email').fill('te2stuser123@example.com');
    await page.getByPlaceholder('Password').fill('St2rongPassword123');

    await page.getByRole('button', { name: /Sign in/i }).click(); 

    await page.waitForURL('https://automaticityacademy.ngrok.app/dashboard');
    await page.waitForLoadState('load'); 

    const response = await page.waitForResponse(response => 
    response.url().includes('api/v1/products/?search=') && response.status() === 200);

    const responseBody = await response.json();
    const products = responseBody.products;

    const productsToAdd = [
        { name: 'Logitech G Pro Wireless Gaming Mouse', quantity: 2, pageNumber: 1 },
        { name: 'ASUS TUF Gaming X570-Plus ATX Motherboard', quantity: 3, pageNumber: 4 },
        { name: 'Acer Nitro 5', quantity: 1, pageNumber: 2 }
    ];
    
    for (const product of products) {
        console.log('Check', product.name);
        for(const productToAdd of productsToAdd)
        {
            if (product.name === productToAdd.name) {
                console.log(`Adding product to cart: ${product.name}`);

                const productContainers = page.locator('div.flex.flex-row-reverse[test-data="product-container"]');

                const productContainerForSpeci = productContainers.filter({ hasText: `${product.name}` });
                await expect(productContainers).toBeVisible();

                const addToCartButton = productContainers.locator('button[data-pc-name="button"]:not([disabled])'); 
                await expect(addToCartButton).toBeVisible(); 
                await addToCartButton.click();
            }
        }
    }
   
});