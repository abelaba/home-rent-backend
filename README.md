# HomeRenting Application Backend

Welcome to the HomeRenting Application Backend! This Node.js server serves as the backbone for your home renting application, providing essential functionalities to handle user data, listings, and communication between tenants and landlords. Read on to learn about the server's key features and how to set it up.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [License](#license)

## Features

### User Management
- **User Registration and Login:** Provide API endpoints for user registration and authentication.
- **Profile Management:** Allow users to update their profile information.

### Listings Management
- **Create and Update Listings:** Enable users to create and manage their rental listings.
- **Listings Retrieval:** Provide endpoints to fetch listings based on search and filter criteria.

### Communication
- **Messaging Platform:** Implement a messaging system for tenants and landlords to communicate.


## Getting Started

To run the HomeRenting Application Backend on your local machine, follow these steps:

1. Clone this repository: `git clone https://github.com/abelaba/homerenting-backend.git`
2. Navigate to the project directory: `cd homerenting-backend`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file and add necessary configuration details.
You need to set this variables.

    `DB_CONNECT = `

    `SECRET_KEY =` 

5. Run the server: `nodemon start`

## API Endpoints

- `POST /api/user/register`: Register a new user.
- `POST /api/user/login`: Authenticate and log in a user.
- `PUT /api/user/updateAccount`: Update user profile.
- `DELETE /api/user/deleteAccount`: Delete user profile.
- `POST /api/rental/add`: Create a new listing.
- `GET /api/rental/view/:id`: View single rental property.
- `PUT /api/rental/update/:id`: Update single rental property.
- `DELETE /api/rental/delete/:id`: Delete single rental property.
- `GET /api/rental/viewAll`: Retrieve listings.
- `GET /api/rental/viewMyProperties`: Retrieve listings of logged in user.
- `POST /api/chat/createChat`: Create a new chat.
- `GET /api/chat/loadChats`: Retrieve all chats.
- `GET /api/chat/loadMessages/:id`: Retrieve messages in a conversation.
- `PUT /api/chat/sendMessage`: Send a message in a conversation.


## Database

The HomeRenting Application Backend uses a database to store user data, listings, messages, and more. We utilize MongoDB for data storage. To set up the database:

1. Install MongoDB.
2. Create a new database.
3. Update your `.env` file with the database connection details.

## License

This project is licensed under the MIT License. Feel free to use and modify the code according to the terms of the license.

---

Thank you for contributing to the HomeRenting Application Backend! If you have any questions or feedback, please don't hesitate to reach out to me.
