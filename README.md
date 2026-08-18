# Local Connect

Local Connect is a service marketplace that connects people looking for local services with skilled workers who can offer them. Clients can post jobs with descriptions, locations, categories, and budgets, while workers can browse available opportunities, submit applications, manage their profiles, and track application status.

## Overview

Finding reliable local workers can be difficult, while skilled workers often struggle to find relevant opportunities.

Local Connect provides a platform where both sides can connect through a simple workflow:

Client → Post a Job → Workers Discover Opportunities → Submit Applications → Client Reviews Applications → Job Completion → Reviews & Ratings

## Key Features

### For Clients

- Create and manage job postings
- Add job descriptions, categories, locations, and budgets
- View applications received for posted jobs
- Review worker profiles
- Accept or reject applications
- Manage and delete job postings
- View worker ratings and reviews

### For Workers

- Browse available jobs
- Search and filter jobs by category, location, and keywords
- View detailed job information
- Submit applications with proposals
- Track application status
- Withdraw applications
- Manage worker profiles
- Display skills, experience, availability, and hourly rates
- View ratings and reviews

### User Profiles

- Separate worker and client profiles
- Profile information and bio
- Location and contact information
- Worker skills and service categories
- Experience and hourly rate
- Ratings and completed jobs
- Worker verification status

### Authentication & Verification

- User registration and login
- Authenticated user sessions
- Worker identity verification
- Document upload for verification
- Verification status tracking

## Service Categories

The platform supports multiple local and professional services, including:

- Plumbing
- Electrical Work
- Cleaning
- Cooking
- Carpentry
- Gardening
- Tutoring
- Handyman Services
- Web Development
- Mobile Development
- Content Writing
- Data Analysis
- Graphic Design
- E-commerce Services

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- Lucide React

### Backend & Database

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage

### Development Tools

- Node.js
- npm
- ESLint

## Project Structure
```text

craft-hire-zone/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── applications/
│   │   ├── jobs/
│   │   ├── layout/
│   │   ├── profile/
│   │   └── ui/
│   │
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   │
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── BrowseJobs.tsx
│   │   ├── JobDetail.tsx
│   │   ├── ManageJob.tsx
│   │   ├── WorkerDashboard.tsx
│   │   ├── JobGiverDashboard.tsx
│   │   ├── WorkerProfile.tsx
│   │   └── ClientProfile.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```
## Project Status

Local Connect is a collaborative project developed to make local service discovery and hiring more accessible by connecting clients with skilled workers through a single platform.

## Contributors

This project was developed collaboratively as a group project as part of our academic work.
