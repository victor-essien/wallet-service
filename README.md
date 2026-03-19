# Wallet Service API (Lendsqr Backend Assessment)

## 📌 Overview

This project is a **Wallet Service MVP** for Demo Credit a lending platform. It enables users to:

* Create an account
* Receive funds 
* Transfer funds to other users
* Withdraw funds
* View transaction history and summaries

The system is built with a focus on:

* Clean architecture
* Type safety
* Transaction integrity
* Scalability and maintainability

---

## 🚀 Live URL

```
https://victor-essien-lendsqr-be-test.onrender.com
```

---

## 📂 GitHub Repository

```
https://github.com/victor-essien/wallet-service
```

---

## 🧠 Design Approach

### Architecture

The project follows a **modular architecture(feature-based)**:

```
Modules > Feature > Feature.controller → Feature.repository → Feature.routes → Feature.service → Feature.types
```

* **Routes**: Contains each feature routes
* **Service**: Contains business logic
* **Repository**: Handles database queries
* **Database**: MySQL via Knex.js

---

### Key Design Decisions

#### 1. UUID for Primary Keys

* Ensures global uniqueness
* Prevents ID collision
* Stored as `VARCHAR`

#### 2. Transaction-Based Operations

All financial operations (fund, transfer, withdraw) use **database transactions** to ensure:

* Atomicity
* Consistency
* No partial updates

#### 3. Separation of Concerns

* Business logic is isolated in each feature services
* Database logic is isolated in each feature repositories
* External APIs handled in dedicated services

#### 4. DRY Principle

* Shared utilities (error handling, responses, validation)
* Reusable repository patterns

---

## 🏗️ Tech Stack

* **Node.js (LTS)**
* **TypeScript**
* **Express.js**
* **MySQL**
* **Knex.js**
* **Jest (Unit Testing)**
* **Docker (optional setup)**
* **OpenAPI**

---

## 📁 Project Structure

```
src/
├── config/
├── database/
├── middleware/
├── modules/
│   ├── user/
│   ├── wallet/
│   └── transaction/
├── services/
├── types/
├── tests/
├── utils/
├── docs/
│   └── openapi.yaml
├── app.ts
└── server.ts

```

---

## 🧩 Features

### 👤 User

* Create account
* Prevent onboarding if blacklisted (Karma API)

### 💰 Wallet

* Fund wallet
* Transfer funds
* Withdraw funds

### 💳 Transactions

* View transaction history
* View transaction summary:

  * Total funded
  * Total withdrawn
  * Total sent
  * Total received

---

## 🔗 API Endpoints

### User

* `POST /api/users` → Create user
* `GET /api/users/:id` → Get user

### Wallet

* `POST /api/wallet/fund`
* `POST /api/wallet/transfer`
* `POST /api/wallet/withdraw`

### Transactions

* `GET /api/transactions/:userId`
* `GET /api/transactions/:userId/summary`

---

## 📄 API Documentation

Swagger UI available at:

```
http://localhost:3000/api-docs
```

---

## 🗄️ Database Design

### Entities:

* **Users**
* **Wallets**
* **Transactions**

### Relationships:

* One user → one wallet (1:1)
* One user → many transactions (1:N)

---

## 📊 ER Diagram

![ER Diagram](./docs/erd.png)

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/<victor-essien>/wallet-service.git
cd wallet-service
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=wallet_db
APP_ID=
ADJUTOR_API_KEY=
ADJUTOR_BASE_URL=
```

---

### 4. Run Database (Docker)

```bash
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:8
```

---

### 5. Run Migrations

```bash
npx knex migrate:latest --knexfile ./src/database/knexfile.ts
```

---

### 6. Start Server

```bash
npm run dev
```

---

## 🧪 Unit Testing

Run tests:

```bash
npm test
```

### Testing Strategy

* **Unit tests** written using Jest
* Dependencies (DB, external APIs) are **mocked**
* Covers:

  * Positive scenarios (successful operations)
  * Negative scenarios (errors, edge cases)

### Example Cases

* User creation:

  * success
  * duplicate email
  * blacklisted user

* Wallet:

  * fund success
  * insufficient funds
  * self-transfer prevention

* Transactions:

  * history retrieval
  * empty result handling

---

## 🔒 Rate Limiting

Applied on sensitive routes:

* Fund
* Transfer
* Withdraw

Prevents abuse and excessive requests.

---

## ⚠️ Error Handling

Centralized error handling using custom `AppError` class.

---

## 📝 Additional Notes

* Faux token-based authentication used (as required)
* External Karma blacklist API mocked (can be easily integrated)
* Designed for extensibility (e.g., KYC, audit logs, notifications)

---

## ✅ Assessment Checklist

* [x] Node.js + TypeScript API
* [x] MySQL + Knex.js
* [x] Wallet functionality
* [x] Karma blacklist integration
* [x] Unit tests
* [x] ER diagram
* [x] OpenAPI documentation
* [x] Deployment

---

## 👤 Author

**Victor Essien**

---
