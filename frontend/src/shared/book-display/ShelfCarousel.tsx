import React, { ReactElement, Component } from 'react';
import './ShelfCarousel.css';
import { Paper } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { BOOK_OVERVIEW } from '../routes';
import AddBookShelf from '../book-display/AddBookShelf';

import { Book } from '../types/Book';

type BookProps = {
    title: string;
    author: string;
    rating: number;
    img: string;
    id: number;
    genre: string[];
    numPages: number;
}

function ShelfBook(props: BookProps): JSX.Element {
    const bookClass = 'book' + (props.img === "" ? '' : ' image');
    const displayTitle = props.title.length > 20 ? 
                        (props.title.substring(0, 20) + "...") : props.title;

    const linkProps = {
        to: {
            pathname: `${BOOK_OVERVIEW}/${props.id}`,
            state: { 
                id: props.id,
                title: props.title,
                author: props.author,
                rating: props.rating,
                genre: props.genre, 
                numPages: props.numPages,
                img: props.img
            }
        },
        style: { textDecoration: 'none', color: 'black' },
        key: props.id,
    };
    
    return (
        <Link {...linkProps}> 
            <Paper className={bookClass} variant="elevation" square={false}>
                {(bookClass !== "book") && <img src={props.img} alt={props.title} className="book-spine"></img>}
                {displayTitle}
            </Paper>
        </Link>
    );
}

interface IShelfCarouselState {
    title: string;
    books: Book[];
    img: string;
}

type ShelfCarouselProps = {
    title: string;
    books: Book[];
    img?: string;
    searchText: string;
    onReloadRecom: () => void;
}

class ShelfCarousel extends Component<ShelfCarouselProps, IShelfCarouselState> {

    constructor(props: ShelfCarouselProps) {
        super(props);
        this.state = {
            title: props.title,
            books: props.books,
            img: props.img || "",
        };
    }

    componentDidMount(): void {
        if(this.searchText !== '') {
            this.setState({
                books: this.filterBooks()
            });
        } 
    }

    componentDidUpdate(prevProps: ShelfCarouselProps) {
        // Check if the props have changed
        if (prevProps !== this.props) {
            this.setState({
                title: this.props.title,
                books: this.props.books,
                img: this.props.img || ""
            });
        }
    }

    searchText = '';


    filterBooks(): Book[] {
        return this.state.books.filter(book => 
            book.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

    renderShelfBook(books: Book[]): ReactElement[] {
        return books.slice(0, 6).map((book) => (
            <ShelfBook 
                key={book.id} 
                id={book.id} 
                title={book.title} 
                author={book.author.fullName} 
                rating={book.rating}
                genre={book.bookGenre} 
                numPages={book.numberOfPages}
                img={book.img} />
        ));
    }
    

    render(): JSX.Element {
        const isRecommendations = this.props.title === "Recommendations";
        
        return (
            <div className="shelf-container">
                <span className="shelf-title">{this.state.title}</span>
                <span className="view-all">View All</span>
                {isRecommendations && (
                    <div>
                        <Button variant="outlined" onClick={this.props.onReloadRecom}>Reload recommendation</Button>
                    </div>
                )}
                <div className="clear" />
                <div className="books-and-shelf">
                    <div className="book-wrap">
                        {this.renderShelfBook(this.state.books)}
                        {!isRecommendations && <AddBookShelf />}
                        <div className="clear" />
                    </div>
                    
                    <div className="shelf"></div>
                </div>
            </div>
        );
    }
}

export default ShelfCarousel;
