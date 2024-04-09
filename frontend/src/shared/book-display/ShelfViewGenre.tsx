import React, { Component, ReactElement } from "react";
import { Book } from "../types/Book";
import ShelfCarousel from "./ShelfCarousel";

interface IShelfState {
    bookList: Book[];
    searchText: string;
    onReloadRecom: () => void;
}

export default class ShelfViewGenre extends Component<IShelfState, IShelfState> {
    constructor(props: IShelfState) {
        super(props);
        this.state = {
            bookList: props.bookList,
            searchText: props.searchText,
            onReloadRecom: props.onReloadRecom
        };
    }

    render(): ReactElement {
        
        const booksByGenre: { [genre: string]: Book[] } = {};
        this.state.bookList.forEach(book => {
            const genre = book.bookGenre[0]; 
            if (!booksByGenre[genre]) {
                booksByGenre[genre] = [];
            }
            booksByGenre[genre].push(book);
        });

        return (
            <div>
                
               {Object.entries(booksByGenre).map(([genre, books], index) => (
                    <ShelfCarousel
                        title={genre}
                        key={index}
                        books={books}
                        onReloadRecom={this.state.onReloadRecom}
                        searchText={this.state.searchText}
                    />
                ))}
                
            </div>
        )
    }
}
