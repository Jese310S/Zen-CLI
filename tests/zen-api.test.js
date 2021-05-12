require('dotenv').config({ path: `.env_test` });
const { getTickets, getSingleTicket } = require('../src/zen-api.js');
const axios = require('axios');

const ZenAPI_Data = require('./data/zen-api-data.json');

jest.mock('axios');

describe('Zendesk Tickets API Endpoint', () => {
  it('authentication and response', async () => {
      //create mock promise for test using ZenAPI_Data
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(ZenAPI_Data.get25tickets)
    );

    await expect(getTickets()).resolves.toEqual(ZenAPI_Data.get25tickets);
    expect(axios.get).toHaveBeenCalledWith(
      `https://jsole.zendesk.com/api/v2/tickets.json?page[size]=25`,
      {
        auth: {
          password: 'superSecret',
          username: 'someone@somewhere.com'
        }
      }
    );
  });

  it('hits a specific url', async () => {
    const url = 'https://j.zendesk.com/api/v2/tickets.json?page[size]=50';

    axios.get.mockImplementationOnce(() =>
      Promise.resolve(ZenAPI_Data.get25tickets)
    );

    await expect(getTickets(url)).resolves.toEqual(ZenAPI_Data.get25tickets);

    expect(axios.get).toHaveBeenCalledWith(url, {
      auth: {
        password: 'superSecret',
        username: 'someone@somewhere.com'
      }
    });
  });

  it('should show a failed request if the account was mistyped in the URL', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getTickets()).rejects.toThrow(errorMessage);
  });
});
