Connect++

Connect++ is a social media platform designed to connect people through seamless communication, post sharing, and real-time interactions. Built using the MERN (MongoDB, Express, React, Node.js) stack, it offers a dynamic user experience with modern features like private messaging, multimedia support, and an intuitive UI.

Features

User Authentication: Secure login and signup with JWT authentication.

Post Creation: Users can create posts with text and images.

Like & Comment System: Engage with posts by liking and commenting.

Follow/Unfollow Users: Connect with others by following them.

Private Messaging: Send and receive direct messages.

Real-time Updates: Live notifications and updates.

Search Functionality: Find users and posts quickly.

Speech-to-Text: Post creation using voice input (Web Speech API integration).

Translation: Translate posts into different languages.

Tech Stack

Frontend: React.js, Material-UI, Redux, CSS

Backend: Node.js, Express.js, JWT Authentication

Database: MongoDB (MongoDB Compass for local testing)

Hosting: AWS / Vercel (for frontend), MongoDB Atlas (for database)

APIs: RESTful API design for backend communication

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js

MongoDB (local or Atlas)

Git

Backend Setup

Clone the repository:

git clone https://github.com/sanjay2902/Connect-Social-Media-Forum-Using-Mern-Stack.git
cd Connect-Social-Media-Forum-Using-Mern-Stack
Install dependencies:

npm install

Set up environment variables (.env file):

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the frontend application:

npm start

Running the Application

Open http://localhost:3000 to access the frontend.

The backend runs on http://localhost:5000.

API Endpoints

User Authentication: /api/auth/register, /api/auth/login

Posts: /api/posts/create, /api/posts/:id

Comments: /api/comments/add, /api/comments/:id

Likes: /api/likes/toggle/:id

Messaging: /api/messages/send, /api/messages/inbox

Pages to Download

Ensure you have the following pages in your frontend:

Homepage (Home.js): Displays posts and user feed.

Login (Login.js): User authentication page.

Signup (Signup.js): Registration form.

Profile (Profile.js): User profile with posts and details.

Messages (Messages.js): Private messaging section.

Post Creation (CreatePost.js): Upload posts with text and images.

Search (Search.js): Find users and posts.

Future Enhancements

Video Upload Support

Live Streaming Feature

AI-powered Content Suggestions

More Advanced UI Improvements

Contributing

Feel free to fork the repository, create a new branch, and submit pull requests.

License
