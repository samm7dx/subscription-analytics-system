# 📊 Subscription Analytics System (Full Stack)

## 📌 Project Overview

The Subscription Analytics System is a **full-stack analytics dashboard** that analyzes user behavior, revenue, and engagement patterns for a subscription-based platform (like OTT services).

It combines:

* **MySQL database**
* **Express.js backend APIs**
* **React frontend dashboard with charts**

---

## 🎯 Objectives

* Design a scalable relational database
* Build APIs to fetch analytics data
* Visualize insights using interactive charts
* Simulate real-world analytics system

---

## 🏗️ System Architecture

```
MySQL Database
      ↓
Express.js Backend (API Layer)
      ↓
React Frontend (Dashboard + Charts)
```

---

## 🗂️ Database Tables

| Table Name    | Description        |
| ------------- | ------------------ |
| Users         | User details       |
| Plans         | Subscription plans |
| Subscriptions | User subscriptions |
| Content       | Content catalog    |
| WatchHistory  | Viewing activity   |
| UserLogs      | User actions/logs  |

---

## 🧠 Features

### 🔹 Backend (Node.js + Express)

* REST APIs for analytics
* Dynamic query execution
* MySQL integration using mysql2

### 🔹 Frontend (React + Chart.js)

* KPI dashboard
* Interactive charts
* Query-based analytics visualization

### 🔹 Analytics Supported

* Daily Active Users (DAU)
* Revenue analysis
* Top content
* Churn analysis
* Genre engagement

---

## ⚙️ Technologies Used

* MySQL
* Node.js + Express
* React (Vite)
* Chart.js
* Git & GitHub

---

## 📊 Key Features

* 📈 Real-time analytics dashboard
* 📊 Interactive charts
* 🔍 Query-based insights (buttons trigger SQL queries)
* 🧾 Data visualization + tables
* ⚡ Full-stack integration

---

## 🔄 Workflow

1. Create database (`schema.sql`)
2. Insert data (`sample_data.sql`)
3. Start backend server
4. Run frontend dashboard
5. View analytics in browser

---

## 🚀 How to Run

### 1️⃣ Setup Database

```sql
CREATE DATABASE subscription_analytics;
USE subscription_analytics;
SOURCE database/schema.sql;
SOURCE database/sample_data.sql;
```

---

### 2️⃣ Start Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Open Dashboard

```
http://localhost:5173
```

---

## 📌 Future Improvements

* Authentication (JWT)
* Advanced filters (date range, genre)
* Export data (CSV/PDF)
* Deployment (Vercel + Render)
* Real-time updates

---

## 💡 Learning Outcomes

* Full-stack development (DB + API + UI)
* SQL analytics and optimization
* REST API design
* Data visualization
* Debugging real-world issues

---

## ⭐ Author

**Samridh Raj**
