require('dotenv').config()
const axios = require("axios");
const inquirer = require("inquirer");
const Table = require("cli-table");


const url = 'https://jsole.zendesk.com/api/v2/tickets.json?page[size]=25';

// gets all tickets from API
function getTickets(page) {

    return new Promise((resolve, reject) => {
        axios.get((page) ? page : url, {
            auth: {
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

//  prompts user to see next and previous pages 

const pagination = (prev, next) => {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?', 
        name: 'options',
        choices: [
            "Main Menu",
            (!next) ? "" : "Next Page", 
            (!prev) ? "" : "Prev Page",
        ]
    }]).then( answers => {

        if (answers.options === "Prev Page") {
            getTickets(prev).then((results, err) => {
                if (err) console.log(err.code, "\nSomething went wrong, please check and try again.")

                let table = new Table ({
                    head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                    colWidths: [20, 20, 20, 40]
                });

                results.tickets.forEach(ticket => {
                    table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
                });

                console.log(table.toString());
                if (results.tickets[0].id > 25) {
                    pagination(results.links.prev, results.links.next);
                } else {
                    pagination(false, results.links.next);
                }
                
            });
        } else if (answers.options === "Next Page") {
            getTickets(next).then((results, err) => {
                if (err) console.log(err.code, "\nSomething went wrong, please check and try again.")

                let table = new Table ({
                    head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                    colWidths: [20, 20, 20, 40]
                });

                results.tickets.forEach(ticket => {
                    table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
                });

                console.log(table.toString());
                if (results.tickets[0].id > 25) {
                    pagination(results.links.prev, results.links.next);
                } else {
                    pagination(false, results.links.next);
                }
                
            });
        } else {
            inquire();
        }
    });
} 


// Main inquiry function for tickets

const inquire = () => {
    inquirer.prompt([{
        type: 'list', 
        message: 'What would you like to do?', 
        name: 'options',
        choices: [
            "Display all tickets",
            "Display a ticket",
            "quit",
        ]
    }]).then(answers => {
        if (answers.options === "Display all tickets"){
            getTickets().then((results, err) => {
                if (err) console.log(err.code, "\nSomething went wrong, please check and try again.")

                let table = new Table ({
                    head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                    colWidths: [20, 20, 20, 40]
                });

                results.tickets.forEach(ticket => {
                    table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
                });

                console.log(table.toString());

                if (results.tickets[0].id > 25) {
                    pagination(results.links.prev, results.links.next);
                } else {
                    pagination(false, results.links.next);
                }
            });
        } else if (answers.options === "Display a ticket") {
              // Prompt user to enter ticketID
        } else {
            console.log("Have a great day!")
        }
    });
}



// const inquire = () => {
//     inquirer
//       .prompt([
//         { type: 'list', message: "'What would you like to do?'", name: "options", choices: [
//             "Display all tickets",
//             "Display a ticket",
//             "quit"
//         ] }
//     ]).then(answers => {
//         if (answers.options === "Display all tickets"){
//             getTickets().then((tickets, err)=>{
//                     if (err) console.log(err.code, "\nSomething went wrong, please check and try again")

//                     // instantiate table
//                     var table = new Table({
//                      head: ['ID', 'Created_at', 'Submitter_Id', 'Subject']
//                     , colWidths: [20, 20, 20, 40]
//                         });
//                         tickets.forEach(ticket => {
//                                          table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
//                                     })
//                                 console.log(table.toString());
//                                 }
//                         inquire();
//                             });

//         } else if (answers.options === "Display a ticket"){
            
//             // Prompt user to enter ticketID
//             inquirer.prompt([
//                 {type: 'list', message: 'Do you know the ticket id?', name: "options", choices: [
//                     "yes",
//                     "no"
//                 ]}
//             ]).then(answers => {
//                 if (answers.options === "yes"){
//                     inquirer.prompt([
//                         {type: 'number', message: "Enter the ticked ID number", name: "idNum" }
//                     ]).then(ticketId => {
//                     //get single ticket from API
//                         getSingleTicket(ticketId.idNum).then((ticket, err) => {
//                             if (err) console.log(err.code, "\nPlease enter a valid ticket number")
//                             // instantiate table
//                         var table = new Table({
//                                 head: ['Ticket']
//                              , colWidths: [20, 60]
//                             });

//                            table.push(
//                                {'ID':ticket.id}, 
//                                {'Submitter Id': ticket.submitter_id},
//                                {'Status' : ticket.status},
//                                {'URL': ticket.url}, 
//                                {'Description' : ticket.description}
//                            )
//                             console.log(table.toString());
//                             inquire();
//                         })
//                     }

//                     )
//                 }else{
//                     inquire();
//                 }
//             })


//         } else {
//             console.log("Have a great day!")
//         }
//     }
//     )
//   };


   inquire();
