
import React, { Component } from "react";
import Modal, { IModalProps } from "../shared/components/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "./BookModal.css";
import Hidden from "@material-ui/core/Hidden";
import HttpClient from "../shared/http/HttpClient";
import Endpoints from "../shared/api/endpoints";
import MenuItem from '@material-ui/core/MenuItem';



const bookGenres = [
    {
      value: 'Action',
      label: 'Action',
    },
    {
      value: 'Romance',
      label: 'Romance',
    },
    {
      value: 'Fiction',
      label: 'Fiction',
    },
    {
      value: 'Fantasy',
      label: 'Fantasy',
    },
];

const shelf = [
    {
      value: 'ToRead',
      label: 'To Read',
    },
    {
      value: 'Favorite',
      label: 'Favorite',
    },
];


type MyState = { bookTitle: string, authFirstName: string, authLastName: string, bookGenre: string, bookShelf: string, pageCount: number, publisher: string, showError: boolean, showInfo: boolean, msg: string};
export default class BookModal extends Component<IModalProps, MyState> {

    constructor(props: never) {
        super(props);

        this.state = {
            bookTitle: "",
            authFirstName: "",
            authLastName: "",
            bookGenre: "",
            bookShelf: "",
            pageCount: 0,
            publisher: "",
            showError: false,
            showInfo: false,
            msg: "", 
        };
        this.submitBook = this.submitBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePageCount = this.handlePageCount.bind(this);
    }

    

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState( { ...this.state, [event.target.name] : event.target.value });
        
    };
   
  
    handlePageCount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState( { pageCount : Number(event.target.value) });
        
    };
   

    submitBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        
        console.log(this.state)

        //const bookName = this.state.bookTitle;
        // if(bookName.length > 0 && bookName.toString().length > 20){
        //     this.setState({showError: true, msg: "Book name is too long"});
        //     return;
        // }
        // HttpClient.post(Endpoints.shelf, bookName).then(() => {
        //     this.setState({showError: false, showInfo: true, msg: "Book saved successfully"});  
        // }).catch((error: Record<string, string>) => {
        //     console.error(error);
        //     this.setState({showError: true, showInfo: false, msg: "Some error occurred"});    
        // });

        // const bookTitle = this.state.bookTitle;
        // const authFirstName = this.state.authFirstName;
        // const authLastName = this.state.authLastName;
        // const bookGenre = this.state.bookGenre;
        // const bookShelf = this.state.bookShelf;
        // const pageCount = this.state.pageCount;
        // const publisher = this.state.publisher;
        const {bookTitle, authFirstName, authLastName, bookGenre, bookShelf, pageCount, publisher} = this.state;

        if([bookTitle, authFirstName, authLastName, bookGenre, bookShelf, pageCount, publisher].includes('')){
            this.setState({showError: true, msg: "All fields are required"});
            return;
        }

        this.setState({showError: false});

        const bookObject = {
            bookTitle,
            authFirstName,
            authLastName, 
            bookGenre,
            bookShelf,
            pageCount,
            publisher
        }
       
        console.log(bookObject);
        
        
    };

    render(): JSX.Element {
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.onClose}>
                    <div className="shelf-modal-container">
                        
                        <div className="modal-title">Add book</div>
                        
                        <div className="modal-content">
                            {/* <div className="book-modal-desc-container"> */}
                                <Hidden smDown implementation="css">
                                    {/* <div className="book-modal-desc-items"> */}
                                        {/* <p>Book name</p>
                                        <TextField
                                            className="shelfInput"
                                            size="small"
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        /> */}
                                        
                                   
                                    <div>
                                        <TextField
                                        required
                                        id="standard-full-width"
                                        label="Book title"
                                        style={{ width: 520 }}
                                        fullWidth
                                        margin="normal"
                                        name= "bookTitle"
                                        value={this.state.bookTitle}
                                        onChange={this.handleChange}
                                        />
                                        <TextField
                                        required
                                        id="filled-required"
                                        label="Author's first name"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "authFirstName"
                                        value={this.state.authFirstName}
                                        onChange={this.handleChange}
                                        />
                                        <TextField
                                        required
                                        id="filled-required"
                                        label="Author's last name"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "authLastName"
                                        value={this.state.authLastName}
                                        onChange={this.handleChange}
                                        />
                                        <TextField
                                        required
                                        id="fill-select-currency"
                                        select
                                        label="Book genre"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "bookGenre"
                                        value={this.state.bookGenre}
                                        onChange={this.handleChange}
                                        >
                                            {bookGenres.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                        required
                                        id="fill-select-currency"
                                        select
                                        label="Book shelf"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "bookShelf"
                                        value={this.state.bookShelf}
                                        onChange={this.handleChange}
                                        >
                                            {shelf.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        
                                        <TextField
                                        id="filled-number"
                                        label="Page count"
                                        type="number"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "pageCount"
                                        value={this.state.pageCount}
                                        onChange={this.handlePageCount}
                                        />
                                        <TextField
                                        id="filled-required"
                                        label="Publisher"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        name= "publisher"
                                        value={this.state.publisher}
                                        onChange={this.handleChange}
                                        />
                                    </div>
                                    {/* <div className="book-modal-button-delete">
                                        <Button
                                            className="shelf-modal-button"
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            disableElevation
                                        >
                                            Delete Book
                                        </Button>
                                    </div> */}
                                    {/* </div> */}
                                </Hidden>
                                <Hidden mdUp implementation="css">
                                    <div className="shelf-modal-desc-items">
                                        <TextField
                                            required
                                            id="standard-full-width"
                                            label="Book title"
                                            style={{ width: 520 }}
                                            fullWidth
                                            margin="normal"
                                            name= "bookTitle"
                                            value={this.state.bookTitle}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </Hidden>
                            {/* </div> */}
                        </div>

                        <div className="modal-form-spacer" />

                        <div className="shelf-button-container">
                            <Button
                                className="shelf-modal-button"
                                variant="contained"
                                onClick={this.props.onClose}
                                disableElevation
                            >
                                Cancel
                            </Button>
                            <Button
                                className="shelf-modal-button"
                                variant="contained"
                                onClick={this.submitBook}
                                color="primary"
                                disableElevation
                            >
                                Add Book
                            </Button>
                        </div>
                        <div>
                         { (this.state.showError || this.state.showInfo) ?
                         
                        <Alert variant="filled" severity={this.state.showError? "error" : "info"}>
                            {this.state.msg}
                        </Alert>
                        : <></>
                        }
                      </div>
                    </div>
                    
                </Modal>
            </div>
        );
    }
}

