# Diabetes Prediction App

A web application for predicting diabetes using machine learning.

## Technology Stack

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Python with Flask

## Setup and Installation

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Running with Docker

```bash
docker-compose up
```

This will start both the frontend and backend services.
- Frontend: http://localhost:9001
- Backend: http://localhost:9002

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm start
```

The application will be available at http://localhost:3000.

## Project Structure

- `/frontend` - React TypeScript application with Tailwind CSS
  - `/src` - Source code
  - `/public` - Static assets
- `/ai` - Python backend service for machine learning
