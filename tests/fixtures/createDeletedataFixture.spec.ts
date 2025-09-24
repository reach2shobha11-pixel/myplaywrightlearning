import { test as base, expect } from '@playwright/test';

// Custom fixture for userId
const test = base.extend<{ userId: string }>({
  userId: async ({}, use) => {
    // Setup: Create test data via API
    const createResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'shobha', email: 'shobha@example.com' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const user = await createResponse.json();
    const userId = user.id;

    await use(userId); // Pass userId to the test

    // Teardown: Delete test data via API
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    });
     console.log('Test user deleted:', userId);
  }
});

test('use userId fixture', async ({ userId }) => {
  // Use the created userId in your test
  expect(userId).toBeDefined();
  // ...your test logic...
});