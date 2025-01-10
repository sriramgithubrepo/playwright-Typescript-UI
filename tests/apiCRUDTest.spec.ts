import { test, expect } from '../fixtures/pomFixtures.ts';
import createBooking from './testData/booking.json';
import updateBooking from './testData/update-booking.json';

//Common code to validate response generation and statuscode
const validateResponse = (response, expectedStatus: number) => {
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(expectedStatus);
};

  test.beforeEach('CRUD operation of an API',async ({request})=>{
        const response = await request.post(`${process.env.apiurl}/booking`, {
            data: createBooking, 
            headers: {
              'Content-Type': 'application/json', 
            },
          });
        const responseBody=await response.json();
        validateResponse(response,200);
        expect(responseBody).toHaveProperty('bookingid');
        expect(typeof responseBody.bookingid).toBe('number');
        const bookingId = responseBody.bookingid;

        // Save the bookingId to a file
        process.env.NEWBOOKING_ID =bookingId
    })
  
test('GET all booking', async ({ request }) => {
    const response = await request.get(`${process.env.apiurl}/booking`);
    validateResponse(response,200);
})

test('GET booking by id', async ({ request }) => {
  const bookingID=process.env.NEWBOOKING_ID;
  expect(bookingID).toBeDefined();
    const response = await request.get(`${process.env.apiurl}/booking/`+bookingID);
    validateResponse(response,200);
})

test('Update booking using PUT', async ({ request }) => {
  const bookingID=process.env.NEWBOOKING_ID;
  expect(bookingID).toBeDefined();
    const response = await request.put(`${process.env.apiurl}/booking/`+bookingID,{
      data: updateBooking, 
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
        Accept: "*/*",
      },
    });
    validateResponse(response,200);
})

test('Partial Update booking using PATCH', async ({ request }) => {
  const bookingID=process.env.NEWBOOKING_ID;
  expect(bookingID).toBeDefined();
  const payload = {
    firstname:'James',
    lastname:'Brown'
  }
    const response = await request.patch(`${process.env.apiurl}/booking/`+bookingID,{
      data: payload, 
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
        Accept: "*/*",
      },
    });
    validateResponse(response,200);
})

test('Delete booking by id', async ({ request }) => {
  const bookingID=process.env.NEWBOOKING_ID;
  expect(bookingID).toBeDefined();
    const response = await request.delete(`${process.env.apiurl}/booking/`+bookingID,{
      headers: {
       'Content-Type': 'application/json',
        Cookie: `token=${process.env.TOKEN}`,      
      },
    });
  expect(response.status()).toBe(201);
  expect(response.statusText()).toBe("Created");
});