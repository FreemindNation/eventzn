# Eventzn - Event Management Platform

## 📌 Project Summary

Eventzn is a modern event management platform that allows users to explore, register, and manage events seamlessly. The platform provides an intuitive interface for users to browse events, book tickets, and manage their profile, while administrators can create, update, and delete events.

### ✨ Features

- 🗓️ **Event Listings** - Browse and filter events by category
- 🎟️ **Event Registration** - Sign up for events with a single click.
- 📅 **Google Calendar Integration** - Add events to your calendar.
- 🔐 **User Authentication** - Sign in with email & Google.
- 🛠️ **Admin Dashboard** - Manage events and users efficiently.
- 💳 **Payment Integration (Coming Soon)** - Stripe integration for paid events.
- 🌙 **Dark Mode Support** - A seamless dark mode experience.

## 🔑 Test Account Access

To test the platform, use the following user credentials:

- **Test User**
  - Name: Test User3
  - Email: `testuser3@eventzn.dev`
  - Password: `testuser.3`

> 🚨 **Note:** Admin credentials are not publicly shared for security reasons.

## 🚀 Running the Project Locally

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
    DATABASE_URL=your_database_url
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


## Tech Stack

 - **Frontend** - Next.js 15, Tailwind CSS, HeroUI.
 - **Backend** - Next.js API Routes, Prisma, PostgreSQL.
 - **Authentication** - NextAuth.js (Google & Credentials).
 - **Deployment** - Vercel.

 ## Future Improvements

 - Payment integration with Stripe
 - Enhanced admin dashboard analytics
 - User event history and recommendations


© 2025 Eventzn. All rights reserved.







