# Health Shield

Health Shield is a React-based web application designed for managing and scheduling healthcare-related appointments, prescriptions, and messaging with healthcare providers. 

## Features

- **Dashboard**: Overview of user’s upcoming appointments, recent messages, and health insights.
- **Calendar**: Interactive calendar to schedule and view appointments, ensuring users can select only valid future dates and times.
- **Direct Messaging**: Secure messaging with healthcare providers for quick communication.
- **Prescriptions**: View current prescriptions, renew them, and track renewal status.
- **User Profile**: Manage personal information and account settings.

## Tech Stack

### Frontend
- **React**: Component-based UI.
- **React Router**: Efficient page routing.
- **CSS Modules**: Scoped styling for each component.
- **Axios**: Handle API requests between frontend and backend.

### Backend
- **Node.js**: Server-side JavaScript environment.
- **Express**: Backend framework for building RESTful APIs.
- **MongoDB**: Database solution to store user, appointment, and prescription data.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/KabirTapiawala/Health-Shield-Application.git
   cd Health-Shield-Application

2. **Install Dependencies:**
   ```bash
   cd my-app
   npm install

   cd ../server
   npm install
   
3. **Environment Variables:**
- Set up your environment variables in a .env file, especially for MongoDB connection (MONGO_URI), and any other relevant variables (e.g., JWT_SECRET).

4. **Run the app**
- Frontend
   ```bash
   cd my-app
   npm start

- Backend
  ```bash
  cd server
  node index.js
