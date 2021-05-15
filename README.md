# **Zen-Cli**
## Table of Contents
 * [Purpose](#purpose)
      - [Why use a CLI?](#why-use-a-cli)
      - [Challenges Faced:](#challenges-faced)
  * [Features](#features)
  * [User Flow](#user-flow)
  * [Tech Stack & Npm Packages](#tech-stack)
  * [Testing](#testing)
  * [Authentication](#authentication)
  * [How to Install](#how-to-install)
  * [How to Use](#how-to-use)
  * [How to Run Tests](#how-to-run-tests)



## Purpose

This app is a command line program that is designed to call and retrieve Zendesk customer support tickets for the given account.  The app makes a call to the Zendesk API and retrieves the users data.  The tickets are displayed in blocks of 25 at a time.  The user can choose to display all tickets or a single ticket through prompts.

#### Why use a CLI

I chose to challenge myself and make the app a command line program.  With each coding challenge I do I like to make sure I am pushing myself to try new approaches and different tech stacks.

#### Challenges Faced

Going into the challenge I had used this tech stack only a couple of times.  I had not used an API calls with a CLI before. I decided this would be a good time to challenge myself and give it a try. This meant I spent more time reading documentation and reminding myself of how things worked.  

Command line programs are a bit niche especially when done in node so there was less documentation / questions & answers out there for me to learn from. To overcome this I spent more time researching the methods I wanted to use and testing the suitability to my overall program.

I also faced challenges with testing.  Writing tests for an API response is not something I have done before.  After research and experimentation the solution that I used was to test the call with mock data.

## Features

- Simple UI
- Usage of Zendesk API
- Prompts for user input
- Pagination of tickets
- Error handling



## User Flow

![User Flow](/images/user_flow.jpeg)

## Tech Stack

- Node

- Axios
- NPM Packages: 
  - CLI-Table: Puts the data into a table format
  - Dotenv : Create environment variable for authorisation
  - inquirer: Used for prompting user 
  - Jest: Used for testing



## Testing

This testing was used for both main functions of the program.  It tests the getTickets() and getSingleTicket() functions.

| Expected Action                                              | Test                        | Actual outcome |
| ------------------------------------------------------------ | --------------------------- | -------------- |
| Uses mock data and tests that the default url and  is being used by API | Should return True          | Pass           |
| Uses the mock data to test that a promise is returned        | Should return a Promise     | Pass           |
| Tests that if url is not correct error is thrown             | Should return error message | Pass           |



## Authentication

The authentication for the API uses basic authentication. The program uses Dotenv to create environment variables. To use the App you will need to be given the username and password.  Rename the dev.example.env file to .env.  In that file add the username and password given to you to the variables.  This should now allow the API to authenticate you using the environment variables.

## How to Install

1. You will need Node.js installed on your computer.

[Download Node.js here](https://nodejs.org/en/download/)

2. Fork or Clone this repository to your local computer

3.  You will need to install any dependencies of the app.  You can do this with the following command from the root directory :

`npm install`

4. In the dev.example.env file add the username and password provided to you.  Then rename the file to .env

## How to Use

1. After installation, in the console type `npm start` to begin the program.
2. Choose the prompts that best suit your needs

## How to Run Tests

To run the tests type `npm test` into the console


<a href="#top">Back to top</a>