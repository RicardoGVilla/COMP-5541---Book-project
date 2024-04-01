import React, { ReactElement, useState } from 'react'
import './ShelfCarousel.css'
import { Paper } from '@material-ui/core';
import { Book } from '../types/Book';
import AddBookShelf from '../book-display/AddBookShelf';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { BOOK_OVERVIEW } from '../routes'
import { Create } from "@material-ui/icons";



type BookProps = {
    title: string;
    author: string;
    rating: number;
    img: string;
    id: number;
    genre: string[];
    numPages: number;
}

interface StateProps {
    title: string;
}


function ShelfBook(props: BookProps): JSX.Element {
    
    const bookClass = 'book' + (props.img === "" ? '' : ' image');
    const displayTitle = props.title.length > 12 ? 
                        (props.title.substring(0, 12) + "...") : props.title;

    const linkProps = {
        to:  {
            pathname: `${BOOK_OVERVIEW}/${props.id}`,
            state: { 
                title: props.title,
                author: props.author,
                rating: props.rating,
                genre: props.genre, 
                numPages: props.numPages
            } 
        } ,
        style: { textDecoration: 'none', color: 'black' },
        key: props.id,
    };
    
   
    return (
        // <Link
        //     to={{
        //         pathname: `${BOOK_OVERVIEW}/${props.key}`,
        //         state: { title: props.title } as StateProps
        //     }}
        //         style={{ textDecoration: 'none', color: 'black' }}
        //         key={props.key}
        // >

        <Link {...linkProps}> 
            <Paper className={bookClass} variant="elevation" square={false}>
                {(bookClass !== "book") && <div className="book-spine"></div>}
                {displayTitle}
            </Paper>
        </Link>
    );
}



interface IShelfCarouselState {
    title: string;
    books: Book[];
}

type ShelfCarouselProps = {
    title: string;
    books: Book[];
    searchText: string;
}
export default class ShelfCarousel extends Component<ShelfCarouselProps, IShelfCarouselState> {
    
    constructor(props: ShelfCarouselProps) {
        super(props);
        this.state = {
            title: props.title,
            books: props.books,
        }
        this.searchText = props.searchText
    }
    

    componentDidMount(): void {
        // console.log(this.state);

        if(this.searchText !== '') {
            this.setState({
                books: this.filterBooks()
            })
        } 
    }
    searchText = '';

    filterBooks(): Book[] {
        return this.state.books.filter(book => {
          return book.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }

    renderShelfBook(books: Book[]): ReactElement[] {
        const elements = Array<ReactElement>();
        const maxBooksToDisplay = Math.min(books.length, 6)
        for (let i = 0; i < maxBooksToDisplay; i++) {
            elements.push(
            <ShelfBook 
                key={i} 
                id={i} 
                title={books[i].title} 
                author={books[i].author.fullName}
                rating={books[i].rating}
                genre={books[i].bookGenre}
                numPages={books[i].numberOfPages}
                img={books[i].img} />)
            // console.log(books);
        }
        return elements;
    }

    render(): JSX.Element {
        return (
            <div className="shelf-container">
                <span className="shelf-title">{this.state.title}</span>
                <span className="view-all">View All</span>
                <div className="clear" />
                <div className="books-and-shelf">
                    <div className="book-wrap">
                        {
                            this.renderShelfBook(this.state.books)
                        }
                        <AddBookShelf />
                        <div className="clear" />
                    </div>
                    <div className="shelf"></div>
                </div>
            </div>
        );
    }

    
}

