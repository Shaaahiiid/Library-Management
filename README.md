# 📚 Library Management System (DBMS Project)

A **Library Management System** built using **HTML, CSS, JavaScript, and SQLite** that demonstrates core **Database Management System (DBMS)** concepts with a functional web interface.

This project allows management of:

- 📚 Books
- 👥 Users
- 🔁 Borrowing & Returns
- 📊 Reports & Search

It combines **frontend development + relational database design** for a complete academic and portfolio-ready system.

---

## 🚀 Features

### 📊 Dashboard
- Total books
- Available books
- Borrowed books
- Active users
- Recent transactions

### 📚 Books Management
- Add / Edit / Delete books
- Track availability
- Search by title, author, genre, ISBN

### 👥 Users Management
- Add / Edit / Delete users
- Active/Inactive status
- Email & phone tracking

### 🔁 Borrowing System
- Borrow books
- Return books
- 14-day due date
- Automatic overdue detection
- Fine calculation ($0.50/day)

### 📈 Reports & Search
- Overdue books count
- Most borrowed book
- Active users count
- Global advanced search

---

## 🛠 Tech Stack

| Layer | Technology |
|---------|-------------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Database | SQLite |
| Server | Live Server |
| Architecture | Client-side + Relational DB |

---

---

## 🗄️ Database Design

The system uses an **SQLite database (`librayms.db`)** to store persistent data.

### 📘 Books Table
| Field | Type |
|-----------|----------|
| id (PK) | TEXT |
| isbn | TEXT |
| title | TEXT |
| author | TEXT |
| genre | TEXT |
| publicationYear | INTEGER |
| totalCopies | INTEGER |
| availableCopies | INTEGER |

---

### 👤 Users Table
| Field | Type |
|-----------|----------|
| id (PK) | TEXT |
| name | TEXT |
| email | TEXT |
| phone | TEXT |
| membershipDate | DATE |
| isActive | BOOLEAN |

---

### 🔁 Transactions Table
| Field | Type |
|-----------|----------|
| id (PK) | TEXT |
| userId (FK) | TEXT |
| bookId (FK) | TEXT |
| borrowDate | DATE |
| dueDate | DATE |
| returnDate | DATE |
| status | TEXT |
| fineAmount | REAL |

---

## 🔗 Relationships

- One User → Many Transactions  
- One Book → Many Transactions  
- Foreign keys maintain data integrity  

---

## 🧠 DBMS Concepts Implemented

- Relational database design  
- Primary & Foreign keys  
- Normalization  
- CRUD operations  
- Data consistency  
- Transaction tracking  
- Search queries  
- Reports generation  

---

## 🎯 Learning Outcomes

- DOM manipulation
- JavaScript OOP
- CRUD logic
- Database design
- Search/filter algorithms
- DBMS implementation

---

## 👨‍💻 Author

**Shahid Rashid Shaikh**  
SY B.Tech – CSE (Artificial Intelligence)


