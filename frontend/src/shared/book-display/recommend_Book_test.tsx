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
        author: { fullName: 'Author Six' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Historical Fiction'],
        numberOfPages: 320,
        rating: 4.1,
    },
    {
        id: 7,
        title: 'Sample Read Book 2',
        img: 'read2.jpg',
        author: { fullName: 'Author Seven' },
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

const recommendedBooks = recommendBooks(sampleBooks, sampleReadBooks, sampleReadingBooks);

console.log('Recommended Books:', recommendedBooks);