import React, { Component, ReactElement } from "react";
import { NavBar } from "../shared/navigation/NavBar";
import Switch from "../settings/Switch";
import Button from "@material-ui/core/Button";
import BookModal from "./BookModal";
import { Layout } from "../shared/components/Layout";
import BookList from '../shared/book-display/BookList';
import { Book } from '../shared/types/Book';
import "./Genre.css";
import ShelfViewGenre from "../shared/book-display/ShelfViewGenre";
import BookAPI from '../my-books/BookAPI'; 

interface IState {
    showShelfModal: boolean;
    showBookModal: boolean;
    showListView: boolean;
    bookList: Book[];
    searchVal: string;
    readBooks: Book[];
    readingBooks: Book[];
    readBooks: Book[];
    readingBooks: Book[];
}

class Genre extends Component<Record<string, unknown>, IState> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            showShelfModal: false,
            showBookModal: false,
            showListView: false,
            bookList: [],
            readBooks: [],
            readingBooks: [],
            readBooks: [],
            readingBooks: [],
            searchVal: ''
        };
        this.onAddShelf = this.onAddShelf.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
        this.onAddShelfModalClose = this.onAddShelfModalClose.bind(this);
        this.onAddBookModalClose = this.onAddBookModalClose.bind(this);
        this.onToggleListView = this.onToggleListView.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    componentDidMount(): void {
        this.getBooks();
        this.trackCurrentDeviceSize();
    }

    getBooks(): void {
        BookAPI.fetchBooks().then((response: Book[]) => {
            this.setState({
                bookList: response
            });
        })
        .catch((error: Record<string, unknown>) => {
            console.error('error: ', error);
        });
    }

    onAddShelf(): void {
        this.setState({
            showShelfModal: true,
        });
    }
    
    onAddBook(): void {
        this.setState({
            showBookModal: true,
        });
    }

    trackCurrentDeviceSize(): void {
        window.onresize = (): void => {
            if (window.matchMedia("(max-width: 800px)").matches) {
                this.setState({ showListView: true })
            } else {
                this.setState({ showListView: false })
            }
        }
    }

    onAddShelfModalClose(): void {
        this.setState({
            showShelfModal: false,
        });
    }

    onAddBookModalClose(): void {
        this.setState({
            showBookModal: false,
        });
    }

    onToggleListView(): void {
        this.setState({
            showListView: !this.state.showListView
        });
    }

    render(): ReactElement {
        return (
            <Layout title="Genre" btn={<div className="genre-top-buttons">
                <Button
                    onClick={this.onAddBook}
                    variant="contained"
                    className="tempButton"
                    color="primary"
                    disableElevation
                >
                    Add Book
                </Button>
            </div>}>
                <NavBar />
                <div>
                    {
                        this.state.showListView ? (
                            <BookList 
                                key={this.state.bookList.length + this.state.searchVal}
                                bookListData={this.state.bookList}
                                searchText={this.state.searchVal} 
                                readBooks={this.state.readBooks}
                                readingBooks = {this.state.readingBooks}
                                bookList = {this.state.bookList}/>
                        ) :
                            <ShelfViewGenre
                                key={this.state.bookList.length + this.state.searchVal}
                                bookList={this.state.bookList} 
                                searchText={this.state.searchVal} />
                    }
                </div>
                <BookModal
                    open={this.state.showBookModal}
                    onClose={this.onAddBookModalClose}
                />
                <div className="my-book-switch-container">
                    <Switch onClick={this.onToggleListView} />
                    <div className="toggle-text">Shelf View</div>
                    <div className="toggle-text">List View</div>
                </div>
            </Layout>
        );
    }
}

export default Genre;
