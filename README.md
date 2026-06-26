# Chauffeur Booking System

A modern full-stack chauffeur booking platform built with **Next.js 15**, **TypeScript**, and **MongoDB**. The application allows customers to create transportation bookings while providing administrators with a dashboard to manage bookings, vehicles, and drivers.

## Features

### Customer

* Create transportation bookings
* Multi-step booking form
* Vehicle selection
* Price estimation
* Booking confirmation
* Responsive user interface

### Admin Dashboard

* Dashboard with booking statistics
* Manage bookings
* Update booking status
* Delete bookings
* Manage vehicles
* Manage drivers
* View booking analytics

## Tech Stack

### Frontend

* Next.js 16 (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React
* Sonner

### Backend

* Next.js Server Actions
* MongoDB
* Mongoose

### Validation

* Zod

## Project Structure

```
.
├── actions/          # Server actions for mutations and server-only reads
├── app/              # App Router pages, layouts, and API routes
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── lib/              # Utilities, helpers, constants, validation, and mapping logic
├── models/           # Mongoose models
├── public/           # Static assets served directly
├── services/         # Database and business logic
├── types/            # Shared TypeScript types
└── README.md         # Project overview and usage notes
```

## Where Things Belong

* Put route pages and nested layouts in [app/](app).
* Put shared UI pieces in [components/](components).
* Put database access and business rules in [services/](services).
* Put server actions in [actions/](actions).
* Put validation schemas, constants, and helper functions in [lib/](lib).
* Put Mongoose schemas in [models/](models).
* Put shared TypeScript contracts in [types/](types).

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/chauffeur-booking.git

cd chauffeur-booking
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file.

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create a production build.

```bash
npm run start
```

Start the production server.

```bash
npm run lint
```

Run ESLint.

## Architecture

The application follows a layered architecture:

```
UI Components
      │
      ▼
Server Actions
      │
      ▼
Service Layer
      │
      ▼
Database (MongoDB)
```

This separation keeps business logic independent from the UI and makes the application easier to maintain and test.

## Current Features

* Booking management
* Booking status updates
* Booking statistics
* Driver management
* Vehicle management
* Responsive admin dashboard
* Type-safe APIs
* Form validation using Zod
* Server-side data mutations
* Automatic cache revalidation

## Future Improvements

* Authentication and authorization
* Customer accounts
* Email notifications
* Payment integration
* Booking calendar
* File uploads
* Advanced reporting
* Search and filtering
* Pagination
* Unit and integration tests

## License

This project is available for learning and portfolio purposes.
