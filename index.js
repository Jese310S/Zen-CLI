require('dotenv').config()
const axios = require("axios");
const inquirer = require("inquirer");


const url = 'https://jsole.zendesk.com/api/v2/tickets.json';

function getTickets() {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            auth: {
                username: process.env.AUTH_USER,
                password: process.env.AUTH_PASS
            }
        })
        .then ( res => {
            console.log(res.data.tickets) 
        })
    });
}

getTickets();