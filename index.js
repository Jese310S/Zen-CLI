require('dotenv').config()
const axios = require("axios");
const inquirer = require("inquirer");


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





const inquire = () => {
    inquirer
      .prompt([
        { type: 'list', message: "'What would you like to do'", name: "options", choices: [
            "Display all tickets",
            "Display a ticket",
            "quit"
        ] }
    ]).then(answers => {
        if (answers.options === "Display all tickets"){
             console.log('all tickets'); 
             inquire();
        } else if (answers.options === "Display a ticket"){
            
            // TODO: Prompt user to enter ticketID
            console.log('single ticket')
            inquire();
        } else {
            console.log("Have a Zen day!")
        }
    }
    )
  };


   inquire();
  