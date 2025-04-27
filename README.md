# Secure Dashboard with Behavioural Analysis

A security monitoring dashboard application developed as a minor project for University of Petroleum and Energy Studies (UPES).

![Project Logo](./project_logo.svg)

## Features

- **Authentication System**: Secure login and registration with password hashing
- **Security Monitoring**: Real-time tracking of login attempts and security events
- **Behavioral Analysis**: Detection of unusual user access patterns
- **Attack Prevention**: Protection against brute force, SQL injection, and session hijacking

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Real-time Updates**: WebSockets

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/secure-dashboard.git
   cd secure-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL=postgres://username:password@hostname:port/database
   SESSION_SECRET=your_secret_key
   ```

4. Push the database schema
   ```bash
   npm run db:push
   ```

5. Start the application
   ```bash
   npm run dev
   ```

6. The application will be available at http://localhost:5000

### Default Users

The database will be initialized with the following users:

- Admin User
  - Username: `admin`
  - Password: `SecurePassword123!`

- Regular User
  - Username: `user`
  - Password: `SecurePassword123!`

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared types and utilities
- `/project_documentation.md` - Detailed project documentation

## Documentation

For detailed project documentation, see [project_documentation.md](./project_documentation.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

This project was developed as a minor project for University of Petroleum and Energy Studies (UPES).