import { test, expect } from "@playwright/test";

test("Login as existing user", async ({ page }) => {
  await page.goto("https://automaticityacademy.ngrok.app/login");

  page.on("console", (msg) => console.log(msg.text()));
  page.on("pageerror", (error) => console.log(`Page error: ${error}`));

  await page.getByPlaceholder("Email").fill("te222stuser123@example.com");
  await page.getByPlaceholder("Password").fill("St222rongPassword123");

  await page.getByRole("button", { name: /Sign in/i }).click();

  await expect(page).toHaveURL(
    "https://automaticityacademy.ngrok.app/dashboard"
  );
});

import { webkit } from "@playwright/test";

test("WebKit test", async () => {
  const browser = await webkit.launch(); // Pokreće WebKit
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" }); // Napravi screenshot
  await browser.close();
});
