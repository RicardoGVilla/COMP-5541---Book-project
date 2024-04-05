import React, { useState, useEffect } from "react";
import { Book } from "../shared/types/Book";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavBar } from "../shared/navigation/NavBar";
import "./BookOverview.css";
import "../shared/components/Layout.css";
import { Create } from "@material-ui/icons";
import { useHistory, useLocation } from 'react-router-dom';
import BookAPI from "../my-books/BookAPI";

interface Params {
  id: string;
}

function BookOverview(): JSX.Element  {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as { 
    title: string;
    author: string;
    rating: number;
    img: string;
    id: number;
    genre: string[];
    numPages: number;
  };

  // Load favorite status from local storage on component mount
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    img: "", 
    predefinedShelf: { shelfName: "" },
    author: { fullName: "" },
    bookGenre: [],
    numberOfPages: 0,
    rating: 0,
    favorite: false
  });

  console.log(book);
  

  const handleClickToGoBack = () => {
    history.goBack();
  };

  const handleFavoriteClick = () => {
    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);
    setShowMessage(true);

    // Update favorite status using BookAPI
    BookAPI.setFavoriteStatus(book.id, updatedIsFavorite)
      .then(updatedBook => {
        if (updatedBook) {
          setBook({ ...book, favorite: updatedIsFavorite });
          // Save favorite status to local storage
          localStorage.setItem(`favoriteStatus_${book.id}`, JSON.stringify(updatedIsFavorite));
        } else {
          console.error("Failed to update favorite status of the book.");
        }
      })
      .catch(error => {
        console.error("Error while updating favorite status:", error);
      });
  };
  

  useEffect(() => {
    // Retrieve favorite status from local storage on component mount
    const storedFavoriteStatus = localStorage.getItem(`favoriteStatus_${state.id}`);
    if (storedFavoriteStatus !== null) {
      setIsFavorite(JSON.parse(storedFavoriteStatus));
      setBook({
        ...book,
        id: state.id, 
        title: state.title,
        author: { fullName: state.author },
        bookGenre: [state.genre[0]],
        numberOfPages: state.numPages,
        rating: state.rating,
        img: state.img,
        favorite: JSON.parse(storedFavoriteStatus)
      });
    } else {
      // If no favorite status found in local storage, default to false
      setIsFavorite(false);
      setBook({
        ...book,
        id: state.id, 
        title: state.title,
        author: { fullName: state.author },
        bookGenre: [state.genre[0]],
        numberOfPages: state.numPages,
        rating: state.rating,
        img: state.img,
        favorite: false
      });
    }
  }, [state]);

  return (
    <div className="layoutContainer">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="pageContent">
        <div className="back-icon-button-container" onClick={handleClickToGoBack}>
          <div className="arrow-back">
            <ArrowBackIcon />
          </div>
          Back
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-8">
            <img
              className="book-image"
              src={book.img}
              alt="book image"
            />
            <h1 className="pageTitle bold">{book.title}</h1>
            <h5 className="authorName">{book.author.fullName}</h5>
            <p>Book ID: {book.id}</p> {/* Display the book's ID */}
            <p>Rating: {book.rating}</p>
            <p>
              <span className="shelfName">Edit book</span>
              {book.predefinedShelf.shelfName}{" "}
              <Create className="pencil-icon" />
              <div className="arrow-back">
                <FavoriteIcon
                  className={isFavorite ? "heart-red" : "heart-white"}
                  onClick={handleFavoriteClick}
                  style={{ cursor: 'pointer' }}
                />
                {showMessage && <p className="message">Book added to favorites!</p>}
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
                <div className="col-10">{book.bookGenre}</div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="bold">Page count:</span>
                </div>
                <div className="col-10">
                  {book.numberOfPages} pages
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

export default BookOverview;
