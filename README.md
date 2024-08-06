# Study Notion: The Ed Tech Platform

## Project Description
StudyNotion is a fully functional ed-tech platform built using the MERN stack (ReactJS, NodeJS, MongoDB, ExpressJS). It allows users to create, consume, and rate educational content, providing a seamless and interactive learning experience for students and a platform for instructors to showcase their expertise.

## Features
- **Student Experience:**
  - Homepage with course list and user details
  - Course List with descriptions and ratings
  - Wishlist and Cart Checkout
  - Course Content access with videos and materials
  - User account management
- **Instructor Tools:**
  - Dashboard with course overview and feedback
  - Insights on course performance metrics
  - Course creation, updating, and deletion
  - Profile management
- **Admin Panel (Future Scope):**
  - Platform insights and user management
  - Instructor management

## Front-end
- **Technologies:** ReactJS, CSS, Tailwind, Redux
- **Design:** Clean and minimal UI using Figma
- **Pages:** Homepage, Course List, Wishlist, Cart, Course Content, User Details, Dashboard, Insights, Course Management

## Back-end
- **Architecture:** Monolithic using Node.js and Express.js
- **Database:** MongoDB for flexible data storage
- **Features:** User authentication, course management, payment integration (Razorpay), media management (Cloudinary), Markdown formatting
- **Libraries:** JWT for authentication, Bcrypt for password hashing, Mongoose for MongoDB interaction

## Deployment
- **Front-end:** Vercel
- **Back-end:** Render or Railway
- **Media:** Cloudinary
- **Database:** MongoDB Atlas

## API Design
- RESTful API for communication between front-end and back-end
- Endpoints for user authentication, course management, and content delivery

## Testing
- Comprehensive testing process covering unit, integration, and end-to-end tests
- Use of popular test frameworks and tools

## Future Enhancements
- Improved analytics for instructors and admin
- Enhanced user engagement features
- Expanded admin functionalities

StudyNotion aims to provide an immersive learning experience and a platform for global knowledge sharing, making education accessible and engaging for everyone.

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Vercel account (for front-end deployment)
- Render or Railway account (for back-end deployment)
- Cloudinary account (for media management)

### Installation Instructions

#### Clone the Repository (Note these may not work on your system so please first read the code and then try it to implement on your system accordingly.
```bash
git clone <repository-url>
cd study-notion

Setting Up the Backend
1. Install Dependencies
Navigate to the backend directory and install the necessary dependencies:

bash
Copy code
cd backend
npm install
2. Configure Environment Variables
Create a .env file in the backend directory and add the following variables:

env
Copy code
PORT=5000
MONGO_URI=<your-mongodb-cluster-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
3. Start the Backend Server
bash
Copy code
npm start
The backend server will start on http://localhost:5000.

Setting Up the Frontend
1. Install Dependencies
Navigate to the frontend directory and install the necessary dependencies:

bash
Copy code
cd frontend
npm install
2. Configure Environment Variables
Create a .env file in the frontend directory and add the following variables:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CLOUDINARY_URL=<your-cloudinary-url>
3. Start the Frontend Server
bash
Copy code
npm start

Database Setup
Create a MongoDB Cluster: Sign in to MongoDB Atlas and create a new cluster.
Configure Database Access: Add a database user with read and write permissions.
Whitelisting IP Address: Add your IP address to the IP whitelist.
Connect to Cluster: Use the connection string provided by MongoDB Atlas in your .env file for MONGO_URI.
Deployment
Front-end Deployment (Vercel)
Sign in to Vercel and create a new project.
Link the project to your GitHub repository.
Set the environment variables in the Vercel dashboard.
Deploy the project.
Back-end Deployment (Render or Railway)
Sign in to Render or Railway and create a new web service.
Link the service to your GitHub repository.
Set the environment variables in the Render or Railway dashboard.
Deploy the service.
```


# Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

# Contact
For any questions or suggestions, please reach out to us at [My email](priyanshusaha944@gmail.com)

# Enjoy building and learning with StudyNotion!
This Code is written under the guidance of [Love Babbar](https://github.com/loveBabbar)


