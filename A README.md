# 📚 PLP Bookstore - MongoDB Assignment

## Project Description
This project demonstrates MongoDB database operations for a bookstore management system. It includes CRUD operations, advanced queries, aggregation pipelines, and indexing strategies.

## 🛠️ Technologies Used
- **MongoDB** - Database
- **MongoDB Shell (mongosh)** - Command-line interface
- **JavaScript** - Query scripts
- **MongoDB Compass** - GUI (optional)

## 📁 Project Structure
plp-bookstore/
├── insert_books.js # Script to populate the database
├── queries.js # All MongoDB queries for the assignment
├── README.md # This file
└── (screenshot files) # Screenshots for submission


## 🗄️ Database Information
- **Database Name**: `plp_bookstore`
- **Collection Name**: `books`
- **Total Documents**: 15 books

### Book Schema
Each document has the following fields:
```javascript
{
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String
}

🚀 Installation & Setup
Prerequisites
MongoDB installed locally or MongoDB Atlas account

MongoDB Shell (mongosh)

Node.js (v18 or higher) - for running JavaScript files

Step 1: Start MongoDB Service
Windows:
cmd
net start MongoDB

Mac/Linux:
brew services start mongodb-community
# or
sudo systemctl start mongod

Step 2: Verify MongoDB is Running
mongosh --version

📥 How to Run the Scripts
Method 1: Complete Setup (Recommended)
1. Populate the Database:
 - bash mongosh mongodb://localhost:27017/ insert_books.js
Expected Output: ✅ Books collection populated successfully!

2. Execute All Queries:
- bash mongosh mongodb://localhost:27017/ queries.js

This runs all tasks from the assignment.

Method 2: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to: mongodb://localhost:27017/
3. Go to the "Shell" tab
4. Run:
    load("insert_books.js")
load("queries.js")

Method 3: Using MongoDB Atlas
Replace localhost:27017 with your Atlas connection string:
mongosh "mongodb+srv://username:password@cluster.xxx.mongodb.net/" insert_books.js
mongosh "mongodb+srv://username:password@cluster.xxx.mongodb.net/" queries.js

📋 What Each Script Does
insert_books.js
** Creates plp_bookstore database
- Creates books collection
- Inserts 12 sample book documents
- Includes various genres, authors, and publication years

queries.js
Contains all assignment tasks:

🎯 Task 2: Basic CRUD Operations
Find books by genre, author, year
Update book prices
Delete books by title

🎯 Task 3: Advanced Queries
Complex filters with multiple conditions
Field projection
Sorting (ascending/descending)
Pagination with limit and skip

🎯 Task 4: Aggregation Pipeline
Average price by genre
Author with most books
Books grouped by publication decade

🎯 Task 5: Indexing
Single field index on title
Compound index on author and published_year
Performance analysis with explain()

🧪 Testing the Setup
Verify Database Creation
mongosh mongodb://localhost:27017/ --eval "use plp_bookstore; db.books.countDocuments()"
Expected Output: 12

Check Collection Contents
mongosh mongodb://localhost:27017/ --eval "use plp_bookstore; db.books.find().limit(2)"

🐛 Troubleshooting
Common Issues & Solutions
1. "mongosh command not found"
- Install MongoDB Shell from MongoDB website
- Or use the older mongo command instead

2. Connection refused errors
# Check if MongoDB service is running
net start MongoDB  # Windows
brew services list # Mac
sudo systemctl status mongod # Linux

3. "Database/Collection not found"
. Run insert_books.js first to create the database and collection

4. Script file not found
- Ensure you're in the correct directory containing the JavaScript files
- Use full path: mongosh /full/path/to/insert_books.js

📸 Expected Output
When you run queries.js, you should see:
=== TASK 2: BASIC CRUD OPERATIONS ===
📚 2.2 Find all books in 'Fiction' genre:
[array of fiction books...]

=== TASK 3: ADVANCED QUERIES ===
📚 3.1 Books in stock AND published after 2010:
[array of books...]

=== TASK 4: AGGREGATION PIPELINE ===
📚 4.1 Average price by genre:
[aggregation results...]

=== TASK 5: INDEXING ===
📚 5.1 Creating index on title field:
{ "titleIndex": "title_1" }

✅ All tasks completed successfully!

📊 Sample Queries You Can Run Manually
After setup, try these in MongoDB Shell:
use plp_bookstore

// Find all Fantasy books
db.books.find({ genre: "Fantasy" })

// Find books cheaper than $12
db.books.find({ price: { $lt: 12 } })

// Count books by genre
db.books.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }])

📝 Submission Requirements
✅ All JavaScript files (insert_books.js, queries.js)

✅ This README.md file

✅ Screenshots of:

MongoDB Compass showing books collection

Query results in terminal

Indexes in the database

✅ Code pushed to GitHub Classroom

👨‍💻 Author
Student - PLP MongoDB Fundamentals Assignment

📄 License
This project is for educational purposes as part of the PLP curriculum.

This README.md file provides:
- Clear, step-by-step instructions for running your scripts
- Comprehensive troubleshooting guide
- Detailed explanation of what each script does
- Expected outputs and verification steps
- All the information needed for successful submission

The instructions are beginner-friendly and cover multiple ways to run the scripts depending on the user's setup.