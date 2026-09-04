import { expect, test } from "@playwright/test";

test("theme can be switched and survives a reload", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to (dark|light) mode/i });
  await toggle.click();
  const selected = await page.locator("html").getAttribute("data-theme");
  expect(["dark", "light"]).toContain(selected);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected!);
});

test("Loopi answers from current inventory", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ask Loopi about inventory" }).click();
  await expect(page.getByText("inventory nose: online")).toBeVisible();
  await page.getByLabel("Message Loopi").fill("show me silver items");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/Orbit Cargo|Chrome Mood Mini/).last()).toBeVisible();
});

test("inventory chat API refuses an empty prompt", async ({ request }) => {
  const response = await request.post("/api/chat", { data: { message: "" } });
  expect(response.status()).toBe(400);
});

test("inventory chat API grounds a budget answer", async ({ request }) => {
  const response = await request.post("/api/chat", { data: { message: "what is under R1 000?" } });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.reply).toContain("R");
  expect(body.reply).toMatch(/Lime Light Pleats|Tiny Plot Twist Tote/);
});
