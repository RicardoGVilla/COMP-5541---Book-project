// import React, { Component, ReactElement } from "react";
// import { NavBar } from "../shared/navigation/NavBar";
// import Switch from "../settings/Switch";
// import Button from "@material-ui/core/Button";
// import ShelfModal from "./ShelfModal";
// import { Layout } from "../shared/components/Layout";
// import BookList from '../shared/book-display/BookList';
// import { Book } from '../shared/types/Book';
// import HttpClient from '../shared/http/HttpClient';
// import Endpoints from '../shared/api/endpoints';
// import "./MyBooks.css";
// import ShelfView from "../shared/book-display/ShelfView";
// import BookModal from "../genre/BookModal";


// interface IState {
//     showShelfModal: boolean;
//     showBookModal: boolean;
//     showListView: boolean;
//     bookList: Book[];
//     readBooks: Book[];
//     didNotFinishBooks: Book[];
//     toReadBooks: Book[];
//     readingBooks: Book[];
//     favoriteBooks: Book[];
//     recommendedBooks: Book[];
//     searchVal: string;
//     shelves: string[];
//     shelf: {
//         name: string;
//     };
// }


// class MyBooks extends Component<Record<string, unknown>, IState> {
//     constructor(props: Record<string, unknown>) {
//         super(props);
//         this.state = {
//             showShelfModal: false,
//             showBookModal: false,
//             showListView: false,
//             bookList: [],
//             readBooks: [],
//             didNotFinishBooks: [],
//             toReadBooks: [],
//             readingBooks: [],
//             favoriteBooks: [],
//             recommendedBooks: [],
//             searchVal: '',
//             shelves:[],
//             shelf: { name: ''}
//             // setShelves: this.setShelves
//         };
//         this.onAddShelf = this.onAddShelf.bind(this);
//         this.onAddBook = this.onAddBook.bind(this);
//         this.onAddShelfModalClose = this.onAddShelfModalClose.bind(this);
//         this.onAddBookModalClose = this.onAddBookModalClose.bind(this);
//         this.onToggleListView = this.onToggleListView.bind(this);
//         this.getBooks = this.getBooks.bind(this);
//         this.getDidNotFinishBooks = this.getDidNotFinishBooks.bind(this);
//         this.toReadBooks = this.toReadBooks.bind(this);
//         this.readingBooks = this.readingBooks.bind(this);
//         this.getReadBooks = this.getReadBooks.bind(this);
//         this.getFavoriteBooks = this.getFavoriteBooks.bind(this);
//         this.getRecommendedBooks = this.getRecommendedBooks.bind(this);
//         this.setShelves = this.setShelves.bind(this);
//         this.setShelf = this.setShelf.bind(this);
//     }

//     componentDidMount(): void {
//         this.getBooks();
//         this.getReadBooks();
//         this.getDidNotFinishBooks();
//         this.toReadBooks();
//         this.readingBooks();
//         this.getFavoriteBooks();
//         this.getRecommendedBooks();
//         this.trackCurrentDeviceSize();
//     }

//     setShelves(newShelf: string[]) {
//         this.setState({
//             shelves: newShelf,
//         });
//     }
//     // setShelf(editShelf: {}) {
//     //     this.setState({
//     //         shelf: editShelf,
//     //     });
//     // }
//     setShelf = (newShelf: string): void => {
//         this.setState({
//           shelf: {
//             name: newShelf
//           },
          
//         });
//     };

//     getReadBooks(): void {
//         HttpClient.get(Endpoints.read).then((readBooks: Book[]) => {
//             this.setState(state => ({
//                 readBooks: Array.isArray(readBooks) ? readBooks : state.readBooks
//             }));
//         }).catch((error: Record<string, string>) => {
//             console.error('error: ', error);
//         });
//     }

//     getDidNotFinishBooks(): void {
//         HttpClient.get(Endpoints.didNotFinish).then((didNotFinishBooks: Book[]) => {
//             this.setState(state => ({
//                 didNotFinishBooks: Array.isArray(didNotFinishBooks)
//                     ? didNotFinishBooks : state.didNotFinishBooks
//             }));
//         }).catch((error: Record<string, string>) => {
//             console.error('error: ', error);
//         });
//     }

//     toReadBooks(): void {
//         HttpClient.get(Endpoints.toRead).then((toReadBooks: Book[]) => {
//             this.setState(state => ({
//                 toReadBooks: Array.isArray(toReadBooks) ? toReadBooks : state.toReadBooks
//             }));
//         }).catch((error: Record<string, string>) => {
//             console.error('error: ', error);
//         });
//     }

//     readingBooks(): void {
//         HttpClient.get(Endpoints.reading).then((readingBooks: Book[]) => {
//             this.setState(state => ({
//                 readingBooks: Array.isArray(readingBooks) ? readingBooks : state.readingBooks
//             }));
//         }).catch((error: Record<string, string>) => {   
//             console.error('error: ', error);
//         });
//     }

//     getFavoriteBooks(): void {
//         HttpClient.get(Endpoints.reading).then((favoriteBooks: Book[]) => {
//             this.setState(state => ({
//                 favoriteBooks: Array.isArray(favoriteBooks) ? favoriteBooks : state.favoriteBooks
//             }));
//         }).catch((error: Record<string, string>) => {
//             console.error('error: ', error);
//         });
//     }

//     getRecommendedBooks(): void {
//         HttpClient.get(Endpoints.reading).then((recommendedBooks: Book[]) => {
//             this.setState(state => ({
//                 recommendedBooks: Array.isArray(recommendedBooks) ? recommendedBooks : state.recommendedBooks
//             }));
//         }).catch((error: Record<string, string>) => {
//             console.error('error: ', error);
//         });
//     }

//     getBooks(): void {
//         HttpClient.get(Endpoints.books).then((response: Book[]) => {
//             this.setState({
//                 bookList: response
//             });
//             console.log(this.state.bookList)
//         })
//             .catch((error: Record<string, string>) => {
//                 console.error('error: ', error);
//             });
//     }

//     onAddShelf(): void {
//         this.setState({
//             showShelfModal: true,
//         });
//     }
    
//     onAddBook(): void {
//         this.setState({
//             showBookModal: true,
//         });
//     }

//     trackCurrentDeviceSize(): void {
//         window.onresize = (): void => {
//             if (window.matchMedia("(max-width: 800px)").matches) {
//                 this.setState({ showListView: true })
//             } else {
//                 this.setState({ showListView: false })
//             }
//         }
//         return
//     }

//     onAddShelfModalClose(): void {
//         this.setState({
//             showShelfModal: false,
//         });
//     }
    
//     onAddBookModalClose(): void {
//         this.setState({
//             showBookModal: false,
//         });
//     }

//     onToggleListView(): void {
//         this.setState({
//             showListView: !this.state.showListView
//         });
//     }

    

//     render(): ReactElement {
//         return (
//             <Layout title="My books" btn={<div className="my-book-top-buttons">
//                 <Button
//                     onClick={this.onAddBook}
//                     variant="contained"
//                     className="tempButton"
//                     color="primary"
//                     disableElevation
//                 >
//                     Add Book
//                 </Button>
//                 <Button
//                     onClick={this.onAddShelf}
//                     variant="contained"
//                     color="primary"
//                     disableElevation
//                 >
//                     Add Shelf
//                 </Button>
//                 </div>}>
//                 <NavBar />
//                 <div>
//                     {
//                         this.state.showListView ? (
//                             <BookList 
//                                 key={this.state.bookList.length + this.state.searchVal}
//                                 bookListData={this.state.bookList}
//                                 searchText={this.state.searchVal}
//                                 readBooks={this.state.readBooks}
//                                 readingBooks = {this.state.readingBooks}
//                                 bookList = {this.state.bookList}
//                                 />
//                         ) :
//                             <ShelfView
//                                 key={[
//                                     ...this.state.readBooks,
//                                     ...this.state.readingBooks,
//                                     ...this.state.toReadBooks,
//                                     ...this.state.didNotFinishBooks,
//                                     ...this.state.favoriteBooks,
//                                     ...this.state.recommendedBooks,
//                                     ...this.state.shelves
//                                 ].length + this.state.searchVal}
//                                 readBooks={this.state.readBooks} 
//                                 toReadBooks={this.state.toReadBooks}
//                                 didNotFinishBooks={this.state.didNotFinishBooks}
//                                 readingBooks={this.state.readingBooks} 
//                                 favoriteBooks={this.state.favoriteBooks} 
//                                 recommendedBooks={this.state.recommendedBooks} 
//                                 searchText={this.state.searchVal} 
//                                 shelves={this.state.shelves}
//                                 setShelf={this.setShelf}
//                             />
//                     }
//                 </div>
//                 <ShelfModal
//                     open={this.state.showShelfModal}
//                     onClose={this.onAddShelfModalClose}
//                     shelves={this.state.shelves}
//                     setShelves={this.setShelves}
//                     shelf={this.state.shelf}
//                 />
//                 <BookModal
//                     open={this.state.showBookModal}
//                     onClose={this.onAddBookModalClose}
//                 />

//                 <div className="my-book-switch-container">
//                     <div className="toggle-text">
//                         Shelf View
//                     </div>
//                     <Switch onClick={this.onToggleListView} />
//                     <div className="toggle-text">
//                         List View
//                     </div>
//                 </div>
//             </Layout>
//         );
//     }
// }
// export default MyBooks;

import React, { Component, ReactElement } from "react";
import { NavBar } from "../shared/navigation/NavBar";
import Switch from "../settings/Switch";
import Button from "@material-ui/core/Button";
import ShelfModal from "./ShelfModal";
import { Layout } from "../shared/components/Layout";
import BookList from '../shared/book-display/BookList';
import { Book } from '../shared/types/Book';
import "./MyBooks.css";
import ShelfView from "../shared/book-display/ShelfView";
import BookModal from "../genre/BookModal";

// Hardcoded books example
const hardcodedBooks: Book[] = [
    {
        id: 1,
        title: "The Great Gatsby",
        img: "path/to/image.jpg",
        author: { fullName: "F. Scott Fitzgerald" },
        predefinedShelf: { shelfName: "readingBooks" },
        bookGenre: ["Fiction"],
        numberOfPages: 200,
        rating: 4.5,
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        img: "path/to/image.jpg",
        author: { fullName: "Harper Lee" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Classics"],
        numberOfPages: 281,
        rating: 4.7,
      },
      {
        id: 3,
        title: "1984",
        img: "path/to/image.jpg",
        author: { fullName: "George Orwell" },
        predefinedShelf: { shelfName: "readingBooks" },
        bookGenre: ["Fiction", "Science Fiction", "Dystopian"],
        numberOfPages: 328,
        rating: 4.6,
      },
      {
        id: 4,
        title: "Pride and Prejudice",
        img: "path/to/image.jpg",
        author: { fullName: "Jane Austen" },
        predefinedShelf: { shelfName: "readingBooks" },
        bookGenre: ["Fiction", "Classics", "Romance"],
        numberOfPages: 279,
        rating: 4.4,
      },
      {
        id: 5,
        title: "The Catcher in the Rye",
        img: "path/to/image.jpg",
        author: { fullName: "J.D. Salinger" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Classics"],
        numberOfPages: 277,
        rating: 4.3,
      },
      {
        id: 6,
        title: "The Hobbit",
        img: "path/to/image.jpg",
        author: { fullName: "J.R.R. Tolkien" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Fantasy"],
        numberOfPages: 310,
        rating: 4.5,
      },
      {
        id: 7,
        title: "Harry Potter and the Sorcerer's Stone",
        img: "path/to/image.jpg",
        author: { fullName: "J.K. Rowling" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Fantasy"],
        numberOfPages: 320,
        rating: 4.8,
      },
      {
        id: 8,
        title: "The Lord of the Rings",
        img: "path/to/image.jpg",
        author: { fullName: "J.R.R. Tolkien" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Fantasy"],
        numberOfPages: 1178,
        rating: 4.9,
      },
      {
        id: 9,
        title: "Moby-Dick",
        img: "path/to/image.jpg",
        author: { fullName: "Herman Melville" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Classics"],
        numberOfPages: 585,
        rating: 4.2,
      },
      {
        id: 10,
        title: "The Picture of Dorian Gray",
        img: "path/to/image.jpg",
        author: { fullName: "Oscar Wilde" },
        predefinedShelf: { shelfName: "toReadBooks" },
        bookGenre: ["Fiction", "Classics"],
        numberOfPages: 251,
        rating: 4.6,
      },
];

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

class MyBooks extends Component<Record<string, never>, IState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            showShelfModal: false,
            showBookModal: false,
            showListView: false,
            bookList: hardcodedBooks,
            readBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "readBooks"),
            didNotFinishBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "didNotFinishBooks"),
            toReadBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "toReadBooks"),
            readingBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "readingBooks"),
            favoriteBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "favoriteBooks"),
            recommendedBooks: hardcodedBooks.filter(book => book.predefinedShelf.shelfName === "recommendedBooks"),
            searchVal: '',
            shelves: [],
            shelf: { name: '' }
        };
    }

    onAddBook = () => {
        console.log("Add Book clicked");
    };
    
    onAddShelf = () => {
        console.log("Add Shelf clicked");
    };
    
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
                       bookListData={this.state.bookList} // This matches your current implementation
                       bookList={this.state.bookList} // This matches your current implementation
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
                            recommendedBooks={this.state.recommendedBooks} 
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
                    <Switch onClick={this.onToggleListView} />
                </div>
            </Layout>
        );
    }
}

export default MyBooks;