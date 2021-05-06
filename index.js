require('dotenv').config()
const axios = require("axios");
const inquirer = require("inquirer");

console.log(process.env)
const url = 'https://jsole.zendesk.com/api/v2/tickets.json';

// gets all tickets from API
function getTickets() {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            auth: {
                username: process.env.AUTH_USER,
                password: process.env.AUTH_PASS
            }
        })
        .then ( res => {
            resolve(res.data.tickets); 
        })
    });
}

// getTickets();

// gets a single specified ticket from the API
function getSingleTicket(id) {
    return new Promise((resolve, reject) => {
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

getSingleTicket(100);