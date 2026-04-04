# Subscription Analytics System

## 📌 Project Overview
The Subscription Analytics System is a database-driven project designed to analyze user behavior, revenue generation, and engagement patterns in a subscription-based platform (such as OTT services).

This project demonstrates how structured data can be stored, managed, and analyzed using SQL to generate meaningful business insights.

---

## 🎯 Objectives
- Design a relational database for subscription platforms
- Track user activity and engagement
- Analyze revenue and subscription trends
- Perform analytics such as DAU, churn, and content popularity

---

## 🏗️ System Architecture

The system is divided into three core modules:

1. **Database Schema (`schema.sql`)**
   - Defines table structure and relationships

2. **Sample Data (`sample_data.sql`)**
   - Simulates real-world user activity and subscriptions

3. **Analytics Queries (`queries.sql`)**
   - Extracts insights from the dataset

---

## 🗂️ Database Tables

| Table Name    |      Description               |
|---------------|--------------------------------|
| Users         | Stores user details            |
| Plans         | Subscription plans and pricing |
| Subscriptions | Tracks user subscriptions      |
| Content       | Stores available content       |
| WatchHistory  | Tracks user viewing activity   |
| UserLogs      | Records user actions           |

---

## 🧩 Entity Relationship (ER) Design

- A **User** can have multiple **Subscriptions**
- A **Plan** can be used by multiple users
- A **User** can watch multiple **Content items**
- **WatchHistory** connects Users and Content
- **UserLogs** track user activities

This design ensures normalization and avoids redundancy.

---

## 🧠 Database Design Concepts Used

- Normalization (up to 3NF)
- Primary Key & Foreign Key constraints
- Data integrity enforcement
- Use of ENUM for subscription status
- Indexing for performance optimization

---

## ⚙️ Technologies Used

- MySQL (WAMP Server)
- phpMyAdmin
- Git & GitHub
- SQL

---

## 📊 Key Features

- Daily Active Users (DAU) tracking  
- Revenue analysis  
- Top content identification  
- Churn detection  
- User engagement metrics  
- Monthly revenue trends  

---

## 📊 Sample Analytics Queries

- **DAU (Daily Active Users):**
  Counts unique users active per day

- **Revenue Calculation:**
  Computes revenue from active subscriptions

- **Churn Analysis:**
  Identifies users with cancelled or expired subscriptions

- **Top Content:**
  Finds most watched content

- **Engagement Metrics:**
  Calculates average watch time per user

---

## 🔄 Workflow

1. Create database schema (`schema.sql`)
2. Insert sample data (`sample_data.sql`)
3. Execute analytics queries (`queries.sql`)

---

## 🚀 How to Run

1. Start WAMP Server  
2. Open phpMyAdmin  
3. Create database:
   ```sql
   CREATE DATABASE subscription_analytics;
