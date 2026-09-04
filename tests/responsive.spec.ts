import { expect, test } from "@playwright/test";

test("primary shopping controls stay inside the viewport", async ({ page }) => {
  await page.goto("/");
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByLabel("Search the catalogue")).toBeVisible();
  await expect(page.getByRole("button", { name: /shopping bag/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ask Loopi about inventory" })).toBeVisible();
});
