import React, { ReactElement } from 'react'
import './ShelfCarousel.css'
import { Button, Paper } from '@material-ui/core';
import { Book } from '../types/Book';
import { Component } from 'react';
import { Create } from "@material-ui/icons";
import AddBookShelf from './AddBookShelf';
import ShelfModal from '../../my-books/ShelfModal';




function ShelfBook(props: BookProps): JSX.Element {
    const bookClass = 'book' + (props.img === "" ? '' : ' image');
    const displayTitle = props.title.length > 12 ? 
                        (props.title.substring(0, 12) + "...") : props.title;

    return (
        <Paper className={bookClass} variant="elevation" square={false}>
            {(bookClass !== "book") && <div className="book-spine"></div>}
            {displayTitle}
        </Paper>
    )
}

type BookProps = {
    title: string;
    img: string;
}



interface IShelfCarouselState {
    shelfName: string;
    setShelf: (name: string) => void;
    showShelfModal: boolean;
    // books: Book[];
}


type ShelfCarouselNewProps = {
    shelfName: string;
    setShelf: (name: string) => void;
    
    // books: Book[];
    // searchText: string;
}


export default class ShelfCarouselNew extends Component<ShelfCarouselNewProps, IShelfCarouselState> {
    
    constructor(props: ShelfCarouselNewProps) {
        super(props);
        this.state = {
            shelfName: props.shelfName,
            setShelf: props.setShelf,
            showShelfModal: false,
            // books: props.books,
        }
        // this.searchText = props.searchText
        this.onEditShelf = this.onEditShelf.bind(this);
        this.onAddShelfModalClose = this.onAddShelfModalClose.bind(this);
    }

    // componentDidMount(): void {
    //     if(this.searchText !== '') {
    //         this.setState({
    //             books: this.filterBooks()
    //         })
    //     } 
    // }
    searchText = '';


    // filterBooks(): Book[] {
    //     return this.state.books.filter(book => {
    //       return book.title.toLowerCase().includes(this.searchText.toLowerCase());
    //     });
    // }

    onEditShelf = (): void => {
        this.state.setShelf(this.state.shelfName)
        this.setState({
            showShelfModal: true,
        });
    }

    onAddShelfModalClose(): void {
        this.setState({
            showShelfModal: false,
        });
    }

    render(): JSX.Element {
        return (
            <div className="shelf-container">
                <span className="shelf-title">{this.state.shelfName}</span>
                <span className="view-all">View All</span>
                <span>
                    {/* <Button onClick={ () => this.state.setShelf(this.state.shelfName)}> */}
                    <Button onClick={this.onEditShelf}>
                        <Create className="pencil-icon" />
                    </Button>
                </span>
                <div className="clear" />
                <div className="books-and-shelf">
                    <div className="book-wrap">
                        {
                            // this.renderShelfBook(this.state.books)
                        }
                        <AddBookShelf />
                        <div className="clear" />
                    </div>
                    <div className="shelf"></div>
                </div>
                {/* <ShelfModal
                    open={this.state.showShelfModal}
                    onClose={this.onAddShelfModalClose}
                    shelves={this.state.shelves}
                    setShelves={this.setShelves}
                    shelf={this.state.shelf}
                /> */}
            </div>
        );
    }

    renderShelfBook(books: Book[]): ReactElement[] {
        const elements = Array<ReactElement>();
        const maxBooksToDisplay = Math.min(books.length, 6)
        for (let i = 0; i < maxBooksToDisplay; i++) {
            elements.push(<ShelfBook key={i} title={books[i].title} img={books[i].img} />)
        }
        return elements;
    }
}
