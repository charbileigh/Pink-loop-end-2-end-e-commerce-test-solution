import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /dress like the group chat/i })).toBeVisible();
});

test("catalogue loads products and stock labels", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Blue Screen Bomber" })).toBeVisible();
  await expect(page.getByText("in the loop").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Out of stock" })).toBeDisabled();
});

test("search and category filters narrow the catalogue", async ({ page }) => {
  await page.getByLabel("Search the catalogue").fill("silver");
  await expect(page.getByRole("heading", { name: "Orbit Cargo" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blue Screen Bomber" })).toBeHidden();
  await page.getByLabel("Search the catalogue").clear();
  await page.getByRole("button", { name: "Jackets" }).click();
  await expect(page.getByRole("heading", { name: "Berry Error Bomber" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lime Light Pleats" })).toBeHidden();
});

test("cart quantity and fictional checkout work", async ({ page }) => {
  await page.getByRole("article").filter({ hasText: "Blue Screen Bomber" }).getByRole("button", { name: "Add to the loop" }).click();
  await expect(page.getByRole("heading", { name: "Your loop" })).toBeVisible();
  await expect(page.getByText("R 1 499").last()).toBeVisible();
  await page.getByRole("button", { name: "Take me to checkout" }).click();
  await expect(page.getByRole("heading", { name: "Almost yours." })).toBeVisible();
  await expect(page.getByText("No money moves.")).toBeVisible();
  await expect(page.getByText("Sprinkle Pass")).toBeVisible();
  await expect(page.getByText("Moon Coin")).toBeVisible();
  await expect(page.getByText("Velvet Voucher")).toBeVisible();
});
