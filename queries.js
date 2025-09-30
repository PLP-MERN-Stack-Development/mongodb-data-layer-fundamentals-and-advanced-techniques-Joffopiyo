// queries.js
// MongoDB Queries for PLP Bookstore Assignment - Week 1

// ============================================================================
// TASK 2: BASIC CRUD OPERATIONS
// ============================================================================

print("=== TASK 2: BASIC CRUD OPERATIONS ===");

// 2.2 Find all books in a specific genre
print("\n📚 2.2 Find all books in 'Fiction' genre:");
const fictionBooks = db.books.find({ genre: "Fiction" });
printjson(fictionBooks.toArray());

// 2.3 Find books published after a certain year
print("\n📚 2.3 Find books published after 2010:");
const booksAfter2010 = db.books.find({ published_year: { $gt: 2010 } });
printjson(booksAfter2010.toArray());

// 2.4 Find books by a specific author
print("\n📚 2.4 Find books by 'J.K. Rowling':");
const rowlingBooks = db.books.find({ author: "J.K. Rowling" });
printjson(rowlingBooks.toArray());

// 2.5 Update the price of a specific book
print("\n📚 2.5 Update price of 'The Great Gatsby' to $12.99:");
const updateResult = db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { price: 12.99 } }
);
printjson(updateResult);

// Verify the update
print("Updated book:");
const updatedBook = db.books.findOne({ title: "The Great Gatsby" });
printjson(updatedBook);

// 2.6 Delete a book by its title
print("\n📚 2.6 Delete 'To Kill a Mockingbird':");
const deleteResult = db.books.deleteOne({ title: "To Kill a Mockingbird" });
printjson(deleteResult);

// Verify deletion by counting
print("Remaining books count: " + db.books.countDocuments());

// ============================================================================
// TASK 3: ADVANCED QUERIES
// ============================================================================

print("\n\n=== TASK 3: ADVANCED QUERIES ===");

// 3.1 Find books that are both in stock and published after 2010
print("\n📚 3.1 Books in stock AND published after 2010:");
const inStockAfter2010 = db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
});
printjson(inStockAfter2010.toArray());

// 3.2 Use projection to return only title, author, and price fields
print("\n📚 3.2 Projection - Only title, author, price (first 3 books):");
const projectedBooks = db.books.find(
    {},
    { title: 1, author: 1, price: 1, _id: 0 }
).limit(3);
printjson(projectedBooks.toArray());

// 3.3 Implement sorting by price (ascending and descending)
print("\n📚 3.3 Books sorted by price (Ascending - first 3):");
const sortByPriceAsc = db.books.find().sort({ price: 1 }).limit(3);
printjson(sortByPriceAsc.toArray());

print("\n📚 3.3 Books sorted by price (Descending - first 3):");
const sortByPriceDesc = db.books.find().sort({ price: -1 }).limit(3);
printjson(sortByPriceDesc.toArray());

// 3.4 Implement pagination with limit and skip
print("\n📚 3.4 Pagination - Page 1 (books 1-5):");
const paginationPage1 = db.books.find().limit(5).skip(0);
printjson(paginationPage1.toArray());

print("\n📚 3.4 Pagination - Page 2 (books 6-10):");
const paginationPage2 = db.books.find().limit(5).skip(5);
printjson(paginationPage2.toArray());

// ============================================================================
// TASK 4: AGGREGATION PIPELINE
// ============================================================================

print("\n\n=== TASK 4: AGGREGATION PIPELINE ===");

// 4.1 Calculate average price of books by genre
print("\n📚 4.1 Average price by genre:");
const avgPriceByGenre = db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" },
            bookCount: { $sum: 1 }
        }
    },
    {
        $sort: { averagePrice: -1 }
    }
]);
printjson(avgPriceByGenre.toArray());

// 4.2 Find author with the most books
print("\n📚 4.2 Author with most books:");
const authorWithMostBooks = db.books.aggregate([
    {
        $group: {
            _id: "$author",
            bookCount: { $sum: 1 }
        }
    },
    {
        $sort: { bookCount: -1 }
    },
    {
        $limit: 3
    }
]);
printjson(authorWithMostBooks.toArray());

// 4.3 Group books by publication decade and count them
print("\n📚 4.3 Books grouped by publication decade:");
const booksByDecade = db.books.aggregate([
    {
        $project: {
            title: 1,
            author: 1,
            published_year: 1,
            decade: {
                $subtract: [
                    "$published_year",
                    { $mod: ["$published_year", 10] }
                ]
            }
        }
    },
    {
        $group: {
            _id: "$decade",
            bookCount: { $sum: 1 },
            books: { $push: "$title" }
        }
    },
    {
        $sort: { _id: 1 }
    }
]);
printjson(booksByDecade.toArray());

// ============================================================================
// TASK 5: INDEXING
// ============================================================================

print("\n\n=== TASK 5: INDEXING ===");

// 5.1 Create index on title field
print("\n📚 5.1 Creating index on title field:");
const titleIndexResult = db.books.createIndex({ title: 1 });
printjson({ titleIndex: titleIndexResult });

// 5.2 Create compound index on author and published_year
print("\n📚 5.2 Creating compound index on author and published_year:");
const compoundIndexResult = db.books.createIndex({ author: 1, published_year: -1 });
printjson({ compoundIndex: compoundIndexResult });

// 5.3 Use explain() to demonstrate performance improvement
print("\n📚 5.3 Performance analysis with explain() - Searching for 'The Great Gatsby':");
const explainResult = db.books.find({ title: "The Great Gatsby" }).explain("executionStats");
printjson({
    executionTimeMillis: explainResult.executionStats.executionTimeMillis,
    totalDocsExamined: explainResult.executionStats.totalDocsExamined,
    stage: explainResult.executionStats.executionStages.stage
});

// List all indexes
print("\n📚 Current indexes on books collection:");
const indexes = db.books.getIndexes();
printjson(indexes);

print("\n✅ All tasks completed successfully!");