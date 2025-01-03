Event Management API


Overview

This Event Management API is a robust and scalable backend solution designed to facilitate the creation, management, and interaction of events. Built with Express.js and MySQL, the API provides a seamless experience for users to discover, participate in, and manage events in their local areas.


Key Features
1. User Authentication: Secure user authentication with JWT-based authorization.

2. Event Creation & Management: Admin users can create and manage events with detailed information such as title, description, location, date, and pricing.

3. Pricing Management: Supports multiple pricing tiers for events, allowing for flexibility in ticketing.

4. Gallery Management: Users can upload and manage event-related images.

5. Attendee Management: Manage attendee information, including ticket purchases and contact details.

4. Chat Functionality: Real-time chat feature for attendees to interact and share information during events.

5. Event Search: Users can search for events by title, description, or town, enhancing discoverability.

6. RESTful API: Fully developed RESTful endpoints for easy integration with frontend applications.


Technology Stack
1. Node.js: JavaScript runtime for building scalable server-side applications.

2. Express.js: Fast, unopinionated, minimalist web framework for Node.js.

3. MySQL: Open-source relational database for robust data management.

4. Sequelize: Promise-based Node.js ORM for relational databases, simplifying database interactions.

6. Socket.IO: Real-time bidirectional event-based communication for chat functionality.


Getting Started
To set up the project locally, follow these steps:

1. Clone the repository:

git clone https://github.com/TedDaBigDawg/isce.app_events.git


2. Navigate to the project directory:

cd isce.app_events


3. Install the dependencies:

npm install


4. Configure your environment variables. Create a .env file based on the .env.example provided.

5. Run the application:

npm run start

The API will be available at http://localhost:5208.


Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request. Make sure to follow the contribution guidelines.
