# Full Stack Application Setup

This project contains both the **Backend** and **Frontend** for the application. Follow the instructions below to set up the project on your local machine.

---

## 📁 Clone the Repository

```bash
git clone https://github.com/RakeshChoudhary29/kennectAssignment
```

---

## 🔧 Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm i
```

3. Create a `.env` file in the `backend` directory and add the required environment variables. Example:

```
JWT_SECRET = your_jwt_secret
MONGO_URL=mongourl
```

> 🛠 Modify the variables as per your project needs.

4. Start the backend server:

```bash
npm start
```

---

## 💻 Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm i
```

3. Create a `.env` file in the `frontend` directory and add the required environment variables. Example:

```
VITE_BASE_URL=http://localhost:3000
```

> 🛠 Ensure the `VITE_` prefix for frontend env variables (Vite-specific).

4. Start the development server:

```bash
npm run dev
```

---

## 🌐 Access the Application

Once both servers are running, open your browser and navigate to:

```
http://localhost:5173/
```

---

## ✅ Requirements

- Node.js and npm installed
- Proper `.env` configuration in both `backend/` and `frontend/` folders

---

## 🧾 Summary

| Part     | Command(s)                            |
| -------- | ------------------------------------- |
| Clone    | `git clone <repo>`                    |
| Backend  | `cd backend && npm i && npm start`    |
| Frontend | `cd frontend && npm i && npm run dev` |
| App URL  | `http://localhost:5173/`              |

---

Happy coding! 💻🚀
