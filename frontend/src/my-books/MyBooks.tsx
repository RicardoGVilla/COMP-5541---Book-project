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
                favoriteBooks: books.filter(book => book.favorite),// Filter favorite books
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
