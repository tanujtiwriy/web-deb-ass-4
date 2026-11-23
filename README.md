## CipherNest – Secure Connect & Communication Platform

**Course:** Web Development III | **Lab:** 4 | **Unit:** 4

## Project Overview

CipherNest is a secure backend application developed using Node.js and Express.js. It provides user authentication, protected resources, role-based authorization, personal note management, and real-time messaging.

The application uses JWT-based authentication to secure API requests and Socket.IO to support real-time communication between connected users.

## Technologies Used

- Node.js – Backend runtime environment
- Express.js – REST API development
- MongoDB – Database
- Mongoose – Database object modeling
- JWT – User authentication
- bcrypt – Password encryption and verification
- Socket.IO – Real-time communication
- EventEmitter – Event-driven logging
- dotenv – Environment configuration

## Key Functionalities

### 1. User Authentication
- New user registration.
- Secure password hashing using bcrypt.
- Login with email and password.
- JWT generation after successful authentication.

### 2. Authentication Middleware
- Validates JWT tokens.
- Protects restricted API endpoints.
- Supports token-based authorization through the Authorization header.

### 3. Personal Notes Management
- Create new notes.
- Retrieve saved notes.
- View individual notes.
- Update existing notes.
- Delete notes.
- Restricts users to accessing their own notes.

### 4. Role-Based Access Control
- Supports different user roles.
- Restricts administrative functionality.
- Provides an admin-only endpoint to retrieve registered users.

### 5. Real-Time Communication
- Implemented using Socket.IO.
- Allows clients to join chat rooms.
- Supports sending and receiving messages.
- Provides system notifications when users join rooms.
- Authenticates socket connections using JWT.

### 6. Event-Driven Logging
- Uses Node.js EventEmitter.
- Handles application events.
- Records relevant authentication and communication activities.

## Project Structure

```text
CipherNest/
├── middleware/
│   └── auth.js
├── models/
│   ├── Note.js
│   └── User.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   └── notes.js
├── screenshots/
├── .env.example
├── chat-test.js
├── events.js
├── server.js
└── socket.js
```

## Installation and Configuration

### Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
cd CipherNest
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secure_connect
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1h
```

### Step 4: Start MongoDB

Make sure your MongoDB server is running.

### Step 5: Run the Application

```bash
npm start
```

## API Documentation

| Method | Endpoint | Access | Function |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register user |
| POST | `/api/auth/login` | Public | Authenticate user |
| POST | `/api/notes` | Protected | Create a note |
| GET | `/api/notes` | Protected | Retrieve user notes |
| GET | `/api/notes/:id` | Protected | Retrieve a specific note |
| PUT | `/api/notes/:id` | Protected | Modify a note |
| DELETE | `/api/notes/:id` | Protected | Remove a note |
| GET | `/api/admin/users` | Admin | Retrieve all users |

## Socket.IO Communication

The application uses the following socket events:

| Event | Direction | Purpose |
|---|---|---|
| `joinRoom` | Client → Server | Connect to a chat room |
| `chatMessage` | Both | Exchange chat messages |
| `systemMessage` | Server → Client | Display room notifications |

Socket authentication uses the JWT token:

```javascript
auth: {
  token: "YOUR_JWT_TOKEN"
}
```

## API Testing and Screenshots

All REST API endpoints should be tested using Postman.

The following screenshots demonstrate the application functionality:

### 1. Authentication Testing
- User registration response.
- Successful login response with JWT.

### 2. Protected API Testing
- Access attempt without authentication.
- Successful note creation.
- Retrieval of saved notes.

### 3. Real-Time Communication
- Socket.IO connection.
- Chat room activity.
- Server-side communication logs.

**Screenshots Directory:**

```text
screenshots/
├── signup.png
├── login.png
├── unauthorized.png
├── create-note.png
├── get-notes.png
└── chat-activity.png
```

*Replace these with your actual Postman and server screenshots.*

## Learning Outcomes

Through this practical assignment, the following concepts are demonstrated:

1. REST API development using Express.js.
2. Authentication and authorization using JWT.
3. Secure password handling using bcrypt.
4. Middleware implementation.
5. MongoDB database integration.
6. Role-Based Access Control (RBAC).
7. Real-time communication using Socket.IO.
8. Event-driven programming using EventEmitter.
9. API validation and testing through Postman.

## Conclusion

CipherNest demonstrates the development of a secure and modular backend application. It combines authentication, authorization, database operations, and real-time communication into one platform.

This project provides practical exposure to backend development concepts and secure API design using the Node.js ecosystem.

---

**Project:** CipherNest  
**Course:** Web Development III  
**Lab Assignment:** 4
