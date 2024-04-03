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
  {
    id: 2,
    title: "1984",
    img: "https://placeholder.com/cover/1984",
    author: { fullName: "George Orwell" },
    predefinedShelf: { shelfName: "favoriteBooks" },
    bookGenre: ["Fiction", "Dystopian"],
    numberOfPages: 328,
    rating: 4.7,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    img: "https://placeholder.com/cover/to-kill-a-mockingbird",
    author: { fullName: "Harper Lee" },
    predefinedShelf: { shelfName: "favoriteBooks" },
    bookGenre: ["Fiction", "Social Issues"],
    numberOfPages: 281,
    rating: 4.8,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    img: "https://placeholder.com/cover/pride-and-prejudice",
    author: { fullName: "Jane Austen" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["Fiction", "Romance"],
    numberOfPages: 432,
    rating: 4.6,
  },
  {
    id: 5,
    title: "The Hobbit",
    img: "https://placeholder.com/cover/the-hobbit",
    author: { fullName: "J.R.R. Tolkien" },
    predefinedShelf: { shelfName: "didNotFinishBooks" },
    bookGenre: ["Fantasy"],
    numberOfPages: 310,
    rating: 4.7,
  },

  {
    id: 6,
    title: "The Catcher in the Rye",
    img: "https://placeholder.com/cover/the-catcher-in-the-rye",
    author: { fullName: "J.D. Salinger" },
    predefinedShelf: { shelfName: "didNotFinishBooks" },
    bookGenre: ["Fiction", "Classic Literature"],
    numberOfPages: 234,
    rating: 4.0,
  },
  {
    id: 7,
    title: "Beloved",
    img: "https://placeholder.com/cover/beloved",
    author: { fullName: "Toni Morrison" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["Fiction", "Historical", "African American Literature"],
    numberOfPages: 275,
    rating: 4.3,
  },
  {
    id: 8,
    title: "Brave New World",
    img: "https://placeholder.com/cover/brave-new-world",
    author: { fullName: "Aldous Huxley" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["Fiction", "Dystopian", "Science Fiction"],
    numberOfPages: 311,
    rating: 4.2,
  },
  {
    id: 9,
    title: "The Silence of the Girls",
    img: "https://placeholder.com/cover/the-silence-of-the-girls",
    author: { fullName: "Pat Barker" },
    predefinedShelf: { shelfName: "readingBooks" },
    bookGenre: ["Fiction", "Historical Fiction", "Mythology"],
    numberOfPages: 336,
    rating: 4.1,
  },
  {
    id: 10,
    title: "The Name of the Wind",
    img: "https://placeholder.com/cover/the-name-of-the-wind",
    author: { fullName: "readingBooks" },
    predefinedShelf: { shelfName: "fantasy" },
    bookGenre: ["Fantasy", "Adventure"],
    numberOfPages: 662,
    rating: 4.5,
  }
  
];

class BookAPI {

  

  static fetchBooks(): Promise<Book[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...booksDB]), 100); 
    });
  }

  static addBook(book: Book): Promise<Book> {
    return new Promise((resolve) => {
      const newBook: Book = { ...book, id: Math.max(0, ...booksDB.map(b => b.id)) + 1 }; 
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

  static updatePredefinedShelf(bookTitle: string, newShelfName: string): Promise<Book | null> {
    return new Promise((resolve) => {
      const index = booksDB.findIndex(book => book.title === bookTitle);
      if (index !== -1) {
        const updatedBook: Book = { ...booksDB[index], predefinedShelf: { shelfName: newShelfName } };
        booksDB[index] = updatedBook;
        setTimeout(() => resolve(updatedBook), 100);
      } else {
        setTimeout(() => resolve(null), 100);
      }
    });
  }
}

export default BookAPI;
