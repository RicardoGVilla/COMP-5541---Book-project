import * as React from 'react';
import { Book } from '../types/Book';

const CHAR_LIMIT = 40;

export interface BookListProps {
  bookListData: Book[];
  searchText: string;
}

interface SortingConfig {
  propertyName: string;
  ascendingOrder: boolean,
}

export default class BookList extends React.Component <BookListProps, BookListProps> {
    constructor(props: BookListProps) {
      super(props);
    }

}

// Version 3: Adds score

function getRandomBooks(books: Book[], numberOfBooks: number): Book[] {
  const recommendBooks: Book [] = [];
  
  // Check if there are no books and returns an empty array.
  if (books.length === 0) {
    return recommendBooks
  };

  // Check if the number of books that the function will return is greater than the original book array. 
  // Return the original book array if true.
  if (numberOfBooks >= books.length) {
    return books
  };

  // Array of indices representing the available books
  const availableIndices = Array.from(Array(books.length).keys());

  for (let i = 0; i < numberOfBooks; i++) {
    const randomIDX = Math.floor(Math.random() * availableIndices.length);

    // Index of the selected book in the original array
    const originalIndex = availableIndices[randomIDX];

    recommendBooks.push(books[originalIndex]);

    // Remove the selected index from the array of available indices to avoid repetition
    availableIndices.splice(randomIDX, 1);
  }

  return recommendBooks;
  }

function recommendBooks(Books: Book[], readBooks: Book[], readingBooks: Book[]): Book[] {
  // If both readBooks and readingBooks are empty, return random 5 books
  if (readBooks.length === 0 && readingBooks.length === 0) {
    return getRandomBooks(Books, 5);
  }

  const bookRead_ing: Book[] = [...readBooks, ...readingBooks];
  const NotbookRed_ing = Books.filter((book) => !bookRead_ing.includes(book));

  // Calculate genre counts based on readBooks and readingBooks
  const genreCounts: { [genre: string]: number } = {};
    readBooks.forEach((book) => {
      book.bookGenre.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 2; // Count books in readBooks as 2
      });
    });
    readingBooks.forEach((book) => {
      book.bookGenre.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1; // Count books in readingBooks as 1
      });
    });
  const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

  const authorCounts: { [author: string]: number } = {};
    readBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 2; // Count books in readBooks as 2
    });
    readingBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 1; // Count books in readingBooks as 1
    });
  const sortedAuthors = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a]);

  const TopGenre = sortedGenres.slice(0, 2);
  const TopAuthor = sortedAuthors.slice(0, 5);

  const recommendedBooks: Book[] = [];

  const booksByScore: { [score: number]: Book[] } = {
    3: [],
    2: [],
    1: []
  };

  Books.forEach((book) => {
    if (book.bookGenre.some((genre) => TopGenre.includes(genre)) 
      && TopAuthor.includes(book.author.fullName)
      && !NotbookRed_ing.includes(book)) {
      booksByScore[3].push(book);
    } 
    
    else if (TopAuthor.includes(book.author.fullName) 
      && !TopGenre.some((genre) => book.bookGenre.includes(genre))
      && !NotbookRed_ing.includes(book)) {
      booksByScore[2].push(book);
    } 
    
    else if (book.bookGenre.some((genre) => TopGenre.includes(genre))
        && !(TopAuthor.includes(book.author.fullName))
        && !NotbookRed_ing.includes(book)) {
        booksByScore[1].push(book);
    }
});

  for (let score = 3; score >= 1; score--) {
    const books = booksByScore[score];
    for (let i = 0; i < books.length; i++) {
      if (recommendedBooks.length >= 5) {
        break;
      }
      recommendedBooks.push(books[i]);
    }
  }

  while (recommendedBooks.length < 5 && NotbookRed_ing.length > 0) {
    const randomIndex = Math.floor(Math.random() * NotbookRed_ing.length);
    recommendedBooks.push(NotbookRed_ing.splice(randomIndex, 1)[0]);
  }

  return recommendedBooks;
}


// Sample book Data:

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
    img: "https://v4m9y9w9.rocketcdn.me/wp-content/uploads/2017/08/THATKAM2.jpg",
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
    img: "https://i.etsystatic.com/20545894/r/il/6ff9d9/1977098755/il_570xN.1977098755_7szr.jpge",
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
    img: "https://images-na.ssl-images-amazon.com/images/I/91TgWRV4hqL._AC_UL600_SR600,600_.jpg",
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




const sampleBooks: Book[] = [
    {
        id: 1,
        title: 'Sample Book 1',
        img: 'sample1.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Fiction'],
        numberOfPages: 300,
        rating: 4.5,
    },
    {
        id: 2,
        title: 'Sample Book 2',
        img: 'sample2.jpg',
        author: { fullName: 'Author Two' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Mystery'],
        numberOfPages: 250,
        rating: 4.0,
    },

    {
        id: 3,
        title: 'Sample Book 3',
        img: 'sample3.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Science Fiction' },
        bookGenre: ['Science Fiction'],
        numberOfPages: 400,
        rating: 4.2,
    },
    {
        id: 4,
        title: 'Sample Book 4',
        img: 'sample4.jpg',
        author: { fullName: 'Author Four' },
        predefinedShelf: { shelfName: 'Fantasy' },
        bookGenre: ['Fantasy'],
        numberOfPages: 500,
        rating: 4.8,
    },
    {
        id: 5,
        title: 'Sample Book 5',
        img: 'sample5.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Romance' },
        bookGenre: ['Romance'],
        numberOfPages: 350,
        rating: 3.9,
    }    
];

const sampleReadBooks: Book[] = [
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

const sampleReadingBooks: Book[] = [
  {
    id: 9,
    title: "The Silence of the Girls",
    img: "https://images-na.ssl-images-amazon.com/images/I/91TgWRV4hqL._AC_UL600_SR600,600_.jpg",
    author: { fullName: "Pat Barker" },
    predefinedShelf: { shelfName: "readingBooks" },
    bookGenre: ["Historical Fiction"],
    numberOfPages: 336,
    rating: 4.1,
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
  }
    
];

const recommendedBookTest = recommendBooks(booksDB, sampleReadBooks, sampleReadingBooks);

console.log('Recommended Books:', recommendedBookTest);