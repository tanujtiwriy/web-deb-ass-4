# Secure Connect and Communication Platform

**Course:** Web Dev III | **Lab 4** | Unit 4

A secure Node.js backend with signup/login, JWT authentication, protected routes, a Notes API, role-based access control (RBAC), real-time chat with Socket.IO, and event-driven features using `EventEmitter`.

## Tech Stack

- Node.js, Express.js
- MongoDB (mongoose)
- jsonwebtoken (JWT), bcrypt
- dotenv
- Socket.IO

## Features

- Signup and login with bcrypt password hashing
- JWT authentication (token via `Authorization: Bearer` header or cookie)
- Protected routes with a reusable auth middleware
- Secure Notes API (CRUD, each user sees only their own notes)
- RBAC: admin-only route `GET /api/admin/users`
- Real-time chat rooms with JWT-authenticated Socket.IO connections
- Event-driven logging with Node.js `EventEmitter`

## Folder Structure

```
Secure_connect_platform/
├── middleware/auth.js
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

## Setup

```bash
git clone <your-repo-link>
cd Secure_connect_platform
npm install
```

Create a `.env` file (see `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secure_connect
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1h
```

Start MongoDB, then run:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive a JWT |
| POST | `/api/notes` | Yes | Create a note |
| GET | `/api/notes` | Yes | List notes of the logged-in user |
| GET | `/api/notes/:id` | Yes | Get one note |
| PUT | `/api/notes/:id` | Yes | Update a note |
| DELETE | `/api/notes/:id` | Yes | Delete a note |
| GET | `/api/admin/users` | Admin only | List all users |

## Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `joinRoom` | client → server | Join a chat room (default `general`) |
| `chatMessage` | both | Send a message / receive a broadcast |
| `systemMessage` | server → client | Join notifications |

Sockets are authenticated with the same JWT (`auth: { token }`).

## Output Screenshots

### Fig 1. Signup and login responses

**Signup (201 Created)**

![Signup](screenshots/fig1a_signup.png)

**Login (200 OK, JWT returned)**

![Login](screenshots/fig1b_login.png)

### Fig 2. Notes API: blocked without a token, accessible with a valid JWT

**Without token (403 Forbidden)**

![Notes without token](screenshots/fig2a_notes_no_token_403.png)

**Create note with token (201 Created)**

![Create note](screenshots/fig2b_post_note1.png)

**Get notes with token (200 OK)**

![Get notes](screenshots/fig2d_get_notes_200.png)

### Fig 3. Real-time chat activity logged via Socket.IO

![Chat server log](screenshots/fig3_chat_server_log.png)

## Concepts Covered

Authentication, Authorization, JWT, bcrypt, Protected Routes, RBAC, dotenv, WebSockets, Socket.IO, EventEmitter, Real-Time Communication
