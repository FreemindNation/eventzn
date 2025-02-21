# Eventzn - Event Management Platform

## Table of Contents
- [Live Project](#live-project)
- [Project Summary](#project-summary)
- [Features](#features)
- [Test Account Access](#test-account-access)
- [Running the Project locally](#running-the-project-locally)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
    - [Get All Events](#get-all-events)
    - [Get an Event by ID](#get-an-event-by-id)
    - [Create an Event](#create-an-event)
    - [Update an Event](#update-an-event)
    - [Delete an Event](#delete-an-event)
    - [Get All Users](#get-all-users)
    - [Get Current User Registrations](#get-current-user-registrations)
    - [Register for an Event](#register-for-an-event)
    - [User Authentication](#user-authentication)
- [Tech Stack](#tech-stack)
- [Future Improvements](#future-improvements)


## Live Project
👉 [Visit the Live Project Here](https://eventzn.vercel.app)


## Project Summary

Eventzn is a modern event management platform that allows users to explore, register, and manage events seamlessly. The platform provides an intuitive interface for users to browse events, book tickets, and manage their profile, while administrators can create, update, and delete events.

## Features

- 🗓️ **Event Listings** - Browse and filter events by category
- 🎟️ **Event Registration** - Sign up for events with a single click
- 📅 **Google Calendar Integration** - Add events to your calendar.
- 🔐 **User Authentication** - Sign in with email & Google.
- 🛠️ **Admin Dashboard** - Manage events and users efficiently.
- 💳 **Payment Integration (Coming Soon)** - Stripe integration for paid events.
- 🌙 **Dark Mode Support** - A seamless dark mode experience.

## Test Account Access

To test the platform, use the following user credentials:

- **Test User**
  - Name: Test User4
  - Email: `testuser4@eventzn.dev`
  - Password: `testuser.4`

> 🚨 **Note:** Admin credentials are not publicly shared for security reasons.

## Running the Project Locally

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- PostgreSQL (for database)
- Git
- A `.env` file with required environment variables.

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/eventzn.git
   cd eventzn

2. **install dependencies**
    ```bash
    npm install

3. **Set up Enviroment variables**
    ```bash
    POSTGRES_URL=your_database_url
    POSTGRES_URL_NON_POOLING=your_direct_database_url
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

4. **Run database migration**
    ```bash
    npx prisma migrate dev --name init

5. **Seed database (optional)**
    ```bash
    npx prisma db seed

6. **Start the Development Server**
    ```bash
    npm run dev

7. **Access the App Open http://localhost:3000 in your browser.**

## API Endpoints

Eventzn provides a set of RESTful API endpoints to manage events and user authentication. Below is an overview of the available endpoints.

### Get all Events

- **Endpoint:** `GET /api/events`

- **Description:** Retrieves a paginated list of all events, optionally filtered by category or search query.

- **Query Parameters:**

    - `page`(optional) - Specifies the page number for pagination.
    - `category`(optional) - Filters events by category.
    - `search`(optional) - Searches events by title or description.

- **Example Response:** 
    ```json
    {
        "events": [
            {
                "id": "event123",
                "title": "Tech Conference 2025",
                "description": "A deep dive into the future of technology.",
                "startTime": "2025-03-12T09:00:00.000Z",
                "endTime": "2025-03-12T17:00:00.000Z",
                "location": "London, UK",
                "category": "Technology",
                "imageUrl": "https://example.com/event.jpg",
                "isFree": false,
                "ticketPrice": 49.99,
                "createdAt": "2025-02-01T12:00:00.000Z",
                "createdBy": "admin123",
                "registerations": 50
            },
            {
                "id": "event456",
                "title": "Music Festival",
                "description": "Live performances from top artists.",
                "startTime": "2025-06-15T15:00:00.000Z",
                "endTime": "2025-06-16T23:00:00.000Z",
                "location": "Manchester, UK",
                "category": "Music",
                "imageUrl": "https://example.com/music-festival.jpg",
                "isFree": true,
                "ticketPrice": 0,
                "createdAt": "2025-01-20T10:30:00.000Z",
                "createdBy": "admin456",
                "registerations": 200
            }
        ],
        "totalEvents": 2
        
    }

### Get an Event by ID

- **Endpoint:** `GET /api/events/:eventId`

- **Description:** Fetches the details of a specific event using its unique ID.

- **Path Parameters:**
    - `eventId` - The unique identifier of the event.

- **Example Response:** 
    ```json
    {
        "id": "event123",
        "title": "Tech Conference 2025",
        "description": "A deep dive into the future of technology.",
        "startTime": "2025-03-12T09:00:00.000Z",
        "endTime": "2025-03-12T17:00:00.000Z",
        "location": "London, UK",
        "category": "Technology",
        "imageUrl": "https://example.com/event.jpg",
        "isFree": false,
        "ticketPrice": 49.99,
        "createdAt": "2025-02-01T12:00:00.000Z",
        "createdBy": "Admin User",   
    }

### Create an Event

- **Endpoint:** `POST /api/events`

- **Description:** Allows an admin user to create a new event.

- **Request Body:**

    - `title` (string, required) - The event title.
    - `description` (string, optional) - A brief event description.
    - `startTime` (ISO date, required) - The event start time.
    - `endTime` (ISO date, required) - The event end time.
    - `location` (string, required) - The event location.
    - `category` (string, required) - The category of the event.
    - `imageUrl` (string, optional) - A URL to the event image.
    - `isFree` (boolean, required) - Indicates if the event is free or paid.
    - `ticketPrice` (number, required if `isFree` is false) - The price of the event ticket.

- **Authorisation:** Requires an admin user role.

- **Example Response:** 
    ```json
    {
        "id": "event123",
        "title": "Tech Conference 2025",
        "description": "A deep dive into the future of technology.",
        "startTime": "2025-03-12T09:00:00.000Z",
        "endTime": "2025-03-12T17:00:00.000Z",
        "location": "London, UK",
        "category": "Technology",
        "imageUrl": "https://example.com/event.jpg",
        "isFree": false,
        "ticketPrice": 49.99,
        "createdAt": "2025-02-01T12:00:00.000Z",
        "createdBy": "Admin User",   
    }

### Update an Event

- **Endpoint:** `PATCH /api/events/:eventId`

- **Description:** Allows an admin user to update an existing event.

 - **Path Parameters:**
    - `eventId` - The unique identifier of the event.

- **Request Body:** Accepts any of the fields used in event creation.

- **Authentication:** Requires an admin user role.

- **Example Response:** 
    ```json
    {
        "id": "event123",
        "title": "Tech Conference 2025",
        "description": "A deep dive into the future of technology.",
        "startTime": "2025-03-12T09:00:00.000Z",
        "endTime": "2025-03-12T17:00:00.000Z",
        "location": "London, UK",
        "category": "Technology",
        "imageUrl": "https://example.com/event.jpg",
        "isFree": false,
        "ticketPrice": 49.99,
        "createdAt": "2025-02-01T12:00:00.000Z",
        "createdBy": "Admin User",   
    }

### Delete an Event

- **Endpoint:** `DELETE /api/events/:eventId`

- **Description:** Allows an admin user to delete an event.

- **Path Parameters:**
    - `eventId` - The unique identifier of the event.

- **Authentication:** Requires an admin user role.

- **Response:** Confirms successful deletion of the event.

### Get All Users

- **Endpoint:** `GET /api/users`

- **Description:** Retrieves a list of all users.

- **Example Response:** 
    ```json
    [
        {
            "id": "user123",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "image": "https://example.com/johndoe.jpg",
            "registeredEvents": 3,
            "createdAt": "2025-01-05T10:00:00.000Z"
        },
        {
            "id": "user456",
            "name": "Jane Smith",
            "email": "janesmith@example.com",
            "image": "",
            "registeredEvents": 5,
            "createdAt": "2025-02-01T15:30:00.000Z"
        }
    ]


### Get Current User Registrations

- **Endpoint:** `GET /api/profile`

- **Description:** Retrieves a list of events the currently logged-in user has registered for. **Requires authentication**.

- **Example Request:**
    ```bash
    GET /api/profile
    Authorization: Bearer <access_token>

- **Example Response:**
    ```json
    [
        {
            "id": "event123",
            "title": "Tech Conference 2025",
            "startTime": "2025-03-12T09:00:00.000Z",
            "endTime": "2025-03-12T17:00:00.000Z",
            "location": "London, UK",
            "category": "Technology",
            "imageUrl": "https://example.com/event.jpg"
        }
    ]   

### Register for an Event

- **Endpoint:** `POST /api/registrations/:userId`

- **Description:** Creates a new event registration for a user. **Requires authentication**.

- **Example Request:**
    ```bash
    POST /api/registrations/12345
    Authorization: Bearer <access_token>
    Content-Type: application/json
    ```
    ```json
    {
        "eventId": "event123"
    }

- **Example Response:**
    ```json
    {
        "id": "reg789",
        "userId": "12345",
        "eventId": "event123"
    }


### User Authentication

- **Endpoints:**
    - `POST /api/auth/signup` - Registers a new user.
    - `POST /api/auth/login` - Authenticates a user and returns a session token.
    - `POST /api/auth/logout` - Logs out the current user.

- **Request Body (Signup & Login):**

    - **Singup:**
        - `name` (string, optional) - The user's name.
        - `email` (string, required) - The user’s email address.
        - `password` (string, required) - The user’s password (must meet complexity requirements).

    - **Login:**
        - `email` (string, required) - The user’s email address.
        - `password` (string, required) - The user’s password (must meet complexity requirements).

- **Response:** Returns an authentication token for session management.





## Tech Stack

 - **Frontend** - Next.js 15, Tailwind CSS, HeroUI.
 - **Backend** - Next.js API Routes, Prisma, PostgreSQL
 - **Authentication** - NextAuth.js (Google & Credentials).
 - **Deployment** - Vercel.

 ## Future Improvements

 - Payment integration with Stripe
 - Enhanced admin dashboard analytics
 - User event history and recommendations


© 2025 Eventzn. All rights reserved.







