Mini LinkedIn Clone
A full-stack community platform inspired by LinkedIn, built with React (Vite + Tailwind CSS) and Node.js (Express + MongoDB).

🛠️ Tech Stack
Frontend:

React (with Vite for lightning-fast dev/build)

Tailwind CSS (utility-first, beautiful & responsive)

React Router (client-side navigation)

Axios (HTTP requests)

Framer Motion for animations and effects

ShadCN for ui components

Backend:

Node.js, Express

MongoDB (cloud DB via MongoDB Atlas)

Mongoose (ODM)

bcryptjs (secure password hashing)

jsonwebtoken (JWT auth)

CORS, dotenv, nodemon

Deployment:

Frontend: Vercel 

Backend: Render 

🚀 Setup Instructions
1. Clone the Repository
bash
git clone https://github.com/Ved-ant11/Minkedin-project.git
cd Minkedin-project

2. Backend Setup
bash
cd server
npm install
# Setup environment variables:
cp .env.example .env
# Set MONGO_URI and JWT_SECRET in .env
npm run dev
Make sure MongoDB connection string is valid and the database is accessible.

3. Frontend Setup
bash
cd ../client
npm install
# Setup environment variables:
cp .env.example .env
# Set VITE_BACKEND_URL (e.g. http://localhost:5000)
npm run dev
Access the frontend at http://localhost:5173.

📚 API Endpoints
All routes are prefixed with /api.

Auth
Method	Endpoint	Description	Body (JSON)	Protected
POST	/api/auth/register	Register a new user	name, email, password, bio	No
POST	/api/auth/login	   Login a user	email, password	No
Posts
Method	Endpoint	Description	Body (JSON)	Protected
GET	/api/posts	Get all posts (feed)	–	No
POST	/api/posts	Create a new post	content	Yes
To use POST /api/posts, add Authorization: Bearer <your_jwt_token> header.

Users
Method	Endpoint	Description	Protected
GET	/api/users/:id	Get user profile and their posts	No
Example:
GET /api/users/64db119274b53cafc5c8c123

✨ Features
User Authentication: Register & login with email, password (bcrypt-hashed)

JWT-based protected routes: Only authenticated users can create posts

Public Feed: All users can view all posts with author name, date

Profile Pages: View any user’s profile and their posts

Modern Responsive UI: Tailwind CSS for fast, beautiful styling

Persistent login: Sessions handled via JWT and localStorage

Clean, modular codebase: Easy to extend and maintain


🙏 Credits
Inspired by LinkedIn

Designed and built by Me

Feel free to fork, customize, and use this as a coding portfolio project!

