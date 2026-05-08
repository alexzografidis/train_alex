# Task Manager

A simple full-stack task manager with a React frontend and Node.js/Express backend.

## Features

- Add tasks
- View all tasks
- Mark tasks as complete
- Delete tasks

## Stack

- **Frontend:** React + Vite (port 5173)
- **Backend:** Node.js + Express (port 3001)
- **Storage:** In-memory (no database)

## Getting Started

Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Run backend:

```bash
cd backend && npm run dev
```

Run frontend (separate terminal):

```bash
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task `{ title }` |
| PATCH | `/api/tasks/:id` | Toggle completed |
| DELETE | `/api/tasks/:id` | Delete a task |
