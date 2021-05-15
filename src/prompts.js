const inquirer = require("inquirer");
const Table = require("cli-table");
const ZenAPI = require('./zen-api.js');

//pagination function that prompts user to see next and previous pages 
const pagination = (prev, next) => {
  //prompt user for next or prev page
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
          ZenAPI.getTickets(prev).then((results, err) => {
              if (err){ 
                  console.log("\nSomething went wrong, please check and try again.");
                  inquire();
              }
              //instantiate table 
              let table = new Table ({
                  head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                  colWidths: [20, 20, 20, 40]
              });
              ////loop and push each tickets desired info to table array
              results.data.tickets.forEach(ticket => {
                  table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
              });
              //console table to be created by cli-table 
              console.log(table.toString());
              //makes sure prev does not appear when on first or last page
              if (results.data.tickets[0].id > 25) {
                  pagination(results.data.links.prev, results.data.links.next);
              } else {
                  pagination(false, results.data.links.next);
              }
              
          });
      } else if (answers.options === "Next Page") {
          ZenAPI.getTickets(next).then((results, err) => {
              //handle err
              if (err){
                   console.log( "\nSomething went wrong, please check and try again.");
                   inquire();
              }
              //instantiate table
              let table = new Table ({
                  head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                  colWidths: [20, 20, 20, 40]
              });
              //loop and push each tickets desired info to cli-table array
              results.data.tickets.forEach(ticket => {
                  table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
              });
              //console.log table to be created by cli-table 
              console.log(table.toString());

              // displays message then user chooses next and there is no more tickets
              if (typeof(results.data.tickets[0]) == "undefined"){
                  console.log("\nYou've reached the end, no new tickets to display")
                  inquire();
                  return
              }
              //makes sure prev does not appear when on first or last page
              if (results.data.tickets[0].id > 25) {
                  pagination(results.data.links.prev, results.data.links.next);// api links to paginate and go to next and prev pages
              } else {
                  pagination(false, results.data.links.next);
              }
              
          });
      } else {
          inquire();
      }
  });
} 


// Main inquiry function for tickets

const inquire = () => {
  //prompt user with options 
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
          ZenAPI.getTickets().then((results, err) => {
              //instantiate table
              let table = new Table ({
                  head: ['ID', 'Created_at', 'Submitter_Id', 'Subject'], 
                  colWidths: [20, 20, 20, 40]
              });
              //loop through tickets and push to the cli-table array
              results.data.tickets.forEach(ticket => {
                  table.push([ticket.id, ticket.created_at, ticket.submitter_id, ticket.subject])
              });
              //console.log to make table
              console.log(table.toString());
              //makes sure prev option does not appear on first page
              if (results.data.tickets[0].id > 25) {
                  
                  pagination(results.links.prev, results.links.next);// api links to paginate and go to next and prev pages
              } else {
                  pagination(false, results.data.links.next);
              }
          }).catch(err => {
            //handle err
            if (err) console.log( "\nSomething went wrong, please try again.")
          });
      } else if (answers.options === "Display a ticket") {
            // Prompt user to ask if they know ticket id number
            inquirer.prompt([
                {
                type:'list',
                message: 'Do you know the ticket ID number?',
                name: 'options',
                choices: [
                  'yes',
                  'no'
                ]}
            ]).then(answers => {
                if (answers.options === 'yes'){
                    //prompt user for ticket id number
                    inquirer.prompt([
                        {type: 'number', 
                        message: 'Enter ticket ID number',
                        name: 'idNum',
                      }
                    ]).then(ticketId => {
                      ZenAPI.getSingleTicket(ticketId.idNum).then((ticket, err) => {
                          let ticketChoice = ticket.data.ticket
                      //instantiate Table
                          var table = new Table(
                              {
                              head: ['Ticket']
                           , colWidths: [20, 60]
                              }
                         );
                         //Push the desired ticket info to the cli-table array
                          table.push(
                              {'ID':ticketChoice.id}, 
                              {'Submitter Id': ticketChoice.submitter_id},
                              {'Status' : ticketChoice.status},
                              {'URL': ticketChoice.url}, 
                              {'Description' : ticketChoice.description}
                          );
                          //console.log to show table
                          console.log(table.toString());
                           inquire();
                      }).catch(err => {
                        //handle err
                        if(err) console.log( '\nWe did not find that ticket, please enter a valid ticket number');
                        inquire();
                      })

                    })
                }else {
                    inquire();
                }
            })
      } else {
          //print when user quits program
          console.log("Have a great day!")
      }
  });
}


module.exports.inquire = inquire;
module.exports.pagination = pagination;