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
