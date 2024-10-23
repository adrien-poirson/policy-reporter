import { test, expect } from "@playwright/test";

test.describe("ModThreeCalculator", () => {
    test("should calculate correctly for valid binary input", async ({
        page,
    }) => {
        await page.goto("/");

        await page.fill('input[placeholder="Enter a binary number"]', "1010");
        await page.click("text=Calculate");

        await expect(page.locator("text=Decimal value: 10")).toBeVisible();
        await expect(page.locator("text=The remainder is 1")).toBeVisible();
    });

    test("should show error for invalid binary input", async ({ page }) => {
        await page.goto("/");

        await page.fill('input[placeholder="Enter a binary number"]', "1234");
        await page.click("text=Calculate");

        await expect(
            page.locator(
                "text=Please enter a valid binary number (only 0s and 1s)"
            )
        ).toBeVisible();
    });

    test("should reset the form when Reset button is clicked", async ({
        page,
    }) => {
        await page.goto("/");

        await page.fill('input[placeholder="Enter a binary number"]', "1010");
        await page.click("text=Calculate");
        await page.click("text=Reset");

        await expect(
            page.locator('input[placeholder="Enter a binary number"]')
        ).toHaveValue("");
        await expect(page.locator("text=Decimal value:")).not.toBeVisible();
        await expect(page.locator("text=The remainder is")).not.toBeVisible();
    });

    test("should toggle FSM visualization", async ({ page }) => {
        await page.goto("/");

        await page.click("text=Show FSM");
        await expect(page.locator("text=Hide FSM")).toBeVisible();

        await page.click("text=Hide FSM");
        await expect(page.locator("text=Show FSM")).toBeVisible();
    });
});
