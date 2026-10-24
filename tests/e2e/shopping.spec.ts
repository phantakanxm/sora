import { expect, test } from "@playwright/test";

test("browse, add to bag, adjust quantity and complete the demo checkout", async ({ page }) => {
  await page.goto("/collection");
  await page.getByRole("button", { name: /Quick add for DUSK 50 ml/ }).click();

  // Adding confirms quietly instead of opening the bag.
  await expect(page.getByText("Added to your bag")).toBeVisible();
  await expect(page.getByRole("dialog", { name: /Your bag/ })).toBeHidden();
  await expect(page.getByRole("button", { name: "Bag 1 item" })).toBeVisible();

  await page.getByRole("button", { name: /^Bag/ }).click();
  const bag = page.getByRole("dialog", { name: /Your bag/ });
  await expect(bag).toBeVisible();
  await bag.getByRole("button", { name: "Increase quantity" }).click();
  await expect(bag.getByText("$370")).toHaveCount(2); // line total and subtotal
  await bag.getByRole("link", { name: "Continue to checkout" }).click();

  await expect(page).toHaveURL(/\/checkout$/);
  await page.getByRole("button", { name: "Place demo order" }).click();
  await expect(page.getByText("Please review 7 fields below.")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeFocused();

  await page.getByLabel("Email").fill("ada.test@example.com");
  await page.getByLabel("First name").fill("Ada");
  await page.getByLabel("Last name").fill("Tester");
  await page.getByLabel("Street address").fill("12 Linen Lane");
  await page.getByLabel("City").fill("Kyoto");
  await page.getByLabel("Postal code").fill("600-8001");
  await page.getByLabel("Country").selectOption("Japan");
  await page.getByLabel(/Express/).check();
  await page.getByLabel(/I understand SORA is fictional/).check();

  const summary = page.getByRole("complementary", { name: "Order summary" });
  await expect(summary.getByText("$388")).toBeVisible(); // 2 × $185 + $18 express

  await page.getByRole("button", { name: "Place demo order" }).click();
  await expect(page.getByRole("heading", { name: "Thank you, Ada." })).toBeFocused();
  await expect(page.getByText(/no order has been placed/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Bag 0 items" })).toBeVisible();
});

test("product page: sizes change the price and the bag line", async ({ page }) => {
  await page.goto("/fragrance/ember");
  await page.getByText("100 ml", { exact: true }).click();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await page.getByRole("button", { name: "Add to bag · $560" }).click();
  await expect(page.getByRole("button", { name: /Added to bag/ })).toBeVisible();

  await page.getByRole("button", { name: /^Bag/ }).click();
  const bag = page.getByRole("dialog", { name: /Your bag/ });
  await expect(bag.getByText("03 · 100 ml · Eau de parfum")).toBeVisible();
  await expect(bag.getByRole("group", { name: "Quantity of EMBER 100 ml" })).toContainText("2");
});

test("the bag persists across reloads", async ({ page }) => {
  await page.goto("/fragrance/dawn");
  await page.getByRole("button", { name: "Add to bag · $175" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Bag 1 item" })).toBeVisible();
});
