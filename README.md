# Cost Manager
A simple app for managing costs.

## Submitted By:
- Yoni Yirmyahu, 204797682
- Rotem Mor-Haim, 211905112

## Features
- Initialize a user with ID, first name, last name and birthday
- Add costs for each user by specifying year, month, day, category, description and sum
- Generate a report of costs based on category and time


## Requirements
- Node.js
- MongoDB
- Mongoose

## How to run the app
- Clone the repository
- Run `npm install` to install the dependencies
- Start the app with `npm start`
- Open `localhost:3000` in the browser to access the app

## Routes
The following routes are available in the app:

- `/`: JSON format of the available endpoints
- `/init`: Initialize a user with ID, first name, last name and birthday
- `/about`: Get information about the app and its authors
- `/addcost`: Add a cost for a user by specifying year, month, day, category, description and sum
- `/report`: Generate a report of costs based on category and time
- `/categories`: Get a list of all categories


## Models
The app has three models:

- User
- Cost
- Report -> for the computed pattern

### User Model
The User model contains information about the user. It has the following fields:

- `id`: ID of the user (Number)
- `first_name`: First name of the user (String)
- `last_name`: Last name of the user (String)
- `birthday`: Birthday of the user (String)

### Cost Model
The Cost model contains information about the cost. It has the following fields:

- `user_id`: ID of the user (String)
- `year`: Year of the cost (Number)
- `month`: Month of the cost (Number)
- `day`: Day of the cost (Number)
- `category`: Category of the cost (String)
- `description`: Description of the cost (String)
- `sum`: Sum of the cost (Number)
- `id`: ID of the cost (Number) - Auto incremented based on the amount of costs in the database

### Report Model
This is used in order to preserve the computed pattern. everytime a new cost is added, we generate a report or modify it in the database and by doing so we prevent calculations each time we need to access a specific report.
The report model is used to store a user's monthly expenses, organized by category. Each report document has the following properties:

- `user_id`: the id of the user who the report belongs to
- `year`: the year the report covers
- `month`: the month the report covers (as a number, 1 for January, 2 for February, etc.)
- `report`: Object that holds for each category an array.


## Database Connection
The app uses MongoDB as the database. The connection details are specified in `db_conn.js` file.
The connection string should be updated with your own MongoDB connection details if needed.
It connects to the MongoDB database using the `mongoose.connect()` function and the connection string for the database. The `try` and `catch` blocks handle any errors that may occur during the connection. The function is exported so that it can be used in other parts of the application.
