import React, { useState, useEffect } from "react";
import HttpClient from "../shared/http/HttpClient";
import { Book } from "../shared/types/Book";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavBar } from "../shared/navigation/NavBar";
import "./BookOverview.css";
import "../shared/components/Layout.css";
import { Create } from "@material-ui/icons";
import {  useParams, useLocation } from 'react-router-dom';
import { History } from 'history';

interface Params {
  id: string;
}

interface Props {
  history: History;
  match: {
    params: {
      id: number;
    };
  };
}




const BookOverview: React.FC = () => {
  
  const location = useLocation();
  console.log(location);
  console.log(location.state);
  console.log(location.state.title);
  
  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    img: "",
    predefinedShelf: { shelfName: "" },
    author: { fullName: "" },
    bookGenre: [],
    numberOfPages: 0,
    rating: 0,
  });

  const handleClickToGoBack = () => {
    history.back();
  };

  useEffect(() => {
    const bookInfo = location.state as Book | undefined;
    
    //console.log(location.state);
  },[location]);

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
                // eslint-disable-next-line max-len
                src="https://inliterature.net/wp-content/uploads/2014/04/harry-potter-1-709x1024.jpg"
                alt="book image"
            />
            <h1 className="pageTitle bold">{book.title}</h1>
            <h5 className="authorName">{book.author.fullName}</h5>
            <p>{book.rating}</p>
            <p>
              <span className="shelfName">Edit book</span>
              {book.predefinedShelf.shelfName}{" "}
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
};

export default BookOverview;
