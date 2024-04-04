import React, { Component } from 'react'
import { Book } from '../types/Book';
import './BookList.css';
import { BOOK_OVERVIEW } from '../routes'
import { Link } from 'react-router-dom';
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
// import MyBooks from '../../my-books/MyBooks';

const CHAR_LIMIT = 40;

export interface BookListProps {
  bookListData: Book[];
  searchText: string;
  readBooks: Book[];
  readingBooks: Book[];
  bookList: Book[];
}

interface SortingConfig {
  propertyName: string;
  ascendingOrder: boolean,
}


// default with random
function getRandomBooks(books: Book[], numberOfBooks: number): Book[] {
  const recommendBooks: Book [] = [];
  
  // Check if there are no books and returns an empty array.
  if (books.length === 0) {
    return recommendBooks
  }

  // Check if the number of books that the function will return is greater than the original book array. 
  // Return the original book array if true.
  if (numberOfBooks >= books.length) {
    return books
  }

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

  const bookReadIng: Book[] = [...readBooks, ...readingBooks]; // list of books that were read or currently reading
  const NotbookRedIng = Books.filter((book) => !bookReadIng.includes(book));  // list of books that were NOT read NOR currently reading

  // Calculate genre counts based on readBooks and readingBooks
  const genreCounts: { [genre: string]: number } = {};
    // goes through elements in readBooks and counts the genre that appear. It goes by 2 since this book was read, and by 1 if it is currently reading. This just a way to create a score.
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
  const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]); // sorts Books by Genre Count

  const authorCounts: { [author: string]: number } = {};
  // Same thing for author
    readBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 2; // Count books in readBooks as 2
    });
    readingBooks.forEach((book) => {
      const authorName = book.author.fullName;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 1; // Count books in readingBooks as 1
    });
  const sortedAuthors = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a]); // sorts Books by Author Count

  const TopGenre = sortedGenres.slice(0, 2); // Gets the top two genre. why 2? It was choosen randomly. 
  const TopAuthor = sortedAuthors.slice(0, 5); // gets the top 5 genre. Same here; randomely chosen

  const recommendedBooks: Book[] = []; // the list of recommended books. Only 5 will be picked. 

  const booksByScore: { [score: number]: Book[] } = {
    3: [], // Book is present in both TopAuthor and TopGenre
    2: [], // Book is present in TopAuthor
    1: [] // Book is present in TopGenre
  };

  Books.forEach((book) => {

    // Assigns a score of 3 to the book
    if (book.bookGenre.some((genre) => TopGenre.includes(genre)) 
      && TopAuthor.includes(book.author.fullName)
      && !NotbookRedIng.includes(book)) {
      booksByScore[3].push(book);
    } 
    
    // Assigns a score of 2 to the book
    else if (TopAuthor.includes(book.author.fullName) 
      && !TopGenre.some((genre) => book.bookGenre.includes(genre))
      && !NotbookRedIng.includes(book)) {
      booksByScore[2].push(book);
    } 
    // Assigns a score of 1 to the book
    else if (book.bookGenre.some((genre) => TopGenre.includes(genre))
        && !(TopAuthor.includes(book.author.fullName))
        && !NotbookRedIng.includes(book)) {
        booksByScore[1].push(book);
    }
});

// this is where we are populating the recommendBooks List.
  for (let score = 3; score >= 1; score--) {
    const books = booksByScore[score];
    for (let i = 0; i < books.length; i++) {
      if (recommendedBooks.length >= 5) {
        break;
      }
      recommendedBooks.push(books[i]);
    }
  }

  // if recommendedBooks list has less than 5 books, randomely select from the books that were not read.
  while (recommendedBooks.length < 5 && NotbookRedIng.length > 0) {
    const randomIndex = Math.floor(Math.random() * NotbookRedIng.length);
    recommendedBooks.push(NotbookRedIng.splice(randomIndex, 1)[0]);
  }

  return recommendedBooks;
}

export default class BookList extends Component <BookListProps, BookListProps> {
  constructor(props: BookListProps) {
    super(props);
    this.state = {
      bookListData: [...props.bookListData],
      searchText: props.searchText || '',
      readBooks: props.readBooks || [], // Initialize toReadBooks in the state
      readingBooks: props.readingBooks || [], // Initialize readingBooks in the state
      bookList: props.bookList || [],
    };
  }

  componentDidMount(): void {
    if(this.state.searchText !== '') {
      this.setState({
        bookListData: this.filterBooks()
      });
    }
  }

  sortingConfigs: SortingConfig[] = [];
  nameToOrder = new Map<string, boolean>();

  filterBooks(): Book[] {
    return this.state.bookListData.filter(book => {
      return book.title.toLowerCase().includes(this.state.searchText.toLowerCase());
    });
  }

  sortBooks(books: Book[]): Book[] {
    const sortedBooks = [...books];
    this.sortingConfigs.forEach(config => {
      const sortingMechanism = getSortingMechanism(config);
      sortedBooks.sort(sortingMechanism)
    })
    return sortedBooks;
  }

  sortBy = (propertyName: string): void => {
    const pendingChange = [...this.sortingConfigs];
    const sortingIndex = this.sortingConfigs
        .findIndex(configuration => configuration.propertyName === propertyName);
    if (sortingIndex !== -1) {
      const configuration: SortingConfig = this.sortingConfigs[sortingIndex];
      if (configuration.ascendingOrder) {
        pendingChange[sortingIndex] = {propertyName, ascendingOrder: false};
      } else {
        pendingChange.splice(sortingIndex, 1);
      }
    } else {
      pendingChange.push({propertyName, ascendingOrder: true});
    }
    this.sortingConfigs = pendingChange;
    this.nameToOrder =  getNameToOrder(pendingChange);
    this.setState(this.state);
  }

  render(): JSX.Element {
    const recommendedBooks = recommendBooks(this.state.bookList, this.state.readBooks, this.state.readingBooks);
  
    return (
      <div>
        <div className="booklist-container">
          <div className="booklist-container-headers booklist-book">
            <div className="booklist-book-thumbnail"></div>
            <div className="booklist-book-title" onClick={()=> this.sortBy('title')}>
              Title{getSortingIcon('title', this.nameToOrder)}
            </div>
            <div className="booklist-book-author" onClick={()=> this.sortBy('author')}>
              Author{getSortingIcon('author', this.nameToOrder)}
            </div>
            <div className="booklist-book-shelf" onClick={()=> this.sortBy('shelf')}>
              Shelf{getSortingIcon('shelf', this.nameToOrder)}
            </div>
            <div className="booklist-book-genre" onClick={()=> this.sortBy('genre')}>
              Genre{getSortingIcon('genre', this.nameToOrder)}
            </div>
            <div className="booklist-book-rating" onClick={()=> this.sortBy('rating')}>
              Rating{getSortingIcon('rating', this.nameToOrder)}
            </div>
          </div>
          {/* Main book list */}
          {this.sortBooks(this.state.bookListData).map(book => (
            <Link to={BOOK_OVERVIEW + "/" + book.id} style={{ textDecoration: 'none', color: 'black' }} key={book.id}>
              <div className="booklist-book">
                <div className="booklist-book-thumbnail">
                  {book.title.length > CHAR_LIMIT ?
                    book.title.substring(0, CHAR_LIMIT) + "..." : book.title}
                </div>
                <div className="booklist-book-title">{book.title}</div>
                <div className="booklist-book-author">{book.author.fullName}</div>
                <div className="booklist-book-shelf">{book.predefinedShelf.shelfName}</div>
                <div className="booklist-book-genre">{book.bookGenre}</div>
                <div className="booklist-book-rating">{book.rating}</div>
              </div>
            </Link>
          ))}
        </div>
        {/* Recommended books section */}
        <div className="booklist-container">
          <div className="booklist-container-headers booklist-book">
            <div className="booklist-book-title">Recommended Books</div>
          </div>
          {/* Render recommended books */}
          {recommendedBooks.map(book => (
            <Link to={BOOK_OVERVIEW + "/" + book.id} style={{ textDecoration: 'none', color: 'black' }} key={book.id}>
              <div className="booklist-book">
                <div className="booklist-book-thumbnail">
                  {book.title.length > CHAR_LIMIT ?
                    book.title.substring(0, CHAR_LIMIT) + "..." : book.title}
                </div>
                <div className="booklist-book-title">{book.title}</div>
                <div className="booklist-book-author">{book.author.fullName}</div>
                <div className="booklist-book-shelf">{book.predefinedShelf.shelfName}</div>
                <div className="booklist-book-genre">{book.bookGenre}</div>
                <div className="booklist-book-rating">{book.rating}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
}

function getSortingMechanism(config: SortingConfig): (book1: Book, book2: Book) => number {
  const orderIndex = config.ascendingOrder ? 1 : -1;
  switch (config.propertyName) {
    default:
    case 'title':
      return ((book1: Book, book2: Book) =>
          orderIndex * book1.title.localeCompare(book2.title));
    case 'author':
      return ((book1: Book, book2: Book) =>
          orderIndex * book1.author.fullName.localeCompare(book2.author.fullName));
    case 'shelf':
      return ((book1: Book, book2: Book) =>
          orderIndex * book1.predefinedShelf.shelfName
              .localeCompare(book2.predefinedShelf.shelfName));
    case 'genre':
      return ((book1: Book, book2: Book) =>
          orderIndex * book1.bookGenre.toString().localeCompare(book2.bookGenre.toString()));
    case 'rating':
      return ((book1: Book, book2: Book) => {
        if (!isRated(book1) && !isRated(book2)) {
          return 0;
        }
        if (!isRated(book1)) {
          return 1;
        }
        if (!isRated(book2)) {
          return -1;
        }
        return  orderIndex * (getRating(book1) - getRating(book2));
      })
  }
}

function getRating(book: Book): number {
  return Number(book.rating.toString().split('/')[0]);
}


function isRated(book: Book): boolean {
  return book.rating.toString().includes('/');
}

function getNameToOrder(configurations: SortingConfig[]): Map<string, boolean> {
  const nameToOrder = new Map<string, boolean>();
  configurations.forEach(configuration =>
      nameToOrder.set(configuration.propertyName, configuration.ascendingOrder));
  return nameToOrder;
}

function getSortingIcon(propertyName: string, nameToOrder: Map<string, boolean>): JSX.Element {
  const ascendingOrder = nameToOrder.get(propertyName);
  if (ascendingOrder === undefined) {
    return <div />;
  }
  if (ascendingOrder) {
    return <ArrowDropUp fontSize="inherit" className="booklist-sorting-arrow-icons" />;
  }
  return <ArrowDropDown fontSize="inherit" className="booklist-sorting-arrow-icons" />;
}
