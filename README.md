# 📝 Blog API with Swagger Documentation

A production-ready RESTful API for a blogging platform, built with **Node.js**, **Express**, and **Prisma ORM**.
This project features a centralized Swagger configuration for clear and interactive API documentation.

## 🌟 Key Features

- **🔐 Authentication:** Secure SignUp & Login using JWT & Bcrypt.
- **📄 Post Management:** Create, Read, Update, and Delete (CRUD) posts.
- **🖼️ Media Handling:** Image upload functionality using Multer.
- **💬 Comment System:** Add and manage comments on posts.
- **🔍 Advanced Features:** Pagination, Search, and Filtering.
- **📚 Documentation:** Interactive API docs generated with Swagger UI (Centralized Config).
- **🗄️ Database:** PostgreSQL managed via Prisma ORM.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Documentation:** Swagger UI Express & Swagger JSDoc

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hypnotize1/blog-api-express.git
cd blog-api-express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
Create a .env file in the root directory and add your credentials:
```

### 4. Run Migrations

```bash
npx prisma migrate dev
```

### 5. Start the Server

```bash
npm run dev
```

## 📚 API Documentation

```bash
After starting the server, you can access the interactive API documentation at: http://localhost:3000/api-docs
```
