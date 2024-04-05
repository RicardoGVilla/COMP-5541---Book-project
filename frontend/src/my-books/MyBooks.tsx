import React, { Component, ReactElement } from "react";
import { NavBar } from "../shared/navigation/NavBar";
import Switch from "../settings/Switch";
import Button from "@material-ui/core/Button";
import ShelfModal from "./ShelfModal";
import { Layout } from "../shared/components/Layout";
import BookList from "../shared/book-display/BookList";
import { Book } from "../shared/types/Book";
import "./MyBooks.css";
import ShelfView from "../shared/book-display/ShelfView";
import BookModal from "../genre/BookModal";
import BookAPI from "./BookAPI";

interface IState {
    showShelfModal: boolean;
    showBookModal: boolean;
    showListView: boolean;
    bookList: Book[];
    readBooks: Book[];
    didNotFinishBooks: Book[];
    toReadBooks: Book[];
    readingBooks: Book[];
    favoriteBooks: Book[];
    recommendedBooks: Book[];
    searchVal: string;
    shelves: string[];
    shelf: { name: string; };
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
    const notbookRedIng = Books.filter((book) => !bookReadIng.includes(book));  // list of books that were NOT read NOR currently reading
  
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
  
    const topGenre = sortedGenres.slice(0, 2); // Gets the top two genre. why 2? It was choosen randomly. 
    const topAuthor = sortedAuthors.slice(0, 5); // gets the top 5 genre. Same here; randomely chosen
  
    const recommendedBooks: Book[] = []; // the list of recommended books. Only 5 will be picked. 
  
    const booksByScore: { [score: number]: Book[] } = {
      3: [], // Book is present in both topAuthor and topGenre
      2: [], // Book is present in topAuthor
      1: [] // Book is present in topGenre
    };
  
    Books.forEach((book) => {
        // Assigns a score of 3 to the book
        if (book.bookGenre.some((genre) => topGenre.includes(genre)) 
        && topAuthor.includes(book.author.fullName)
        && !notbookRedIng.includes(book)) {
            booksByScore[3].push(book);
        } else if (topAuthor.includes(book.author.fullName) // Assigns a score of 2 to the book
        && !topGenre.some((genre) => book.bookGenre.includes(genre))
        && !notbookRedIng.includes(book)) {
            booksByScore[2].push(book);
        } else if (book.bookGenre.some((genre) => topGenre.includes(genre)) // Assigns a score of 1 to the book
            && !(topAuthor.includes(book.author.fullName))
            && !notbookRedIng.includes(book)) {
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
    while (recommendedBooks.length < 5 && notbookRedIng.length > 0) {
      const randomIndex = Math.floor(Math.random() * notbookRedIng.length);
      recommendedBooks.push(notbookRedIng.splice(randomIndex, 1)[0]);
    }
  
    return recommendedBooks;
}

class MyBooks extends Component<Record<string, unknown>, IState> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            showShelfModal: false,
            showBookModal: false,
            showListView: false,
            bookList: [],
            readBooks: [],
            didNotFinishBooks: [],
            toReadBooks: [],
            readingBooks: [],
            favoriteBooks: [],
            recommendedBooks: [],
            searchVal: '',
            shelves: [],
            shelf: { name: '' }
        };
        this.onAddShelf = this.onAddShelf.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
    }

    componentDidMount() {
        this.fetchAllBooks();
    }

    fetchAllBooks = () => {
        BookAPI.fetchBooks().then(books => {
            this.setState({
                bookList: books,
                readBooks: books.filter(book => book.predefinedShelf.shelfName === "readBooks"),
                didNotFinishBooks: books.filter(book => book.predefinedShelf.shelfName === "didNotFinishBooks"),
                toReadBooks: books.filter(book => book.predefinedShelf.shelfName === "toReadBooks"),
                readingBooks: books.filter(book => book.predefinedShelf.shelfName === "readingBooks"),
                favoriteBooks: books.filter(book => book.favorite),
                recommendedBooks: books.filter(book => book.predefinedShelf.shelfName === "recommendedBooks"),
            });
        }).catch(error => console.error("Fetching books failed:", error));
    }

    onAddBook(): void {
        console.log("add book done");
        this.setState({
            showBookModal: true,
        });
    }
    onAddShelf(): void {
        this.setState({
            showShelfModal: true,
        });
    }
    
    onAddShelfModalClose = () => {
        this.setState({ showShelfModal: false });
    };
    
    onAddBookModalClose = () => {
        this.setState({ showBookModal: false });
    };
    
    onToggleListView = () => {
        this.setState(prevState => ({ showListView: !prevState.showListView }));
    };
    
    setShelf = (newShelf: string) => {
        this.setState({ shelf: { name: newShelf } });
    };
    
    setShelves = (newShelves: string[]) => {
        this.setState({ shelves: newShelves });
    };

    render(): ReactElement {
        const recommendedBooks = recommendBooks(this.state.bookList, this.state.readBooks, this.state.readingBooks);
        console.log(recommendedBooks);
        
        return (
            <Layout title="My Books" btn={<div className="my-book-top-buttons">
                <Button onClick={this.onAddBook} variant="contained" color="primary" disableElevation>Add Book</Button>
                <Button onClick={this.onAddShelf} variant="contained" color="primary" disableElevation>Add Shelf</Button>
                </div>}>
                <NavBar />
                <div>
                    {this.state.showListView ? (
                        <BookList
                            key={this.state.bookList.length + this.state.searchVal}
                            bookListData={this.state.bookList} 
                            bookList={this.state.bookList}
                            searchText={this.state.searchVal}
                            readBooks={this.state.readBooks}
                            readingBooks={this.state.readingBooks}
                        />
                    ) : (
                        <ShelfView
                            key={[...this.state.readBooks, ...this.state.readingBooks, ...this.state.toReadBooks, ...this.state.didNotFinishBooks, ...this.state.favoriteBooks, ...this.state.recommendedBooks, ...this.state.shelves].length + this.state.searchVal}
                            readBooks={this.state.readBooks} 
                            toReadBooks={this.state.toReadBooks}
                            didNotFinishBooks={this.state.didNotFinishBooks}
                            readingBooks={this.state.readingBooks} 
                            favoriteBooks={this.state.favoriteBooks} 
                            recommendedBooks={recommendedBooks} 
                            searchText={this.state.searchVal} 
                            shelves={this.state.shelves}
                            setShelf={this.setShelf}
                        />
                    )}
                </div>
                <ShelfModal
                    open={this.state.showShelfModal}
                    onClose={this.onAddShelfModalClose}
                    shelves={this.state.shelves}
                    setShelves={this.setShelves}
                    shelf={this.state.shelf}
                />
                <BookModal
                    open={this.state.showBookModal}
                    onClose={this.onAddBookModalClose}
                />

                <div className="my-book-switch-container">
                    <div className="toggle-text">
                        Shelf View
                    </div>
                    <Switch onClick={this.onToggleListView} />
                    <div className="toggle-text">
                        List View
                    </div>
                </div>
            </Layout>
        );
    }
}

export default MyBooks;
