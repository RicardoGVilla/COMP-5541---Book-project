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
    img: "https://letsreadmore.ca/wp-content/uploads/2022/08/1984.jpg",
    author: { fullName: "George Orwell" },
    predefinedShelf: { shelfName: "favoriteBooks" },
    bookGenre: ["Fiction"],
    numberOfPages: 328,
    rating: 4.7,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/1200px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    author: { fullName: "Harper Lee" },
    predefinedShelf: { shelfName: "favoriteBooks" },
    bookGenre: ["Social Issues"],
    numberOfPages: 281,
    rating: 4.8,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    img: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781499806250/pride-and-prejudice-9781499806250_hr.jpg",
    author: { fullName: "Jane Austen" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["Fiction", "Romance"],
    numberOfPages: 432,
    rating: 4.6,
  },
  {
    id: 5,
    title: "The Hobbit",
    img: "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg",
    author: { fullName: "J.R.R. Tolkien" },
    predefinedShelf: { shelfName: "didNotFinishBooks" },
    bookGenre: ["Fantasy"],
    numberOfPages: 310,
    rating: 4.7,
  },

  {
    id: 6,
    title: "The Catcher in the Rye",
    img: "https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg",
    author: { fullName: "J.D. Salinger" },
    predefinedShelf: { shelfName: "didNotFinishBooks" },
    bookGenre: ["Classic Literature"],
    numberOfPages: 234,
    rating: 4.0,
  },
  {
    id: 7,
    title: "Beloved",
    img: "https://s26162.pcdn.co/wp-content/uploads/2017/09/Belove_BookCover_WeAreTeachers.jpg",
    author: { fullName: "Toni Morrison" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["African American Literature"],
    numberOfPages: 275,
    rating: 4.3,
  },
  {
    id: 8,
    title: "Brave New World",
    img: "https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg",
    author: { fullName: "Aldous Huxley" },
    predefinedShelf: { shelfName: "readBooks" },
    bookGenre: ["Dystopian"],
    numberOfPages: 311,
    rating: 4.2,
  },
  {
    id: 9,
    title: "The Silence of the Girls",
    img: "https://m.media-amazon.com/images/I/51qbsgAr2hL._SY445_SX342_.jpg",
    author: { fullName: "Pat Barker" },
    predefinedShelf: { shelfName: "readingBooks" },
    bookGenre: ["Historical Fiction"],
    numberOfPages: 336,
    rating: 4.1,
  },
  {
    id: 10,
    title: "The Name of the Wind",
    img: "https://m.media-amazon.com/images/I/611iKJa7a-L._AC_UF1000,1000_QL80_.jpg",
    author: { fullName: "readingBooks" },
    predefinedShelf: { shelfName: "fantasy" },
    bookGenre: ["Adventure"],
    numberOfPages: 662,
    rating: 4.5,
  }, 
  {
    id: 13,
    title: "The Master and Margarita",
    img: "https://m.media-amazon.com/images/I/61z04S7MaeL._AC_UF1000,1000_QL80_.jpg",
    author: { fullName: "Mikhail Bulgakov" },
    predefinedShelf: { shelfName: "classic" },
    bookGenre: ["Satire"],
    numberOfPages: 384,
    rating: 4.6
  },
  {
    id: 14,
    title: "Thus Spoke Zarathustra",
    img: "https://m.media-amazon.com/images/I/613ZVoVVeXL._AC_UF350,350_QL50_.jpg",
    author: { fullName: "Friedrich Nietzsche" },
    predefinedShelf: { shelfName: "philosophy" },
    bookGenre: ["Philosophy"],
    numberOfPages: 352,
    rating: 4.2
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