import { test, expect, request } from '@playwright/test';

test('GET user from JSONPlaceholder', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const user = await response.json();
 expect(Array.isArray(user)) .toBeTruthy();
 expect(user.length).toBeGreaterThan(0);
 
});


test('validate a single user response', async({ request }) => {
 const response= await request.get('https://jsonplaceholder.typicode.com/users/1');
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
 expect(response.headers()['content-type']).toContain('application/json');
 const user=await response.json();
 expect(user.id).toBe(1);
 expect(user.name).toBe('Leanne Graham');
 expect(user.email).toBe('Sincere@april.biz');


});

test('POST new user to JSONPlaceholder', async ({ request }) => {
  const newUser = { name: 'shobha', email: 'shobha@example.com' };
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: newUser
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user.name).toBe('shobha');
  expect(user.email).toBe('shobha@example.com');
});
test('PUT update user to JSONPlaceholder', async ({ request }) => {
  const newUser = { name: 'LeanneGraham123'};
  const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
    data: newUser
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const user = await response.json();
  console.log(user)
  expect(user.name).toBe('LeanneGraham123');
  
});