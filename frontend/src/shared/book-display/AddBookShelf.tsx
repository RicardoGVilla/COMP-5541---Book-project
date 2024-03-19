import React, { Component, ReactElement } from "react";
import Button from "@material-ui/core/Button";
import "./AddBookShelf.css";
import BookModal from "../../genre/BookModal";
import { Icon } from '@material-ui/core';


interface IAddBookState {
    showBookModal: boolean;
}


class AddBookShelf extends Component<Record<string, unknown>, IAddBookState> {
  constructor(props: Record<string, unknown>) {
      super(props);
      this.state = {
          showBookModal: false,
      };
      this.onAddBook = this.onAddBook.bind(this);
      this.onAddBookModalClose = this.onAddBookModalClose.bind(this);
  }

  onAddBook(): void {
    this.setState({
        showBookModal: true,
    });
  }

  onAddBookModalClose(): void {
    this.setState({
        showBookModal: false,
    });
  }
    
  render(): ReactElement {
    return (
      <div>
        <div className="book add-new">
          <Button onClick={this.onAddBook} className="book add-new" style={{ borderRadius: 0, display: 'contents'}}>
              <Icon className="icon">add</Icon>
              <p className="book-title add-new">Add book</p>
          </Button>
        </div>
        <BookModal
          open={this.state.showBookModal}
          onClose={this.onAddBookModalClose}
        />
      </div>
    )
  }
}
export default AddBookShelf;
