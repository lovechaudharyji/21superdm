import { Page, expect } from '@playwright/test';

/**
 * Test helper utilities for Supr DM E2E tests
 */

// Viewport sizes for responsive testing
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  largeDesktop: { width: 1920, height: 1080 },
};

// Common test data
export const testData = {
  validEmail: 'test@example.com',
  validPassword: 'TestPassword123!',
  invalidEmail: 'invalid-email',
  shortPassword: '123',
  testUser: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@suprdm.com',
    company: 'Test Company',
  },
};

// Wait for page to be fully loaded
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

// Check if element is visible and has correct text
export async function checkElementText(
  page: Page,
  selector: string,
  expectedText: string
) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toContainText(expectedText);
}

// Check if element exists and is clickable
export async function checkClickable(page: Page, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toBeEnabled();
}

// Fill form field and verify
export async function fillAndVerify(
  page: Page,
  selector: string,
  value: string
) {
  const input = page.locator(selector);
  await input.fill(value);
  await expect(input).toHaveValue(value);
}

// Check page title
export async function checkPageTitle(page: Page, expectedTitle: string) {
  await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
}

// Check URL contains path
export async function checkURL(page: Page, expectedPath: string) {
  await expect(page).toHaveURL(new RegExp(expectedPath));
}

// Verify navigation links
export async function verifyNavLinks(page: Page, links: { text: string; href: string }[]) {
  for (const link of links) {
    const element = page.locator(`a:has-text("${link.text}")`).first();
    await expect(element).toBeVisible();
    await expect(element).toHaveAttribute('href', link.href);
  }
}

// Check card component structure
export async function checkCardStructure(
  page: Page,
  cardSelector: string,
  expectedTitle?: string,
  expectedDescription?: string
) {
  const card = page.locator(cardSelector);
  await expect(card).toBeVisible();

  if (expectedTitle) {
    const title = card.locator('[class*="CardTitle"], h3, h4');
    await expect(title.first()).toContainText(expectedTitle);
  }

  if (expectedDescription) {
    const description = card.locator('[class*="CardDescription"], p');
    await expect(description.first()).toContainText(expectedDescription);
  }
}

// Check button states
export async function checkButtonState(
  page: Page,
  selector: string,
  options: {
    isVisible?: boolean;
    isEnabled?: boolean;
    hasText?: string;
  }
) {
  const button = page.locator(selector);

  if (options.isVisible !== undefined) {
    if (options.isVisible) {
      await expect(button).toBeVisible();
    } else {
      await expect(button).not.toBeVisible();
    }
  }

  if (options.isEnabled !== undefined) {
    if (options.isEnabled) {
      await expect(button).toBeEnabled();
    } else {
      await expect(button).toBeDisabled();
    }
  }

  if (options.hasText) {
    await expect(button).toContainText(options.hasText);
  }
}

// Check form validation
export async function checkFormValidation(
  page: Page,
  formSelector: string,
  submitButtonSelector: string,
  requiredFields: string[]
) {
  // Try to submit empty form
  await page.locator(submitButtonSelector).click();

  // Check required fields show validation
  for (const field of requiredFields) {
    const input = page.locator(field);
    const isInvalid = await input.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  }
}

// Check responsive layout
export async function checkResponsiveVisibility(
  page: Page,
  selector: string,
  viewport: { width: number; height: number },
  shouldBeVisible: boolean
) {
  await page.setViewportSize(viewport);
  const element = page.locator(selector);

  if (shouldBeVisible) {
    await expect(element).toBeVisible();
  } else {
    await expect(element).not.toBeVisible();
  }
}

// Check CSS property
export async function checkCSSProperty(
  page: Page,
  selector: string,
  property: string,
  expectedValue: string | RegExp
) {
  const element = page.locator(selector);
  const value = await element.evaluate(
    (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
    property
  );

  if (expectedValue instanceof RegExp) {
    expect(value).toMatch(expectedValue);
  } else {
    expect(value).toBe(expectedValue);
  }
}

// Check accessibility attributes
export async function checkA11y(
  page: Page,
  selector: string,
  attributes: Record<string, string>
) {
  const element = page.locator(selector);

  for (const [attr, value] of Object.entries(attributes)) {
    await expect(element).toHaveAttribute(attr, value);
  }
}

// Screenshot comparison helper
export async function takeScreenshot(
  page: Page,
  name: string,
  options?: { fullPage?: boolean }
) {
  await page.screenshot({
    path: `screenshots/${name}.png`,
    fullPage: options?.fullPage ?? false,
  });
}

// Wait for animation to complete
export async function waitForAnimation(page: Page, timeout = 500) {
  await page.waitForTimeout(timeout);
}

// Check badge/tag component
export async function checkBadge(
  page: Page,
  selector: string,
  expectedText: string,
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
) {
  const badge = page.locator(selector);
  await expect(badge).toBeVisible();
  await expect(badge).toContainText(expectedText);

  if (variant) {
    await expect(badge).toHaveAttribute('data-variant', variant);
  }
}

// Check table structure
export async function checkTableStructure(
  page: Page,
  tableSelector: string,
  expectedHeaders: string[],
  expectedRowCount?: number
) {
  const table = page.locator(tableSelector);
  await expect(table).toBeVisible();

  // Check headers
  for (const header of expectedHeaders) {
    const th = table.locator(`th:has-text("${header}")`);
    await expect(th).toBeVisible();
  }

  // Check row count if specified
  if (expectedRowCount !== undefined) {
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(expectedRowCount);
  }
}

// Check dropdown menu
export async function checkDropdownMenu(
  page: Page,
  triggerSelector: string,
  menuItems: string[]
) {
  // Open dropdown
  await page.locator(triggerSelector).click();

  // Wait for menu to appear
  await page.waitForSelector('[role="menu"]');

  // Check menu items
  for (const item of menuItems) {
    const menuItem = page.locator(`[role="menuitem"]:has-text("${item}")`);
    await expect(menuItem).toBeVisible();
  }

  // Close dropdown by clicking outside
  await page.keyboard.press('Escape');
}

// Check tabs component
export async function checkTabs(
  page: Page,
  tabsSelector: string,
  tabs: { name: string; content: string }[]
) {
  for (const tab of tabs) {
    // Click tab
    await page.locator(`${tabsSelector} [role="tab"]:has-text("${tab.name}")`).click();

    // Wait for content
    await page.waitForTimeout(100);

    // Check content is visible
    const content = page.locator(`text=${tab.content}`);
    await expect(content.first()).toBeVisible();
  }
}

// Check loading state
export async function checkLoadingState(page: Page, loadingSelector: string) {
  const loading = page.locator(loadingSelector);
  await expect(loading).toBeVisible();
}

// Check empty state
export async function checkEmptyState(
  page: Page,
  containerSelector: string,
  expectedMessage: string
) {
  const container = page.locator(containerSelector);
  await expect(container).toContainText(expectedMessage);
}
