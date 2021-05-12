const axios = require("axios");

// api url for 25 tickets a page
const url = 'https://jsole.zendesk.com/api/v2/tickets.json?page[size]=25';

// gets all tickets from API
function getTickets(page) {

    return new Promise((resolve, reject) => {
        axios.get((page) ? page : url, {
            auth: {
        //use dotenv to make environment variable, see .env_sample for examples
                username: process.env.AUTH_USER,
                password: process.env.AUTH_PASS
            }
        })
        .then ( res => {
            resolve(res.data); 
        })
    });
}

// gets a single specified ticket from the API
function getSingleTicket(id) {
    return new Promise((resolve, reject) => {
        //api request
        axios.get(`https://jsole.zendesk.com/api/v2/tickets/${id}.json`, {
            auth: {
                username: process.env.AUTH_USER,
                password: process.env.AUTH_PASS
            }
        })
        .then ( res => {
            resolve(res.data.ticket);  
        })
    });
}

module.exports.getTickets = getTickets;
module.exports.getSingleTicket = getSingleTicket;