import React, { Component } from "react";
import HttpClient from "../shared/http/HttpClient";
import { Book } from "../shared/types/Book";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavBar } from "../shared/navigation/NavBar";
import "./BookOverview.css";
import "../shared/components/Layout.css";
import { Create } from "@material-ui/icons";
import { History } from 'history';

interface Props {
  history: History;
  match: {
    params: {
      id: number;
    };
  };
}

interface IState {
  book: Book;
}

class BookOverview extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      book: {
        id: 0,
        title: "",
        img: "",
        predefinedShelf: {
          shelfName: "",
        },
        author: {
          fullName: "",
        },
        bookGenre: [],
        numberOfPages: 0,
        rating: 0,
      },
    };
    this.handleClickToGoBack = this.handleClickToGoBack.bind(this);
  }

  componentDidMount(): void {
    this.getBook();
  }

  handleClickToGoBack(): void {
    this.props.history.goBack();
  }

  async getBook(): Promise<void> {
    if (this.props.match) {
      await fetch(
        "http://localhost:3000/api/books/" + this.props?.match?.params?.id,
        {
          headers: HttpClient.getHeaders(),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          console.log('data')
          this.setState({
            book: data,
          });
        })
        .catch((error: Record<string, string>) => {
          console.error("error: ", error);
        });
    }
  }

  render(): JSX.Element {
    return (
      <div className="layoutContainer">
        <div className="navBar">
          <NavBar />
        </div>
        <div className="pageContent">
          <div
            className="back-icon-button-container"
            onClick={this.handleClickToGoBack}
          >
            <div className="arrow-back">
              <ArrowBackIcon />
            </div>
            Back
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-8">
              <img
                className="book-image"
                // eslint-disable-next-line max-len
                src="https://inliterature.net/wp-content/uploads/2014/04/harry-potter-1-709x1024.jpg"
                alt="book image"
              />
              <h1 className="pageTitle bold">{this.state.book.title}</h1>
              <h5 className="authorName">{this.state.book.author.fullName}</h5>
              <p>{this.state.book.rating}</p>
              <p>
                <span className="shelfName">Edit book</span>
                {this.state.book.predefinedShelf.shelfName}{" "}
                <Create className="pencil-icon" />
                <div className="arrow-back">
                  <FavoriteIcon />
                </div>
              </p>
            </div>
          </div>
          <div className="row book-details justify-content-center">
            <div className="col-8">
              <h5 className="bold">Book details</h5>
              <div className="row">
                <div className="col-2">
                  <span className="bold">Summary:</span>
                </div>
                <div className="col-10">No summary</div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="bold">Genre(s):</span>
                </div>
                <div className="col-10">{this.state.book.bookGenre}</div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="bold">Page count:</span>
                </div>
                <div className="col-10">
                  {this.state.book.numberOfPages} pages
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="bold">My review:</span>
                </div>
                <div className="col-10">
                  You have not submitted a review for this book!
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <a className="submit-review">Submit a review</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookOverview;
