import React, { useState, useEffect } from "react";
import { Book } from "../shared/types/Book";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavBar } from "../shared/navigation/NavBar";
import "./BookOverview.css";
import "../shared/components/Layout.css";
import { Create } from "@material-ui/icons";
import { useHistory, useLocation } from 'react-router-dom';

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

  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    img: state.img, 
    predefinedShelf: { shelfName: "" },
    author: { fullName: "" },
    bookGenre: [],
    numberOfPages: 0,
    rating: 0,
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClickToGoBack = () => {
    history.goBack();
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setShowMessage(true);
  };

  useEffect(() => {
    if (location.state) {
      setBook({
        ...book,
        title: state.title,
        author: { fullName: state.author },
        bookGenre: [state.genre[0]],
        numberOfPages: state.numPages,
        rating: state.rating,
        img: state.img 
      });
    }
  }, [location.state]);

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
            <p>{book.rating}</p>
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
              </div>
            </p>
          </div>
        </div>
        {showMessage && <p className="message">Book added to favorites!</p>}
      </div>
    </div>
  );
}

export default BookOverview;
