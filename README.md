# **Zen-Cli**

[TOC]



## Purpose

This app is a command line program that is designed to call and retrieve the Zendesk customer support tickets for the given account.  The app makes a call to the Zendesk API and retrieves the users data.  The tickets are displayed in blocks of 25 at a time.  The user can choose to display all tickets or a single ticket through prompts.  

#### Why use a CLI?

I chose to challenge myself and make the app a command line program.  With each coding challenge I do I like to make sure I am challenging myself to try new appraoches and different tech stacks.   

#### Challenges Faced:

Going into the challenge I had used this tech stack only a couple times .  I had not used an API call with a CLI before.  This meant I spent more time reading documentation and reminding myself how things worked.  Also command line applications are a bit niche.  There is not too many people who make them.  This means less documentation/questions & answer out there.  This did not make things impossible 

## Features

- Simple UI
- Usage of Zendesk API
- Promts for user input



## User Flow

## Tech Stack & Npm Packages

- Node

- Axios
- NPM Packages: 
  - CLI-Table: Puts the data into a table format
  - Dotenv : Create environment variable for authorisation
  - inquirer: Used for prompting user 
  - Jest: Used for testing



## Testing

This testing was used for both main functions of the program.  It tests the getTickets() and getSingleTicket() functions.

| Expected Action                                              | Test                        | Actual outcome |      |
| ------------------------------------------------------------ | --------------------------- | -------------- | ---- |
| Uses mock data and tests that the default url and  is being used by API | Should return True          | Pass           |      |
| Uses the mock data to test that a promise is returned        | Should return a Promise     | Pass           |      |
| Tests that if url is not correct error is thrown             | Should return error message | Pass           |      |



## Authentication & Dotenv

The authentication for the API uses basic authentication.  To use the App you will need to be given the username and password by myself.  You could also sign up for a Zendesk account and use your usename and password in the way shown in the .env_sample file.  

## How to Install

## How to Run Tests
