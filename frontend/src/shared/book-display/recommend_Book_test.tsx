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

// default with random
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

// Version 1: Consider all books equally.
/*
function recommendBooks(Books: Book[], readBooks: Book[], readingBooks: Book[]): Book[] {
    const genreCounts: { [genre: string]: number } = {};
    Books.forEach((book) => {
        book.bookGenre.forEach((genre) => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
    });

    const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
    const mostReadGenre = sortedGenres[0];
    const secondMostReadGenre = sortedGenres[1];

    const authorCounts: { [author: string]: number } = {};
    Books.forEach((book) => {
        const authorName = book.author.fullName;
        authorCounts[authorName] = (authorCounts[authorName] || 0) + 1;
    });

    const sortedAuthors = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a]).slice(0, 5);

    const recommendedBooks = Books.filter((book) => {
        return (
            (book.bookGenre.includes(mostReadGenre) || book.bookGenre.includes(secondMostReadGenre)) &&
            sortedAuthors.includes(book.author.fullName) &&
            !readBooks.some((readBook) => readBook.id === book.id) &&
            !readingBooks.some((readingBook) => readingBook.id === book.id)
        );
    });

    const shuffledBooks = recommendedBooks.sort(() => Math.random() - 0.5);

    return shuffledBooks.slice(0, 2);
}
*/

// Verison 2: Adds weight to Read and Reading list.
/*
function recommendBooks(Books: Book[], readBooks: Book[], readingBooks: Book[]): Book[] {
      
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
    const mostReadGenre = sortedGenres[0];
    const secondMostReadGenre = sortedGenres[1];
  
    const authorCounts: { [author: string]: number } = {};
    readBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 2; // Count books in readBooks as 2
    });
    readingBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 1; // Count books in readingBooks as 1
    });
  
    const sortedAuthors = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a]).slice(0, 5);
  
    const recommendedBooks = Books.filter((book) => {
      return (
        (book.bookGenre.includes(mostReadGenre) || book.bookGenre.includes(secondMostReadGenre)) &&
        sortedAuthors.includes(book.author.fullName) &&
        !readBooks.some((readBook) => readBook.id === book.id) &&
        !readingBooks.some((readingBook) => readingBook.id === book.id)
      );
    });
  
    const shuffledBooks = recommendedBooks.sort(() => Math.random() - 0.5);
  
    return shuffledBooks.slice(0, 2);
  }
*/  

// Version 3: Adds score

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
        id: 6,
        title: 'Sample Read Book 1',
        img: 'read1.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Thriller'],
        numberOfPages: 320,
        rating: 4.1,
    },
    {
        id: 7,
        title: 'Sample Read Book 2',
        img: 'read2.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Thriller'],
        numberOfPages: 280,
        rating: 4.6,
    }
    
];

const sampleReadingBooks: Book[] = [
    {
        id: 8,
        title: 'Sample Reading Book 1',
        img: 'reading1.jpg',
        author: { fullName: 'Author Eight' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Science'],
        numberOfPages: 280,
        rating: 3.8,
    },
    {
        id: 9,
        title: 'Sample Reading Book 2',
        img: 'reading2.jpg',
        author: { fullName: 'Author Nine' },
        predefinedShelf: { shelfName: 'Biography' },
        bookGenre: ['Biography'],
        numberOfPages: 400,
        rating: 4.3,
    }
    
];

const recommendedBookTest = recommendBooks(sampleBooks, sampleReadBooks, sampleReadingBooks);

console.log('Recommended Books:', recommendedBookTest);