import { expect, test } from "@playwright/test";

test("bag drawer: Escape closes it and focus returns to the trigger", async ({ page }) => {
  await page.goto("/fragrance/dusk");
  await page.getByRole("button", { name: "Add to bag · $185" }).click();
  const trigger = page.getByRole("button", { name: /^Bag/ });
  await trigger.click();

  const bag = page.getByRole("dialog", { name: /Your bag/ });
  await expect(bag).toBeVisible();
  await expect(bag.getByRole("button", { name: "Close bag" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(bag).toBeHidden();
  await expect(trigger).toBeFocused();

  // Removing the last item keeps focus inside the drawer.
  await trigger.click();
  await bag.getByRole("button", { name: /Remove DUSK 50 ml/ }).click();
  await expect(bag.getByRole("link", { name: "Explore the collection" })).toBeFocused();
});

test("gallery responds to arrow keys", async ({ page }) => {
  await page.goto("/fragrance/dawn");
  const track = page.getByLabel("Use the left and right arrow keys to browse images");
  await track.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText(/^02 \/ 04/)).toBeVisible();
  await page.keyboard.press("End");
  await expect(page.getByText(/^04 \/ 04/)).toBeVisible();
});

test("scent consultation works by keyboard alone", async ({ page }) => {
  await page.goto("/discover");
  await page.getByRole("button", { name: "Begin" }).click();
  for (let i = 0; i < 5; i += 1) {
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", String(i + 1));
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await page.keyboard.press("Enter");
  }
  const result = page.getByRole("heading", { name: /Your scent is (DUSK|DAWN|EMBER)/ });
  await expect(result).toBeFocused();
  await expect(page.getByText("How we got here")).toBeVisible();

  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.getByRole("heading", { name: "Find the scent that feels like you." })).toBeVisible();
});

test("unknown fragrance shows the 404 page", async ({ page }) => {
  const response = await page.goto("/fragrance/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Some things remain unseen." })).toBeVisible();
});

test("mobile menu navigates and releases the scroll lock", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Menu button is mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused();
  await menu.getByRole("link", { name: /Collection/ }).click();
  await expect(page).toHaveURL(/\/collection$/);
  await expect(menu).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
});
