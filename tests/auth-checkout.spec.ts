import { expect, test } from "@playwright/test";

test.describe("PostgreSQL authentication and checkout", () => {
  test.skip(process.env.EXTERNAL_AUTH !== "1", "Set EXTERNAL_AUTH=1 when the frontend points to the PostgreSQL API.");

  test("shopper can register, place a demo order and log out", async ({ page }) => {
    const email = `loop-${Date.now()}@example.test`;
    await page.goto("/login");
    await page.getByRole("button", { name: "New here? Create an account" }).click();
    await page.getByLabel("Name").fill("Playwright Shopper");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill("bright-pink-123");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: /log out/i })).toBeVisible();

    await page.getByRole("article").filter({ hasText: "Lime Light Pleats" }).getByRole("button", { name: "Add to the loop" }).click();
    await page.getByRole("button", { name: "Take me to checkout" }).click();
    await page.getByText("Moon Coin").click();
    await page.getByRole("button", { name: "Pay with Moon Coin" }).click();
    await expect(page.getByText(/Order PL-.*No real payment was taken/)).toBeVisible();
    await page.getByRole("button", { name: /log out/i }).click();
    await expect(page.getByRole("link", { name: /log in/i })).toBeVisible();
  });
});
