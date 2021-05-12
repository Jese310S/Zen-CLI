const prompts = require('../src/prompts.js');
const inquirer = require("inquirer");

describe('test user input', () => {

  it('should equal test', async () => {
    inquirer.prompt.mockImplementationOnce(() =>{
      
    });

    inquirer.prompt.mockImplementationOnce(() =>
    Promise.resolve("{options: 'Display All Tickets'}")
    );
  
    await expect(prompts.inquire()).resolves.toEqual('Display all tickets');
  })
})