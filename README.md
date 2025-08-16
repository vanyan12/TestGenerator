# Test Generation & Assessment Platform

## 1. Overview

This project is a modern web application designed for generating, administering, and reviewing tests. It provides a seamless user experience for both test-takers and administrators, featuring a secure authentication system, dynamic test generation from PDF, and a data-rich dashboard for reviewing past results.

The frontend is built with React and Material-UI, consuming a backend API for authentication, data retrieval, and test processing.

---

## 2. Table of Contents

- [Features](#3-features)
- [Tech Stack](#4-tech-stack)
- [Prerequisites](#5-prerequisites)
- [Installation & Setup](#6-installation--setup)
  - [Backend](#61-backend)
  - [Frontend](#62-frontend)
- [Running the Application](#7-running-the-application)
- [Project Structure](#8-project-structure)
- [API Endpoints](#9-api-endpoints)
- [License](#10-license)

---

## 3. Features

- **Secure Authentication**: User login/logout functionality using JWTs stored in secure cookies.
- **Dynamic Test Generation**: Users can request and generate new tests based on specified criteria (e.g., maximum score).
- **Interactive Test-Taking**: View test PDFs directly in the browser and submit answers through an intuitive interface.
- **Automated Scoring**: User-submitted answers are automatically checked and scored.
- **Results Dashboard**: A comprehensive dashboard using a data grid to view, sort, and filter historical test results.
- **PDF Handling**: Functionality to open test PDFs in a new tab or download them directly.
- **Responsive Design**: A clean, responsive UI built with Material-UI, ensuring a great experience on all devices.

---

## 4. Tech Stack

### Frontend

- **Framework**: [React](https://reactjs.org/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: React Context API
- **HTTP Client**: [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **Package Manager**: [npm](https://www.npmjs.com/)

### Backend (Assumed)

- **Environment**: Node.js / Python
- **Framework**: Express / FastAPI / Django
- **Authentication**: JSON Web Tokens (JWT)

---

## 5. Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running instance of the backend server.

---

## 6. Installation & Setup

Follow these steps to get the development environment running.

### 6.1. Backend

1.  **Clone the backend repository** (if separate):
    ```bash
    git clone <your-backend-repo-url>
    cd <backend-directory>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file and add necessary variables (e.g., `DATABASE_URL`, `JWT_SECRET`).
4.  **Start the server**:
    ```bash
    npm start
    ```
    The backend server should now be running on `http://localhost:8000`.

### 6.2. Frontend

1.  **Navigate to the frontend directory**:
    ```bash
    cd webpage/website
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

---

## 7. Running the Application

Once the setup is complete, run the following command in the `webpage/website` directory to start the React development server:

```bash
npm start
```

The application will open automatically in your default browser at `http://localhost:3000`.

---

## 8. Project Structure

The frontend source code is located in `webpage/website/src`.

```
src/
├── assets/         # Static assets like images and fonts
├── Components/     # Shared components and application context
│   ├── AuthContext.jsx # Global authentication state
│   └── components/     # Smaller, reusable UI components (e.g., SignInCard)
├── pages/          # Main page components for each route
│   ├── DataGrid.jsx    # User test history dashboard
│   ├── Dashboard.jsx   # Main dashboard page
│   └── TestGen.jsx     # Test generation and taking page
├── App.js          # Main application component with routing
└── index.js        # Entry point of the React application
```

---

## 9. API Endpoints

The frontend application interacts with the following backend endpoints:

| Method | Endpoint                | Description                                             |
| :----- | :---------------------- | :------------------------------------------------------ |
| `GET`  | `/auth-check`           | Checks if the user has a valid session.                 |
| `POST` | `/login`                | Authenticates a user and returns a JWT cookie.          |
| `POST` | `/logout`               | Clears the user's session cookie.                       |
| `GET`  | `/can-generate`         | Checks if the user is permitted to generate a new test. |
| `GET`  | `/pdf`                  | Generates and returns metadata for a new test PDF.      |
| `GET`  | `/get-test/{file_path}` | Fetches a specific test PDF file.                       |
| `POST` | `/check-answers`        | Submits user answers for scoring.                       |
| `GET`  | `/get-history`          | Fetches the user's test history for the data grid.      |

---

## 10. License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

For questions, suggestions, or issues, please:

- Open an issue on [GitHub](https://github.com/vanyan12/TestGenerator/issues).
- Contact the maintainer: [vanyan12](https://github.com/vanyan12).

---

