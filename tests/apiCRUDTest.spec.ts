import { APIResponse } from '@playwright/test';
import { test, expect } from '../fixtures/pomFixtures.ts';
import createBooking from './testData/booking.json';
import updateBooking from './testData/updatebooking.json';
import fs from "fs/promises";

// Common function to validate response
const validateResponse = (response: APIResponse, expectedStatus: number) => {
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(expectedStatus);
};

// Common function to get the token
const getAuthToken = async () => {
  const tokenData = await fs.readFile("apitoken.json", "utf-8");
  return JSON.parse(tokenData).token;
};

let bookingID: number;
let token: string;

// Setup before each test
test.beforeEach(async ({ request }) => {
  const response = await request.post(`${process.env.apiurl}/booking`, {
    data: createBooking,
    headers: { 'Content-Type': 'application/json' },
  });
  validateResponse(response, 200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('bookingid');
  bookingID = responseBody.bookingid;
});

// Fetch token once before all tests
test.beforeAll(async () => {
  token = await getAuthToken();
});

test('GET all bookings', async ({ request }) => {
  const response = await request.get(`${process.env.apiurl}/booking`);
  validateResponse(response, 200);
});

test('GET booking by ID', async ({ request }) => {
  const response = await request.get(`${process.env.apiurl}/booking/${bookingID}`);
  validateResponse(response, 200);
});

test('Update booking using PUT', async ({ request }) => {
  const response = await request.put(`${process.env.apiurl}/booking/${bookingID}`, {
    data: updateBooking,
    headers: { Cookie: `token=${token}`, Accept: "*/*" },
  });
  validateResponse(response, 200);
});

test('Partial update using PATCH', async ({ request }) => {
  const response = await request.patch(`${process.env.apiurl}/booking/${bookingID}`, {
    data: { firstname: 'James', lastname: 'Brown' },
    headers: { Cookie: `token=${token}`, Accept: "*/*" },
  });
  validateResponse(response, 200);
});

test('Delete booking by ID', async ({ request }) => {
  const response = await request.delete(`${process.env.apiurl}/booking/${bookingID}`, {
    headers: { 'Content-Type': 'application/json', Cookie: `token=${token}` },
  });
  expect(response.status()).toBe(201);
  expect(response.statusText()).toBe("Created");
});
