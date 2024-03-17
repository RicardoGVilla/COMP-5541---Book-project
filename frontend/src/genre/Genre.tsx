import React, { Component, ReactElement } from "react";
import { NavBar } from "../shared/navigation/NavBar";
import Switch from "../settings/Switch";
import Button from "@material-ui/core/Button";
import BookModal from "./BookModal";
import { Layout } from "../shared/components/Layout";
import BookList from '../shared/book-display/BookList';
import { Book } from '../shared/types/Book';
import HttpClient from '../shared/http/HttpClient';
import Endpoints from '../shared/api/endpoints';
import "./Genre.css";
import ShelfViewGenre from "../shared/book-display/ShelfViewGenre";


interface IState {
    showShelfModal: boolean;
    showBookModal: boolean;
    showListView: boolean;
    bookList: Book[];
    readBooks: Book[];
    searchVal: string;
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
            searchVal: ''
        };
        this.onAddShelf = this.onAddShelf.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
        this.onAddShelfModalClose = this.onAddShelfModalClose.bind(this);
        this.onAddBookModalClose = this.onAddBookModalClose.bind(this);
        this.onToggleListView = this.onToggleListView.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.getReadBooks = this.getReadBooks.bind(this);
    }

    componentDidMount(): void {
        this.getBooks();
        this.getReadBooks();
        this.trackCurrentDeviceSize();
    }

    getReadBooks(): void {
        HttpClient.get(Endpoints.read).then((readBooks: Book[]) => {
            this.setState(state => ({
                readBooks: Array.isArray(readBooks) ? readBooks : state.readBooks
            }));
        }).catch((error: Record<string, string>) => {
            console.error('error: ', error);
        });
    }


    getBooks(): void {
        HttpClient.get(Endpoints.books).then((response: Book[]) => {
            this.setState({
                bookList: response
            });
        })
            .catch((error: Record<string, string>) => {
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
        return
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
                                searchText={this.state.searchVal} />
                        ) :
                            <ShelfViewGenre
                                key={[
                                    ...this.state.readBooks,
                                    ...this.state.bookList,
                                ].length + this.state.searchVal}
                                readBooks={this.state.readBooks} 
                                bookList={this.state.bookList} 
                                searchText={this.state.searchVal} />
                    }
                </div>
               
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
export default Genre;
