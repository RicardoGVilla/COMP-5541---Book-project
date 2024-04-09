import React, { Component, ReactElement } from "react";
import { Book } from "../types/Book";
import ShelfCarousel from "./ShelfCarousel";
import ShelfCarouselNew from "./ShelfCarouselNew";


  
interface IShelfState {
    readingBooks: Book[];
    toReadBooks: Book[];
    readBooks: Book[];
    didNotFinishBooks: Book[];
    favoriteBooks: Book[];
    recommendedBooks: Book[];
    searchText: string;
    shelves: string[];
    setShelf: (name: string) => void;
    onReloadRecom: () => void;
}

export default class ShelfView extends Component<IShelfState, IShelfState> {
    constructor(props: IShelfState) {
        super(props);
        this.state = {
            didNotFinishBooks: props.didNotFinishBooks,
            readBooks: props.readBooks,
            readingBooks: props.readingBooks,
            toReadBooks: props.toReadBooks,
            favoriteBooks: props.favoriteBooks,
            recommendedBooks: props.recommendedBooks,
            searchText: props.searchText,
            shelves: props.shelves,
            setShelf: props.setShelf,
            onReloadRecom: props.onReloadRecom
        };
    }

    componentDidUpdate(prevProps: IShelfState) {
        // Check if the props have changed
        if (prevProps !== this.props) {
            this.setState({
                didNotFinishBooks: this.props.didNotFinishBooks,
                readBooks: this.props.readBooks,
                readingBooks: this.props.readingBooks,
                toReadBooks: this.props.toReadBooks,
                favoriteBooks: this.props.favoriteBooks,
                recommendedBooks: this.props.recommendedBooks,
                searchText: this.props.searchText,
                shelves: this.props.shelves,
                setShelf: this.props.setShelf
            });
        }
    }

    render(): ReactElement {
        return (
            <div>
                <ShelfCarousel 
                    title="Reading"
                    books={this.state.readingBooks}
                    onReloadRecom={this.state.onReloadRecom}
                    searchText={this.state.searchText} />
                <ShelfCarousel 
                    title="To Read" 
                    books={this.state.toReadBooks}
                    onReloadRecom={this.state.onReloadRecom}
                    searchText={this.state.searchText} />
                <ShelfCarousel 
                    title="Read"
                    books={this.state.readBooks}
                    onReloadRecom={this.state.onReloadRecom}
                    searchText={this.state.searchText} />
                <ShelfCarousel 
                    title="Favorites"
                    books={this.state.favoriteBooks}
                    onReloadRecom={this.state.onReloadRecom}
                    searchText={this.state.searchText} />
                <ShelfCarousel 
                    title="Recommendations"
                    books={this.state.recommendedBooks}
                    onReloadRecom={this.state.onReloadRecom}
                    searchText={this.state.searchText} />

                { this.state.shelves.map( (shelfName, index) => (
                        <ShelfCarouselNew 
                            shelfName={shelfName}
                            key={index}
                            setShelf={this.state.setShelf}
                        />
                    )
                )}
                
            </div>
        )
    }
}
