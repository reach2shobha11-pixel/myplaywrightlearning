import { test, expect } from '@playwright/test';

test('Simple test to verify scripts are working', async ({ page }) => {
    // Use a data URL to avoid network issues
    await page.goto('data:text/html,<html><body><h1>Test Page</h1><button id="testButton">Click me</button><input type="checkbox" id="testCheckbox"></body></html>');
    
    // Verify the page loaded
    await expect(page.locator('h1')).toHaveText('Test Page');
    
    // Test button click
    await page.click('#testButton');
    
    // Test checkbox interaction
    await expect(page.locator('#testCheckbox')).not.toBeChecked();
    await page.click('#testCheckbox');
    await expect(page.locator('#testCheckbox')).toBeChecked();
    
    console.log('Simple test passed - scripts are working correctly!');
});