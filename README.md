## 💸 Project: Money Orders – Mini Banking Application

This is a secure, role-based **Mini Bank Application** developed with **Node.js**, supporting core banking features like **money transfer**, **deposit**, and **withdrawal**. It includes two distinct servers to enhance modularity and request validation.

---

### 🛠 Tech Stack

- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Authentication**: JWT-based login system
- **Authorization**: Role-based access control (RBAC)
- **Inter-Service Communication**: REST API-based server-to-server validation
- **Email Service**: Mail-based OTP system for password reset
- **Containerization**: Dockerized setup using Docker Compose

---

### 🔐 Features

#### 🔹 User Role (Customer):
- View account balance and transaction history
- Deposit and withdraw money
- Send money to other users
- Secure password reset with OTP via email

#### 🔹 Admin Role:
- View and manage all user accounts
- Monitor all transactions
- Manage suspicious or flagged transfers
- Control limits and policies

---

### 🧱 System Architecture

- **Main Server (API Gateway)**:
  - Handles user authentication, basic validation, and business logic
  - Sends request to Validator Server for sensitive operations

- **Validator Server**:
  - Responsible for verifying sender/receiver account status, balance, and fraud checks
  - Sends back response to the Main Server to approve or reject transactions

---

### 📦 RESTful APIs

- Clean and modular route structure
- Protected routes based on roles (Admin or Customer)
- Organized by operation: `/deposit`, `/withdraw`, `/transfer`, `/history`

---

### 📧 Authentication and Security

- **JWT-based Auth**: Login system for secure session handling
- **Role-Based Access**: Only authorized roles can access specific routes
- **OTP via Email**: Password reset and identity verification

---

### 🐳 Docker Usage

```bash
# Build and run all services
docker-compose up --build

# Stop all services
docker-compose down
