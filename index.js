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
        { type: 'list', message: "'What would you like to do?'", name: "options", choices: [
            "Display all tickets",
            "Display a ticket",
            "quit"
        ] }
    ]).then(answers => {
        if (answers.options === "Display all tickets"){
         //get tickets from API
            getTickets().then((tickets, err)=>{
                if (err) console.log(err.code, "\nSomething went wrong, please check and try again")
                //TODO: Display Tickets here
                console.log(tickets)
                inquire();
            }) 
    
        } else if (answers.options === "Display a ticket"){
            
            // Prompt user to enter ticketID
            inquirer.prompt([
                {type: 'list', message: 'Do you know the ticket id?', name: "options", choices: [
                    "yes",
                    "no"
                ]}
            ]).then(answers => {
                if (answers.options === "yes"){
                    inquirer.prompt([
                        {type: 'number', message: "Enter the ticked ID number", name: "idNum" }
                    ]).then(ticketId => {
                    //get single ticket from API
                        getSingleTicket(ticketId.idNum).then((ticket, err) => {
                            if (err) console.log(err.code, "\nPlease enter a valid ticket number")
                            //TODO: display ticket info
                            console.log(ticket.description);
                            inquire();
                        })
                    }

                    )
                }
            })


        } else {
            console.log("have a great day!")
        }
    }
    )
  };


   inquire();
  