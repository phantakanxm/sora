import { expect, test } from "@playwright/test";

const opacityOf = (el: Element) => getComputedStyle(el).opacity;

test.describe("reduced motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("content is visible immediately and smooth scrolling stays off", async ({ page }) => {
    await page.goto("/");
    const headline = page.getByRole("heading", { level: 1, name: /What remains/ });
    expect(await headline.evaluate(opacityOf)).toBe("1");
    expect(await page.locator(".hero-media").evaluate(opacityOf)).toBe("1");

    // Below-the-fold reveal targets are already visible without scrolling.
    const intro = page.locator("#intro-title");
    expect(await intro.evaluate(opacityOf)).toBe("1");

    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    await expect(page.locator("[data-horizontal]")).toHaveCount(0);
  });
});

test("full motion on desktop pins the fragrance showcase", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Pinning is desktop only");
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await expect(page.locator("section[data-horizontal='true']")).toHaveCount(1);
});
