interface Author {
  fullName: string;
}

interface PredefinedShelf {
  shelfName: string;
}

interface Book {
  id: number;
  title: string;
  img: string;
  author: Author;
  predefinedShelf: PredefinedShelf;
  bookGenre: string[];
  numberOfPages: number;
  rating: number;
}

// Simulated database of books
const booksDB: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
    author: { fullName: "F. Scott Fitzgerald" },
    predefinedShelf: { shelfName: "readingBooks" },
    bookGenre: ["Fiction"],
    numberOfPages: 200,
    rating: 4.5,
  },
  // Add other books following the same structure...
];

class BookAPI {
  static fetchBooks(): Promise<Book[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...booksDB]), 100); // Simulate async operation
    });
  }

  static addBook(book: Book): Promise<Book> {
    return new Promise((resolve) => {
      const newBook: Book = { ...book, id: Math.max(0, ...booksDB.map(b => b.id)) + 1 }; // Ensure unique ID
      booksDB.push(newBook);
      setTimeout(() => resolve(newBook), 100);
    });
  }

  static updateBook(bookId: number, updatedBookInfo: Partial<Book>): Promise<Book | null> {
    return new Promise((resolve) => {
      const index = booksDB.findIndex(book => book.id === bookId);
      if (index !== -1) {
        const updatedBook: Book = { ...booksDB[index], ...updatedBookInfo };
        booksDB[index] = updatedBook;
        setTimeout(() => resolve(updatedBook), 100);
      } else {
        setTimeout(() => resolve(null), 100);
      }
    });
  }

  static deleteBook(bookId: number): Promise<Book | null> {
    return new Promise((resolve) => {
      const index = booksDB.findIndex(book => book.id === bookId);
      if (index !== -1) {
        const [deletedBook] = booksDB.splice(index, 1);
        setTimeout(() => resolve(deletedBook), 100);
      } else {
        setTimeout(() => resolve(null), 100);
      }
    });
  }
}

export default BookAPI;
